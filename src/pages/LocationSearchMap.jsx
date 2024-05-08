import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Modal,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {containerStyle} from '../utils/utils';
import React, {useState, useRef} from 'react';
import {Colors} from '../utils/Colors';
import BasicHeader from '../components/BasicHeader';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

const dummyData = [
  {
    title: '산으로 간 고등어',
    content1: '경기도 용인시 수지구 고기로 23+',
    category: '음식점',
    img: 'https://source.unsplash.com/random.jpg​',
  },
  {
    title: '산으로 간 연어',
    content1: '경기도 용인시 수지구 고기로 23+',
    category: '음식점',
    img: 'https://source.unsplash.com/random.jpg​',
  },
  {
    title: '산으로 간 삼치',
    content1: '경기도 용인시 수지구 고기로 23+',
    category: '음식점',
    img: 'https://source.unsplash.com/random.jpg​',
  },
];

const LocationSearchMap = ({navigation}) => {
  // 하단 모달 동작 함수
  const [expanded, setExpanded] = useState(false); // 터치 시 높이가 변경될지 여부를 결정하기 위한 상태

  const modalHeight = useRef(new Animated.Value(144)).current;

  const toggleHeight = () => {
    const newHeight = expanded ? 144 : 652;
    setExpanded(!expanded);
    Animated.timing(modalHeight, {
      toValue: newHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={containerStyle}>
      {/* 헤더 부분 */}
      <BasicHeader isBackButton={true} />
      <View style={styles.LocationSelectWrapper}>
        <Text style={styles.LocationSelectTitleText}>지역별 검색</Text>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={styles.LocationSelectText}>지역 선택</Text>
          <Icon name={'keyboard-arrow-right'} size={25} />
        </TouchableOpacity>
      </View>
      {/* 상단 모달 부분 */}

      {/* 맵 기능 함수 */}
      <View style={styles.mapContainer}>
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.541,
            longitude: 126.986,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        {/* 맵 마커 기능 함수 */}
        <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="this is a marker"
          description="this is a marker example"
        />
        {/* 하단 모달 부분 */}
        <View style={styles.bottomModalWrapper}>
          <Animated.View style={{height: modalHeight}}>
            <TouchableOpacity activeOpacity={1} onPress={toggleHeight}>
              <View style={{alignItems: 'center'}}>
                <Icon name={'keyboard-arrow-up'} size={25} />
              </View>

              <Text style={styles.bottomModalText}>서울시 논현동</Text>
            </TouchableOpacity>
            <FlatList
              data={dummyData}
              renderItem={data => {
                return (
                  <View style={styles.bottomModalContentWrapper}>
                    <Image
                      style={{
                        width: 69,
                        height: 69,
                        borderRadius: 30,
                        marginBottom: 36,
                      }}
                      src={data.item.img}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        marginLeft: 24,
                        gap: 9,
                      }}>
                      <Text style={{fontSize: 15, color: 'black'}}>
                        {data.item.title}
                      </Text>
                      <Text
                        style={{
                          marginRight: 43,
                          fontSize: 12,
                          color: 'black',
                        }}>
                        {data.item.content1}
                      </Text>
                    </View>
                    <Text style={{fontSize: 15, color: 'black'}}>
                      {data.item.category}
                    </Text>
                  </View>
                );
              }}
            />
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LocationSelectWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 390,
    height: 53,
    marginLeft: 21,
  },
  LocationSelectTitleText: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: 'PretendardBold',
  },
  LocationSelectText: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: 'Pretendard',
  },
  mapContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  // 하단 모달 스타일
  bottomModalWrapper: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  bottomModalContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 35,
  },
  bottomModalText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Pretendard',
    marginLeft: 17,
    marginBottom: 23,
  },
});

export default LocationSearchMap;
