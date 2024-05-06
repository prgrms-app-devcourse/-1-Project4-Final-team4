import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase'; 

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
      }
    } catch (error) {
      console.error(error);
      Alert.alert('회원가입 실패', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder="Username"
        value={usernameValue}
        onChangeText={setUsernameValue}
      />
      <TextInput 
        style={styles.input}
        placeholder="Email"
        value={emailValue}
        onChangeText={setEmailValue}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        value={passwordValue}
        onChangeText={setPasswordValue}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={register} style={styles.button}>
        <Text>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.button}>
        <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5
  }
});

export default Register;
