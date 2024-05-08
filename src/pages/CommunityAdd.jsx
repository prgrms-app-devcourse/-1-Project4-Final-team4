import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import palette from '../utils/Colors';
import CommunityButton from '../components/CommunityButton';

const cancel = require('../assets/icons/cancel.png');
const camera = require('../assets/icons/camera.png');

const CommunityAdd = ({navigation}) => {
  const [text, onChangeText] = useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: palette.BG}}>
      <View style={{flex: 1}}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={cancel} style={{width: 24, height: 24}} />
          </TouchableOpacity>
          <Text>포스트 작성</Text>
          <TouchableOpacity>
            <Text>등록</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 16, gap: 16}}>
          <TouchableOpacity style={styles.photoAdd}>
            <Image source={camera} style={{width: 24, height: 24}} />
            <Text style={styles.photoText}>사진 추가</Text>
          </TouchableOpacity>
          <View style={styles.categoryWrapper}>
            <CommunityButton name={'맛집'} />
            <CommunityButton name={'영화'} />
            <CommunityButton name={'콘서트'} />
            <CommunityButton name={'뮤지컬'} />
            <CommunityButton name={'연극'} />
          </View>
          <View>
            <TextInput
              multiline
              onChangeText={text => onChangeText(text)}
              value={text}
              placeholder="내용을 입력하세요."
              placeholderTextColor={'#999'}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  headerText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  photoAdd: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.COMMUNITY_GRAY,
    borderRadius: 15,
  },
  photoText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: palette.COMMUNITY_GRAY,
  },
  categoryWrapper: {
    flexDirection: 'row',
    gap: 4,
  },
});

export default CommunityAdd;
