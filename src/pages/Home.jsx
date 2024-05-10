import React, {useEffect} from 'react';
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
import {marginHorizontal, shadow} from '../utils/utils';
import {Colors} from '../utils/Colors';
import Margin from '../components/Margin';
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

const tempPlace = [
  {
    title: '경복궁',
    address: '서울특별시 종로구 사직로 161',
    navigateRoute: 'Place',
    img: require('../assets/images/place1.jpg'),
  },
  {
    title: 'N 서울 타워',
    address: '서울특별시 종로구 사직로 161',
    navigateRoute: 'Place',
    img: require('../assets/images/place2.jpg'),
  },
  {
    title: '한강공원',
    address: '서울특별시 종로구 사직로 161',
    navigateRoute: 'Place',
    img: require('../assets/images/place3.jpg'),
  },
];

const tempFood = [
  {
    title: '현경',
    address: '서울특별시 강남구',
    navigateRoute: 'Food',
    img: require('../assets/images/food1.jpg'),
  },
  {
    title: 'N 서울 타워점',
    address: '서울특별시 종로구 사직로 161',
    navigateRoute: 'Food',
    img: require('../assets/images/food1.jpg'),
  },
  {
    title: '한강공원점',
    address: '서울특별시 종로구 사직로 161',
    navigateRoute: 'Food',
    img: require('../assets/images/food1.jpg'),
  },
];

const tempMovie = [
  {
    title: '범죄도시4',
    rank: 1,
    navigateRoute: 'Movie',
    img: require('../assets/images/movie1.jpg'),
  },
  {
    title: '쿵푸팬더4',
    rank: 2,
    navigateRoute: 'Movie',
    img: require('../assets/images/movie1.jpg'),
  },
  {
    title: '혹성탈출',
    rank: 3,
    navigateRoute: 'Movie',
    img: require('../assets/images/movie1.jpg'),
  },
];

const Home = () => {
  const navigation = useNavigation();

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
    return (
      <TouchableOpacity onPress={() => navigation.navigate(item.navigateRoute)}>
        <ImageBackground
          source={item.img}
          style={{width: 200, height: 264}}
          imageStyle={{borderRadius: 16}}>
          <View style={styles.placeContentContainer}>
            <Text style={styles.placeTitle}>{item.title}</Text>
            <Text style={styles.placeContent}>{item.address}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  //추천 영화 렌더
  const movieRenderItems = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(item.navigateRoute)}>
        <ImageBackground
          source={item.img}
          style={{width: 200, height: 264}}
          imageStyle={{borderRadius: 16}}>
          <View style={styles.placeContentContainer}>
            <Text style={styles.placeTitle}>{item.title}</Text>
            <Text style={styles.placeContent}>{item.rank}위</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
      <ScrollView style={{backgroundColor: Colors.background}}>
        <MainHeader />
        <View style={styles.contentWrapper}>
          <View style={styles.category}>
            <Text style={styles.titleText}>카테고리 검색</Text>
            <View style={styles.btnWrapper}>
              <CategoryButton
                title={'지역으로 검색!'}
                content={'서울 찍고 경기 찍고 고고싱'}
                search={'SearchLocaion'}
              />
              <CategoryButton
                title={'장르별 검색!'}
                content={'영화, 뮤지컬, 콘서트, 연극까지!'}
                search={'SearchGenre'}
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
              onPress={() =>
                navigation.navigate('LocationSearch')
              }></TouchableOpacity>
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
            <Carousel
              data={tempPlace}
              renderItem={placeRenderItems}
              sliderWidth={windowWidth}
              itemWidth={200}
              contentContainerCustomStyle={[shadow, {alignItems: 'flex-start'}]}
              activeSlideAlignment={'start'}
              enableSnap={false}
            />
          </View>
          <View style={styles.placeMainContainer}>
            <Text style={styles.placeMainTitle}>사용자가 추천하는 명소</Text>
            <Carousel
              data={tempPlace}
              renderItem={placeRenderItems}
              sliderWidth={windowWidth}
              itemWidth={200}
              contentContainerCustomStyle={[shadow, {alignItems: 'flex-start'}]}
              activeSlideAlignment={'start'}
              enableSnap={false}
            />
          </View>
          <View style={styles.placeMainContainer}>
            <Text style={styles.placeMainTitle}>맛집 추천</Text>
            <Carousel
              data={tempFood}
              renderItem={placeRenderItems}
              sliderWidth={windowWidth}
              itemWidth={200}
              contentContainerCustomStyle={[shadow, {alignItems: 'flex-start'}]}
              activeSlideAlignment={'start'}
              enableSnap={false}
            />
          </View>
          <View style={styles.placeMainContainer}>
            <Text style={styles.placeMainTitle}>영화 추천</Text>
            <Carousel
              data={tempMovie}
              renderItem={movieRenderItems}
              sliderWidth={windowWidth}
              itemWidth={200}
              contentContainerCustomStyle={[shadow, {alignItems: 'flex-start'}]}
              activeSlideAlignment={'start'}
              enableSnap={false}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Community')}>
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
    marginHorizontal,
    rowGap: 20,
  },
  titleText: {
    color: Colors.black,
    fontFamily: 'PretendardBold',
    fontSize: 18,
  },
  contentWrapper: {
    justifyContent: 'center',
    paddingTop: 24,
  },
  btnWrapper: {
    rowGap: 12,
  },
  recContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 28,
  },
  recdTitle: {
    color: Colors.grey,
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
    paddingVertical: 16,
    columnGap: 16,
  },
  placeMainContainer: {
    backgroundColor: Colors.main,
    height: 375,
    width: `${windowWidth} - 16`,
    padding: 16,
  },
  placeMainTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'PretendardBold',
    marginBottom: 12,
  },
  placeContentContainer: {
    position: 'absolute',
    bottom: 16,
    marginHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    padding: 4,
  },
  placeTitle: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 13,
  },
  placeContent: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 11,
  },
});

export default Home;
