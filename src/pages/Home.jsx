import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  View,
} from 'react-native';
import MainHeader from '../components/MainHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BubbleIcon from 'react-native-vector-icons/SimpleLineIcons';
import CategoryButton from '../components/CategoryButton';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

import reviewFrame from '../assets/images/reviewFrame.png';

import {Dimensions} from 'react-native';
import {Colors} from '../utils/Colors.js';
import CustomCarousel from '../components/CustomCarousel';
import {getPlace} from '../apis/place';
import {getMovie} from '../apis/movie';
const windowWidth = Dimensions.get('window').width;

const tempData = [
  {
    title: '존윅 4',
    content1: '키아누 리브스의 건액션',
    content2: '인당 1발 이상씩 쏴드립니다!',
    navigateRoute: 'Article',
    img: require('../assets/images/johnWick.png'),
  },
  {
    title: '쉬어매드니스',
    content1: '아 이연극 진짜 재밌는데...',
    content2: '오늘은 내가 코난?!',
    navigateRoute: 'Article',
    img: require('../assets/images/madness.png'),
  },
];

const Home = ({navigation}) => {
  //아티클 콘텐츠 렌더
  const articleRenderItems = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate(item.navigateRoute)}>
        <View>
          <Image
            source={item.img}
            style={{width: 234, height: 234, borderRadius: 16}}
          />
        </View>
        <View style={styles.itemContentContainer}>
          <View>
            <Text style={styles.itemContent}>{item.content1}</Text>
            <Text style={styles.itemContent}>{item.content2}</Text>
          </View>
          <BubbleIcon name={'bubble'} size={30} />
        </View>
      </TouchableOpacity>
    );
  };

  //추천 명소 렌더
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

  //추천 영화 렌더
  const movieRenderItems = ({item}) => (
    <TouchableOpacity style={styles.flatWrapper}>
      <View style={styles.flatItemContentWrapper}>
        <Text style={styles.flatTitle}>{item.movieNm}</Text>
        <Text style={styles.flatContent}>누적관객수 : {item.audiAcc}명</Text>
        <Text style={styles.flatContent}>{item.rank}등</Text>
      </View>
    </TouchableOpacity>
  );

  const [recommandContentList, setRecommandContentList] = useState([]);
  const [foodContentList, setFoodContentList] = useState([]);
  const [movieContentList, setMovieContentList] = useState([]);

  useEffect(() => {
    fetchPlaceData();
    fetchFoodData();
    fetchMovieData();
  }, []);

  // 테마 호출 API
  const fetchPlaceData = async valueArray => {
    try {
      const res = await getPlace(valueArray);
      if (res) {
        setRecommandContentList(res.response.body.items.item);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 음식 호출 API
  const fetchFoodData = async () => {
    try {
      const valueArray = ['A05', 'A0502'];
      const res = await getPlace(valueArray);
      if (res) {
        setFoodContentList(res.response.body.items.item);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

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

  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: Colors.background}}>
        <MainHeader />
        <View style={styles.contentWrapper}>
          <View style={styles.category}>
            <Text style={styles.titleText}>카테고리 검색</Text>
            <View style={styles.btnWrapper}>
              <CategoryButton
                title={'지역으로 검색!'}
                content={'서울 찍고 경기 찍고 고고싱'}
                search={'LocationSearchMap'}
              />
              <CategoryButton
                title={'장르별 검색!'}
                content={'영화, 뮤지컬, 콘서트, 연극까지!'}
                search={'ThemeSearch'}
              />
            </View>
          </View>
          <View style={styles.recContainer}>
            <Text style={styles.titleText}>오늘의 추천 콘텐츠!</Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('LocationSearch')}>
              <Text style={styles.recTitle}>전체보기</Text>
              <Icon name={'keyboard-arrow-right'} size={13} />
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft: 16}}>
            <Carousel
              data={tempData}
              renderItem={articleRenderItems}
              sliderWidth={windowWidth}
              itemWidth={260}
              activeSlideAlignment={'start'}
            />
          </View>
          <View style={styles.placeMainContainer}>
            <Text style={styles.placeMainTitle}>앱에서 추천하는 명소</Text>
            <CustomCarousel
              data={recommandContentList}
              renderItem={placeRenderItems}
            />
          </View>
          <View style={styles.placeMainContainer}>
            <Text style={styles.placeMainTitle}>사용자가 추천하는 명소</Text>
            <CustomCarousel
              data={recommandContentList}
              renderItem={placeRenderItems}
            />
          </View>
          <View style={styles.placeMainContainer}>
            <Text style={styles.placeMainTitle}>맛집 추천</Text>
            <CustomCarousel
              data={foodContentList}
              renderItem={placeRenderItems}
            />
          </View>
          <View style={styles.placeMainContainer}>
            <Text style={styles.placeMainTitle}>영화 추천</Text>
            <CustomCarousel
              data={movieContentList}
              renderItem={movieRenderItems}
            />
          </View>
          <TouchableOpacity
            style={{paddingBottom: 64}}
            onPress={() => navigation.navigate('Community')}>
            <Image
              source={reviewFrame}
              style={{width: windowWidth}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  category: {
    marginHorizontal: 28,
    rowGap: 20,
  },
  titleText: {
    color: Colors.black,
    fontFamily: 'PretendardBold',
    fontSize: 20,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
  },
  btnWrapper: {
    rowGap: 12,
  },
  recContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 28,
  },
  recdTitle: {
    color: Colors.gray,
    fontFamily: 'Pretendard',
    fontSize: 13,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    alignItems: 'center',
    paddingTop: 16,
  },
  itemContent: {
    color: Colors.black,
    fontFamily: 'Pretendard',
    fontSize: 16,
  },
  itemContentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 16,
    columnGap: 16,
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
    marginLeft: 16,
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
});

export default Home;
