import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../utils/utils';

const defaultScheduleList = [
  // {
  //   id: 1,
  //   content: '약속',
  //   date: dayjs(),
  //   isSuccess: true,
  // },
];

export const useScheduleList = selectedDate => {
  const [scheduleList, setScheduleList] = useState(defaultScheduleList);
  const [input, setInput] = useState('');

  const savedScheduleList = newScheduleList => {
    setScheduleList(newScheduleList);
    AsyncStorage.setItem(
      STORAGE_KEY.SCHEDULE_KEY,
      JSON.stringify(newScheduleList),
    );
  };

  const addSchedule = () => {
    const len = scheduleList.length;
    const lastId = len === 0 ? 0 : scheduleList[len - 1].id;
    const newScheduleList = [
      ...scheduleList,
      {
        id: lastId + 1,
        content: input,
        date: selectedDate,
        isSuccess: false,
      },
    ];
    savedScheduleList(newScheduleList);
  };
  const removeSchedule = scheduleId => {
    const newScheduleList = scheduleList.filter(
      schedule => schedule.id !== scheduleId,
    );
    savedScheduleList(newScheduleList);
  };

  const toggleSchedule = scheduleId => {
    const newScheduleList = scheduleList.map(schedule => {
      if (schedule.id !== scheduleId) return schedule;
      return {
        ...schedule,
        isSuccess: !schedule.isSuccess,
      };
    });
    savedScheduleList(newScheduleList);
  };

  const filteredScheduleList = scheduleList.filter(schedule => {
    const isSameDate = dayjs(schedule.date).isSame(selectedDate, 'date');
    return isSameDate;
  });
  const resetInput = () => setInput('');

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await AsyncStorage.getItem(STORAGE_KEY.SCHEDULE_KEY);
    const newScheduleList = JSON.parse(result);
    setScheduleList(newScheduleList);
  };

  return {
    scheduleList,
    filteredScheduleList,
    addSchedule,
    removeSchedule,
    toggleSchedule,
    input,
    setInput,
    resetInput,
  };
};
