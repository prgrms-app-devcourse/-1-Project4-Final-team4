import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Colors} from '../utils/Colors';

const Splash = ({navigation}) => {
  const [text, setText] = useState('');
  const phrases = ['나만의', '가치있게', '노는', '라이프'];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index === phrases.length) {
        clearInterval(interval);
        setTimeout(() => navigation.replace('MainTab'), 1000);
      } else {
        const modifiedPhrases = phrases[index].split('').map((char, i) => (
          <Text key={i} style={styles.text}>
            {char}
          </Text>
        ));
        setText(prevText => [
          ...prevText,
          <Text key={index}>{modifiedPhrases}</Text>,
        ]);
        index++;
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>{text}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  textContainer: {
    marginTop: 100,
    marginLeft: 50,
  },
  text: {
    fontSize: 80,
    fontFamily: 'PretendardBold',
    color: Colors.black,
  },
});

export default Splash;
