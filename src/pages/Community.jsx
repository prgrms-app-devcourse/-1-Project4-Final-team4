import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {Colors} from '../utils/Colors';
import {SCREEN_WIDTH} from '../utils/utils';

import CommunityArticle from '../components/CommunityArticle';
import SubHeader from '../components/SubHeader';

const profile = require('../assets/images/dummyProfile.jpg');
const profile1 = require('../assets/images/profile1.png');
const profile2 = require('../assets/images/profile2.jpg');
const profile3 = require('../assets/images/profile3.jpg');
const mainSample = require('../assets/images/sample.png');

const dummy_data = [
  {
    id: 1,
    profile: profile,
    name: 'hyunjinab',
    date: '2024-05-08',
    image: [mainSample, mainSample, mainSample],
    category: ['#맛집', '#영화'],
    body: '부끄러운 맘이 숨은 멋진 밤에 별빛에 떨림을 더해 네게 질문을 던져 그러다가 맘을 들켜 너는 웃어',
    likes: [5],
    commentList: [
      {
        id: 1,
        name: 'lnxexu',
        profile: profile1,
        comment: '좋아요',
      },
      {
        id: 2,
        name: 'chuuo3o',
        profile: profile3,
        comment: '올ㅋ',
      },
    ],
  },
  {
    id: 2,
    profile: profile1,
    name: 'lnxexu',
    date: '2024-05-05',
    image: [mainSample],
    category: ['#콘서트'],
    body: '부끄러운 맘이 숨은 멋진 밤에 별빛에 떨림을 더해 네게 질문을 던져 그러다가 맘을 들켜 너는 웃어',
    likes: [],
    commentList: [
      {
        id: 1,
        name: 'lnxexu',
        profile: profile1,
        comment: '좋아요',
      },
      {
        id: 2,
        name: '0ct0ber19',
        profile: profile2,
        comment: '어디임?',
      },
      {
        id: 3,
        name: 'chuuo3o',
        profile: profile3,
        comment: '올ㅋ',
      },
    ],
  },
  {
    id: 3,
    profile: profile2,
    name: '0ct0ber19',
    date: '2024-04-30',
    image: [mainSample, mainSample, mainSample, mainSample],
    category: ['#맛집', '#뮤지컬'],
    body: '부끄러운 맘이 숨은 멋진 밤에 별빛에 떨림을 더해 네게 질문을 던져 그러다가 맘을 들켜 너는 웃어',
    likes: [6, 8],
    commentList: [
      {
        id: 1,
        name: '0ct0ber19',
        profile: profile2,
        comment: '어디임?',
      },
    ],
  },
];

const Community = ({navigation}) => {
  const [sortValue, setSortValue] = useState('latest');

  const sortClick = value => {
    setSortValue(value);

    const compare = (a, b) => {
      if (value === 'latest') {
        return new Date(b.date) - new Date(a.date);
      } else if (value === 'likest') {
        return parseInt(b.likes.length) - parseInt(a.likes.length);
      }
    };

    dummy_data.sort(compare);
  };

  const renderFeed = ({item}) => {
    return (
      <View style={{flex: 1, marginBottom: 16}}>
        <View style={styles.line} />
        <CommunityArticle data={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.windowWrapper}>
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={Colors.background}
          barStyle="dark-content"
        />
        <SubHeader title={'커뮤니티'} />

        <View style={styles.sortWrapper}>
          <TouchableOpacity
            onPress={() => sortClick('latest')}
            style={sortValue === 'latest' ? styles.buttonOn : styles.buttonOff}>
            <Text
              style={sortValue === 'latest' ? styles.textOn : styles.textOff}>
              최신순
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sortClick('likest')}
            style={sortValue === 'likest' ? styles.buttonOn : styles.buttonOff}>
            <Text
              style={sortValue === 'likest' ? styles.textOn : styles.textOff}>
              추천순
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dummy_data}
          renderItem={renderFeed}
          keyExtractor={item => item.id}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CommunityAdd')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  windowWrapper: {
    flex: 1,
    marginBottom: 70,
    backgroundColor: Colors.background,
  },
  sortWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 16,
    marginBottom: 8,
    gap: 4,
  },
  buttonOn: {
    width: 50,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.grey,
  },
  buttonOff: {
    width: 50,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  textOn: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    color: Colors.white,
    lineHeight: 24,
  },
  textOff: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    color: Colors.grey,
    lineHeight: 24,
  },
  line: {
    width: SCREEN_WIDTH,
    height: 1,
    backgroundColor: Colors.border_color,
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: Colors.main,
  },
  addIcon: {
    fontFamily: 'Pretendard',
    fontSize: 50,
    lineHeight: 50,
    color: Colors.white,
  },
});

export default Community;
