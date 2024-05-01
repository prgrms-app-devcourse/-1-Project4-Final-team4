import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { signUp } from '../auth';



const Register = () => {

  const userRegister = async () => {
    try {
      if (!nameValue) throw new Error('이름을 입력해 주세요.');
      if (!emailValue) throw new Error('이메일을 입력해 주세요.');
      if (!passwordValue) throw new Error('비밀번호를 입력해 주세요.');

      if (!validateEmail(emailValue)) throw new Error('이메일 형식에 맞지 않습니다.');
      if (!validatePassword(passwordValue))
        throw new Error('비밀번호는 8자 이상 입력해야 합니다.');

      if (!agree) throw new Error('약관에 동의해주세요.');
      await signUp({ email: emailValue, password: passwordValue, name: nameValue });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" secureTextEntry={true} />
      <TouchableOpacity onPress={() => {userRegister}}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Register;