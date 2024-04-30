import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  { userLogin } from '../auth';

const Login = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const initInput = () => {
    setEmailValue('');
    setPasswordValue('');
    setShowPassword(false);
  };

  const login = () => {
    try {
      if (!emailValue) throw new Error('이메일을 입력해 주세요.');
      if (!passwordValue) throw new Error('비밀번호를 입력해 주세요.');

      // validateEmail(emailValue);
      userLogin({ email: emailValue, password: passwordValue });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View>
      <TextInput placeholder="Useremail" onChangeText={setEmailValue} value={emailValue} />
      <TextInput placeholder="Password" secureTextEntry={true} onChangeText={setPasswordValue} value={passwordValue} />
      <TouchableOpacity onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>{
          initInput();
          navigation.navigate('SignUp')
        }
      }>
        <Text>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;