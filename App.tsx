import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import Router from './src/router';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

function App(): React.JSX.Element {
  return(
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}

export default App;
