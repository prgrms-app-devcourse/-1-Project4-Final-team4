import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../utils/Colors';
import Margin from '../components/Margin';
import {useImagePikcer} from '../hook/use-image-picker';
import {containerStyle, shadow} from '../utils/utils';
import BasicHeader from '../components/BasicHeader';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import {profile_img} from './EditProfile';
import SubHeader from '../components/SubHeader';

const ContentsBox = ({content, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: 100,
          height: 100,
          backgroundColor: Colors.background,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          margin: 12,
        },
        shadow,
      ]}>
      <Text>{content}</Text>
    </TouchableOpacity>
  );
};

const MyPage = ({navigation}) => {
  const {image, setImage, init} = useImagePikcer();

  // useEffect(() => {
  //   init();
  // }, []);
  return (
    <SafeAreaView style={[containerStyle, {alignItems: 'center'}]}>
      {/* 헤더 */}
      <SubHeader title={'마이페이지'} />

      <Margin height={40} />

      {/* 프로필 섹션 */}
      <View
        style={[
          {
            width: 350,
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
        {image ? (
          <Image source={image} style={[styles.image]} />
        ) : (
          <View style={styles.noImage}>
            <Text>no image.</Text>
          </View>
        )}

        <View style={{flexDirection: 'row', gap: 4}}>
          <Text style={{fontSize: 24, color: Colors.black, fontWeight: 700}}>
            moko
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <EditIcon name="edit" color={'#aeaeae'} size={14} />
          </TouchableOpacity>
        </View>
      </View>

      <Margin height={20} />
      {/* 컨텐츠 섹션
       * @todo - 텍스트를 이미지로 넣어야함.
       *       - 로그아웃 파이어베이스와 연동
       */}
      <View style={{flexDirection: 'row'}}>
        <ContentsBox content={'돌림판'} />
        <ContentsBox content={'N빵'} />
        <ContentsBox content={'가계부'} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <ContentsBox />
        <ContentsBox />
        <ContentsBox />
      </View>
      <View style={{flexDirection: 'row'}}>
        <ContentsBox />
        <ContentsBox />
        <ContentsBox content={'로그아웃'} />
      </View>
      <Margin height={20} />

      <TouchableOpacity 
        style={styles.box}
        onPress={() => navigation.navigate('LoginTab')}
      >
        <Text style={{fontSize: 20}}>로그아웃</Text>
      </TouchableOpacity>

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
  point: {},
  box: {},
});

export default MyPage;
