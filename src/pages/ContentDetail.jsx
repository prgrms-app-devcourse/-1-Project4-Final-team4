import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import BasicHeader from '../components/BasicHeader';
import {Colors} from '../utils/Colors';
import {getPlaceDetail} from '../apis/place';

const ContentDetail = ({route}) => {
  const {item, type} = route.params;
  const [detailContent, setDetailContent] = useState([]);

  useEffect(() => {
    fetchPlaceDetail();
  }, []);

  // 상세 place 조회
  const fetchPlaceDetail = async () => {
    try {
      const res = await getPlaceDetail(item.contenttypeid, item.contentid);
      if (res) {
        setDetailContent(res.response.body.items.item[0]);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderContent = () => {
    if (type === 'place') {
      const backgroundImage = item.firstimage
        ? {uri: item.firstimage}
        : require('../assets/images/placeholder.jpg');
      return (
        <View>
          <BasicHeader isBackButton={true} title={item.title} />
          <Image
            source={backgroundImage}
            style={{width: '100%', height: 260}}
            resizeMode="cover"
          />
          <View style={{padding: 16}}>
            {item.contenttypeid === '39' ? (
              <View style={{rowGap: 8}}>
                <Text style={styles.themeText}>맛집</Text>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.addrText}>{item.addr1}</Text>
                <Text style={styles.menuText}>메뉴</Text>
                {detailContent.treatmenu ? (
                  <Text style={styles.subContent}>
                    {detailContent.treatmenu}
                  </Text>
                ) : (
                  <Text style={styles.subContent}>
                    {detailContent.firstmenu}
                  </Text>
                )}
                {detailContent.opentimefood ? (
                  <View>
                    <Text style={styles.subTitle}>영업 시간</Text>
                    <Text style={styles.subContent}>
                      {detailContent.opentimefood}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                {detailContent.restdatefood ? (
                  <View>
                    <Text style={styles.subTitle}>휴무일</Text>
                    <Text style={styles.subContent}>
                      {detailContent.restdatefood}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                {detailContent.infocenterfood ? (
                  <View>
                    <Text style={styles.callText}>
                      전화번호 : ({detailContent.infocenterfood})
                    </Text>
                    <TouchableOpacity
                      style={styles.callBtn}
                      onPress={() =>
                        Linking.openURL(`tel:${detailContent.infocenterfood}`)
                      }>
                      <Text style={styles.callBtnText}>예약하기</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text>{detailContent.reservationfood}</Text>
                )}
              </View>
            ) : (
              <View style={{rowGap: 8}}>
                <Text style={styles.themeText}>즐길거리</Text>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.addrText}>{item.addr1}</Text>
                {detailContent.restdateculture ||
                detailContent.restdateleports ? (
                  <View>
                    <Text style={styles.subTitle}>휴무일</Text>
                    <Text style={styles.subContent}>
                      {detailContent.restdateculture ||
                        detailContent.restdateleports}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                {detailContent.usetime ||
                detailContent.usetimeculture ||
                detailContent.usetimeleports ? (
                  <View>
                    <Text style={styles.subTitle}>이용시간</Text>
                    <Text style={styles.subContent}>
                      {detailContent.usetime ||
                        detailContent.usetimeculture ||
                        detailContent.usetimeleports}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                {detailContent.usefee ? (
                  <View>
                    <Text style={styles.subTitle}>이용요금</Text>
                    <Text style={styles.subContent}>
                      {detailContent.usefee}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                {detailContent.infocenter ||
                detailContent.infocenterculture ||
                detailContent.infocenterleports ? (
                  <View>
                    <Text style={styles.callText}>
                      전화번호 : (
                      {detailContent.infocenter ||
                        detailContent.infocenterculture ||
                        detailContent.infocenterleports}
                      )
                    </Text>
                    <TouchableOpacity
                      style={styles.callBtn}
                      onPress={() =>
                        Linking.openURL(`tel:${detailContent.infocenter}`)
                      }>
                      <Text style={styles.callBtnText}>문의하기</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            )}
          </View>
        </View>
      );
    } else if (type === 'movie') {
      return (
        <View>
          <BasicHeader isBackButton={true} title={item.movieNm} />
          <View style={{padding: 16, rowGap: 8}}>
            <Text style={styles.rankText}>{item.rank}위</Text>
            {/* 영화포스터 */}
            <Text style={styles.titleText}>{item.movieNm}</Text>
            <Text style={styles.subTitle}>영화개봉일</Text>
            <Text style={styles.subContent}>{item.openDt}</Text>
            <Text style={styles.subTitle}>누적관객수</Text>
            <Text style={styles.subContent}>{item.audiAcc}</Text>
            <Text style={styles.subTitle}>누적매출액</Text>
            <Text style={styles.subContent}>{item.salesAcc}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <BasicHeader isBackButton={true} title={item.prfnm} />
          <Image
            source={{uri: 'http://www.kopis.or.kr' + item.poster}}
            style={{width: '100%', height: 350}}
            resizeMode="contain"
          />
          <View style={{padding: 16, rowGap: 8}}>
            <Text style={styles.titleText}>{item.prfnm}</Text>
            <Text style={styles.addrText}>{item.prfplcnm}</Text>
            <Text style={styles.subTitle}>상영기간</Text>
            <Text style={styles.subContent}>{item.prfpd}</Text>
            <Text style={styles.subTitle}>좌석수</Text>
            <Text style={styles.subContent}>{item.seatcnt}</Text>
          </View>
        </View>
      );
    }
  };

  return <View>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  themeText: {
    fontSize: 16,
    fontFamily: 'PretendardBold',
    color: Colors.grey,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'PretendardBold',
    color: Colors.black,
  },
  addrText: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'Pretendard',
  },
  menuText: {
    fontSize: 18,
    fontFamily: 'PretendardBold',
    color: Colors.black,
    marginTop: 8,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: 'PretendardBold',
    color: Colors.black,
  },
  subContent: {
    fontSize: 15,
    fontFamily: 'Pretendard',
    color: Colors.black,
  },
  callText: {
    fontSize: 13,
    color: Colors.black,
  },
  callBtn: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderRadius: 8,
    backgroundColor: Colors.main,
  },
  callBtnText: {
    color: Colors.bold_text,
    fontSize: 16,
    fontFamily: 'Pretendard',
  },
  rankText: {
    fontSize: 30,
    fontFamily: 'PretendardBold',
  },
});

export default ContentDetail;
