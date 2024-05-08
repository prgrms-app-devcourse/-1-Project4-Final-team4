import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

// 커뮤니티 페이지
import Community from './pages/Community';
import Home from './pages/Home';
import CommunityAdd from './pages/CommunityAdd';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 바텀탭
// const renderBottomBar = props => <CustomBottomTab {...props} />;
// 상단탭
// const renderTopTab = props => <CustomTopTab {...props} />;

// 커뮤니티 페이지 (피드, 맛집, 영화, 공연, 스포츠, 피드추가)
const CommunityTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Feed" component={Community} />
      <Stack.Screen name="Add" component={CommunityAdd} />
    </Stack.Navigator>
  );
};

// 홈 , 검색 , 커뮤니티 , 도구 , 마이페이지
const MainTab = () => {
  return (
    <Tab.Navigator
      // tabBar={renderBottomBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Community" component={CommunityTab} />
      {/* <Tab.Screen name="Tool" component={toolTab} />
            <Tab.Screen name="Mypage" component={mypageTab} /> */}
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={loginTab} /> */}
      <Stack.Screen name="Main" component={MainTab} />
    </Stack.Navigator>
  );
};

export default Router;
