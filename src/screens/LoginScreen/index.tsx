import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { signInWithEmail } from '../../firebase/firebaseAuth';
import COLORS from '../../constants/Colors';
import AuthInput from '../../components/AuthInput';
import IMAGES from '../../constants/Images';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/Typography';
import Spacer from '../../components/Spacer';
import { useUser } from '../../context/UserContext';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleLogin = async () => {
    setLoading(true);
    const result = await signInWithEmail(email, password);
    setLoading(false);
    if (result.error) {
      setMessage(result.error);
    } else {
      const firebaseUser = auth().currentUser;

      setUser({
        email: firebaseUser?.email || '',
        uid: firebaseUser?.uid || '',
        displayName: firebaseUser?.displayName || '',
      });
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40,
        }}
      >
        <Image
          source={IMAGES.LOGO1}
          style={styles.logo1}
          resizeMode="contain"
        />
        <View style={styles.logoView}>
          <Image source={IMAGES.LOGO} resizeMode="contain" />
        </View>
      </View>
      <Text style={styles.signInText}>Sign in</Text>
      <Spacer height={10} />
      <AuthInput
        placeholder="Put your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        imageSource={IMAGES.SMS}
      />
      <Spacer height={12} />
      <AuthInput
        placeholder="Put your password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        imageSource={IMAGES.KEY}
      />
      <Spacer height={12} />
      <View style={styles.bottomView}>
        <View />
        <Text style={styles.buttonText}>SIGN IN</Text>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Image source={IMAGES.ARROWRIGHT} />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{ flexDirection: 'row', position: 'absolute', bottom: '5%' }}
      >
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <Image
        source={IMAGES.BOTTOM}
        style={{ position: 'absolute', bottom: 0, left: 0 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  logo1: { position: 'absolute', right: -20, top: -20 },
  signInText: {
    fontSize: FONT_SIZE.LARGE,
    fontWeight: FONT_WEIGHT.BOLD,
  },
  input: { borderWidth: 1, padding: 12, marginBottom: 10, borderRadius: 6 },
  message: { marginTop: 10, color: 'tomato', fontWeight: '600' },
  bottomView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.white,
    backgroundColor: COLORS.gray_black,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: FONT_WEIGHT.BOLD,
  },
  buttonView: {
    backgroundColor: COLORS.gray_black,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    borderColor: COLORS.white,
    borderWidth: 1,
  },
});

export default LoginScreen;
