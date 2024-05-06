import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import palette from '../utils/Colors';

const Category = ({name}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.textStyle}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 50,
    height: 20,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: palette.COMMUNITY_GRAY,
  },
  textStyle: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 10,
    lineHeight: 20,
    color: 'white',
  },
});

export default Category;
