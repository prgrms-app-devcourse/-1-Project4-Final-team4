import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';

import {Colors} from '../utils/Colors';
import {SCREEN_WIDTH, STORAGE_KEY} from '../utils/utils';

import Camera from 'react-native-vector-icons/Feather';
import CategorySelectButton from '../components/CategorySelectButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAddPost} from '../hook/use-addPost';

const cancel = require('../assets/icons/cancel.png');

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
  const {
    images,
    pickImages,
    imagesWithAddButton,
    removeImage,
    selectImage,
    selectedImage,
  } = useAddPost();

  const categorySelect = categoryList.map((name, index) => (
    <CategorySelectButton
      name={name.category}
      key={index}
      isSelect={name.isSelect}
    />
  ));
  const onPressSubmitButton = () => {
    // 등록 버튼 누를 시 파이어베이스 db에 저장
  };
  const onPressOpenGallery = () => {
    pickImages();
  };
  const onPressImage = imageId => removeImage(imageId);

  const renderItem = ({item: image, index}) => {
    const {id, uri} = image;
    if (id === -1) {
      return (
        <TouchableOpacity onPress={onPressOpenGallery} style={styles.photoAdd}>
          <Camera name="camera" size={60} />
          <Text style={styles.photoText}>사진 추가</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onLongPress={() => onPressImage(id)}>
        <Image source={{uri}} style={{width: 100, height: 100, margin: 2}} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
      <View style={{flex: 1}}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={cancel} style={{width: 24, height: 24}} />
          </TouchableOpacity>
          <Text style={styles.headerText}>포스트 작성</Text>
          <TouchableOpacity onPress={onPressSubmitButton}>
            <Text style={styles.headerText}>등록</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 16, gap: 16}}>
          <Text>추가한 이미지</Text>
          <FlatList
            data={imagesWithAddButton}
            renderItem={renderItem}
            numColumns={4}
          />

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
    fontSize: 20,
    fontFamily: 'PretendardBold',
    color: Colors.black,
  },
  photoAdd: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: Colors.main,
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
