import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utils/Colors';
import {shadow} from '../utils/utils';

const locationIcon = require('../assets/icons/searchIcon.png');

const CategoryButton = ({title, content, search}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.contentWrapper, shadow]}
      onPress={() => navigation.navigate(search)}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <Image source={locationIcon} style={styles.img} />
        <View style={{gap: 4}}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      </View>
      <Icon name={'keyboard-arrow-right'} size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 350,
    height: 72,
    backgroundColor: Colors.background,
    borderRadius: 16,
    paddingHorizontal: 12,
    borderWidth: 0.5,
  },
  img: {
    width: 48,
    height: 48,
    borderRadius: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.black,
    fontFamily: 'PretendardBold',
  },
  contentText: {
    fontSize: 14,
    fontWeight: 500,
    color: '#999',
    fontFamily: 'PretendardLight',
  },
});

export default CategoryButton;
