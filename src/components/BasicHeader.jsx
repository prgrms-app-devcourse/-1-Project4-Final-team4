import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../utils/Colors';
import {SCREEN_WIDTH} from '../utils/utils';

const BasicHeader = ({isBackButton, title, label, rightIconName}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {isBackButton ? <Icon name={'arrow-left'} size={25} /> : null}
      </TouchableOpacity>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate(`${label}`)}>
        <Icon name={rightIconName} size={25} />
      </TouchableOpacity>
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
    backgroundColor: Colors.main,
    paddingHorizontal: 24,
  },
  title: {fontSize: 20, color: Colors.bold_text, fontWeight: 'bold'},
});

export default BasicHeader;
