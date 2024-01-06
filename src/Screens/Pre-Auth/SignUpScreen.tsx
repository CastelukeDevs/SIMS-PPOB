import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IMainNavProp} from '@Routes/RouteTypes';

import {Color, Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';

import TextInput from '@Components/Commons/TextInput';
import Logo from '@Components/Logo';
import Button from '@Components/Commons/Button';

const SignUpScreen = ({navigation}: IMainNavProp<'authSignUpScreen'>) => {
  const inset = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);

  const secureTextHandler = () => {
    setPasswordSecured(!passwordSecured);
  };

  const onSubmitHandler = () => {};
  const onRegisterHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={[{paddingTop: inset.top}, styles.RootScreenContainer]}>
      <View style={styles.SectionContainer}>
        <Logo />
      </View>
      <View style={styles.SectionContainer}>
        <Text style={[ThemeText.H1_Bold, {textAlign: 'center'}]}>
          Masuk atau buat akun untuk memulai
        </Text>
      </View>
      <View style={styles.SectionContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          iconLeading={{name: 'at'}}
          autoCapitalize="none"
          containerStyle={{marginBottom: 20}}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          iconLeading={{name: 'lock-closed'}}
          iconTrailing={{
            name: passwordSecured ? 'eye' : 'eye-off',
            onPress: secureTextHandler,
          }}
          secureTextEntry={passwordSecured}
          autoCapitalize="none"
        />
      </View>
      <Button
        label="Registrasi"
        onPress={onSubmitHandler}
        style={{marginBottom: 20}}
      />
      <Text
        style={[
          ThemeText.SubTitle_Regular,
          {textAlign: 'center', color: Color.inactive},
        ]}>
        <Text>{'sudah punya akun? login '}</Text>
        <Text
          style={[ThemeText.SubTitle_Bold, {color: Color.accent}]}
          onPress={onRegisterHandler}>
          di sini
        </Text>
      </Text>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
    padding: Dimens.padding,
  },
  SectionContainer: {
    marginBottom: 40,
  },
});
