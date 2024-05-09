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
  PermissionsAndroid,
} from 'react-native';
import {containerStyle} from '../utils/utils';
import React, {useState, useRef, useEffect} from 'react';
import {Colors} from '../utils/Colors';
import BasicHeader from '../components/BasicHeader';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';

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
  {
    title: '산으로 간 삼치',
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
  {
    title: '산으로 간 삼치',
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
  const [currentRegion, setcurrentRegion] = useState({
    latitude: 37.5662952,
    longitude: 126.9779451,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // 초기 위치 서울시청
  const [region, setRegion] = useState({
    latitude: 37.5662952,
    longitude: 126.9779451,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  console.log(currentRegion);

  // 현재 위치 권한 요청
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    } else {
      Geolocation.requestAuthorization();
    }
  }, []);

  useEffect(() => {
    // 현재 위치 가져오기
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setcurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);
  // 상단 모달 동작 함수

  // 하단 모달 동작 함수
  const [expanded, setExpanded] = useState(false);

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
          region={region}
          showsUserLocation={true}
          zoomControlEnabled={true}
          showsCompass={true}
          showsMyLocationButton={true}
          showsPointsOfInterest={true}
        />
        {/* 맵 마커 기능 함수 */}
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
          title={'현재 위치'}
          description={'현재 위치입니다.'}
        />
        {/* 하단 모달 부분 */}
        <View style={styles.bottomModalWrapper}>
          <Animated.View style={{height: modalHeight}}>
            <TouchableOpacity activeOpacity={1} onPress={toggleHeight}>
              <View style={{alignItems: 'center'}}>
                {/* 하단 모달 아이콘 변화 기능 함수 */}
                {expanded ? (
                  <Icon name={'keyboard-arrow-down'} size={25} />
                ) : (
                  <Icon name={'keyboard-arrow-up'} size={25} />
                )}
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
