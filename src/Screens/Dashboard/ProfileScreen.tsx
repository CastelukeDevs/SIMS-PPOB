import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from '@backpackapp-io/react-native-toast';
import {IRootStateType} from '@Redux/Store';
import {logoutUser} from '@Redux/Actions/DefaultAction';
import {editUserImage, editUserProfile} from '@Redux/Actions/UserAction';
import ImagePicker from '@Utilities/Tools/ImagePicker';

import {Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';
import ValidateString from '@Utilities/Tools/ValidateString';

import Button from '@Components/Commons/Button';
import Header from '@Components/Commons/Header';
import TextInput from '@Components/Commons/TextInput';
import Avatar from '@Components/Avatar';

const ProfileScreen = () => {
  const dispatch = useDispatch<any>();
  const {userData} = useSelector((state: IRootStateType) => state.user);

  const [email, setEmail] = useState(userData?.email || '');
  const [firstName, setFirstName] = useState(userData?.first_name || '');
  const [lastName, setLastName] = useState(userData?.last_name || '');
  const [editable, setEditable] = useState(false);
  const [formError, setFormError] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  const checkFormValidity = () => {
    const validateEmail = ValidateString(email, 'email');
    const validateFirstName = ValidateString(firstName, 'name');
    const validateLastName = ValidateString(lastName, 'name');

    setFormError({
      email: validateEmail[0],
      firstName: validateFirstName[0],
      lastName: validateLastName[0],
    });

    return (
      validateEmail.length < 1 &&
      validateFirstName.length < 1 &&
      validateLastName.length < 1
    );
  };

  const onAvatarEditPressHandler = async () => {
    const asset = await ImagePicker();
    dispatch(editUserImage({file: asset as any}))
      .unwrap()
      .then(() => {
        toast.success('Berhasil menyimpan foto profil');
      })
      .catch(() => {
        toast.error('Gagal menyimpan foto profil');
      });
  };

  const onEditPress = () => {
    if (!editable) return setEditable(true);
    if (!checkFormValidity()) return;

    const dataset = {
      email,
      first_name: firstName,
      last_name: lastName,
    };

    dispatch(editUserProfile(dataset))
      .unwrap()
      .then(() => {
        toast.success('Berhasil menyimpan profil akun');
        setEditable(false);
      })
      .catch(() => {
        toast.error('Gagal menyimpan profil akun');
      });
  };

  const onLogoutPress = async () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Header label="Akun" />
      <View style={styles.RootScreenContainer}>
        <View style={{alignItems: 'center'}}>
          <Avatar
            avatar={userData?.profile_image}
            onEditPress={onAvatarEditPressHandler}
          />
        </View>
        <Text style={[ThemeText.H2_Bold, styles.UserNameText]}>
          {userData?.first_name} {userData?.last_name}
        </Text>
        <View style={styles.ContentContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            showLabel
            iconLeading={{name: 'at'}}
            editable={editable}
            errorMessage={formError.email}
          />
          <TextInput
            label="Nama Depan"
            value={firstName}
            onChangeText={setFirstName}
            showLabel
            iconLeading={{name: 'person'}}
            editable={editable}
            errorMessage={formError.firstName}
          />
          <TextInput
            label="Nama Belakang"
            value={lastName}
            onChangeText={setLastName}
            showLabel
            iconLeading={{name: 'person'}}
            editable={editable}
            errorMessage={formError.lastName}
          />
          <View style={{flex: 1}} />
          <Button
            label={editable ? 'Simpan' : 'Edit Profil'}
            onPress={onEditPress}
          />
          <Button
            label={'logout'}
            onPress={onLogoutPress}
            mode="outlined"
            style={styles.LastButton}
          />
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
    marginTop: 18,
  },
  UserNameText: {
    textAlign: 'center',
    margin: 24,
  },
  ContentContainer: {
    flex: 1,
    paddingHorizontal: Dimens.padding,
  },
  LastButton: {
    marginBottom: 18,
    marginTop: 24,
  },
});
