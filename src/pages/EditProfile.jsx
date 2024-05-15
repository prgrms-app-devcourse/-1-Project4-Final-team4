import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Margin from '../components/Margin';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadImageToStorage } from '../firebase/storage';
import { useImagePikcer } from '../hook/use-image-picker';
import EditProfileModal from '../components/EditProfileModal';
import { SCREEN_HEIGHT, SCREEN_WIDTH, containerStyle } from '../utils/utils';
import BasicHeader from '../components/BasicHeader';
import { Colors } from '../utils/Colors';

export const profile_img = 150;

const EditProfile = ({ navigation }) => {
  const { pickImage, image, removeImage } = useImagePikcer();
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [userName, setUserName] = useState(''); // Initialize with an empty string

  useEffect(() => {
    // Fetch userName from AsyncStorage
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        if (name) {
          setUserName(name);
        } else {
          setUserName('사용자 이름'); // Fallback text if userName is not defined
        }
      } catch (error) {
        console.error('Failed to fetch user name:', error);
        setUserName('사용자 이름'); // Fallback text in case of error
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    if (image && image.uri) {
      handleUploadImage(image.uri);
    }
  }, [image]);

  const handleUploadImage = async (uri) => {
    try {
      const userEmail = await AsyncStorage.getItem('email'); // 이메일 주소 불러오기
      const userName = await AsyncStorage.getItem('userName'); // 사용자 이름 불러오기
      if (userEmail && uri) {
        const url = await uploadImageToStorage(uri, userEmail); // 이메일을 사용자 ID로 사용
        setImageUrl(url); // 업로드된 이미지 URL을 상태에 저장
        // Alert.alert('업로드 성공', '이미지가 성공적으로 업로드되었습니다!');
        console.log('업로드 성공:', url);
        console.log('사용자 이름:', userName);
      } else {
        Alert.alert('업로드 실패', '이메일 정보를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('업로드 실패:', error);
      Alert.alert('업로드 실패', '이미지 업로드 중 문제가 발생했습니다.');
    }
  };

  const onPressOpenAlbum = async () => {
    await pickImage();
  };

  const onPressEditProfileModal = () => {
    setIsVisible(!isVisible);
  };

  const onPressRemoveImageButton = () => {
    removeImage();
  };

  return (
    <SafeAreaView style={containerStyle}>
      {/* 헤더 */}
      <BasicHeader isBackButton={true} title={'프로필 편집'} />
      <Margin height={40} />

      {/* 프로필 섹션 */}
      <View style={styles.profile}>
        {image && image.uri ? (
          <Image source={{ uri: image.uri }} style={styles.image} />
        ) : (
          <View style={styles.noImage}>
            <Text>no image.</Text>
          </View>
        )}
        <Margin height={12} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button title="앨범 열기" onPress={onPressOpenAlbum} />
          <TouchableOpacity onPress={onPressRemoveImageButton}>
            <Text style={{ fontSize: 18 }}>이미지 삭제</Text>
          </TouchableOpacity>
        </View>
        <Margin height={20} />
        <View style={styles.nameContainer}>
          <View>
            <Text style={styles.nameText}>{userName}</Text>
          </View>
          <TouchableOpacity onPress={onPressEditProfileModal}>
            <EditIcon name="edit" color={'#aeaeae'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <EditProfileModal isVisible={isVisible} setIsVisible={setIsVisible} />
      <Margin height={20} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profile: {
    borderRadius: 40,
    backgroundColor: Colors.mint,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    marginTop: -50,
    borderWidth: 3,
    borderColor: Colors.main,
  },
  noImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    marginTop: -50,
    borderWidth: 3,
    borderColor: Colors.main,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 40,
  },
  saveButton: {
    backgroundColor: Colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 30,
  },
});

export default EditProfile;
