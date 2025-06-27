const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
admin.initializeApp();

exports.askAssistant = functions.https.onCall(async (data, context) => {
  const { prompt, eventId } = data;

  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Not signed in');
  }

  const openaiRes = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${functions.config().openai.key}`,
      },
    }
  );

  const reply = openaiRes.data.choices[0].message.content;

  await admin.firestore()
    .collection('events')
    .doc(eventId)
    .collection('messages')
    .add({
      text: reply,
      senderId: 'assistant',
      displayName: 'Copilot',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

  return { success: true };
});
