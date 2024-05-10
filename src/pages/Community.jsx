import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import palette from '../utils/Colors';
import CommunityButton from '../components/CommunityButton';
import CommunityArticle from '../components/CommunityArticle';

const profile = require('../assets/images/dummyProfile.jpg');
const profile1 = require('../assets/images/profile1.png');
const profile2 = require('../assets/images/profile2.jpg');
const profile3 = require('../assets/images/profile3.jpg');
const mainSample = require('../assets/images/sample.png');

const {width} = Dimensions.get('window');

const dummy_data = [
  {
    id: 1,
    profile: profile,
    name: 'hyunjinab',
    date: '2024.05.08. 16:15',
    image: mainSample,
    category: ['#맛집', '#영화'],
    body: '부끄러운 맘이 숨은 멋진 밤에 별빛에 떨림을 더해 네게 질문을 던져 그러다가 맘을 들켜 너는 웃어',
    likes: [5, 6],
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
    date: '2024.04.30. 11:44',
    image: mainSample,
    category: ['#맛집', '#영화'],
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
    date: '2024.05.05. 18:48',
    image: mainSample,
    category: ['#맛집', '#영화'],
    body: '부끄러운 맘이 숨은 멋진 밤에 별빛에 떨림을 더해 네게 질문을 던져 그러다가 맘을 들켜 너는 웃어',
    likes: [8],
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
  const renderFeed = ({item}) => {
    return (
      <View style={{flex: 1, marginBottom: 16}}>
        <View style={styles.line} />
        <CommunityArticle data={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: palette.BG}}>
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={palette.BG} barStyle="dark-content" />
        <View style={styles.sortWrapper}>
          <CommunityButton name={'최신순'} />
          <CommunityButton name={'추천순'} />
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
          onPress={() => navigation.navigate('Add')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
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
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: palette.MAIN_GREEN,
  },
  addIcon: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 50,
    lineHeight: 54,
    color: 'white',
  },
});

export default Community;
