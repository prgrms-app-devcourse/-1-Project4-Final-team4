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
import LocationSearchMap from './pages/LocationSearchMap';
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
import MyPage from './pages/MyPage';
import Settings from './pages/Settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 바텀탭
const renderBottomBar = props => <CustomBottomTab {...props} />;
// 상단탭
const renderTopTab = props => <CustomTopTab {...props} />;

// login 탭 (로그인, 회원가입, 도움말 페이지)
const LoginTab = () => {
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
const HomeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="LocationSearchMap" component={LocationSearchMap} />
      <Stack.Screen name="ThemeSearch" component={ThemeSearch} />
      <Stack.Screen name="Article" component={ArticleTab} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
    </Stack.Navigator>
  );
};

// main탭에서 추천 컨텐츠 전체보기로 들어가는 페이지
const ArticleTab = () => {
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
const SearchTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="LocationSearchMap" component={LocationSearchMap} />
      <Stack.Screen name="ThemeSearch" component={ThemeSearch} />
    </Stack.Navigator>
  );
};

// 커뮤니티 페이지 (피드, 맛집, 영화, 공연, 스포츠, 피드추가)
const CommunityTab = () => {
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
        component={CommunityTabContent}
      />
    </Stack.Navigator>
  );
};

// 커뮤니티 상단탭 출력을 위한 중첩구조
const CommunityTabContent = () => {
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
const ToolTab = () => {
  return (
    <Stack.Navigator
      tabBar={renderBottomBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="toolTopTab" component={ToolTabContent} />
    </Stack.Navigator>
  );
};

// 커뮤니티 상단탭 출력을 위한 중첩구조
const ToolTabContent = () => {
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
const MypageTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
};

// 홈 , 검색 , 커뮤니티 , 도구 , 마이페이지
const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderBottomBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="HomeTab" component={HomeTab} />
      <Tab.Screen name="SearchTab" component={SearchTab} />
      <Tab.Screen name="CommunityTab" component={CommunityTab} />
      <Tab.Screen name="ToolTab" component={ToolTab} />
      <Tab.Screen name="MypageTab" component={MypageTab} />
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
      <Stack.Screen name="LoginTab" component={LoginTab} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  );
};

export default Router;
