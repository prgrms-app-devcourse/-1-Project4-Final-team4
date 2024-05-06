import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import Margin from '../components/Margin';
import {useImagePikcer} from '../hook/use-image-picker';
import {containerStyle} from '../utils/utils';
import BasicHeader from '../components/BasicHeader';
import EditIcon from 'react-native-vector-icons/MaterialIcons';

const MyPage = ({navigation}) => {
  const {image, setImage, init} = useImagePikcer();

  // useEffect(() => {
  //   // init();
  // }, []);

  return (
    <SafeAreaView style={[containerStyle, {alignItems: 'center'}]}>
      {/* 헤더 */}
      <BasicHeader
        isBackButton={true}
        title={'마이페이지'}
        rightIconName={'settings'}
      />

      <Margin height={20} />

      {/* 프로필 섹션 */}
      <View style={styles.profile}>
        <Image source={image?.uri} style={styles.image} />
        <View style={{flex: 1}}>
          <Text>moko</Text>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 4}}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={{color: Colors.grey}}>내 정보 수정</Text>
            <EditIcon name="edit" color={'#aeaeae'} size={14} />
          </TouchableOpacity>
        </View>
      </View>

      <Margin height={20} />
      {/* 포인트 섹션 */}
      <View style={styles.point}>
        <Text>포인트</Text>
        <Text style={{fontSize: 20}}>0P</Text>
      </View>

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
    backgroundColor: Colors.mint,
    width: 350,
    height: 100,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: Colors.grey,
  },
  point: {
    borderRadius: 8,
    backgroundColor: Colors.mint,
    width: 350,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
});

export default MyPage;
