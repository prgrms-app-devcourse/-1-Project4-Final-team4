import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';

// 탭 컴포넌트
import CustomBottomTab from './components/CustomBottomTab';
import CustomTopTab from './components/CustomTopTab';

// init 페이지
import Splash from './pages/Splash';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Help from './pages/Help';

// 메인 페이지
import Home from './pages/Home';
import Article from './pages/Article';
import ArticleDetail from './pages/ArticleDetail';

// 검색 페이지
import Search from './pages/Search';
import LocationSearch from './pages/LocationSearch';
import ThemeSearch from './pages/ThemeSearch';

// 커뮤니티 페이지
import Feed from './pages/Feed';
import FeedDetail from './pages/FeedDetail';
import AddFeed from './pages/AddFeed';
import Food from './pages/AddFeed';
import Movie from './pages/AddFeed';
import Show from './pages/AddFeed';
import Sports from './pages/Sports';

// 도구 페이지
import Calculator from './pages/Calculator';
import Calendar from './pages/Calendar';

// 마이페이지
import Mypage from './pages/Mypage';
import Setting from './pages/Setting';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

// 바텀탭
const renderBottomBar = props => <CustomBottomTab {...props} />;
// 상단탭
const renderTopTab = props => <CustomTopTab {...props} />;

// login 탭 (로그인, 회원가입, 도움말 페이지)
const loginTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
};

// main탭 (메인, 아티클, 검색탭)
const homeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="searchTab" component={searchTab} />
      <Stack.Screen name="Article" component={articleTab} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
    </Stack.Navigator>
  );
};

// main탭에서 추천 컨텐츠 전체보기로 들어가는 페이지
const articleTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
    </Stack.Navigator>
  );
};

// 검색페이지 (지역별 검색, 테마별 검색)
const searchTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="locationSearch" component={LocationSearch} />
      <Stack.Screen name="themeSearch" component={ThemeSearch} />
    </Stack.Navigator>
  );
};

// 커뮤니티 페이지 (피드, 맛집, 영화, 공연, 스포츠, 피드추가)
const communityTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="FeedDetail" component={FeedDetail} />
      <Stack.Screen name="AddFeed" component={AddFeed} />
      <Stack.Screen name="Food" component={Food} />
      <Stack.Screen name="Movie" component={Movie} />
      <Stack.Screen name="Show" component={Show} />
      <Stack.Screen name="Sports" component={Sports} />
      <Stack.Screen
        name="communityTabContent"
        component={communityTabContent}
      />
    </Stack.Navigator>
  );
};

// 커뮤니티 상단탭 출력을 위한 중첩구조
const communityTabContent = () => {
  return (
    <TopTab.Navigator
      tabBar={renderTopTab}
      screenOptions={{
        headerShown: false,
      }}>
      <TopTab.Screen name="Feed" component={Feed} />
      <TopTab.Screen name="Food" component={Food} />
      <TopTab.Screen name="Movie" component={Movie} />
      <TopTab.Screen name="Show" component={Show} />
      <TopTab.Screen name="Sports" component={Sports} />
    </TopTab.Navigator>
  );
};

// 도구페이지 (가계부, 일정)
const toolTab = () => {
  return (
    <Stack.Navigator
      tabBar={renderBottomBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="toolTopTab" component={toolTabContent} />
    </Stack.Navigator>
  );
};

// 커뮤니티 상단탭 출력을 위한 중첩구조
const toolTabContent = () => {
  return (
    <TopTab.Navigator
      tabBar={renderTopTab}
      screenOptions={{
        headerShown: false,
      }}>
      <TopTab.Screen name="Calculator" component={Calculator} />
      <TopTab.Screen name="Calendar" component={Calendar} />
    </TopTab.Navigator>
  );
};

// 마이페이지 (설정, 도움말)
const mypageTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Mypage" component={Mypage} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
};

// 홈 , 검색 , 커뮤니티 , 도구 , 마이페이지
const mainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderBottomBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={homeTab} />
      <Tab.Screen name="Search" component={searchTab} />
      <Tab.Screen name="Community" component={communityTab} />
      <Tab.Screen name="Tool" component={toolTab} />
      <Tab.Screen name="Mypage" component={mypageTab} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={loginTab} />
      <Stack.Screen name="Main" component={mainTab} />
    </Stack.Navigator>
  );
};

export default Router;
