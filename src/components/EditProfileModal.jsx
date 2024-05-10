import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../utils/Colors';
import {SCREEN_WIDTH} from '../utils/utils';
import AddScheduleInput from './AddScheduleInput';
import dayjs from 'dayjs';
import Margin from './Margin';

const EditProfileModal = ({isVisible, setIsVisible}) => {
  const [input, setInput] = useState('');
  const resetInput = () => setInput('');
  const onSubmitEditing = () => {
    resetInput();
  };
  const onPressEditNameButton = () => {
    // 파이어베이스 스토리지의 회원 정보 수정
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
                  fontWeight: 'bold',
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
