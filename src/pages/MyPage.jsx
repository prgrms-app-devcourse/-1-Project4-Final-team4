import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../utils/Colors';
import Margin from '../components/Margin';
import {useImagePikcer} from '../hook/use-image-picker';
import {SCREEN_WIDTH, containerStyle, shadow} from '../utils/utils';
import SubHeader from '../components/SubHeader';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import {FIREBASE_AUTH} from '../firebase/firebase';
import {getImageFromStorage} from '../firebase/storage';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ArrowRight from 'react-native-vector-icons/Entypo';

const ContentsBox = ({onPress, iconName, text, fontAwesome6}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: SCREEN_WIDTH - 40,
          paddingHorizontal: 16,
          paddingVertical: 20,
          backgroundColor: Colors.background,
          borderRadius: 12,
        },
        shadow,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingHorizontal: 8,
        }}>
        {fontAwesome6 ? (
          <FontAwesome6 name={iconName} size={30} />
        ) : (
          <AntDesign name={iconName} size={30} />
        )}
        <Text style={{fontSize: 18}}>{text}</Text>
      </View>
      <View>
        <ArrowRight name="chevron-right" size={30} />
      </View>
    </TouchableOpacity>
  );
};

const MyPage = ({navigation}) => {
  const {image, setImage, init} = useImagePikcer();
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const url = await getImageFromStorage(user.email);
          setProfileImageUrl(url);
          console.log('Profile image URL:', url);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, []);

  const moveToEditPage = () => navigation.navigate('EditProfile');
  const onPressCalculator = () => {
    // 더치페이 계산기로 기동
    //navigation.navigate('');
  };
  const onPressAccountBook = () => {
    // 가계부로 기동
    //navigation.navigate('');
  };
  return (
    <SafeAreaView style={[containerStyle, {alignItems: 'center'}]}>
      {/* 헤더 */}
      <SubHeader title={'마이페이지'} />
      <Margin height={40} />

      {/* 프로필 섹션 */}
      <View
        style={[
          {
            width: SCREEN_WIDTH - 40,
            height: 150,
            backgroundColor: Colors.background,
            borderRadius: 8,
            padding: 20,
            flexDirection: 'row',
            gap: 20,
          },
          shadow,
        ]}>
        {/* 재접을 해야만 반영이 됨 */}
        {profileImageUrl ? (
          <Image source={{uri: profileImageUrl}} style={styles.image} />
        ) : (
          <View style={styles.noImage}>
            <Text>no image.</Text>
          </View>
        )}

        <View style={{gap: 4}}>
          <Text
            style={{
              fontSize: 24,
              color: Colors.black,
              fontFamily: 'PretendardBold',
            }}>
            moko
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={moveToEditPage}>
            <Text>정보 관리</Text>
            <EditIcon name="edit" color={'#aeaeae'} size={14} />
          </TouchableOpacity>
        </View>
      </View>

      <Margin height={20} />
      {/* 컨텐츠 섹션 */}
      <ContentsBox
        iconName={'calculator'}
        onPress={onPressCalculator}
        text={'더치페이'}
      />
      <Margin height={20} />

      <ContentsBox
        iconName={'book'}
        onPress={onPressAccountBook}
        text={'가계부'}
      />
      <Margin height={20} />
      <ContentsBox
        fontAwesome6={true}
        iconName={'gamepad'}
        onPress={onPressAccountBook}
        text={'돌림판'}
      />
      <Margin height={20} />
      <ContentsBox
        fontAwesome6={false}
        iconName={'logout'}
        onPress={() => navigation.navigate('LoginTab')}
        text={'로그아웃'}
      />

      {/* 스케줄 관리 섹션 */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profile: {},
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
});

export default MyPage;
