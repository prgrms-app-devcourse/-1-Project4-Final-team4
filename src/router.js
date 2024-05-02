import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

// 커뮤니티 페이지
import Community from './pages/Community';
// import FeedDetail from './pages/FeedDetail';
// import AddFeed from './pages/AddFeed';
import Food from './pages/Food';
import Movie from './pages/Movie';
import Show from './pages/Show';
import Sports from './pages/Sports';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 바텀탭
const renderBottomBar = props => <CustomBottomTab {...props} />;
// 상단탭
const renderTopTab = props => <CustomTopTab {...props} />;

// 커뮤니티 페이지 (피드, 맛집, 영화, 공연, 스포츠, 피드추가)
const communityTab = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
        }}>
            <Stack.Screen name="Community" component={Community} />
            {/* <Stack.Screen name="FeedDetail" component={FeedDetail} />
            <Stack.Screen name="AddFeed" component={AddFeed} /> */}
            <Stack.Screen name="Food" component={Food} />
            <Stack.Screen name="Movie" component={Movie} />
            <Stack.Screen name="Show" component={Show} />
            <Stack.Screen name="Sports" component={Sports} />
            <Stack.Screen name="communityTabContent" component={communityTabContent} />
        </Stack.Navigator>
    );
};

// 커뮤니티 상단탭 출력을 위한 중첩구조
const communityTabContent = () => {
    return (
        <Tab.Navigator
            tabBar={renderTopTab}
            screenOptions={{
                headerShown: false,
        }}>
            <Tab.Screen name="Community" component={Community} />
            <Tab.Screen name="Food" component={Food} />
            <Tab.Screen name="Movie" component={Movie} />
            <Tab.Screen name="Show" component={Show} />
            <Tab.Screen name="Sports" component={Sports} />
        </Tab.Navigator>
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
            {/* <Tab.Screen name="Home" component={homeTab} />
            <Tab.Screen name="Search" component={searchTab} /> */}
            <Tab.Screen name="Community" component={communityTab} />
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
            <Stack.Screen name="Main" component={mainTab} />
        </Stack.Navigator>
    );
};

export default Router;
