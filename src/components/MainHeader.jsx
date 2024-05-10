import {useNavigation} from '@react-navigation/native';
import React, {Children} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Colors} from '../utils/Colors';
import logo from '../assets/images/logo.png';
import {SCREEN_WIDTH} from '../utils/utils';

const MainHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      {title && <Text>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
    height: 68,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
  },
  logo: {
    width: 100,
    height: 50,
  },
  title: {
    fontSize: 18,
    color: Colors.black,
  },
});

export default MainHeader;
