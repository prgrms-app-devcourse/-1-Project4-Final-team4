import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;

const CustomCarousel = ({data, renderItem}) => {
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={windowWidth - 56}
        itemWidth={260}
        contentContainerCustomStyle={{alignItems: 'flex-start'}}
        activeSlideAlignment={'start'}
        enableSnap={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    padding: 16,
    borderRadius: 8,
  },
});

export default CustomCarousel;
