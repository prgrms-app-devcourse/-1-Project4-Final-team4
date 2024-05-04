import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, View, Animated, Easing, Text} from 'react-native';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('MainTab');
  }, 2000);

  return (
    <View style={styles.splashContainer}>
      <Text>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
