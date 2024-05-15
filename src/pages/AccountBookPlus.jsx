import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {containerStyle, marginHorizontal} from '../utils/utils';
import React from 'react';
import {Colors} from '../utils/Colors';
import BasicHeader from '../components/BasicHeader';
import {SCREEN_WIDTH} from '../utils/utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AccountBookPlus = ({navigation}) => {
  return (
    <SafeAreaView style={containerStyle}>
      {/* 헤더 */}
      <BasicHeader isBackButton={true} title={'가계부 상세'} />

      <View>
        <Text
          style={{
            fontFamily: 'PretendardBold',
            fontSize: 20,
            color: Colors.black,
          }}>
          최근 소비내역
        </Text>
      </View>
      <FlatList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userWrapper: {
    height: 250,
    width: SCREEN_WIDTH,
    paddingHorizontal: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    borderBottomWidth: 15,
    borderColor: '#80D7CE',
  },
  userNameText: {
    color: Colors.black,
    fontSize: 28,
    fontFamily: 'PretendardBold',
    textAlign: 'center',
  },
  resultWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: 330,
    height: 70,
    borderRadius: 16,
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 15,
  },
  box: {
    width: 160,
    height: 140,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#80D7CE',
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  contentText: {
    fontFamily: 'PretendardBold',
    fontSize: 18,
    color: Colors.black,
  },
  buttonStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#80D7CE',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountBookPlus;
