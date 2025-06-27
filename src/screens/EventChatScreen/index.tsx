import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import COLORS from '../../constants/Colors';
import { FONT_SIZE } from '../../constants/Typography';

interface Message {
  id: string;
  text: string;
  senderId: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
}

const EventChatScreen = ({ navigation, route }: any) => {
  const { eventId, eventTitle } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const currentUser = auth().currentUser;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('events')
      .doc(eventId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        setMessages(fetched);
        setTimeout(
          () => flatListRef.current?.scrollToEnd({ animated: false }),
          100,
        );
      });

    return unsubscribe;
  }, [eventId]);
const shouldAskAI = (text: string) => {
  const triggers = ['what', 'who', 'where', 'how', 'when', 'why'];
  const lower = text.toLowerCase();
  return triggers.some(trigger => lower.startsWith(trigger));
};

  const handleSend = async () => {
  if (!input.trim()) return;

  const trimmed = input.trim();
  setInput('');

  if (shouldAskAI(trimmed)) {
    try {
      await functions().httpsCallable('askAssistant')({ prompt: trimmed, eventId });
    } catch (err) {
      console.error('AI error:', err);
      await firestore()
        .collection('events')
        .doc(eventId)
        .collection('messages')
        .add({
          text: "I'm having trouble responding right now. Try again later.",
          senderId: 'assistant',
          displayName: 'Copilot',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    }
    return;
  }
    await firestore()
    .collection('events')
    .doc(eventId)
    .collection('messages')
    .add({
      text: trimmed,
      senderId: currentUser?.uid,
      displayName: currentUser?.displayName || 'Anonymous',
      avatarUrl: '', // optional
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.senderId === currentUser?.uid;
    const isAssistant = item.senderId === 'assistant';

    return (
      <View
        style={[
          styles.messageWrapper,
          isAssistant
            ? styles.alignLeft
            : isMe
            ? styles.alignRight
            : styles.alignLeft,
        ]}
      >
        {!isMe && item.avatarUrl ? (
          <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
        ) : !isMe ? (
          <View style={styles.avatarPlaceholder} />
        ) : null}

        <View
          style={[
            styles.bubble,
            isMe
              ? styles.myBubble
              : isAssistant
              ? styles.assistantBubble
              : styles.theirBubble,
          ]}
        >
          {!isMe && item.displayName ? (
            <Text style={styles.senderName}>{item.displayName}</Text>
          ) : null}
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.time}>
            {item.createdAt?.toDate?.().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Custom header */}
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {eventTitle}
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Type a message or /ask something..."
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F9F9F9' },
  list: { padding: 12 },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  alignLeft: { justifyContent: 'flex-start' },
  alignRight: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  bubble: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    maxWidth: '80%',
  },
  myBubble: {
    backgroundColor: COLORS.font_white,
    borderTopRightRadius: 0,
  },
  theirBubble: {
    backgroundColor: '#E5E5EA',
    borderTopLeftRadius: 0,
  },
  assistantBubble: {
    backgroundColor: '#D0F0FF',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.black,
  },
  time: {
    fontSize: 10,
    color: '#777',
    marginTop: 4,
    textAlign: 'right',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#ccc',
  },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 20,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  backText: {
    fontSize: 18,
    color: COLORS.blue,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
  },
  senderName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
});

export default EventChatScreen;
