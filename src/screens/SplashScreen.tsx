import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>SIMS PPOB</Text>
      <Text style={styles.subtitle}>Khisan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 17,
    color: '#888888',
    marginTop: 4,
  },
});

export default SplashScreen;
