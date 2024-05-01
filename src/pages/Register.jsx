import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { signUp } from '../auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';



const Register = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const register = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
      console.log(response);
      Alert('회원가입 성공' + response.user.email);
    }
    catch(error) {
      console.log(error);
      Alert('회원가입 실패' + error.message)
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <View>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" secureTextEntry={true} />
      <TouchableOpacity onPress={() => {register}}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Register;