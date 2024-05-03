import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../utils/Colors';

const MainHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('MypageTab')}>
          <Image
            source={{uri: 'https://picsum.photos/30'}}
            style={styles.profileImg}
          />
        </TouchableOpacity>
        <View style={{marginLeft: 8}}>
          <Text style={styles.profileText}>~~~ 님</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
        <Icon name={'menu'} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 68,
    flex: 1,
    backgroundColor: Colors.main,
    paddingHorizontal: 24,
  },
  profileText: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 16,
  },
});

export default MainHeader;
