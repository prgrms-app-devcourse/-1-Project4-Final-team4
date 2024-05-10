import {create} from 'apisauce';
import {parseString} from 'react-native-xml2js';
import {SHOW_API_KEY} from './authKey';

const baseURL = 'http://kopis.or.kr/openApi/restful';

// 오류 발생으로 동기식인 async await 대신 fetch를 사용함.
const showAPI = create({
  baseURL,
});

const authKey = SHOW_API_KEY;
const today = new Date();
const curDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(
  2,
  '0',
)}${String(today.getDate() - 1).padStart(2, '0')}`;
const category = 'AAAA';
const location = '11';

/*
http://kopis.or.kr/openApi/restful/boxoffice?service={ServiceKey}
&ststype=day&date=20171218&catecode=AAAA&area=11
*/

// ststype 월별, 주별, 일별
// area 지역번호 11 : 서울, 41 경기
// catecode 카테고리 AAAA : 연극, GGGA: 뮤지컬, CCCA: 서양음악(클래식), CCCC: 국악, CCCD: 대중음악

// Xml To Json을 동기적으로 수행하기 위해 함수로 작성
export const xmlToJson = xmlData => {
  const cleanedString = xmlData.replace('\ufeff', '');
  let jsonData;
  parseString(cleanedString, (err, result) => {
    if (err !== null) {
      console.log('error: ', err);
      return;
    }
    jsonData = JSON.parse(JSON.stringify(result));
  });
  return jsonData;
};

// export const getShow = async () => {
//   try {
//     const res = await showAPI.get(
//       `/boxoffice?service=${authKey}&ststype=month&date=${curDate}&catecode=${category}&area=${location}`,
//     );
//     const resJson = xmlToJson(res);
//     console.log(resJson);
//   } catch (error) {
//     console.error(error);
//   }
// };

// HTTP 방식
export const getShow = () =>
  fetch(
    `${baseURL}/boxoffice?service=${authKey}&ststype=month&date=${curDate}&catecode=${category}&area=${location}`,
  )
    .then(res => res.text())
    .then(data => xmlToJson(data))
    .catch(error => console.log(error));
