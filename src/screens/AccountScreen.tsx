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
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import API_ENDPOINTS from '../api/api';
import {useDispatch} from 'react-redux';
import {fetchUserProfile} from '../redux/actions/fetchUser';
import {requestGalleryPermission} from '../utils/permssionGalery';
import {useNavigation} from '@react-navigation/native';
import {logout} from '../redux/slices/authSlice';

const ProfileScreen = () => {
  const profile = useSelector(state => state.user.profile);
  const token = useSelector(state => state.auth.token);
  const [localImageUri, setLocalImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
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

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Toast.show({
        type: 'error',
        text1: 'Izin ditolak',
        text2: 'Tidak bisa mengakses galeri tanpa izin',
      });
      return;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 600,
      maxWidth: 600,
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        const fileType = selectedImage.type;
        const fileSize = selectedImage.fileSize;

        if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Hanya file JPG atau PNG yang diperbolehkan',
          });
          return;
        }

        if (fileSize > 100 * 1024) {
          Toast.show({
            type: 'error',
            text1: 'Ukuran gambar terlalu besar',
            text2: 'Ukuran maksimum adalah 100KB',
          });
          return;
        }

        setLocalImageUri(selectedImage.uri);
      }
    });
  };

  const onSubmit = async data => {
    setIsLoading(true);
    const {firstName, lastName, email} = data;
    const formData = new FormData();

    const isNameChanged =
      firstName !== profile.first_name || lastName !== profile.last_name;
    const isImageChanged = !!localImageUri;

    try {
      if (isNameChanged && !isImageChanged) {
        await axios.put(
          `${API_ENDPOINTS.Profile}/update`,
          {
            first_name: firstName,
            last_name: lastName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else if (!isNameChanged && isImageChanged) {
        formData.append('file', {
          uri: localImageUri,
          name: 'profile.jpg',
          type: 'image/jpeg',
        });

        await axios.put(`${API_ENDPOINTS.Profile}/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (isNameChanged && isImageChanged) {
        await Promise.all([
          axios.put(
            `${API_ENDPOINTS.Profile}/update`,
            {
              first_name: firstName,
              last_name: lastName,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          ),
          axios.put(
            `${API_ENDPOINTS.Profile}/image`,
            (() => {
              const formData2 = new FormData();
              formData2.append('file', {
                uri: localImageUri,
                name: 'profile.jpg',
                type: 'image/jpeg',
              });
              return formData2;
            })(),
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            },
          ),
        ]);
      } else {
        Toast.show({
          type: 'info',
          text1: 'Info',
          text2: 'Tidak ada perubahan',
        });
      }

      dispatch(fetchUserProfile());
      setIsEditing(false);
      Toast.show({
        type: 'success',
        text1: 'Berhasil',
        text2: 'Data berhasil diperbarui',
      });
    } catch (error) {
      console.error('Update error: ', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Terjadi kesalahan saat memperbarui profil',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset({
      firstName: profile.first_name,
      lastName: profile.last_name,
      email: profile.email,
    });
    setLocalImageUri(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logout());
    Toast.show({
      type: 'success',
      text1: 'Logout berhasil',
    });
    navigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });
  };

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
          <Image
            source={
              localImageUri
                ? {uri: localImageUri}
                : profile?.profile_image
                ? {uri: profile.profile_image}
                : require('../assets/Profile_Photo-1.png')
            }
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={isEditing ? pickImage : null}
            disabled={!isEditing}>
            <Icon name="edit" size={16} color="#000" />
          </TouchableOpacity>
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
                  editable={isEditing}
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
                  editable={isEditing}
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
                  editable={isEditing}
                />
              </View>
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName.message}</Text>
              )}
            </>
          )}
        />

        {isEditing ? (
          <>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.editButtonText}>
                {isLoading ? 'Loading...' : 'Simpan'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleCancel}>
              <Text style={styles.logoutText}>Batalkan</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Toast position="top" topOffset={60} />
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
