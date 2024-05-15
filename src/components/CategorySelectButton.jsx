import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import {Colors} from '../utils/Colors';

const CategorySelectButton = ({name, key, isSelect}) => {
  const [select, setSelect] = useState(isSelect);

  return (
    <TouchableOpacity
      style={select ? styles.buttonOff : styles.buttonOn}
      onPress={() => setSelect(!select)}>
      <Text style={select ? styles.textOff : styles.textOn} key={key}>
        {name}
      </Text>
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
  buttonOff: {
    width: 50,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  textOn: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    color: Colors.white,
    lineHeight: 24,
  },
  textOff: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    color: Colors.grey,
    lineHeight: 24,
  },
});

export default CategorySelectButton;
