import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, TextInput as RNInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IMainNavProp} from '@Routes/RouteTypes';

import {Color, Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';
import ValidateString from '@Utilities/Tools/ValidateString';

import Logo from '@Components/Logo';
import TextInput from '@Components/Commons/TextInput';
import Button from '@Components/Commons/Button';
import {useDispatch, useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import {authSignInUser} from '@Redux/Actions/UserAction';

const SignInScreen = ({navigation}: IMainNavProp<'authSignInScreen'>) => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<any>();
  const stateReady =
    useSelector((state: IRootStateType) => state.user).status !== 'fetching';

  const passwordRef = useRef<RNInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [emailError, setEmailError] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState<string[]>([]);

  const checkValidity = () => {
    const validEmail = ValidateString(email, 'email');
    const validPassword = ValidateString(password, 'password');
    setEmailError(validEmail);
    setPasswordError(validPassword);
    if (validEmail.length > 0 || validPassword.length > 0) return false;
    return true;
  };
  const secureTextHandler = () => {
    setPasswordSecured(!passwordSecured);
  };

  const onSubmitHandler = () => {
    // const validEmail = ValidateString(email, 'email');
    // setEmailError(validEmail);
    // const validPassword = ValidateString(password, 'email');
    // setPasswordError(validPassword);
    if (checkValidity() && stateReady) {
      dispatch(authSignInUser({email, password}));
    }
  };
  const onRegisterHandler = () => {
    navigation.navigate('authSignUpScreen');
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
          containerStyle={styles.SpaceSmall}
          errorMessage={emailError[0]}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <TextInput
          ref={passwordRef}
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
          containerStyle={styles.SpaceSmall}
          errorMessage={passwordError[0]}
        />
      </View>
      <Button
        label="Masuk"
        onPress={onSubmitHandler}
        style={{marginBottom: 20}}
        disabled={!stateReady}
      />
      <Text
        style={[
          ThemeText.SubTitle_Regular,
          {textAlign: 'center', color: Color.inactive},
        ]}>
        <Text>{'belum punya akun? registrasi '}</Text>
        <Text
          style={[ThemeText.SubTitle_Bold, {color: Color.accent}]}
          onPress={onRegisterHandler}>
          di sini
        </Text>
      </Text>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
    padding: Dimens.padding,
    justifyContent: 'center',
  },
  SectionContainer: {
    marginBottom: 40,
  },
  SpaceSmall: {
    marginBottom: 10,
  },
});
