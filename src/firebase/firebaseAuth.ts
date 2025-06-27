import auth from '@react-native-firebase/auth';

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return { user: userCredential.user };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await auth().signInWithEmailAndPassword(email, password);
    return { user: result.user };
  } catch (error: any) {
    return { error: error.message };
  }
};
