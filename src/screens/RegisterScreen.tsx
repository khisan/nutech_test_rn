import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log('Form submitted:', data);
    // bisa dihubungkan ke API nanti
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>🔴 SIMS PPOB</Text>
      <Text style={styles.title}>Lengkapi data untuk membuat akun</Text>

      <Controller
        control={control}
        name="email"
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
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
