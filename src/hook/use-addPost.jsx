import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

export const useAddPost = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // db에 이미지를 저장하는 함수
  const _setImages = newImages => {
    setImages(newImages);
    // todo 파이어베이스 저장 기능 구현
    // AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImages));
  };

  // images 배열에 이미지를 추가하는 함수
  const pickImages = async () => {
    const option = {
      mediaType: 'photo',
      selectionLimit: 5,
    };
    const res = await launchImageLibrary(option);

    if (!res.didCancel) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        uri: res.assets[0].uri,
      };
      _setImages([...images, newImage]);
    }
  };

  const removeImage = imageId => {
    Alert.alert('이미지를 삭제하시겠어요?', '', [
      {
        style: 'cancel',
        text: '아니요',
      },
      {
        text: '네',
        onPress: () => {
          const newImages = images.filter(image => image.id !== imageId);
          _setImages(newImages);
        },
      },
    ]);
  };

  const imagesWithAddButton = [
    ...images,
    {
      id: -1,
      uri: '',
    },
  ];

  const selectImage = image => {
    setSelectedImage(image);
  };

  const initValues = async () => {
    // todo 파이어베이스 db 가져오기 기능 구현
    // const imageFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
    // if (imageFromStorage !== null) {
    //   const parsed = JSON.parse(imageFromStorage);
    //   setImages(parsed);
    // }
  };

  useEffect(() => {
    initValues();
  }, []);

  return {
    images,
    pickImages,
    imagesWithAddButton,
    removeImage,
    selectImage,
    selectedImage,
  };
};
