import React from 'react';
import { View, TextInput, Button } from 'react-native';

export default function SignUp() {
  return (
    <View>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" secureTextEntry={true} />
      <Button title="SignUp" onPress={() => {}} />
    </View>
  );
}