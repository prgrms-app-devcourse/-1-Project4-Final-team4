import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export const useImagePikcer = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const option = {
      mediaType: 'photo',
      selectionLimit: 5,
    };

    const response = await launchImageLibrary(option);

    if (response.didCancel) Alert.alert('사진 선택을 취소하였습니다.');
    else if (response.errorMessage)
      Alert.alert('오류 : ' + response.errorMessage);
    else {
      const uris = [];
      response.assets?.forEach(value => uris.push(value));

      // AsyncStorage.setItem(
      //   STORAGE_KEY.PROFILE_IMAGE_KEY,
      //   JSON.stringify(uris[0]),
      // );
      setImage(uris[0]);
    }
  };
  useEffect(() => {
    // init();
  }, []);

  // const init = async () => {
  //   const result = await AsyncStorage.getItem(STORAGE_KEY.PROFILE_IMAGE_KEY);
  //   const newImage = JSON.parse(result);
  //   setImage(newImage);
  // };
  return {pickImage, setImage, image};
};
