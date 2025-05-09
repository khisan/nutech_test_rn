import React, {useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import API_ENDPOINTS from '../api/api';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../redux/slices/authSlice';
import {setUserProfile} from '../redux/slices/userSlice';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
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

      const token = response.data?.data.token;
      console.log('Token:', token);
      console.log('response:', response);
      dispatch(loginSuccess(token));

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: response.data.message,
        visibilityTime: 3000,
      });

      const profileRes = await axios.get(API_ENDPOINTS.Profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profileData = profileRes.data.data;
      dispatch(setUserProfile(profileData));

      console.log('Profile data:', profileData);

      navigation.reset({
        index: 0,
        routes: [{name: 'main'}],
      });
    } catch (error) {
      console.log('Login error:', error);

      const message =
        error.response?.data?.message ||
        'Terjadi kesalahan. Silakan coba lagi.';
      setErrorMessage(message);

      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: message,
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.heading}>SIMS PPOB</Text>
      </View>
      <Text style={styles.subheading}>Masuk atau buat akun untuk memulai</Text>
      <Controller
        control={control}
        name="email"
        rules={{required: 'Harap diisi'}}
        render={({field: {onChange, value}}) => (
          <>
            <View
              style={[
                styles.inputWrapper,
                errors.email && {borderColor: 'red'},
              ]}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Masukkan email anda"
                style={styles.inputField}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{required: 'Harap diisi'}}
        render={({field: {onChange, value}}) => (
          <>
            <View
              style={[
                styles.inputWrapper,
                errors.password && {borderColor: 'red'},
              ]}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Masukkan password anda"
                secureTextEntry={!showPassword}
                style={styles.inputField}
                onChangeText={onChange}
                value={value}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSubmit(onSubmit)();
        }}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Loading...' : 'Masuk'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Belum punya akun?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('register')}>
          Registrasi di sini
        </Text>
      </Text>
      <Toast />
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
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'greydark',
  },
  subheading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    paddingVertical: 10,
    width: '100%',
  },
  inputIcon: {
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    height: 40,
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
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 12,
    marginTop: -12,
    marginLeft: 4,
    fontSize: 12,
  },
});

export default LoginScreen;
