import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getCalendarColumns, getDayColor, getDayText} from '../utils/utils';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import Margin from '../components/Margin';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Colors} from '../utils/Colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useCalendar} from '../hook/use-calendar';

const columnSize = 50;

const Column = ({color, opacity, text, disabled, onPress, isSelected}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
        borderRadius: columnSize / 2,
      }}>
      <Text style={{color, opacity}}>{text}</Text>
    </TouchableOpacity>
  );
};
const ArrowButton = ({name, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{paddingVertical: 20, paddingHorizontal: 15}}>
      <SimpleLineIcons name={name} size={15} color={Colors.TEXT_COLOR} />
    </TouchableOpacity>
  );
};
export default () => {
  const now = dayjs();
  const {
    seletedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);

  const columns = getCalendarColumns(seletedDate);

  const onPressLeftArrow = subtract1Month;
  const onPressRightArrow = add1Month;

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(seletedDate).format('YYYY.MM.DD');
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ArrowButton name={'arrow-left'} onPress={onPressLeftArrow} />
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{fontSize: 20, color: Colors.TEXT_COLOR}}>
              {currentDateText}
            </Text>
          </TouchableOpacity>
          <ArrowButton name={'arrow-right'} onPress={onPressRightArrow} />
        </View>

        <View style={{flexDirection: 'row'}}>
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const dayText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column
                key={`day-${day}`}
                text={dayText}
                color={color}
                opacity={1}
                disabled={true}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({item: date}) => {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(seletedDate, 'month');

    const onPress = () => {
      setSelectedDate(date);
    };
    const isSelected = dayjs(date).isSame(seletedDate, 'date');
    return (
      <Column
        onPress={onPress}
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        isSelected={isSelected}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FlatList
        data={columns}
        keyExtractor={(_, index) => `column-${index}`}
        numColumns={7}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};
