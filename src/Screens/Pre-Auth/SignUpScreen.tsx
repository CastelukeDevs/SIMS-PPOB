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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [confirmPasswordSecured, setConfirmPasswordSecured] = useState(true);

  const securePasswordTextHandler = () => {
    setPasswordSecured(!passwordSecured);
  };
  const secureConfirmPasswordTextHandler = () => {
    setConfirmPasswordSecured(!confirmPasswordSecured);
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
          Lengkapi data untuk membuat akun
        </Text>
      </View>
      <View style={styles.SectionContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          iconLeading={{name: 'at'}}
          autoCapitalize="none"
          containerStyle={{marginBottom: 10}}
        />
        <TextInput
          label="Nama Depan"
          value={firstName}
          onChangeText={setFirstName}
          iconLeading={{name: 'person'}}
          containerStyle={{marginBottom: 10}}
        />
        <TextInput
          label="Nama Belakang"
          value={lastName}
          onChangeText={setLastName}
          iconLeading={{name: 'person'}}
          containerStyle={{marginBottom: 10}}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          iconLeading={{name: 'lock-closed'}}
          iconTrailing={{
            name: passwordSecured ? 'eye' : 'eye-off',
            onPress: securePasswordTextHandler,
          }}
          secureTextEntry={passwordSecured}
        />
        <TextInput
          label="Konfirmasi Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          iconLeading={{name: 'lock-closed'}}
          iconTrailing={{
            name: confirmPasswordSecured ? 'eye' : 'eye-off',
            onPress: secureConfirmPasswordTextHandler,
          }}
          secureTextEntry={passwordSecured}
        />
      </View>
      <View>
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
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
    padding: Dimens.padding,
    justifyContent: 'center',
  },
  SectionContainer: {
    marginBottom: 40,
  },
});
