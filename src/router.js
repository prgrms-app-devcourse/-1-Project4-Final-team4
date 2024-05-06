import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';

// 커뮤니티 페이지
import Community from './pages/Community';
// import FeedDetail from './pages/FeedDetail';
// import AddFeed from './pages/AddFeed';
import Food from './pages/Food';
import Movie from './pages/Movie';
import Concert from './pages/Concert';
import Show from './pages/Show';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

// 바텀탭
// const renderBottomBar = props => <CustomBottomTab {...props} />;
// 상단탭
// const renderTopTab = props => <CustomTopTab {...props} />;

// 커뮤니티 상단탭 출력을 위한 중첩구조
const CommunityTabContent = () => {
  return (
    <TopTab.Navigator
      // tabBar={renderTopTab}
      screenOptions={{
        headerShown: false,
      }}>
      <TopTab.Screen name="Feed" component={Community} />
      <TopTab.Screen name="Food" component={Food} />
      <TopTab.Screen name="Movie" component={Movie} />
      <TopTab.Screen name="Concert" component={Concert} />
      <TopTab.Screen name="Show" component={Show} />
    </TopTab.Navigator>
  );
};

// 커뮤니티 페이지 (피드, 맛집, 영화, 공연, 스포츠, 피드추가)
const CommunityTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Feed" component={Community} />
      <Stack.Screen name="Food" component={Food} />
      <Stack.Screen name="Movie" component={Movie} />
      <Stack.Screen name="Concert" component={Concert} />
      <Stack.Screen name="Show" component={Show} />
      <Stack.Screen
        name="CommunityTabContent"
        component={CommunityTabContent}
      />
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
      {/* <Tab.Screen name="Home" component={homeTab} />
            <Tab.Screen name="Search" component={searchTab} /> */}
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
