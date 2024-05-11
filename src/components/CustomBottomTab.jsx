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
            case 'Home':
              return (
                <Icon
                  name="home"
                  color={isFocused ? Colors.main : 'grey'}
                  size={30}
                />
              );
            case 'Community':
              return (
                <Icons
                  name="people"
                  color={isFocused ? Colors.main : 'grey'}
                  size={30}
                />
              );

            case 'ScheduleList':
              return (
                <Icon
                  name="calendar"
                  color={isFocused ? Colors.main : 'grey'}
                  size={30}
                />
              );

            default:
              return (
                <Icon
                  name="setting"
                  color={isFocused ? Colors.main : 'grey'}
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
    borderColor: Colors.main,
    backgroundColor: '#fff',
    paddingTop: BOTTOM_HEIGHT,
    zIndex: 10,
  },
});

export default CustomBottomTab;
