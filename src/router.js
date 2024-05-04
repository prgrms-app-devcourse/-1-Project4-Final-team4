import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CustomBottomTab from './components/CustomBottomTab';

import Home from './pages/Home';
import MyPage from './pages/MyPage';
import ScheduleList from './pages/ScheduleList';
import EditProfile from './pages/EditProfile';
import Splash from './pages/Splash';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="검색" component={Home} />
      <Tab.Screen name="빈" component={Home} />
      <Tab.Screen name="일정" component={ScheduleList} />
      <Tab.Screen name="마이페이지" component={MyPage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // gestureEnabled: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default Router;
