import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BackIcon from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../utils/Colors';
import {SCREEN_WIDTH} from '../utils/utils';

const BasicHeader = ({isBackButton, title, label, rightIconName}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {isBackButton ? <BackIcon name="arrow-rotate-left" size={25} /> : null}
      </TouchableOpacity>
      {title ? <Text style={styles.title}>{title}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 68,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  title: {fontSize: 18, color: Colors.black},
});

export default BasicHeader;
