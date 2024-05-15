import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {containerStyle, marginHorizontal} from '../utils/utils';
import React from 'react';
import {Colors} from '../utils/Colors';
import BasicHeader from '../components/BasicHeader';
import {SCREEN_WIDTH} from '../utils/utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LunchIcon from 'react-native-vector-icons/MaterialIcons';
import ShoppingIcon from 'react-native-vector-icons/MaterialIcons';

const AccountBook = ({navigation}) => {
  return (
    <SafeAreaView style={containerStyle}>
      {/* 헤더 */}
      <BasicHeader isBackButton={true} title={'가계부'} />

      {/* 유저네임, 지출 비용 연동되게 할 것 */}
      <View style={styles.userWrapper}>
        <View>
          <Text style={styles.userNameText}>서진님 가계부</Text>
        </View>
        <View style={styles.resultWrapper}>
          <Text style={styles.userNameText}>총 사용 금액 125,000 원</Text>
        </View>
      </View>
      <View style={styles.contentWrapper}>
        {/* 첫 번째 열 */}
        <View style={styles.boxWrapper}>
          <TouchableOpacity style={styles.box} activeOpacity={0.7}>
            <Icon name="movie-open" size={55} color={Colors.grey} />
            <Text style={styles.contentText}>영화 2회</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} activeOpacity={0.7}>
            <Icon name="music" size={55} color={Colors.grey} />
            <Text style={styles.contentText}>콘서트 0회</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} activeOpacity={0.7}>
            <ShoppingIcon name="shopping-cart" size={55} color={Colors.grey} />
            <Text style={styles.contentText}>쇼핑 1회</Text>
          </TouchableOpacity>
        </View>
        {/* 두 번째 열 */}
        <View style={styles.boxWrapper}>
          <TouchableOpacity style={styles.box} activeOpacity={0.7}>
            <LunchIcon name="lunch-dining" size={55} color={Colors.grey} />
            <Text style={styles.contentText}>식비 3회</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} activeOpacity={0.7}>
            <Icon name="bus" size={55} color={Colors.grey} />
            <Text style={styles.contentText}>교통비</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} activeOpacity={0.7}>
            <Icon name="butterfly-outline" size={55} color={Colors.grey} />
            <Text style={styles.contentText}>기타</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          marginHorizontal: 20,
          marginBottom: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AccountBookPlus')}
          activeOpacity={0.7}
          style={styles.buttonStyle}>
          <Icon name="shopping-outline" size={45} color={Colors.black} />
        </TouchableOpacity>
      </View>
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
    gap: 30,
    borderBottomWidth: 10,
    borderColor: '#80D7CE',
    backgroundColor: '#d9f3f1',
  },
  userNameText: {
    color: Colors.black,
    fontSize: 24,
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

export default AccountBook;
