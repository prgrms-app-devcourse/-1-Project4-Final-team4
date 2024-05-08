import {
  Button,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {containerStyle} from '../utils/utils';
import React, {useState, useEffect} from 'react';
import {Colors} from '../utils/Colors';
import BasicHeader from '../components/BasicHeader';
import MainHeader from '../components/MainHeader';
import {getMovie} from '../apis/movie';
import {getShow} from '../apis/show';
import {getLocation, getPlace} from '../apis/place';
import DropDownPicker from 'react-native-dropdown-picker';
import Carousel from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;

const ThemeSearch = () => {
  const [foodOpen, setFoodOpen] = useState(false);
  const [foodValue, setFoodValue] = useState(null);
  const [foodItems, setFoodItems] = useState([
    {label: '한식', value: 'A05 A0502 A05020100'},
    {label: '양식', value: 'A05 A0502 A05020200'},
    {label: '일식', value: 'A05 A0502 A05020300'},
    {label: '중식', value: 'A05 A0502 A05020400'},
    {label: '카페/전통찻집', value: 'A05 A0502 A05020900'},
  ]);

  const [playOpen, setPlayOpen] = useState(false);
  const [playValue, setPlayValue] = useState(null);
  const [playItems, setPlayItems] = useState([
    {label: '자연관광', value: 'A01 A0101'},
    {label: '문화시설', value: 'A02 A0206'},
    {label: '수상레포츠', value: 'A03 A0303'},
    {label: '복합레포츠', value: 'A03 A0305'},
  ]);

  const [contentList, setContentList] = useState([]);
  const [contentList1, setContentList1] = useState([]);
  const [contentList2, setContentList2] = useState([]);
  const [themeContentList, setThemeContentList] = useState([]);

  // 테마 호출 API
  useEffect(() => {
    fetchPlaceData();
  }, []);

  const fetchPlaceData = async valueArray => {
    try {
      const res = await getPlace(valueArray);
      if (res) {
        setThemeContentList(res.response.body.items.item);
        // console.log('Place : ', res.response.body.items.item);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFoodValueChange = itemValue => {
    const valueArray = itemValue.split(' ');
    fetchPlaceData(valueArray);
    setFoodValue(itemValue);
  };

  const handlePlayValueChange = itemValue => {
    const valueArray = itemValue.split(' ');
    fetchPlaceData(valueArray);
    setPlayValue(itemValue);
  };

  // 지역 호출 API
  useEffect(() => {
    fetchLocationData();
  }, []);

  const fetchLocationData = async () => {
    try {
      const res = await getLocation();
      if (res) {
        setContentList(res.response.body.items.item);
        // console.log('Location : ', res.response.body.items.item);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 영화 호출 API
  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    try {
      const res = await getMovie();
      if (res) {
        setContentList1(res.boxOfficeResult.dailyBoxOfficeList);
        console.log('Movie : ', res.boxOfficeResult.dailyBoxOfficeList);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 연극 호출 API
  useEffect(() => {
    fetchShowData();
  }, []);

  const fetchShowData = async () => {
    try {
      const res = await getShow();
      setContentList2(res);
      console.log('show : ', res);
      return;
    } catch (e) {
      console.error(e);
    }
  };

  // const handleButton = () => {
  //   console.log('Movie : ', contentList1);
  // };
  // const handleButton2 = () => {
  //   console.log('Show : ', contentList2);
  // };

  const placeRenderItems = ({item, index}) => {
    const backgroundImage = item.firstimage
      ? {uri: item.firstimage}
      : require('../assets/images/placeholder.jpg');
    return (
      // <TouchableOpacity onPress={() => navigation.navigate(item.navigateRoute)}>
      <TouchableOpacity>
        <ImageBackground
          source={backgroundImage}
          style={{width: 260, height: 264}}
          imageStyle={{borderRadius: 8}}>
          <View style={styles.placeContentContainer}>
            <Text style={styles.placeTitle}>{item.title}</Text>
            <Text style={styles.placeContent}>{item.addr1}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={containerStyle}>
      <BasicHeader
        isBackButton={true}
        title={'장르별 검색'}
        rightIconName={'settings'}
      />
      <View
        style={[
          styles.themeDropDownContainer,
          {minHeight: foodOpen || playOpen ? 250 : 0},
        ]}>
        <View style={{flex: 1}}>
          <DropDownPicker
            open={foodOpen}
            value={foodValue}
            items={foodItems}
            setOpen={value => {
              if (value && playOpen) {
                setPlayOpen(false);
              }
              setFoodOpen(value);
            }}
            setValue={setFoodValue}
            setItems={setFoodItems}
            placeholder="맛집"
            placeholderStyle={{
              color: Colors.white,
            }}
            style={styles.dropDownPickerStyle}
            labelStyle={{
              color: Colors.white,
            }}
            containerStyle={{borderColor: Colors.white}}
            dropDownContainerStyle={{borderColor: Colors.white}}
            arrowIconStyle={{
              tintColor: Colors.white,
            }}
            onChangeValue={handleFoodValueChange}
          />
        </View>
        <View style={{flex: 1}}>
          <DropDownPicker
            open={playOpen}
            value={playValue}
            items={playItems}
            setOpen={value => {
              if (value && foodOpen) {
                setFoodOpen(false);
              }
              setPlayOpen(value);
            }}
            setValue={setPlayValue}
            setItems={setPlayItems}
            placeholder="즐길 거리"
            placeholderStyle={{
              color: Colors.white,
            }}
            style={styles.dropDownPickerStyle}
            labelStyle={{
              color: Colors.white,
            }}
            containerStyle={{borderColor: Colors.white}}
            dropDownContainerStyle={{borderColor: Colors.white}}
            arrowIconStyle={{
              tintColor: Colors.white,
            }}
            onChangeValue={handlePlayValueChange}
          />
        </View>
      </View>
      <View style={styles.themeBtnContainer}>
        {/* <TouchableOpacity style={styles.btnContent} onPress={() => setMovieToggle(true)}> */}
        <TouchableOpacity style={styles.btnContent}>
          <Text style={styles.btnText}>영화</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContent}>
          <Text style={styles.btnText}>콘서트</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.placeMainContainer}>
          <Text style={styles.placeMainTitle}>앱에서 추천하는 명소</Text>
          <Carousel
            data={themeContentList}
            renderItem={placeRenderItems}
            sliderWidth={windowWidth - 56}
            itemWidth={260}
            contentContainerCustomStyle={{alignItems: 'flex-start'}}
            activeSlideAlignment={'start'}
            enableSnap={true}
          />
        </View>
        <View style={styles.placeMainContainer}>
          <Text style={styles.placeMainTitle}>앱에서 추천하는 명소</Text>
          <Carousel
            data={themeContentList}
            renderItem={placeRenderItems}
            sliderWidth={windowWidth - 56}
            itemWidth={260}
            contentContainerCustomStyle={{alignItems: 'flex-start'}}
            activeSlideAlignment={'start'}
            enableSnap={true}
          />
        </View>

        {/* <Button
          style={{
            position: 'absolute',
            top: 200,
            marginVertical: 'auto',
            fontSize: 50,
            marginTop: 20,
            fontFamily: 'Pretendard-Bold',
            color: 'white',
          }}
          onPress={handleButton}
          title="영화"
        />
        <Button
          style={{
            position: 'absolute',
            top: 300,
            marginVertical: 'auto',
            fontSize: 50,
            marginTop: 20,
            fontFamily: 'Pretendard-Bold',
            color: 'white',
          }}
          onPress={handleButton2}
          title="연극"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  themeDropDownContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
    columnGap: 16,
    paddingHorizontal: 16,
    elevation: 100,
    zIndex: 1000,
  },
  themeBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    columnGap: 16,
  },
  dropDownPickerStyle: {
    backgroundColor: Colors.main,
    borderColor: Colors.white,
    color: Colors.white,
    minHeight: 48,
  },
  btnContent: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: Colors.main,
    width: '40%',
    marginVertical: 8,
    height: 46,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    color: Colors.white,
  },
  placeMainContainer: {
    padding: 16,
    borderRadius: 8,
  },
  placeMainTitle: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'PretendardBold',
    marginBottom: 12,
  },
  placeContentContainer: {
    position: 'absolute',
    bottom: 16,
    marginHorizontal: 12,
    backgroundColor: '#313131',
    padding: 4,
  },
  placeTitle: {
    color: Colors.white,
    fontFamily: 'PretendardBold',
    fontSize: 16,
  },
  placeContent: {
    color: Colors.white,
    fontFamily: 'Pretendard',
    fontSize: 14,
  },
});

export default ThemeSearch;
