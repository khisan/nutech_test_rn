import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const ProfileScreen = () => {
  const profile = useSelector(state => state.user.profile);
  console.log('Profile data:', profile);
  console.log('Profile email:', profile.email);
  // const [firstName, setFirstName] = useState('Kristanto');
  // const [lastName, setLastName] = useState('Wibowo');
  // const [email, setEmail] = useState('wallet@nutech.com');
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
      });
    }
  }, [profile, reset]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Akun</Text>
        <View style={styles.sideButton} />
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.avatarWrapper}>
          {profile.image ? (
            <Image
              source={{uri: profile.profile_image}}
              style={styles.avatar}
            />
          ) : (
            <Image
              source={require('../assets/Profile_Photo-1.png')}
              style={styles.avatar}
            />
          )}
          <View style={styles.editIcon}>
            <Icon name="edit" size={16} color="#000" />
          </View>
        </View>
        <Text style={styles.nameText}>
          {profile.first_name} {profile.last_name}
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
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

        <Text style={styles.label}>Nama Depan</Text>
        <Controller
          control={control}
          name="firstName"
          rules={{required: 'Harap diisi'}}
          render={({field: {onChange, value}}) => (
            <>
              <View
                style={[
                  styles.inputWrapper,
                  errors.firstName && {borderColor: 'red'},
                ]}>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Nama depan"
                  style={styles.inputField}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="default"
                />
              </View>
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName.message}</Text>
              )}
            </>
          )}
        />

        <Text style={styles.label}>Nama Belakang</Text>
        <Controller
          control={control}
          name="lastName"
          rules={{required: 'Harap diisi'}}
          render={({field: {onChange, value}}) => (
            <>
              <View
                style={[
                  styles.inputWrapper,
                  errors.firstName && {borderColor: 'red'},
                ]}>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Nama belakang"
                  style={styles.inputField}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="default"
                />
              </View>
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName.message}</Text>
              )}
            </>
          )}
        />

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backText: {
    fontSize: 16,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarWrapper: {
    position: 'relative',
    width: 90,
    height: 90,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },

  nameText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  form: {
    marginTop: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 16,
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 40,
  },
  inputBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  editButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e53935',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  editButtonText: {
    color: '#e53935',
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 15,
    backgroundColor: '#e53935',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  inputIcon: {
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    height: 40,
  },
});
