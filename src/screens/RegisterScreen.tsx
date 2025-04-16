import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async data => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(API_ENDPOINTS.Login, {
        email: data.email,
        password: data.password,
      });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Login Berhasil!',
        text2: 'Selamat datang, Anda berhasil login.',
        visibilityTime: 3000,
      });

      navigation.navigate('main');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }

      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Login Gagal!',
        text2: errorMessage || 'Coba lagi nanti.',
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 35,
        }}>
        <Image
          source={require('../assets/Logo.png')}
          style={{width: 30, height: 30, marginRight: 10}}
        />
        <Text style={styles.logo}>SIMS PPOB</Text>
      </View>
      <Text style={styles.title}>Lengkapi data untuk membuat akun</Text>

      <Controller
        control={control}
        name="email"
        rules={{required: 'Harap diisi'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Masukkan email anda"
            style={styles.input}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="firstName"
        rules={{required: 'Harap diisi'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Nama depan"
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        rules={{required: 'Harap diisi'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Nama belakang"
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{required: 'Harap diisi'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Buat password"
            style={styles.input}
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{required: 'Harap diisi'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Konfirmasi password"
            style={styles.input}
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Registrasi</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        sudah punya akun?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('login')}>
          login di sini
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#E53935',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
  link: {
    color: '#E53935',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
