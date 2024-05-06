import dayjs from 'dayjs';
import {Dimensions} from 'react-native';
import {Colors} from './Colors';

export const STORAGE_KEY = {
  SCHEDULE_KEY: 'SCHEDULE_KEY',
  PROFILE_IMAGE_KEY: 'PROFILE_INFO_KEY',
};

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

export const containerStyle = {flex: 1, backgroundColor: Colors.BG_COLOR};
export const ITEM_WIDTH = 330;
export const BOTTOM_HEIGHT = 20;

export const fillEmptyColumns = (columns, start, end) => {
  const filledColumns = columns.slice(0);

  const startDay = dayjs(start).get('day');
  for (let i = 1; i <= startDay; i += 1) {
    const date = dayjs(start).subtract(i, 'day');
    filledColumns.unshift(date);
  }

  const endDay = dayjs(end).get('day');
  for (let i = 1; i <= 6 - endDay; i += 1) {
    const date = dayjs(end).add(i, 'day');
    filledColumns.push(date);
  }
  return filledColumns;
};

export const getCalendarColumns = now => {
  const start = dayjs(now).startOf('month'); // 4.1
  const end = dayjs(now).endOf('month'); //4.30
  const endDate = dayjs(end).get('date'); //30

  const columns = [];
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, 'day');
    columns.push(date);
  }

  const filledColumns = fillEmptyColumns(columns, start, end);
  return filledColumns;
};

/**
 *
 * @param  day 0 ~ 6
 * @return 일 ~ 월
 */
const dayTexts = ['일', '월', '화', '수', '목', '금', '토'];
export const getDayText = day => {
  return dayTexts[day];
};

export const getDayColor = day => {
  return day === 0 ? '#e67639' : day === 6 ? '#5872d1' : '#2b2b2b';
};
