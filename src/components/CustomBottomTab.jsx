import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, Animated, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Ionicons';

import {Colors} from '../utils/Colors';
import {BOTTOM_HEIGHT} from '../utils/utils';

const CustomBottomTab = ({state, navigation, insets, descriptors}) => {
  const tab1Value = useRef(new Animated.Value(0)).current;
  const tab2Value = useRef(new Animated.Value(0)).current;
  const tab3Value = useRef(new Animated.Value(0)).current;
  const tab4Value = useRef(new Animated.Value(0)).current;
  const tab5Value = useRef(new Animated.Value(0)).current;

  const animatedValue = {
    0: tab1Value,
    1: tab2Value,
    2: tab3Value,
    3: tab4Value,
    4: tab5Value,
  };

  return (
    <View style={[styles.bottomTabBarWrapper, {paddingBottom: insets.bottom}]}>
      {state.routes.map((route, index) => {
        const label = route.name;
        const isFocused = state.index === index;

        const iconFlag = bool => {
          switch (label) {
            case '홈':
              return (
                <Icon
                  name="home"
                  color={isFocused ? '#000' : 'grey'}
                  size={30}
                />
              );
            case '검색':
              return (
                <Icon
                  name="search1"
                  color={isFocused ? '#000' : 'grey'}
                  size={30}
                />
              );

            case '빈':
              return (
                <Icons
                  name="people"
                  color={isFocused ? '#000' : 'grey'}
                  size={30}
                />
              );

            case '일정':
              return (
                <Icon
                  name="calendar"
                  color={isFocused ? '#000' : 'grey'}
                  size={30}
                />
              );

            default:
              return (
                <Icon
                  name="setting"
                  color={isFocused ? '#000' : 'grey'}
                  size={30}
                />
              );
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(`${label}`);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={onPress}
            style={{flex: 1, alignItems: 'center'}}>
            {iconFlag(label)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBarWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#000',
    backgroundColor: Colors.ACTIVE_COLOR,
    paddingTop: BOTTOM_HEIGHT,
    zIndex: 10,
  },
});

export default CustomBottomTab;
