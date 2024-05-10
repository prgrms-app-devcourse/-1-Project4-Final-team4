import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';
import {authService} from '../libs/firebase';

function Login() {
  <SafeAreaView>
    <Pressable
      onPress={() => {
        authService
          .createUserWithEmailAndPassword(
            'jane.de@example.com',
            'SuperSecretPassword!',
          )
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
      }}>
      <Text>로그인 하기</Text>
    </Pressable>
  </SafeAreaView>;
}
export default Login;
