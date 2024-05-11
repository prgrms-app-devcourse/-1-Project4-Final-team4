import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

// 탭 컴포넌트
import CustomBottomTab from './components/CustomBottomTab';

// init 페이지
import Splash from './pages/Splash';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';

// 메인 페이지
import Home from './pages/Home';

// 검색 페이지
import LocationSearchMap from './pages/LocationSearchMap';
import ThemeSearch from './pages/ThemeSearch';

// 커뮤니티 페이지
import Community from './pages/Community';
import CommunityAdd from './pages/CommunityAdd';

// 마이페이지
import MyPage from './pages/MyPage';
import ScheduleList from './pages/ScheduleList';
import EditProfile from './pages/EditProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 바텀탭
const renderBottomBar = props => <CustomBottomTab {...props} />;

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
    </Stack.Navigator>
  );
};
// main탭에서 추천 컨텐츠 전체보기로 들어가는 페이지
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

// 홈 , 검색 , 커뮤니티 , 도구 , 마이페이지
const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderBottomBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="ScheduleList" component={ScheduleList} />
      <Tab.Screen name="Mypage" component={MyPage} />
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
      <Stack.Screen name="LocationSearchMap" component={LocationSearchMap} />
      <Stack.Screen name="ThemeSearch" component={ThemeSearch} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CommunityAdd" component={CommunityAdd} />
    </Stack.Navigator>
  );
};

export default Router;