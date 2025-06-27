// services/firestoreService.ts
import firestore from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Event {
  id: string;
  title: string;
  location: string;
  scheduledFor: FirebaseFirestoreTypes.Timestamp;
  description?: string;
}

export const fetchEvents = async (): Promise<Event[]> => {
  const snapshot = await firestore()
    .collection('events')
    .orderBy('scheduledFor', 'asc')
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Event[];
};
