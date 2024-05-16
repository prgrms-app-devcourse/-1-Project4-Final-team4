import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {SCREEN_WIDTH} from '../utils/utils';
import {Colors} from '../utils/Colors';

const Help = ({navigation}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const images = [
    require('../assets/images/help1.jpg'),
    require('../assets/images/help2.jpg'),
    require('../assets/images/help3.jpg'),
    require('../assets/images/help4.jpg'),
    require('../assets/images/help5.jpg'),
    require('../assets/images/help6.jpg'),
    require('../assets/images/help7.jpg'),
    require('../assets/images/help8.jpg'),
  ];

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image source={item} style={styles.image} />
      </View>
    );
  };

  const pagination = (
    <Pagination
      dotsLength={images.length}
      activeDotIndex={activeSlide}
      containerStyle={styles.paginationWrapper}
      dotStyle={styles.dotStyle}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );

  return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        ref={ref => (this.carousel = ref)}
        data={images}
        renderItem={_renderItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH}
        onSnapToItem={index => setActiveSlide(index)}
      />
      {activeSlide === images.length - 1 ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnStyle}>
          <Text style={styles.btnText}>돌아가기</Text>
        </TouchableOpacity>
      ) : (
        pagination
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingBottom: 20,
  },
  image: {
    width: 700,
    height: 700,
    resizeMode: 'contain',
  },
  paginationWrapper: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    marginBottom: 50,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: Colors.main,
  },
  btnStyle: {
    backgroundColor: Colors.main,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 20,
    fontFamily: 'Pretendard',
    marginVertical: 8,
    color: Colors.black,
  },
});

export default Help;
