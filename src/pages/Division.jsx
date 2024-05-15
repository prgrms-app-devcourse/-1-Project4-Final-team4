import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import BasicHeader from '../components/BasicHeader.jsx';
import {Colors} from '../utils/Colors.js';
import {SCREEN_WIDTH} from '../utils/utils';

const Division = () => {
  const [totalNum, setTotalNum] = useState(null); // 총비용
  const [personNum, setPersonNum] = useState(null); // 인원수
  const [resultNum, setResultNum] = useState(null); // 결과값
  const [adjustment, setAdjustment] = useState(null); // 남은값 한명 몰아주기

  // 금액을 천원 구분하여 출력 (한국 기준!)
  const formatNumber = number => {
    if (number === null || number === undefined) {
      return '0';
    }
    return number.toLocaleString('ko-KR', {maximumFractionDigits: 0});
  };

  const parseInput = input => {
    return parseInt(input.replace(/,/g, ''), 10);
  };

  const calculatorHandle = () => {
    const total = parseInt(totalNum);
    const people = parseInt(personNum);

    // 금액과 인원 입력 잘 됐는지 확인 및 에러메세지 출력
    if (isNaN(total) || isNaN(people) || people <= 0) {
      Alert.alert('숫자를 체크해주세요! :D');
      return;
    }
    const cost = total / people;
    setResultNum(cost);

    // 기본 단위를 100원 단위로 반올림하기
    const baseCost = Math.floor(total / people / 100) * 100;
    const remainder = total - baseCost * people;
    const adjustedCost = baseCost + (remainder > 0 ? 100 : 0);

    setResultNum(baseCost);
    setAdjustment(remainder > 0 ? adjustedCost : null);
  };

  const resetButton = () => {
    setTotalNum(null);
    setPersonNum(null);
    setResultNum(null);
    setAdjustment(null);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BasicHeader isBackButton={true} title={'더치페이'} />
      <View style={styles.TextInContainer}>
        <Text style={{fontFamily: 'PretendardBold', fontSize: 20}}>
          더치페이 계산기!
        </Text>
        <View style={{alignItems: 'flex-end', gap: 17}}>
          <View style={styles.TextInWrapper}>
            <Text style={styles.InputText}>총 비용을 알려주세요!</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.TextIn}
              placeholder="터치해주세요!"
              value={totalNum}
              onChangeText={setTotalNum}
            />
          </View>
          <View style={styles.TextInWrapper}>
            <Text style={styles.InputText}>몇 명이신가요?</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.PersonTextIn}
              placeholder="터치!"
              value={personNum}
              onChangeText={setPersonNum}
            />
          </View>
          <View style={styles.ResultTextInWrapper}>
            <Text style={styles.ResultInputText}>1인당 비용 :</Text>
            <Text style={styles.ResultInputText}>
              {formatNumber(resultNum)} 원
            </Text>
          </View>
          <View>
            {adjustment && (
              <Text style={styles.PlusResultText}>
                * 한 명은 {formatNumber(adjustment)} 원을 내야 합니다.
              </Text>
            )}
          </View>
        </View>

        <View style={{flexDirection: 'row', gap: 18}}>
          <TouchableOpacity onPress={resetButton} style={styles.ResultButton}>
            <Text style={styles.ResultText}>리셋!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={calculatorHandle}
            style={styles.ResultButton}>
            <Text style={styles.ResultText}>계산하기!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TextInContainer: {
    width: SCREEN_WIDTH * 0.9,
    height: 430,
    backgroundColor: '#d9f3f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 23,
    borderRadius: 16,
    gap: 21,
    marginTop: 150,
    borderWidth: 4,
    borderColor: Colors.mint,
  },
  TextInWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  ResultTextInWrapper: {
    flexDirection: 'row',
    gap: 15,
    borderWidth: 3,
    width: 200,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextIn: {
    width: 120,
    height: 40,
    color: Colors.black,
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Pretendard',
    fontSize: 15,
  },
  PersonTextIn: {
    width: 60,
    height: 40,
    color: Colors.black,
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputText: {fontFamily: 'PretendardMedium', fontSize: 15},
  ResultInputText: {
    fontFamily: 'PretendardBold',
    fontSize: 18,
    // color: '#0080FE',
    // color: '#4682B4',
    color: '#4F97A3',
  },
  ResultButton: {
    width: 150,
    height: 40,
    color: Colors.black,
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderBottomWidth: 3,
    borderEndWidth: 3,
    borderColor: Colors.mint,
  },
  ResultText: {fontFamily: 'PretendardBold', fontSize: 20},
  PlusResultText: {
    fontFamily: 'PretendardBold',
    fontSize: 15,
    color: '#4682B4',
  },
});

export default Division;
