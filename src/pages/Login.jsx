import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;
  
  const login = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
      console.log(response);
    }
    catch(error) {
      console.log(error);
      Alert('로그인 실패' + error.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
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
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text>{showPassword ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate('Register');
      }}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text>Forgot Password</Text>
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
  },
  input: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ddd',
  },
  error: {
    color: 'red',
  }
});

export default Login;
