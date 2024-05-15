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
  Platform,
} from 'react-native';
import {containerStyle} from '../utils/utils';
import React, {useState, useRef, useEffect} from 'react';
import {Colors} from '../utils/Colors';
import BasicHeader from '../components/BasicHeader';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import {getLocation} from '../apis/place.js';
import {getLocationContent} from '../apis/location.js';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../utils/utils';

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

  const [locationContentList, setLocationContentList] = useState([]);
  const [locationName, setLocationName] = useState();

  useEffect(() => {
    fetchLocationContent(currentRegion.longitude, currentRegion.latitude);
  }, [currentRegion]);

  const fetchLocationContent = async (longitudeApi, latitudeApi) => {
    try {
      const res = await getLocationContent(longitudeApi, latitudeApi);
      if (res) {
        setLocationContentList(res.response.body.items.item);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

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
    const newTopHeight = topExpanded ? 0 : 350;
    setTopExpanded(!topExpanded);
    Animated.timing(topModalHeight, {
      toValue: newTopHeight,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  // 상단 모달의 지역 검색 동작 함수

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationPress = region => {
    setSelectedLocation(region);
    setLocationName(region.name);
    fetchLocationContent(
      region.coordinates.longitude,
      region.coordinates.latitude,
    );
    // 상단 모달 접기
    toggleTopHeight();
  };

  const totalRegions = [
    {
      id: 1,
      name: '송파',
      coordinates: {latitude: 37.5045, longitude: 127.1108},
    },
    {
      id: 2,
      name: '강남',
      coordinates: {latitude: 37.5172, longitude: 127.0473},
    },
    {
      id: 3,
      name: '용산',
      coordinates: {latitude: 37.5311, longitude: 126.978},
    },
    {
      id: 4,
      name: '마포',
      coordinates: {latitude: 37.5665, longitude: 126.9018},
    },
    {
      id: 5,
      name: '중구',
      coordinates: {latitude: 37.5639, longitude: 126.9975},
    },
    {
      id: 6,
      name: '종로',
      coordinates: {latitude: 37.5724, longitude: 126.9846},
    },
    {
      id: 7,
      name: '강서',
      coordinates: {latitude: 37.5658, longitude: 126.8227},
    },
    {
      id: 8,
      name: '서초',
      coordinates: {latitude: 37.4839, longitude: 127.0326},
    },
    {
      id: 9,
      name: '노원',
      coordinates: {latitude: 37.6542, longitude: 127.0568},
    },
  ];

  const navigateDetail = (item, type) => {
    navigation.navigate('ContentDetail', {item, type});
  };

  // 지역검색 버튼 출력 함수
  const renderRegionItem = ({item}) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleLocationPress(item)}>
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

  /* 변형 한 후 사용 */
  const locationRenderItems = ({item, index}) => {
    const backgroundImage = item.firstimage
      ? {uri: item.firstimage}
      : require('../assets/images/placeholder.jpg');
    return (
      <TouchableOpacity onPress={() => navigateDetail(item, 'place')}>
        <View style={styles.itemWrapper}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={backgroundImage} style={styles.imgWrapper} />
            <View style={styles.contentWrapper}>
              <Text style={{fontSize: 15, color: 'black'}}>{item.title}</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.black,
                }}>
                {item.addr1}
              </Text>
            </View>
          </View>
          <Text style={styles.categoryText}>
            {item.contenttypeid === '39' ? '음식점' : '즐길 거리'}
          </Text>
        </View>
      </TouchableOpacity>
    );
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
          style={{width: '100%', height: '100%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={currentRegion}
          region={
            selectedLocation
              ? {
                  ...currentRegion,
                  latitude: selectedLocation.coordinates.latitude,
                  longitude: selectedLocation.coordinates.longitude,
                }
              : currentRegion
          }
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsPointsOfInterest={true}>
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation.coordinates}
              title={'현재 위치'}
              description={'현재 위치입니다.'}
            />
          )}
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

            <Text style={styles.bottomModalText}>
              {locationName
                ? `서울특별시 ${locationName}구`
                : '서울특별시 송파구'}
            </Text>
          </TouchableOpacity>
          {/* 하단 출력 시 사용 */}
          <View>
            <FlatList
              keyExtractor={item => item.id}
              data={locationContentList}
              renderItem={locationRenderItems}
            />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LocationSelectWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 53,
    paddingHorizontal: 21,
    backgroundColor: Colors.white,
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
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.8,
  },
  // 상단 모달 스타일
  topModalWrapper: {
    width: '100%',
    backgroundColor: Colors.white,
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
    color: Colors.black,
  },
  // 하단 모달 스타일
  bottomModalWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomModalText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Pretendard',
    marginLeft: 17,
    marginBottom: 23,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 35,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  imgWrapper: {
    width: 70,
    height: 70,
    borderRadius: 30,
  },
  contentWrapper: {
    flexDirection: 'column',
    marginLeft: 24,
    gap: 8,
  },
  categoryText: {
    fontSize: 15,
    color: Colors.black,
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default LocationSearchMap;
