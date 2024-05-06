import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // 비밀번호 재설정 로직을 여기에 구현하세요.
    // 예를 들어, 이메일로 비밀번호 재설정 링크를 보낼 수 있습니다.
    alert('Password reset link has been sent to ' + email);
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TouchableOpacity onPress={handleResetPassword}>
        <Text>Send Password Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
}