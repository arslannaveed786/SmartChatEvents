// components/CustomInput.tsx
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Image,
  ImageSourcePropType,
} from 'react-native';
import COLORS from '../constants/Colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/Typography';

interface AuthInputProps extends TextInputProps {
  imageSource?: ImageSourcePropType;
  placeholder?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  imageSource,
  placeholder,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {imageSource && (
        <Image
          source={imageSource}
          style={styles.imageIcon}
          resizeMode="contain"
        />
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.font_white}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    // marginVertical: 6,
  },
  imageIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.SMEDIUM,
    fontWeight:FONT_WEIGHT.REGULAR,
    color: COLORS.black,
  },
});

export default AuthInput;
