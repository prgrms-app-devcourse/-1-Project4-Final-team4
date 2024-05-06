import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import palette from '../utils/Colors';

const CommunityButton = ({text}) => {
  return (
    <TouchableOpacity style={styles.buttonOn}>
      <Text style={styles.textOn}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonOn: {
    width: 50,
    height: 22,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: palette.COMMUNITY_GRAY,
  },
  textOn: {
    fontSize: 10,
    color: 'white',
    lineHeight: 22,
  },
});

export default CommunityButton;
