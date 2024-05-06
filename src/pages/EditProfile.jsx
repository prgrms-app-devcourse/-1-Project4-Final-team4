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
import {containerStyle} from '../utils/utils';
import BasicHeader from '../components/BasicHeader';

const profile_img = 150;

const EditProfile = ({navigation}) => {
  const {pickImage, image} = useImagePikcer();

  const [isVisible, setIsVisible] = useState(false);

  const onPressOpenAlbum = () => {
    pickImage();
  };
  const onPressEditProfileModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SafeAreaView style={containerStyle}>
      {/* 헤더 */}
      <BasicHeader
        isBackButton={true}
        title={'프로필 설정'}
        rightIconName={'settings'}
      />

      <Margin height={20} />

      {/* 프로필 섹션 */}
      <View style={styles.profile}>
        <Image source={image} style={styles.image} />
        <Button title="앨범 열기" onPress={onPressOpenAlbum} />
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
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: profile_img,
    height: profile_img,
    borderRadius: profile_img / 2,
    backgroundColor: '#423549',
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'center',
  },
});

export default EditProfile;
