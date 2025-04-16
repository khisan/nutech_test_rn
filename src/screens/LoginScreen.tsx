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

const LoginScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log(data.email);
    console.log(data.password);

    // Contoh lempar ke login API
    // loginUser(data.email, data.password);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
        }}>
        <Image
          source={require('../assets/Logo.png')}
          style={{width: 30, height: 30, marginRight: 10}}
        />
        <Text style={styles.heading}>SIMS PPOB</Text>
      </View>
      <Text style={styles.subheading}>Masuk atau buat akun untuk memulai</Text>

      {/* Email input */}
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

      {/* Password input */}
      <Controller
        control={control}
        name="password"
        rules={{required: 'Harap diisi'}}
        render={({field: {onChange, value}}) => (
          <>
            <View
              style={[
                styles.inputWrapper,
                errors.email && {borderColor: 'red'},
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

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSubmit(onSubmit)();
        }}>
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
    marginRight: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'greydark',
  },
  subheading: {
    fontSize: 24,
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: '100%',
  },
  inputIcon: {
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    height: 40,
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
