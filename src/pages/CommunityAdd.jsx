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

import {Colors} from '../utils/Colors';
import {SCREEN_WIDTH} from '../utils/utils';

import CommunityButton from '../components/CommunityButton';

const cancel = require('../assets/icons/cancel.png');
const camera = require('../assets/icons/camera.png');

const CommunityAdd = ({navigation}) => {
  const [text, onChangeText] = useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
      <View style={{flex: 1}}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={cancel} style={{width: 24, height: 24}} />
          </TouchableOpacity>
          <Text style={styles.headerText}>포스트 작성</Text>
          <TouchableOpacity>
            <Text style={styles.headerText}>등록</Text>
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
              maxLength={1000}
              placeholder="내용을 입력하세요."
              placeholderTextColor={Colors.grey}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              value={text}
              onChangeText={text => onChangeText(text)}
            />
          </View>
        </View>
        <View style={styles.line} />
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
    fontSize: 16,
    fontFamily: 'PretendardBold',
    color: Colors.black,
  },
  photoAdd: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 15,
  },
  photoText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    color: Colors.grey,
  },
  categoryWrapper: {
    flexDirection: 'row',
    gap: 4,
  },
  line: {
    width: SCREEN_WIDTH,
    height: 1,
    backgroundColor: Colors.border_color,
    marginVertical: 20,
  },
});

export default CommunityAdd;
