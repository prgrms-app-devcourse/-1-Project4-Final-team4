import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import {containerStyle} from '../utils/utils';
import React, {useState, useEffect} from 'react';
import {Colors} from '../utils/Colors';
import BasicHeader from '../components/BasicHeader';
import {getMovie, getMoviePoster} from '../apis/movie';
import {getShow} from '../apis/show';
import {getPlace} from '../apis/place';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomCarousel from '../components/CustomCarousel';

const ThemeSearch = ({navigation}) => {
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
    {label: '육상레포츠', value: 'A03 A0302'},
    {label: '수상레포츠', value: 'A03 A0303'},
    {label: '복합레포츠', value: 'A03 A0305'},
  ]);

  const [movieContentList, setMovieContentList] = useState([]);
  const [showContentList, setShowContentList] = useState([]);
  const [themeContentList, setThemeContentList] = useState([]);

  // 영화 버튼 선택 시 carousel 없어지고 영화 view 출력
  const [movieToggle, setMovieToggle] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    fetchPlaceData();
    fetchMovieData();
    fetchShowData();
  }, []);

  // 테마 호출 API
  const fetchPlaceData = async valueArray => {
    try {
      const res = await getPlace(valueArray);
      if (res) {
        setThemeContentList(res.response.body.items.item);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 영화 호출 API
  const fetchMovieData = async () => {
    try {
      const res = await getMovie();
      if (res) {
        setMovieContentList(res.boxOfficeResult.dailyBoxOfficeList);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 연극 호출 API
  const fetchShowData = async () => {
    try {
      const res = await getShow();
      setShowContentList(res.boxofs.boxof);
      return;
    } catch (e) {
      console.error(e);
    }
  };

  const handleFoodValueChange = itemValue => {
    setMovieToggle(false);
    setShowToggle(false);
    const valueArray = itemValue.split(' ');
    fetchPlaceData(valueArray);
    setFoodValue(itemValue);
  };

  const handlePlayValueChange = itemValue => {
    setMovieToggle(false);
    setShowToggle(false);
    const valueArray = itemValue.split(' ');
    fetchPlaceData(valueArray);
    setPlayValue(itemValue);
  };

  const navigateDetail = (item, type) => {
    navigation.navigate('ContentDetail', {item, type});
  };

  // 타입, content 타입을 줘서 movie냐 place냐에 따라 다른 결과 수행
  // 장소 flatlist render
  const placeRenderItems = ({item, index}) => {
    const backgroundImage = item.firstimage
      ? {uri: item.firstimage}
      : require('../assets/images/placeholder.jpg');
    return (
      <TouchableOpacity onPress={() => navigateDetail(item, 'place')}>
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

  // 영화 flatlist render
  const renderMovieItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.flatWrapper}
        onPress={() => navigateDetail(item, 'movie')}>
        <View style={styles.flatItemContentWrapper}>
          <Text style={styles.flatTitle}>{item.movieNm}</Text>
          <Text style={styles.flatContent}>누적관객수 : {item.audiAcc}명</Text>
          <Text style={styles.flatContent}>{item.rank}등</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // 공연 flatlist render
  const renderShowItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.flatWrapper}
        onPress={() => navigateDetail(item, 'show')}>
        <Image
          source={{uri: 'http://www.kopis.or.kr' + item.poster}}
          style={{width: 150, height: 200}}
        />
        <View style={styles.flatItemContentWrapper}>
          <Text style={styles.flatTitle}>{item.prfnm}</Text>
          <Text style={styles.flatContent}>{item.prfplcnm}</Text>
          <Text style={styles.flatContent}>{item.prfpd[0]}</Text>
        </View>
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
        <TouchableOpacity
          style={styles.btnContent}
          onPress={() => {
            setMovieToggle(true);
            setShowToggle(false);
          }}>
          <Text style={styles.btnText}>영화</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContent}
          onPress={() => {
            setShowToggle(true);
            setMovieToggle(false);
          }}>
          <Text style={styles.btnText}>콘서트</Text>
        </TouchableOpacity>
      </View>
      {movieToggle ? (
        <View>
          <Text style={styles.listTitle}>영화 목록</Text>
          <FlatList
            keyExtractor={item => item.id}
            data={movieContentList}
            renderItem={renderMovieItem}
            style={{height: '65%'}}
          />
        </View>
      ) : showToggle ? (
        <View>
          <Text style={styles.listTitle}>콘서트 목록</Text>
          <FlatList
            keyExtractor={item => item.id}
            data={showContentList}
            renderItem={renderShowItem}
            style={{height: '65%'}}
          />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.placeMainContainer}>
            <Text style={styles.placeMainTitle}>앱에서 추천하는 명소</Text>
            <CustomCarousel
              data={themeContentList}
              renderItem={placeRenderItems}
            />
          </View>
          <View style={styles.placeMainContainer}>
            <Text style={styles.placeMainTitle}>사용자가 추천하는 명소</Text>
            <CustomCarousel
              data={themeContentList}
              renderItem={placeRenderItems}
            />
          </View>
          <View style={{height: 100}} />
        </ScrollView>
      )}
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
    opacity: 0.8,
    borderRadius: 8,
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
  listTitle: {
    fontSize: 18,
    fontFamily: 'PretendardBold',
    margin: 16,
  },
  flatWrapper: {
    padding: 16,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: Colors.black,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: Colors.white,
  },
  flatItemContentWrapper: {
    flex: 1,
    paddingLeft: 16,
    rowGap: 4,
    justifyContent: 'center',
  },
  flatTitle: {
    fontSize: 16,
    fontFamily: 'PretendardBold',
  },
  flatContent: {
    fontSize: 14,
    fontFamily: 'Pretendard',
    paddingBottom: 8,
  },
});

export default ThemeSearch;
