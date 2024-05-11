import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Switch
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo_fullname from '../assets/icons/logo_fullname.png';
import google from '../assets/icons/google.png';
import facebook from '../assets/icons/facebook.png';

const Login = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    retrieveCredentials();
  }, []);

  const retrieveCredentials = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      if (email && password) {
        setEmailValue(email);
        setPasswordValue(password);
        if (autoLogin) {
          login(email, password);
        }
      }
    } catch (error) {
      console.error('Failed to load credentials', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.replace('MainTab');
      await AsyncStorage.setItem('userEmail', email);
      if (autoLogin) {
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('password', password);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('로그인 실패', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo_fullname} style={styles.title} />
      <TouchableOpacity style={styles.buttonSocial}>
        <Image style={styles.social_logo} source={google} />
        <Text>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSocial}>
        <Image style={styles.social_logo} source={facebook} />
        <Text>Continue with Facebook</Text>
      </TouchableOpacity>
      <Text style={styles.or}>이메일로 로그인하기</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        onChangeText={setEmailValue}
        value={emailValue}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        onChangeText={setPasswordValue}
        value={passwordValue}
        secureTextEntry={!showPassword} // 비밀번호 보이기/숨기기
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>자동 로그인</Text>
        <Switch
          value={autoLogin}
          onValueChange={setAutoLogin}
        />
      </View>
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPassword}>
        <Text>{showPassword ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={() => login(emailValue, passwordValue)}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
        <Text>아직 회원이 아니세요? 회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text>비밀번호 찾기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  title: {
    width: 358,
    height: 76,
  },
  input: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderColor: '#333',
    borderRadius: 5,
    backgroundColor: "#d7fffb",
  },
  button: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#80D7CE',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'PretendardBold'
  },
  buttonSocial: {
    width: 374,
    padding: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row',
  },
  social_logo: {
    width: 23,
    height: 23,
    marginLeft: 63,
    marginRight: 12
  },
  or: {
    marginVertical: 20,
    fontSize: 16
  },
  showPassword: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginBottom: 10
  },
  link: {
    marginTop: 5,
    color: 'blue'
  },
  error: {
    color: 'red',
  },
});

export default Login;
