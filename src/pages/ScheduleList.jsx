import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Checkmark from 'react-native-vector-icons/AntDesign';

import {Colors} from '../utils/Colors';
import Margin from '../components/Margin';
import {useCalendar} from '../hook/use-calendar';
import {useScheduleList} from '../hook/use-schedule-list';
import {
  ITEM_WIDTH,
  getCalendarColumns,
  getDayColor,
  getDayText,
} from '../utils/utils';
import AddScheduleInput from '../components/AddScheduleInput';

const columnSize = 50;

const Column = ({
  color,
  opacity,
  text,
  disabled,
  onPress,
  isSelected,
  hasSchedule,
}) => {
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
      <Text
        style={{color, opacity, fontWeight: hasSchedule ? 'bold' : 'normal'}}>
        {text}
      </Text>
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
  const {
    scheduleList,
    filteredScheduleList,
    addSchedule,
    removeSchedule,
    toggleSchedule,
    input,
    setInput,
    resetInput,
  } = useScheduleList(seletedDate);

  const flatListRef = useRef(null);

  const columns = getCalendarColumns(seletedDate);

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
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
          <TouchableOpacity onPress={onPressHeaderDate}>
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
    const hasSchedule = scheduleList.find(schedule =>
      dayjs(schedule.date).isSame(dayjs(date), 'date'),
    );

    return (
      <Column
        onPress={onPress}
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        isSelected={isSelected}
        hasSchedule={hasSchedule}
      />
    );
  };
  const renderScheduleItem = ({item: schedule}) => {
    const isSuccess = schedule.isSuccess;
    const onPress = () => toggleSchedule(schedule.id);
    const onLongPress = () => {
      Alert.alert('삭제하시겠어요?', '', [
        {
          style: 'cancel',
          text: '아니오',
        },
        {
          text: '네',
          onPress: () => removeSchedule(schedule.id),
        },
      ]);
    };

    return (
      <Pressable
        onLongPress={onLongPress}
        style={{
          width: ITEM_WIDTH,
          margin: 2,
          alignSelf: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 0.2,
          borderBottomColor: '#a6a6a6',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 14, color: '#595959'}}>{schedule.content}</Text>
        <TouchableOpacity onPress={onPress}>
          <Checkmark
            name="check"
            size={17}
            color={isSuccess ? 'green' : '#eaeaea'}
          />
        </TouchableOpacity>
      </Pressable>
    );
  };
  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 300);
  };
  const onPressAdd = () => {
    addSchedule();
    resetInput();
    scrollToEnd();
  };
  const onSubmitEditing = () => {
    addSchedule();
    resetInput();
    scrollToEnd();
  };
  const onFocus = () => {
    scrollToEnd();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}>
      <FlatList
        data={columns}
        keyExtractor={(_, index) => `column-${index}`}
        scrollEnabled={false}
        numColumns={7}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
      />

      <View
        style={{
          borderWidth: 2,
          borderRadius: 2,
          width: 10,
          borderColor: 'grey',
        }}
      />
      <Margin height={15} />

      <AddScheduleInput
        value={input}
        onChangeText={setInput}
        placeholder={`${dayjs(seletedDate).format(
          'MM.DD',
        )} 에 추가할 일정 작성하기`}
        onPressAdd={onPressAdd}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
      />
      <Margin height={15} />

      <FlatList
        ref={flatListRef}
        data={filteredScheduleList}
        contentContainerStyle={{
          width: 350,
          height: 250,
          paddingBottom: 40,
        }}
        renderItem={renderScheduleItem}
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
