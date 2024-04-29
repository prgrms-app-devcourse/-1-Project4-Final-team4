import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  return (
    <View>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" secureTextEntry={true} />
      <Button title="Login" onPress={() => {}} />
      <Button title="SignUp" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}