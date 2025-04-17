import {PermissionsAndroid, Platform} from 'react-native';

export const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, // API 33+
      {
        title: 'Izin Akses Galeri',
        message: 'Aplikasi perlu akses ke galeri untuk memilih foto',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};
