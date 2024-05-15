import React, {useState, useEffect} from 'react';
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import {uploadImageToStorage} from '../firebase/storage';
import {useImagePikcer} from '../hook/use-image-picker';
import EditProfileModal from '../components/EditProfileModal';
import EditEmailModal from '../components/EditEmailModal';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  containerStyle,
  shadow,
} from '../utils/utils';
import BasicHeader from '../components/BasicHeader';
import {Colors} from '../utils/Colors';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import Trash from 'react-native-vector-icons/FontAwesome6';
import Person from 'react-native-vector-icons/Ionicons';

export const profile_img = 150;

const EditContent = ({text, content, iconName, onPress}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          borderRadius: 20,
          backgroundColor: '#fff',
          paddingVertical: 30,
          width: SCREEN_WIDTH - 40,
        },
        shadow,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'flex-end', gap: 4}}>
        <Person name={iconName} color="" size={24} />
        <Text style={{fontSize: 20}}>{text}</Text>
      </View>
      <TouchableOpacity style={styles.name} onPress={onPress}>
        <Text style={{fontSize: 20}}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
};

const EditProfile = ({navigation}) => {
  const {pickImage, image, removeImage} = useImagePikcer();
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isEditEmailModal, setIsEditEmailModal] = useState(false);
  useEffect(() => {
    if (image && image.uri) {
      handleUploadImage(image.uri);
    }
  }, [image]);

  const handleUploadImage = async uri => {
    try {
      const userEmail = await AsyncStorage.getItem('email'); // 이메일 주소 불러오기
      const userName = await AsyncStorage.getItem('displayName'); // 사용자 이름 불러오기
      if (userEmail && uri) {
        const url = await uploadImageToStorage(uri, userEmail); // 이메일을 사용자 ID로 사용
        setImageUrl(url); // 업로드된 이미지 URL을 상태에 저장
        Alert.alert('업로드 성공', '이미지가 성공적으로 업로드되었습니다!');
        console.log('업로드 성공:', url);
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

  const onPressEditProfileModal = ({name, email}) => {
    if (name) {
      setIsVisible(!isVisible);
    } else if (email) {
      setIsEditEmailModal(!isEditEmailModal);
    }
  };

  const onPressRemoveImageButton = () => {
    removeImage();
  };

  return (
    <SafeAreaView style={[containerStyle, {backgroundColor: '#eaeaea'}]}>
      {/* 헤더 */}
      <BasicHeader isBackButton={true} title={'프로필 편집'} />
      <Margin height={150} />

      {/* 프로필 섹션 */}
      <View style={[styles.profile, shadow]}>
        {image && image.uri ? (
          <Image source={{uri: image.uri}} style={styles.image} />
        ) : (
          <View style={styles.noImage}>
            <Text>no image.</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.imageEditButton, {right: 130}]}
          onPress={onPressOpenAlbum}>
          <EditIcon name="edit" color={'#aeaeae'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageEditButton, {left: 140}]}
          onPress={onPressRemoveImageButton}>
          <Trash name="trash" color={'#e33512'} size={30} />
        </TouchableOpacity>
        <Margin height={24} />
        <EditContent
          iconName={'person'}
          text={'이름'}
          content={'moko'}
          onPress={() => {
            const name = 'name';
            onPressEditProfileModal({name});
          }}
        />

        <Margin height={24} />
        <EditContent
          iconName={'at'}
          text={'이메일'}
          content={'asf@naver.com'}
          onPress={() => {
            const email = 'email';
            onPressEditProfileModal({email});
          }}
        />
      </View>
      <EditProfileModal isVisible={isVisible} setIsVisible={setIsVisible} />
      <EditEmailModal
        isVisible={isEditEmailModal}
        setIsVisible={setIsEditEmailModal}
      />
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
    backgroundColor: '#fff',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    marginTop: -100,
    borderWidth: 3,
    borderColor: Colors.main,
  },
  noImage: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    marginTop: -100,
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
  imageEditButton: {
    position: 'absolute',
    top: 50,
    backgroundColor: Colors.main,
    padding: 10,
    borderRadius: 50,
  },
});

export default EditProfile;
