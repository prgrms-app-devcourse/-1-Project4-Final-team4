import React from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Margin from '../components/Margin';
import EditIcon from 'react-native-vector-icons/MaterialIcons';

import {useState} from 'react';
import {useImagePikcer} from '../hook/use-image-picker';
import EditProfileModal from '../components/EditProfileModal';
import {SCREEN_HEIGHT, SCREEN_WIDTH, containerStyle} from '../utils/utils';
import BasicHeader from '../components/BasicHeader';
import {Colors} from '../utils/Colors';
import SubHeader from '../components/SubHeader';

export const profile_img = 150;

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
          <Text style={{fontSize: 40}}>moko</Text>
          <TouchableOpacity onPress={onPressEditProfileModal}>
            <EditIcon name="edit" color={'#aeaeae'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <EditProfileModal isVisible={isVisible} setIsVisible={setIsVisible} />
      <Margin height={20} />

      {/* 스케줄 관리 섹션 */}
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
});

export default EditProfile;
