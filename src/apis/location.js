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

// 지도별 content 가져오기
export const getLocationContent = async (longitude, latitude) => {
  try {
    const res = await placeAPI.get(
      `/locationBasedList1?serviceKey=${authKey}&numOfRows=${row}&pageNo=${page}&MobileOS=${os}&MobileApp=${name}&mapX=${longitude}&mapY=${latitude}&radius=10000&_type=json`,
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
