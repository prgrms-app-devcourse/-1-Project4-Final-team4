import React, {useState} from 'react';
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

import {uploadImageToStorage} from '../firebase/storage';
import {useImagePikcer} from '../hook/use-image-picker';
import EditProfileModal from '../components/EditProfileModal';
import {SCREEN_HEIGHT, SCREEN_WIDTH, containerStyle} from '../utils/utils';
import BasicHeader from '../components/BasicHeader';
import {Colors} from '../utils/Colors';
import SubHeader from '../components/SubHeader';

export const profile_img = 150;

const handleUploadImage = async (image) => {
  try {
    const userEmail = await AsyncStorage.getItem('email');  // 이메일 주소 불러오기
    if (userEmail && image) {
      const url = await uploadImageToStorage(image, userEmail);  // 이메일을 사용자 ID로 사용
      setImageUrl(url);  // 업로드된 이미지 URL을 상태에 저장
      Alert.alert('업로드 성공', '이미지가 성공적으로 업로드되었습니다!');
    } else {
      Alert.alert('업로드 실패', '이메일 정보를 불러올 수 없습니다.');
    }
  } catch (error) {
    console.error('업로드 실패:', error);
    Alert.alert('업로드 실패', '이미지 업로드 중 문제가 발생했습니다.');
  }
};

const EditProfile = ({navigation}) => {
  const {pickImage, image, removeImage} = useImagePikcer();

  const [isVisible, setIsVisible] = useState(false);

  const onPressOpenAlbum = () => {
    pickImage();
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
        {image ? (
          <Image source={image} style={styles.image} />
        ) : (
          <View style={styles.noImage}>
            <Text>no image.</Text>
          </View>
        )}
        <Margin height={12} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button title="앨범 열기" onPress={onPressOpenAlbum} />
          <TouchableOpacity onPress={onPressRemoveImageButton}>
            <Text style={{fontSize: 18}}>이미지 삭제</Text>
          </TouchableOpacity>
        </View>
        <Margin height={20} />
        <View style={styles.name}>
          <Text style={{fontSize: 40}}>yoon</Text>
          <TouchableOpacity onPress={onPressEditProfileModal}>
            <EditIcon name="edit" color={'#aeaeae'} size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleUploadImage}>
          <Text style={{color: Colors.black, fontSize: 18}}>저장</Text>
        </TouchableOpacity>
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
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'center',
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
