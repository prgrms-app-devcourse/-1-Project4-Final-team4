import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {containerStyle, marginHorizontal} from '../utils/utils';
import React, {useState, useEffect} from 'react';
import {Colors} from '../utils/Colors';
import BasicHeader from '../components/BasicHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LunchIcon from 'react-native-vector-icons/MaterialIcons';
import ShoppingIcon from 'react-native-vector-icons/MaterialIcons';

const dummyData = [
  {
    id: 1,
    title: ' 치킨  ',
    Price: 15000,
    category: '식비',
    img: 'https://source.unsplash.com/random.jpg​',
  },
  {
    id: 2,
    title: ' 초밥  ',
    Price: 50000,
    category: '식비',
    img: 'https://source.unsplash.com/random.jpg​',
  },
  {
    id: 3,
    title: ' 택시  ',
    Price: 13400,
    category: '교통비',
    img: 'https://source.unsplash.com/random.jpg​',
  },
  {
    id: 4,
    title: ' 존윅4 ',
    Price: 36000,
    category: '영화',
    img: 'https://source.unsplash.com/random.jpg​',
  },
  {
    id: 5,
    title: ' 갈비찜 ',
    Price: 35000,
    category: '식비',
    img: 'https://source.unsplash.com/random.jpg​',
  },
  {
    id: 6,
    title: '올리브영',
    Price: 82000,
    category: '쇼핑',
    img: 'https://source.unsplash.com/random.jpg​',
  },
];

const AccountBookPlus = ({navigation}) => {
  // 데이터 리스트
  const [data, setData] = useState(dummyData);
  //총 합계금액 계산식
  const totalPrice = data.reduce((total, item) => total + item.Price, 0);

  //항목 삭제
  const deleteHandle = index => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

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
            marginHorizontal: 20,
            borderBottomWidth: 1,
            height: 40,
          }}>
          최근 소비내역
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          flex: 1,
        }}>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            // 카테고리에 따라 아이콘 분류
            let categoryIcon;
            if (item.category === '영화') {
              categoryIcon = (
                <Icon name={'movie-open'} size={55} color={Colors.grey} />
              );
            } else if (item.category === '식비') {
              categoryIcon = (
                <LunchIcon
                  name={'lunch-dining'}
                  size={55}
                  color={Colors.grey}
                />
              );
            } else if (item.category === '쇼핑') {
              categoryIcon = (
                <ShoppingIcon
                  name={'shopping-cart'}
                  size={55}
                  color={Colors.grey}
                />
              );
            } else {
              // 다른 카테고리에 따른 아이콘 표시
              categoryIcon = (
                <Icon name={'bus'} size={55} color={Colors.grey} />
              );
            }
            return (
              <View style={styles.ContentWrapper}>
                {categoryIcon}
                <View style={{width: 80, alignItems: 'center'}}>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    width: 100,
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                    }}>
                    {item.Price.toLocaleString()} 원
                  </Text>
                </View>
                <View
                  style={{
                    width: 50,
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    {item.category}
                  </Text>
                </View>
                <View style={{}}>
                  <TouchableOpacity onPress={() => deleteHandle(index)}>
                    <Icon
                      name="close-circle-outline"
                      size={28}
                      color={Colors.main}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          marginRight: 20,
          flex: 0.1,
        }}>
        <Text
          style={{
            fontFamily: 'PretendardBold',
            fontSize: 20,
            color: Colors.black,
          }}>
          총 {totalPrice.toLocaleString()} 원
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  ContentWrapper: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
    gap: 20,
    justifyContent: 'flex-start',
    width: 380,
    height: 60,
    alignItems: 'center',
  
  },
});

export default AccountBookPlus;
