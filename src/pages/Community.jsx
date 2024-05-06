import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

import palette from '../utils/Colors';
import SortButton from '../components/SortButton';
import CommunityArticle from '../components/CommunityArticle';

const profile = require('../assets/images/dummyProfile.jpg');
const mainSample = require('../assets/images/sample.png');

const {width} = Dimensions.get('window');

const dummy_data = [
  {
    id: 1,
    profile: profile,
    name: 'hello world',
    date: '2024.04.30. 11.44',
    image: mainSample,
    body: '부끄러운 맘이 숨은 멋진 밤에 별빛에 떨림을 더해 네게 질문을 던져 그러다가 맘을 들켜 너는 웃어',
    hash: '#10cm #너랑_밤새고_싶어 #쓸말이없어서 #지금듣는노래가사쓰는중 #해시태그_줄넘어가는건_보여줘야지 #샘플끝',
    likeCount: 3,
    commentCount: 5,
  },
  {
    id: 2,
    profile: profile,
    name: 'hello world',
    date: '2024.04.30. 11.44',
    image: mainSample,
    body: '부끄러운 맘이 숨은 멋진 밤에 별빛에 떨림을 더해 네게 질문을 던져 그러다가 맘을 들켜 너는 웃어',
    hash: '#10cm #너랑_밤새고_싶어 #쓸말이없어서 #지금듣는노래가사쓰는중 #해시태그_줄넘어가는건_보여줘야지 #샘플끝',
    likeCount: 3,
    commentCount: 5,
  },
  {
    id: 3,
    profile: profile,
    name: 'hello world',
    date: '2024.04.30. 11.44',
    image: mainSample,
    body: '부끄러운 맘이 숨은 멋진 밤에 별빛에 떨림을 더해 네게 질문을 던져 그러다가 맘을 들켜 너는 웃어',
    hash: '#10cm #너랑_밤새고_싶어 #쓸말이없어서 #지금듣는노래가사쓰는중 #해시태그_줄넘어가는건_보여줘야지 #샘플끝',
    likeCount: 3,
    commentCount: 5,
  },
];

const Community = () => {
  const renderFeed = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <CommunityArticle
          profile={item.profile}
          name={item.name}
          date={item.date}
          image={item.image}
          body={item.body}
          hash={item.hash}
          likeCount={item.likeCount}
          commentCount={item.commentCount}
        />
        <View style={styles.line} />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={palette.MAIN_GREEN} />
        <View style={styles.sortWrapper}>
          <SortButton text={'최신순'} />
          <SortButton text={'추천순'} />
        </View>

        <FlatList
          data={dummy_data}
          renderItem={renderFeed}
          keyExtractor={item => item.id}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sortWrapper: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 10,
    gap: 4,
  },
  line: {
    width,
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 20,
  },
});

export default Community;
