import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-devsettings';
import Router from './src/router';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

export default App;
