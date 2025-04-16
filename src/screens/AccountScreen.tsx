import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('Kristanto');
  const [lastName, setLastName] = useState('Wibowo');
  const [email, setEmail] = useState('wallet@nutech.com');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Akun</Text>

        {/* Spacer sama lebar dengan tombol di kiri biar seimbang */}
        <View style={styles.sideButton} />
      </View>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          // source={require('./assets/avatar.png')} // Ganti sesuai path avatar
          style={styles.avatar}
        />
        <View style={styles.editIcon}>
          <Icon name="edit" size={16} color="#000" />
        </View>
        <Text style={styles.nameText}>
          {firstName} {lastName}
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Icon name="email" size={20} color="#888" style={styles.icon} />
          <TextInput value={email} editable={false} style={styles.input} />
        </View>

        <Text style={styles.label}>Nama Depan</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.inputBox}
        />

        <Text style={styles.label}>Nama Belakang</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.inputBox}
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
    marginVertical: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
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
    marginBottom: 4,
    fontSize: 14,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
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
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#e53935',
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 15,
    backgroundColor: '#e53935',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
