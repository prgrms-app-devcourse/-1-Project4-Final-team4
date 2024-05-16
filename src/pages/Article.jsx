import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import BasicHeader from '../components/BasicHeader';
import tempImg1_1 from '../assets/images/temp1_1.jpg';
import tempImg1_2 from '../assets/images/temp1_2.jpg';
import tempImg1_3 from '../assets/images/temp1_3.jpg';
import tempImg1_4 from '../assets/images/temp1_4.jpg';
import tempImg2_1 from '../assets/images/temp2_1.jpg';
import tempImg2_2 from '../assets/images/temp2_2.jpg';
import tempImg2_3 from '../assets/images/temp2_3.jpg';
import tempImg2_4 from '../assets/images/temp2_4.jpg';
import tempImg2_5 from '../assets/images/temp2_5.jpg';
import {Colors} from '../utils/Colors';

const tempData = [
  {
    id: 1,
    source:
      'https://luckywave7.com/entry/%EC%A1%B4%EC%9C%85-4-%EC%98%81%ED%99%94%EC%9D%98-%EB%A6%AC%EB%B7%B0-%EB%B0%8F-%ED%8F%89%EC%A0%90-%EC%B6%9C%EC%97%B0%EC%A7%84',
    title: '존윅 4',
    subTitle: [
      '1. <존윅 4>의 줄거리(1,2,3편 포함)',
      '2. <존윅 4> 출연진 및 감독',
      '3. <존윅 4> 평점 및 리뷰',
      '4. <존윅 4> 개인적 리뷰',
    ],
    subContent: [
      `<존 윅 4>는 자유를 위해 자신의 모든 것을 걸고, 반격을 준비하는 액션 블록버스터 영화입니다. 존 윅이 '최고 회의'를 무너뜨리기 위해 거대한 전쟁에 나서는 이야기를 담았으며, 4년 만에 개봉하였습니다.
  
킬러계에서는 전설로 불리던 존윅은 사랑하는 여인을 만나 그 세계에서 정한 룰대로 신고식을 치르고 나왔지만, 전직 킬러인 존윅을 내버려 두지 않습니다. 1편은 그렇게 다시 킬러인 세계로 돌아온 외로운 킬러의 복수를 그립니다.
  
2편은 킬러들이 작업하지 않는 유일한 공간인 콘티넨탈 호텔을 피바다로 만든 후에 킬러세계에서 파문과 함께 거액의 현상금으로 모두에게 쫓기는 신세가 되는 내용입니다.
  
3편은 킬러인 존 윅에게 신세를 진 주변인들을 등장시키며 카르마(몸과 입과 마음으로 짓는 선악의 소행)를 반복시킨다.
  
4편은 킬러 세계에서 파문당한 존 윅은 자신을 옭아매는 그 규율에 벗어나기 위해 최후의 반격을 시작하는 내용입니다. 영화에서 보이는 액션장면과 카 체이싱 장면, 적과의 난투, 일출과 함께 펼쳐지는 마지막 씬은 눈을 뗄 수 없을 정도로 멋진 연출로 이루어져 있습니다. 
  `,
      `감독으로는 2편과 3편의 감독을 맞았던 체드 스타헬스키가 이번에도 메가폰을 잡았습니다. 체드는 스턴트맨 출신 감독으로 다양한 액션장면들을 밀도 있게 표현하는 감독입니다. 이번 존윅의 BEST 액션씬 5를 연출하였으며, 콘티넨탈 호텔 오사카 지점 액션씬, 심장을 강타하는 베를린 클럽 액션씬,  파리 아파트 액션씬, 개선문 카레이싱 액션,  222 계단 액션이 있습니다.
  
또한 홍콩의 액션 배우 견자단 그리고 빌스카스가드 그리고 매스릭스 1의 모피어스 로렌스 피시번이 출연합니다.`,
      `존윅 4의 네이버평점은 8.38점을 기록 중이며, 로튼 토마토 점수 95%를 기록하였습니다.  존윅 4가 흥행에 성공한 것은 다 이유가 있는 법입니다. 10개의 한줄평 중에서 혹평이 1개 있을까 말 까 하는 수준입니다. 워낙 강렬하고 화려한 액션씬이 많아 영화를 관람한 관람객들에게는 칭찬이 많이 보입니다. 시원한 퍼포먼스를 기대하고 영화관을 방문하는 관람객에게 황홀한 경험을 할 수 있습니다.
  `,
      `이번이 4번째 시리즈인 존윅 4는 액션씬의 촬영기법과 스턴트는 영화의 사실감을 배가 시키는 요소이며, 영화를 더 흥미롭게 만드는 장치입니다. 이렇게 4번째 시리즈까지 이어질 수 있다는 것은 그만큼 대중으로부터의 사랑과 지지를 받고 있다는 방증이며, 성공적인 시리즈물로 자리를 잡았다는 의미입니다.
  
  주연인 키아누 리브스의 스턴트 없는 액션신을 직접소화 하는 것 또한 유명한 일화입니다. 여전히 건재한 액션신을 보는 것만으로도 우리는 통쾌한 기분을 느낍니다. 이렇게 쭉 5,6편까지 이어져 이러한 액션의 카타를 시스를 계속해서 경험할 수 있는 느낌을 가지고 싶습니다.`,
    ],
    contentImg: [tempImg1_1, tempImg1_2, tempImg1_3, tempImg1_4],
  },
  {
    id: 2,
    source: 'https://co-0.tistory.com/10',
    title: '쉬어매드니스',
    subTitle: [
      '1-1. 기본 줄거리',
      '1-2. 특징',
      '2. 콘텐츠박스(좌석 배치도/주의 사항)',
      '3. 연극 진행',
      '4. 주관적 평가',
    ],
    subContent: [
      `어느 날, 평화롭던 미용실이 살인사건에 연루된다. 미용실 위층에 살던 건물주가 누군가에 의해 살해된다.

용의자는 현장에 있던 넷 중 한 명!
      
건물주와 지속적인 다툼이 있던 미용실 원장과 남녀 관계가 복잡한 미용실 직원, 수상한 재벌집 사모님과 사기꾼 냄새나는 골동품 딜러.
      
범인을 잡을 수 있는 사람은 바로 관객석에 앉아있는 당신이다.
`,
      `연극이 영화와 차별되는 점은 제4의 벽(연극 밖 현실 세계와 무대 위 극중 세계를 구분하는 가상의 벽)이 모호하다는 것이다. 대본대로만 진행하는 연극은 찾아보기 힘들다. 때때로 관객과 소통하고 관객의 반응에 따라 애드리브가 난무하기도 한다.

<쉬어매드니스>는 이러한 연극의 특징을 극대화시킨 작품이다. 무대 위 배우들은 관객들에게 끊임없이 관찰하고 추리하라고 부추긴다. 그리고 관객의 생각은 무대 위에 전해져 배우와 대화를 하고 종국에는 연극의 흐름까지 결정한다. 마치 제4의 벽이 없는 것처럼.`,
      `※ 위치 : 서울특별시 종로구 동숭길 55 대학빌딩 B1

※ 주차 불가
      
      
혜화역 2번 출구에서 대극장을 지나 쭉 걷다 보면 파란색 건물을 찾을 수 있다.
      
별도의 주차 공간이 없으므로, 주변 공영 주차장이나 대중교통을 이용하는 편이 좋다.
      
      
쉬어매드니스 입장 티켓을 들고 있는 손
매표소는 공연 시작 1시간 전, 로비 입장은 20분 전부터 오픈된다.
      
      
쉬어매드니스 연극 좌석배치도
연극 입구에 부착되어있는 안내사항 표지판
1층과 2층 좌석이 있는데, 배우와 관객의 소통이 많은 연극인 만큼 적극적인 성격이라면 1층 좌석을 선택하는 것이 좋을지도. 하지만 1층 통로 옆자리는 무대 구조상 샴푸 의자에 가려져 원활한 관람을 방해할 수 있으니(+물도 튈 수 있음) 참고하자.
      
물 포함 음료는 반입이 불가능하다. 입장 대기 공간에 음료수 보관대가 있기는 하나, 요즘 시국에 여러모로 찝찝하니 아예 들고 오지 않는 편이 좋지 않을까 싶다.
`,
      `대략 2시간 정도의 러닝 타임을 가진다.

초반은 희극처럼 배우들의 콩트 위주로 진행되지만, 중반쯤 살인 사건이 발생하고부터 호흡이 빨라진다.
      
여타 희극과 마찬가지로 유머 코드가 안 맞는다면 꽤 괴로운 시간이 될 수도 있다.
      
연극은 일반적으로 사진과 동영상 촬영이 금지되지만, 본격적인 연극 시작 전 10분 간의 워밍업 공연과 연극 중간 10분의 인터미션에는 자유롭게 촬영이 가능하다.`,
      `5-1. 양날의 검이 될 수 있는 높은 참여도
무대와 객석의 경계가 모호해지면 관객은 몰입을 방해받고 피로감을 느낄 수 있다.
      
이에 필자는 제4의 벽이 배우를 보호하기 위한 장치인 동시에 관객을 보호해 주기 위함이라고 생각한다. 
      
이러한 측면에서 제4의 벽을 극도로 허문 <쉬어매드니스>는 호불호가 갈릴 만한 요소를 지니고 있다(내성적인 성향의 코코넛은 관람 직후 첫 연극과 달리 큰 피로감을 느꼈다).
      
      
5-2. 대학로 한정 유니크한 장르
대학로에서 공연하는 연극의 90%는 로맨스 코미디 장르이다.

수익성 측면에서 어쩔 수 없음을 이해하지만, 이는 피할 수 없는 단점이기도 하다.

이런 면에서 <쉬어매드니스>는 보기 드문 추리스릴러극으로, 조금은 색다른 연극을 접하고 싶은 분들께 추천한다.

코-오가 <쉬어매드니스>를 선택한 이유도 이전에 이미 로맨스 코미디 장르의 연극을 접했다는 점이 컸다.`,
    ],
    contentImg: [tempImg2_1, tempImg2_2, tempImg2_3, tempImg2_4, tempImg2_5],
  },
];

const Article = ({route}) => {
  const {title} = route.params;
  const article = tempData.find(item => item.title === title);
  console.log(article);
  return (
    <ScrollView>
      <BasicHeader title={article.title} isBackButton={true} />
      <View style={{padding: 16}}>
        <Text style={styles.mainTitle}>{article.title}</Text>
        {/* subTitle을 기준으로 잡고 해당하는 subContent의 index에 맞춰 출력 */}
        {article.subTitle.map((subTitle, index) => (
          <View key={index}>
            <Image
              source={article.contentImg[index]}
              style={styles.imgContainer}
              resizeMode="contain"
            />
            <Text style={styles.subTitle}>{subTitle}</Text>
            <Text style={styles.subContent}>{article.subContent[index]}</Text>
          </View>
        ))}
        <Text style={styles.source}>출처 : {article.source}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 20,
    fontFamily: 'PretendardBold',
    color: Colors.black,
  },
  imgContainer: {width: '100%', height: 300, marginVertical: 16},
  subTitle: {
    fontSize: 18,
    fontFamily: 'PretendardBold',
    color: Colors.black,
  },
  subContent: {
    fontSize: 15,
    fontFamily: 'Pretendard',
    color: Colors.black,
  },
  source: {
    paddingTop: 16,
    fontSize: 14,
    fontFamily: 'Pretendard',
    color: Colors.black,
  },
});

export default Article;
