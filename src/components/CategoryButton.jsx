import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utils/Colors';

const locationIcon = require('../assets/icons/searchIcon.png');

const CategoryButton = ({title, content, navigate}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.contentWrapper}
      onPress={() => navigation.navigate(navigate)}>
      <Image source={locationIcon} style={styles.imgWrapper} />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.contentText}>{content}</Text>
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
    height: 72,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    borderWidth: 0.5,
  },
  imgWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    paddingLeft: 12,
  },
  titleText: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'PretendardBold',
    paddingRight: 50,
  },
  contentText: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'PretendardLight',
  },
});

export default CategoryButton;
