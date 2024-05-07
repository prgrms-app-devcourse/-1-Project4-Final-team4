import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase';
import logo_fullname from '../assets/icons/logo_fullname.png';
import google from '../assets/icons/google.svg';
import facebook from '../assets/icons/facebook.svg';

const Register = () => {
  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  
  const register = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
      if (response.user) {
        await updateProfile(response.user, {
          displayName: usernameValue
        });
        Alert.alert('회원가입 성공', '가입된 이메일: ' + response.user.email);
        navigation.replace('MainTab');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('회원가입 실패', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo_fullname} style={styles.title} />
      <TextInput 
        style={styles.input}
        placeholder="유저 이름"
        value={usernameValue}
        onChangeText={setUsernameValue}
      />
      <TextInput 
        style={styles.input}
        placeholder="이메일"
        value={emailValue}
        onChangeText={setEmailValue}
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input}
        placeholder="비밀번호"
        value={passwordValue}
        onChangeText={setPasswordValue}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPasswordButton}>
        <Text>{showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={register} style={styles.registerButton}>
        <Text>회원가입하기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
        <Text>이미 계정이 있으신가요? 로그인</Text>
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
    backgroundColor: '#FFF'  // 조정된 배경색
  },
  title: {
    width: 358,
    height: 76,
  },
  input: {
    width: '90%',
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff'  // 입력 필드 배경색
  },
  registerButton: {
    backgroundColor: '#80D7CE',  // 버튼 색상
    padding: 12,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5
  },
  showPasswordButton: {
    marginVertical: 5,
    width: '90%',
    alignItems: 'center',
  },
  loginButton: {
    marginTop: 5,
    width: '90%',
    alignItems: 'center',
  }
});

export default Register;
