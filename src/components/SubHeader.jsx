import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import ToggleArrow from 'react-native-vector-icons/AntDesign';

import {Colors} from '../utils/Colors';
import logo from '../assets/images/logo.png';
import {SCREEN_WIDTH} from '../utils/utils';
import DropdownModal from './DropdownModal';

const SubHeader = ({title, toggle, onPress}) => {
  return (
    <View style={styles.headerWrapper}>
      <Image source={logo} style={styles.logo} />
      <View
        onPress={onPress}
        style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
        <Text style={styles.title}>{title}</Text>
      </View>
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

export default SubHeader;
