import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../constants/Colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/Typography';
import IMAGES from '../../constants/Images';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
      }}
    >
      <Image source={IMAGES.WELCOME} />
      <Text style={styles.Text1}>Create Events</Text>
      <Text style={styles.Text2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
        purus sit amet luctus venenatis
      </Text>
      <View style={styles.bottomView}>
        <View />
        <Text
          style={{
            color: COLORS.white,
            fontSize: FONT_SIZE.MEDIUM,
            fontWeight: FONT_WEIGHT.BOLD,
          }}
        >
          Get Started
        </Text>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Image source={IMAGES.ARROWRIGHT} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {},
  Text1: {
    fontSize: FONT_SIZE.XXLARGE,
    fontWeight: FONT_WEIGHT.DOUBLEBOLD,
    color: COLORS.white,
    margin: 10,
  },
  Text2: {
    color: COLORS.font_white,
    fontWeight: FONT_WEIGHT.REGULAR,
    fontSize: FONT_SIZE.SMEDIUM,
    textAlign: 'center',
    width: '90%',
  },
  bottomView: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.white,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    position: 'absolute',
    bottom: '5%',
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
export default WelcomeScreen;
