import {Platform} from 'react-native';
import {
  ImageLibraryOptions,
  CameraOptions,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';

export const PickerOption: ImageLibraryOptions = {
  mediaType: 'photo',
  maxWidth: 500,
  maxHeight: 500,
  selectionLimit: 1,
};

export const CameraOption: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 1024,
  maxHeight: 1024,
  cameraType: 'front',
};

const ImagePicker = async () => {
  try {
    if (Platform.OS === 'ios') {
      return await launchImageLibrary(PickerOption).then(res => {
        const imageAssets = res.assets?.[0];
        return imageAssets;
      });
    } else {
      return await launchCamera(CameraOption).then(res => {
        const imageAssets = res.assets?.[0];
        return imageAssets;
      });
    }
  } catch (error) {
    console.log('Image picker error, reason:', error);
  }
};

export default ImagePicker;
