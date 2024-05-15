import Modal from 'react-native-modal';
import React, { useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Colors } from '../utils/Colors';
import { SCREEN_WIDTH } from '../utils/utils';
import AddScheduleInput from './AddScheduleInput';
import Margin from './Margin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FIREBASE_AUTH, updateProfile} from '../firebase/firebase';

const auth = FIREBASE_AUTH;

const EditProfileModal = ({ isVisible, setIsVisible }) => {
  const [input, setInput] = useState('');

  const resetInput = () => setInput('');

  const onSubmitEditing = () => {
    resetInput();
  };

  const onPressEditNameButton = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('email');
      if (!userEmail) {
        Alert.alert('Error', 'Unable to fetch user email');
        return;
      }
      // firebase auth에 사용자 이름 업데이트
      updateProfile(auth.currentUser, {
        displayName: input,
      });
      // 어싱크 스토리지에 사용자 이름 저장
      await AsyncStorage.setItem('userName', input);

      Alert.alert('Success', '사용자 이름이 변경되었습니다.');
      setIsVisible(false); // 모달 닫기
    } catch (error) {
      console.error('사용자 이름 변경 실패:', error);
      Alert.alert('Error', '사용자 이름 변경 실패');
    }
  };

  return (
    <SafeAreaView>
      <Modal
        useNativeDriver
        isVisible={isVisible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={300}
        backdropColor="#000"
        backdropOpacity={0.4}
        onBackdropPress={() => {
          Keyboard.dismiss();
          setIsVisible(!isVisible);
        }}
        onBackButtonPress={() => {
          Keyboard.dismiss();
          setIsVisible(!isVisible);
        }}
        hideModalContentWhileAnimating>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: 200,
            backgroundColor: Colors.background,
            alignSelf: 'center',
          }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 30,
              justifyContent: 'center',
            }}>
            <Text>닉네임: </Text>
            <Margin height={10} />
            <View
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors.main,
              }}>
              <AddScheduleInput
                value={input}
                onChangeText={setInput}
                placeholder={'이름을 입력해주세요.'}
                onSubmitEditing={onSubmitEditing}
              />
            </View>
            <Margin height={8} />
            <TouchableOpacity
              onPress={onPressEditNameButton}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: Colors.main,
                borderRadius: 8,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'PretendardBold',
                  color: Colors.black,
                }}>
                수정하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditProfileModal;
