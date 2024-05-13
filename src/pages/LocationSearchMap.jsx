import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
  Platform,
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
  const [topExpanded, setTopExpanded] = useState(false);
  const topModalHeight = useRef(new Animated.Value(0)).current;

  // 모달 높이 변화 함수
  const toggleTopHeight = () => {
    const newTopHeight = topExpanded ? 0 : 480;
    setTopExpanded(!topExpanded);
    Animated.timing(topModalHeight, {
      toValue: newTopHeight,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  // 상단 모달의 지역 검색 동작 함수
  const [selectedRegion, setSelectedRegion] = useState(null);

  const totalRegions = [
    {id: 1, name: '송파구', latitude: 37.5045, longitude: 127.1108},
    {id: 2, name: '강남구', latitude: 37.5172, longitude: 127.0473},
    {id: 3, name: '용산구', latitude: 37.5311, longitude: 126.978},
    {id: 4, name: '마포구', latitude: 37.5665, longitude: 126.9018},
    {id: 5, name: '중구', latitude: 37.5639, longitude: 126.9975},
    {id: 6, name: '종로구', latitude: 37.5724, longitude: 126.9846},
    {id: 7, name: '강서구', latitude: 37.5658, longitude: 126.8227},
    {id: 8, name: '서초구', latitude: 37.4839, longitude: 127.0326},
    {id: 9, name: '노원구', latitude: 37.6542, longitude: 127.0568},
  ];

  const handleRegionPress = totalregion => {
    setSelectedRegion(totalregion);
  };

  // 지역검색 버튼 출력 함수
  const renderRegionItem = ({item}) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleRegionPress(item)}>
      <Text style={styles.buttonText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // 하단 모달 동작 함수
  const [expanded, setExpanded] = useState(false);

  // 모달 높이 변화 함수
  const modalHeight = useRef(new Animated.Value(144)).current;

  const toggleHeight = () => {
    const newHeight = expanded ? 144 : 652;
    setExpanded(!expanded);
    Animated.timing(modalHeight, {
      toValue: newHeight,
      duration: 150,
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
          activeOpacity={1}
          style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={styles.LocationSelectText} onPress={toggleTopHeight}>
            지역 선택
          </Text>
          <Icon name={'keyboard-arrow-right'} size={25} />
        </TouchableOpacity>
      </View>
      {/* 상단 모달 부분 */}
      <Animated.View style={[styles.topModalWrapper, {height: topModalHeight}]}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          {/* 지역 검색 터치버튼 부분 */}
          <View style={{flex: 1, width: '100%', height: '100%'}}>
            <FlatList
              data={totalRegions}
              numColumns={3}
              renderItem={renderRegionItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.buttonContainer}
              onPress={toggleTopHeight}
            />
          </View>
          <TouchableOpacity
            style={{justifyContent: 'flex-end'}}
            onPress={toggleTopHeight}>
            <Icon name={'keyboard-arrow-up'} size={25} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* 맵 기능 함수 */}
      <View style={styles.mapContainer}>
        <MapView
          style={{width: '100%', height: '100%', top: 0}}
          provider={PROVIDER_GOOGLE}
          region={currentRegion || region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsPointsOfInterest={true}>
          {/* {currentRegion && (
            <Marker
              coordinate={{
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
              }}
              title={'현재 위치'}
              description={'현재 위치입니다.'}
            />
          )} */}
        </MapView>
      </View>
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
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  LocationSelectWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 53,
    paddingHorizontal: 21,
    backgroundColor: '#ffffff',
  },
  LocationSelectTitleText: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: 'PretendardBold',
  },
  LocationSelectText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Pretendard',
  },
  mapContainer: {
    width: windowWidth,
    height: windowHeight * 0.8,
  },
  // 상단 모달 스타일
  topModalWrapper: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  button: {
    margin: 5,
    height: 108,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'PretendardBold',
    color: 'black',
  },
  // 하단 모달 스타일
  bottomModalWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
