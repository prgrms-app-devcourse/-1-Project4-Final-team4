import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const menuIcon = require('../assets/icons/menu.png');

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            height: 68,
            backgroundColor: '#80D7CE',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
          }}>
          <View style={{flexDirection: 'row', columnGap: 8}}>
            <Text>사진</Text>
            <Text>admin 님</Text>
          </View>
          <TouchableOpacity>
            <Image source={menuIcon} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
