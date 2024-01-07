import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, TextInput as RNInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {IMainNavProp} from '@Routes/RouteTypes';
import {IDispatchError, IText} from '@Types/CommonTypes';

import {Color, Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';
import {TextState} from '@Utilities/Data/Default';
import ValidateString from '@Utilities/Tools/ValidateString';

import Logo from '@Components/Logo';
import TextInput from '@Components/Commons/TextInput';
import Button from '@Components/Commons/Button';
import {authSignUpUser} from '@Redux/Actions/UserAction';
import {IAPIResult} from '@Utilities/APIs/APIUtils';
import {toast} from '@backpackapp-io/react-native-toast';
import {IRootStateType} from '@Redux/Store';

const SignUpScreen = ({navigation}: IMainNavProp<'authSignUpScreen'>) => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<any>();
  const userReady =
    useSelector((state: IRootStateType) => state.user).status !== 'fetching';

  const firstNameRef = useRef<RNInput>(null);
  const lastNameRef = useRef<RNInput>(null);
  const passwordRef = useRef<RNInput>(null);
  const confirmRef = useRef<RNInput>(null);

  const [email, setEmail] = useState<IText>(TextState);
  const [firstName, setFirstName] = useState<IText>(TextState);
  const [lastName, setLastName] = useState<IText>(TextState);
  const [password, setPassword] = useState<IText>(TextState);
  const [confirmPassword, setConfirmPassword] = useState<IText>(TextState);

  const additionalValidation = (): string => {
    const identical = password.text === confirmPassword.text;
    if (identical) return '';
    return 'Password tidak sama';
  };
  /**
   * Check validity of all string validation and set error message to state
   * @returns Boolean
   */
  const validityCheck = () => {
    const test = [
      ValidateString(email.text, 'email'),
      ValidateString(firstName.text, 'name'),
      ValidateString(lastName.text, 'name'),
      ValidateString(password.text, 'password'),
      ValidateString(confirmPassword.text, 'password'),
      additionalValidation(),
    ];

    const testResult = test.map(item => ({
      isValid: item.length < 1,
      result: item,
    }));

    setEmail(prev => ({...prev, error: testResult[0].result[0]}));
    setFirstName(prev => ({...prev, error: testResult[1].result[0]}));
    setLastName(prev => ({...prev, error: testResult[2].result[0]}));
    setPassword(prev => ({...prev, error: testResult[3].result[0]}));
    setConfirmPassword(prev => ({
      ...prev,
      error: testResult[4].result[0] || (testResult[5].result as string),
    }));

    return testResult.every(testCase => testCase.isValid);
  };

  const onPasswordSecureToggle = () => {
    setPassword(prev => ({...prev, isSecured: !prev.isSecured}));
  };
  const onConfirmPasswordSecureToggle = () => {
    setConfirmPassword(prev => ({...prev, isSecured: !prev.isSecured}));
  };

  const onSubmitHandler = () => {
    if (!userReady) return;

    const valid = validityCheck();

    if (!valid) return;
    dispatch(
      authSignUpUser({
        email: email.text,
        password: password.text,
        first_name: firstName.text,
        last_name: lastName.text,
      }),
    )
      .unwrap()
      .then((res: IAPIResult) => {
        toast.success(res.message);
        if (res.status === 0) navigation.goBack();
      })
      .catch((err: IDispatchError) => {
        if (err.message.toLowerCase().includes('email')) {
          setEmail(prev => ({...prev, error: err.message}));
        }
        if (err.code === 'undefined') {
          toast.error('Registrasi error, coba beberapa saat lagi');
        }
      });
  };
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
          value={email.text}
          onChangeText={t => setEmail(prev => ({...prev, text: t}))}
          iconLeading={{name: 'at'}}
          autoCapitalize="none"
          errorMessage={email.error}
          containerStyle={styles.SpaceSmall}
          onSubmitEditing={() => firstNameRef.current?.focus()}
        />
        <TextInput
          ref={firstNameRef}
          label="Nama Depan"
          value={firstName.text}
          onChangeText={t => setFirstName(prev => ({...prev, text: t}))}
          iconLeading={{name: 'person'}}
          errorMessage={firstName.error}
          containerStyle={styles.SpaceSmall}
          onSubmitEditing={() => lastNameRef.current?.focus()}
        />
        <TextInput
          ref={lastNameRef}
          label="Nama Belakang"
          value={lastName.text}
          onChangeText={t => setLastName(prev => ({...prev, text: t}))}
          iconLeading={{name: 'person'}}
          errorMessage={lastName.error}
          containerStyle={styles.SpaceSmall}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <TextInput
          ref={passwordRef}
          label="Password"
          value={password.text}
          onChangeText={t => setPassword(prev => ({...prev, text: t}))}
          iconLeading={{name: 'lock-closed'}}
          iconTrailing={{
            name: password.isSecured ? 'eye' : 'eye-off',
            onPress: onPasswordSecureToggle,
          }}
          secureTextEntry={password.isSecured}
          errorMessage={password.error}
          containerStyle={styles.SpaceSmall}
          onSubmitEditing={() => confirmRef.current?.focus()}
        />
        <TextInput
          ref={confirmRef}
          label="Konfirmasi Password"
          value={confirmPassword.text}
          onChangeText={t => setConfirmPassword(prev => ({...prev, text: t}))}
          iconLeading={{name: 'lock-closed'}}
          iconTrailing={{
            name: confirmPassword.isSecured ? 'eye' : 'eye-off',
            onPress: onConfirmPasswordSecureToggle,
          }}
          secureTextEntry={confirmPassword.isSecured}
          errorMessage={confirmPassword.error}
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
  SpaceSmall: {
    marginBottom: 10,
  },
});
