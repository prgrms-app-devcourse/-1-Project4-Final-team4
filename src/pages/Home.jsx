import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{height: 300, backgroundColor: 'red'}}>
          <Text>test</Text>
        </View>
        <View style={{height: 300, backgroundColor: 'blue'}}>
          <Text>test</Text>
        </View>
        <View style={{height: 300, backgroundColor: 'green'}}>
          <Text>test</Text>
        </View>
        <View style={{height: 300, backgroundColor: 'yellow'}}>
          <Text>test</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
