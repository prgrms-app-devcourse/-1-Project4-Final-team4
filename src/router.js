import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomBottomTab from './components/CustomBottomTab';
import Home from './pages/Home';
import Search from './pages/Search';
import Community from './pages/Community';
import ScheduleList from './pages/ScheduleList';
import Settings from './pages/Settings';
import Splash from './pages/Splash';
import EditProfile from './pages/EditProfile';
import MyPage from './pages/MyPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="검색" component={Search} />
      <Tab.Screen name="커뮤니티" component={Community} />
      <Tab.Screen name="일정" component={ScheduleList} />
      <Tab.Screen name="마이페이지" component={Settings} />
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
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  );
};
export default Router;
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import React from 'react';

// // 탭 컴포넌트
// import CustomBottomTab from './components/CustomBottomTab';
// import CustomTopTab from './components/CustomTopTab';

// // init 페이지
// import Splash from './pages/Splash';
// import Login from './pages/Login';
// import ForgotPassword from './pages/ForgotPassword';
// import Register from './pages/Register';
// import Help from './pages/Help';

// // 메인 페이지
// import Home from './pages/Home';
// import Article from './pages/Article';
// import ArticleDetail from './pages/ArticleDetail';

// // 검색 페이지
// import Search from './pages/Search';
// import LocationSearch from './pages/LocationSearch';
// import ThemeSearch from './pages/ThemeSearch';

// // 커뮤니티 페이지
// import Feed from './pages/Feed';
// import FeedDetail from './pages/FeedDetail';
// import AddFeed from './pages/AddFeed';
// import Food from './pages/AddFeed';
// import Movie from './pages/AddFeed';
// import Show from './pages/AddFeed';
// import Sports from './pages/Sports';

// // 도구 페이지
// import Calculator from './pages/Calculator';
// import Calendar from './pages/Calendar';

// // 마이페이지
// import Mypage from './pages/Mypage';
// import Setting from './pages/Setting';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
// const TopTab = createMaterialTopTabNavigator();

// // 바텀탭
// const renderBottomBar = props => <CustomBottomTab {...props} />;
// // 상단탭
// const renderTopTab = props => <CustomTopTab {...props} />;

// // login 탭 (로그인, 회원가입, 도움말 페이지)
// const LoginTab = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Register" component={Register} />
//       <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//       <Stack.Screen name="Help" component={Help} />
//     </Stack.Navigator>
//   );
// };

// // main탭 (메인, 아티클, 검색탭)
// const HomeTab = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="searchTab" component={SearchTab} />
//       <Stack.Screen name="Article" component={ArticleTab} />
//       <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
//     </Stack.Navigator>
//   );
// };

// // main탭에서 추천 컨텐츠 전체보기로 들어가는 페이지
// const ArticleTab = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Article" component={Article} />
//       <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
//     </Stack.Navigator>
//   );
// };

// // 검색페이지 (지역별 검색, 테마별 검색)
// const SearchTab = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Search" component={Search} />
//       <Stack.Screen name="LocationSearch" component={LocationSearch} />
//       <Stack.Screen name="ThemeSearch" component={ThemeSearch} />
//     </Stack.Navigator>
//   );
// };

// // 커뮤니티 페이지 (피드, 맛집, 영화, 공연, 스포츠, 피드추가)
// const CommunityTab = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Feed" component={Feed} />
//       <Stack.Screen name="FeedDetail" component={FeedDetail} />
//       <Stack.Screen name="AddFeed" component={AddFeed} />
//       <Stack.Screen name="Food" component={Food} />
//       <Stack.Screen name="Movie" component={Movie} />
//       <Stack.Screen name="Show" component={Show} />
//       <Stack.Screen name="Sports" component={Sports} />
//       <Stack.Screen
//         name="communityTabContent"
//         component={CommunityTabContent}
//       />
//     </Stack.Navigator>
//   );
// };

// // 커뮤니티 상단탭 출력을 위한 중첩구조
// const CommunityTabContent = () => {
//   return (
//     <TopTab.Navigator
//       tabBar={renderTopTab}
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <TopTab.Screen name="Feed" component={Feed} />
//       <TopTab.Screen name="Food" component={Food} />
//       <TopTab.Screen name="Movie" component={Movie} />
//       <TopTab.Screen name="Show" component={Show} />
//       <TopTab.Screen name="Sports" component={Sports} />
//     </TopTab.Navigator>
//   );
// };

// // 도구페이지 (가계부, 일정)
// const ToolTab = () => {
//   return (
//     <Stack.Navigator
//       tabBar={renderBottomBar}
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Calculator" component={Calculator} />
//       <Stack.Screen name="Calendar" component={Calendar} />
//       <Stack.Screen name="toolTopTab" component={ToolTabContent} />
//     </Stack.Navigator>
//   );
// };

// // 커뮤니티 상단탭 출력을 위한 중첩구조
// const ToolTabContent = () => {
//   return (
//     <TopTab.Navigator
//       tabBar={renderTopTab}
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <TopTab.Screen name="Calculator" component={Calculator} />
//       <TopTab.Screen name="Calendar" component={Calendar} />
//     </TopTab.Navigator>
//   );
// };

// // 마이페이지 (설정, 도움말)
// const MypageTab = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Mypage" component={Mypage} />
//       <Stack.Screen name="Setting" component={Setting} />
//       <Stack.Screen name="Help" component={Help} />
//     </Stack.Navigator>
//   );
// };

// // 홈 , 검색 , 커뮤니티 , 도구 , 마이페이지
// const MainTab = () => {
//   return (
//     <Tab.Navigator
//       tabBar={renderBottomBar}
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Tab.Screen name="Home" component={HomeTab} />
//       <Tab.Screen name="Search" component={SearchTab} />
//       <Tab.Screen name="Community" component={CommunityTab} />
//       <Tab.Screen name="Tool" component={ToolTab} />
//       <Tab.Screen name="Mypage" component={MypageTab} />
//     </Tab.Navigator>
//   );
// };

// const Router = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Splash" component={Splash} />
//       <Stack.Screen name="Login" component={LoginTab} />
//       <Stack.Screen name="Main" component={MainTab} />
//     </Stack.Navigator>
//   );
// };

// export default Router;
