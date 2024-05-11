import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import {Colors} from '../utils/Colors';

const CommunityButton = ({name}) => {
  return (
    <TouchableOpacity style={styles.buttonOn}>
      <Text style={styles.textOn}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonOn: {
    width: 50,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.grey,
  },
  textOn: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#fff',
    lineHeight: 24,
  },
});

export default CommunityButton;
