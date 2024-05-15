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

import CategorySelectButton from '../components/CategorySelectButton';

const cancel = require('../assets/icons/cancel.png');
const camera = require('../assets/icons/camera.png');

const categoryList = [
  {
    category: '맛집',
    isSelect: 'false',
  },
  {
    category: '영화',
    isSelect: 'false',
  },
  {
    category: '콘서트',
    isSelect: 'false',
  },
  {
    category: '뮤지컬',
    isSelect: 'false',
  },
  {
    category: '연극',
    isSelect: 'false',
  },
];

const CommunityAdd = ({navigation}) => {
  const [text, onChangeText] = useState('');

  const categorySelect = categoryList.map((name, index) => (
    <CategorySelectButton
      name={name.category}
      key={index}
      isSelect={name.isSelect}
    />
  ));

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
          <View style={styles.categoryWrapper}>{categorySelect}</View>
          <View>
            <TextInput
              multiline
              textAlignVertical="top"
              maxLength={1000}
              placeholder="내용을 입력하세요. (1000자 이내)"
              placeholderTextColor={Colors.grey}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              value={text}
              onChangeText={text => onChangeText(text)}
              style={styles.textInput}
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
  textInput: {
    width: SCREEN_WIDTH - 32,
    height: 200,
    padding: 16,
    backgroundColor: Colors.border_color,
    borderRadius: 15,
  },
});

export default CommunityAdd;
