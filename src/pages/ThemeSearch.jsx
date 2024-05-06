import {SafeAreaView, View} from 'react-native';
import {containerStyle} from '../utils/utils';
import React from 'react';
import {Colors} from '../utils/Colors';
import BasicHeader from '../components/BasicHeader';
import MainHeader from '../components/MainHeader';

const ThemeSearch = ({navigation}) => {
  return (
    <SafeAreaView style={containerStyle}>
      <MainHeader />
    </SafeAreaView>
  );
};

export default ThemeSearch;
