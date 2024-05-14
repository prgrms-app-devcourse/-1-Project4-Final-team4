import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomBottomTab from './components/CustomBottomTab';
import ForgotPassword from './pages/ForgotPassword';
import Community from './pages/Community';
import ScheduleList from './pages/ScheduleList';
import MyPage from './pages/MyPage';
import Home from './pages/Home';
import Splash from './pages/Splash';
import LocationSearchMap from './pages/LocationSearchMap';
import Division from './pages/Division';
import AccountBook from './pages/AccountBook';
import ThemeSearch from './pages/ThemeSearch';
import EditProfile from './pages/EditProfile';
import CommunityAdd from './pages/CommunityAdd';
import ContentDetail from './pages/ContentDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Article from './pages/Article';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 바텀탭
const renderBottomBar = props => <CustomBottomTab {...props} />;

// 홈 , 커뮤니티 , 도구 , 마이페이지
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
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="LocationSearchMap" component={LocationSearchMap} />
      <Stack.Screen name="AccountBook" component={AccountBook} />
      <Stack.Screen name="Division" component={Division} />
      <Stack.Screen name="ThemeSearch" component={ThemeSearch} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CommunityAdd" component={CommunityAdd} />
      <Stack.Screen name="ContentDetail" component={ContentDetail} />
    </Stack.Navigator>
  );
};

export default Router;
