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
import API_ENDPOINTS from '../api/api';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async data => {
    setIsLoading(true);
    setErrorMessage('');
    console.log(data);

    try {
      const response = await axios.post(API_ENDPOINTS.Register, {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
      });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Registrasi Berhasil!',
        visibilityTime: 3000,
      });

      console.log(response.data.message);
      // navigation.navigate('login');
    } catch (error) {
      console.log('Error response:', error.response?.data);
      console.log('Full error:', error);

      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }

      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Registrasi Gagal!',
        text2: errorMessage,
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
          <>
            <TextInput
              placeholder="Masukkan email anda"
              style={[styles.input, errors.email && {borderColor: 'red'}]}
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="firstName"
        rules={{required: 'Harap diisi'}}
        render={({field: {onChange, value}}) => (
          <>
            <TextInput
              placeholder="Nama depan"
              style={[styles.input, errors.firstName && {borderColor: 'red'}]}
              value={value}
              onChangeText={onChange}
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="lastName"
        rules={{required: 'Harap diisi'}}
        render={({field: {onChange, value}}) => (
          <>
            <TextInput
              placeholder="Nama belakang"
              style={[styles.input, errors.lastName && {borderColor: 'red'}]}
              value={value}
              onChangeText={onChange}
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Harap diisi',
          minLength: {
            value: 8,
            message: 'Password minimal 8 karakter',
          },
        }}
        render={({field: {onChange, value}}) => (
          <>
            <TextInput
              placeholder="Buat password"
              style={[styles.input, errors.password && {borderColor: 'red'}]}
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Harap diisi',
          validate: value =>
            value === watch('password') || 'Password tidak cocok',
        }}
        render={({field: {onChange, value}}) => (
          <>
            <TextInput
              placeholder="Konfirmasi password"
              style={[
                styles.input,
                errors.confirmPassword && {borderColor: 'red'},
              ]}
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Loading...' : 'Registrasi'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        sudah punya akun?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('login')}>
          login di sini
        </Text>
      </Text>
      <Toast />
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
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 12,
    marginTop: -12,
    marginLeft: 4,
    fontSize: 12,
  },
});

export default RegisterScreen;
