import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    // navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      {/* <Image
        source={require('../assets/logo.png')} // ganti sesuai path logomu
        style={styles.logo}
      /> */}

      <Text style={styles.heading}>SIMS PPOB</Text>
      <Text style={styles.subheading}>Masuk atau buat akun untuk memulai</Text>

      {/* Email input */}
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Masukkan email anda"
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {/* Password input */}
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Masukkan password anda"
            secureTextEntry
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>

      {/* Register text */}
      <Text style={styles.footerText}>
        Belum punya akun?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('register')}>
          Registrasi di sini
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D00000',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#D00000',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    marginTop: 16,
    fontSize: 14,
  },
  link: {
    color: '#D00000',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
