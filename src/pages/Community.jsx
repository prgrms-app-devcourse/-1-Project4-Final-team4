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
const mainSample = require('../assets/images/sample.png');

const {width} = Dimensions.get('window');

const dummy_data = [
  {
    id: 1,
    profile: profile,
    name: 'hello world',
    date: '2024.04.30. 11.44',
    image: mainSample,
    category: ['#맛집', '#영화'],
    body: '부끄러운 맘이 숨은 멋진 밤에 별빛에 떨림을 더해 네게 질문을 던져 그러다가 맘을 들켜 너는 웃어',
    likes: [],
    commentCount: 0,
  },
  {
    id: 2,
    profile: profile,
    name: 'hello world',
    date: '2024.04.30. 11.44',
    image: mainSample,
    category: ['#맛집', '#영화'],
    body: '부끄러운 맘이 숨은 멋진 밤에 별빛에 떨림을 더해 네게 질문을 던져 그러다가 맘을 들켜 너는 웃어',
    likes: [],
    commentCount: 0,
  },
  {
    id: 3,
    profile: profile,
    name: 'hello world',
    date: '2024.04.30. 11.44',
    image: mainSample,
    category: ['#맛집', '#영화'],
    body: '부끄러운 맘이 숨은 멋진 밤에 별빛에 떨림을 더해 네게 질문을 던져 그러다가 맘을 들켜 너는 웃어',
    likes: [],
    commentCount: 0,
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
    marginTop: 10,
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
