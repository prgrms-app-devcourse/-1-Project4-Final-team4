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

const dummyData = [
  {
    id: 1,
    title: '산으로 간 고등어',
    Price: 15000,
    category: '식비',
    img: 'https://source.unsplash.com/random.jpg​',
  },
  {
    id: 2,
    title: '산으로 간 연어',
    Price: 50000,
    category: '식비',
    img: 'https://source.unsplash.com/random.jpg​',
  },
  {
    id: 3,
    title: '택시',
    Price: 13400,
    category: '교통비',
    img: 'https://source.unsplash.com/random.jpg​',
  },
  {
    id: 4,
    title: '산으로 간 삼치',
    Price: 36000,
    category: '영화',
    img: 'https://source.unsplash.com/random.jpg​',
  },
  {
    id: 5,
    title: '산으로 간 삼치',
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
  const [data, setData] = useState(dummyData);
  const [totalPrice, setTotalPrice] = useState(0);

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
            borderBottomWidth: 3,
          }}>
          최근 소비내역
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <FlatList
          data={dummyData}
          renderItem={data => {
            return (
              <View style={styles.ContentWrapper}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 20,
                    marginBottom: 36,
                  }}
                  src={data.item.img}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 24,
                    gap: 9,
                  }}>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    {data.item.title}
                  </Text>
                  <Text
                    style={{
                      marginRight: 43,
                      fontSize: 12,
                      color: 'black',
                    }}>
                    {data.item.Price} 원
                  </Text>
                </View>
                <Text style={{fontSize: 15, color: 'black'}}>
                  {data.item.category}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginLeft: 50,
                    gap: 20,
                    marginRight: 0,
                  }}>
                  <TouchableOpacity>
                    <Icon
                      name="plus-circle-outline"
                      size={28}
                      color={Colors.grey}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="close-circle-outline" size={28} color="red" />
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
        }}>
        <Text
          style={{
            fontFamily: 'PretendardBold',
            fontSize: 20,
            color: Colors.black,
          }}>
          총 {totalPrice} 원
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
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
    gap: 10,
    justifyContent: 'flex-start',
  },
});

export default AccountBookPlus;
