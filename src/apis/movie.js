import {create} from 'apisauce';
import {MOVIE_API_KEY} from './authKey';

const baseURL = 'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice';

const movieAPI = create({
  baseURL,
});

const basePosterURL = 'http://api.koreafilm.or.kr/openapi-data2/wisenut';
const moviePosterAPI = create({
  basePosterURL,
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

export const getMoviePoster = async movieNm => {
  try {
    const res = await moviePosterAPI.get(
      `/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title=${movieNm}&ServiceKey=D557PK8Y0HVCZHC4Z28D`,
    );
    if (res.ok) {
      const {data} = res;
      console.log(res);
      return data;
    } else {
      console.error('Error : ', res.problem);
      return null;
    }
  } catch (error) {
    console.error('Error : ', error);
  }
};
