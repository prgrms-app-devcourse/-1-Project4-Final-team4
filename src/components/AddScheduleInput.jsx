import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {ITEM_WIDTH} from '../utils/utils';
import Plus from 'react-native-vector-icons/AntDesign';
import {Colors} from '../utils/Colors';

export const AddButton = ({onPressAdd}) => {
  return (
    <TouchableOpacity onPress={onPressAdd} style={{padding: 5}}>
      <Plus name="plus" size={20} />
    </TouchableOpacity>
  );
};

const AddScheduleInput = ({
  value,
  onChangeText,
  placeholder,
  onPressAdd,
  onSubmitEditing,
  onFocus,
}) => {
  return (
    <View
      style={{
        width: ITEM_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 12,
          color: Colors.TEXT_COLOR,
        }}
        placeholder={placeholder}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        onFocus={onFocus}
      />
    </View>
  );
};

export default AddScheduleInput;
