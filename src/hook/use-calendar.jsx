import dayjs from 'dayjs';
import React, {useState} from 'react';

export const useCalendar = now => {
  const [seletedDate, setSelectedDate] = useState(now);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSelectedDate(dayjs(date));
    hideDatePicker();
  };

  const subtract1Month = () => {
    const newSelectedDate = dayjs(seletedDate).subtract(1, 'month');
    setSelectedDate(newSelectedDate);
  };

  const add1Month = () => {
    const newSelectedDate = dayjs(seletedDate).add(1, 'month');
    setSelectedDate(newSelectedDate);
  };

  return {
    seletedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  };
};
