import {create} from 'apisauce';
import {PLACE_API_KEY} from './authKey';

const baseURL = 'https://apis.data.go.kr/B551011/KorService1';

const placeAPI = create({
  baseURL,
});

const authKey = PLACE_API_KEY;
const row = '25';
const os = 'ETC';
const name = 'naganora';
const page = '1';
// 지역코드 1 = 서울, 2 = 인천
const area = '1';

// 강남구, 강동구 등 구 출력 API
export const getLocation = async () => {
  try {
    const res = await placeAPI.get(
      `/areaCode1?serviceKey=${authKey}&numOfRows=${row}&pageNo=${page}&MobileOS=${os}&MobileApp=${name}&areaCode=${area}&_type=json`,
    );

    if (res.ok) {
      const {data} = res;
      return data;
    } else {
      console.error('Error : ', res.problem);
      return null;
    }
  } catch (error) {
    console.error('Error : ', error);
  }
};

// length가 2면 cat3는 안하고 cat1, cat2만 수행, length가 3이면 cat3까지 수행
export const getPlace = async paramsArray => {
  try {
    if (!paramsArray) {
      const lSort = 'C01';
      const res = await placeAPI.get(
        `/areaBasedList1?serviceKey=${authKey}&numOfRows=${row}&pageNo=${page}&MobileOS=${os}&MobileApp=${name}&areaCode=${area}&cat1=${lSort}&_type=json`,
      );
      if (res.ok) {
        const {data} = res;
        return data;
      } else {
        console.error('Error : ', res.problem);
        return null;
      }
    } else if (paramsArray.length === 2) {
      const [lSort, mSort] = paramsArray;
      const res = await placeAPI.get(
        `/areaBasedList1?serviceKey=${authKey}&numOfRows=${row}&pageNo=${page}&MobileOS=${os}&MobileApp=${name}&areaCode=${area}&cat1=${lSort}&cat2=${mSort}&_type=json`,
      );
      if (res.ok) {
        const {data} = res;
        return data;
      } else {
        console.error('Error : ', res.problem);
        return null;
      }
    } else if (paramsArray.length === 3) {
      const [lSort, mSort, sSort] = paramsArray;
      const res = await placeAPI.get(
        `/areaBasedList1?serviceKey=${authKey}&numOfRows=${row}&pageNo=${page}&MobileOS=${os}&MobileApp=${name}&areaCode=${area}&cat1=${lSort}&cat2=${mSort}&cat3=${sSort}&_type=json`,
      );
      if (res.ok) {
        const {data} = res;
        return data;
      } else {
        console.error('Error : ', res.problem);
        return null;
      }
    }
  } catch (error) {
    console.error('Error : ', error);
  }
};

export const getPlaceDetail = async (typeid, contentid) => {
  try {
    const res = await placeAPI.get(
      `/detailIntro1?serviceKey=${authKey}&MobileOS=${os}&MobileApp=${name}&contentId=${contentid}&contentTypeId=${typeid}&_type=json`,
    );

    if (res.ok) {
      const {data} = res;
      return data;
    } else {
      console.error('Error : ', res.problem);
      return null;
    }
  } catch (error) {
    console.error('Error : ', error);
  }
};
