import {create} from 'apisauce';
import {MOVIE_API_KEY} from './authKey';

const baseURL = 'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice';

const movieAPI = create({
  baseURL,
});

const authKey = MOVIE_API_KEY;
const today = new Date();
const curDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(
  2,
  '0',
)}${String(today.getDate() - 1).padStart(2, '0')}`;

export const getMovie = async () => {
  try {
    const res = await movieAPI.get(
      `/searchDailyBoxOfficeList.json?key=${authKey}&targetDt=${curDate}`,
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
