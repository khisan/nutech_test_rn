import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import API_ENDPOINTS from '../api/api';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const PembayaranScreen = () => {
  const route = useRoute();
  const token = useSelector(state => state.auth.token);
  const {service} = route.params;

  const [amount, setAmount] = useState(
    service?.service_tariff
      ? service.service_tariff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      : '',
  );
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBalance = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.Balance, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 0) {
        setBalance(response.data.data.balance);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.Balance, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.data.status === 0) {
          setBalance(response.data.data.balance);
        }
      })
      .catch(error => {
        console.error('Error fetching balance:', error);
      });
  }, []);

  const handlePayment = () => {
    setLoading(true);

    axios
      .post(
        API_ENDPOINTS.Transaction,
        {service_code: service.service_code},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        Toast.show({
          type: 'success',
          text1: 'Berhasil',
          text2: 'Pembayaran berhasil',
          position: 'bottom',
        });
        getBalance();
      })
      .catch(error => {
        console.error('Payment failed:', error.response?.data || error.message);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response?.data?.message || 'Pembayaran gagal',
          position: 'bottom',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const navigation = useNavigation();

  console.log('Service di payment screen:', service);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={20} color="#000" />
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pembayaran</Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Saldo anda</Text>
        <Text style={styles.cardAmount}>
          {balance ? `Rp ${balance.toLocaleString('id-ID')}` : 0}
        </Text>
      </View>

      <Text style={styles.sectionLabel}>Pembayaran</Text>
      <View style={styles.serviceRow}>
        <Image
          source={{uri: service.service_icon}}
          style={{width: 40, height: 40}}
          resizeMode="contain"
        />
        <Text style={styles.serviceText}>{service.service_name}</Text>
      </View>

      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons
          name="credit-card-outline"
          size={20}
          color="#999"
          style={{marginRight: 8}}
        />
        <TextInput
          style={styles.input}
          placeholder="Masukkan nominal"
          keyboardType="numeric"
          value={amount}
          editable={false}
          onChangeText={text =>
            setAmount(
              text.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
            )
          }
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && {opacity: 0.6}]}
        onPress={handlePayment}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Memproses...' : 'Bayar'}
        </Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

export default PembayaranScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  card: {
    backgroundColor: '#dc2626',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
  },
  cardLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
  },
  cardAmount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  serviceText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 40,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ef2a23',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#000',
  },
  sideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 5,
    zIndex: 2,
  },
});
