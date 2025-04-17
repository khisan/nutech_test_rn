import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import API_ENDPOINTS from '../api/api';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const nominalOptions = [10000, 20000, 50000, 100000, 250000, 500000];

const TopUpScreen = () => {
  const token = useSelector(state => state.auth.token);
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState(null);

  const handleSelect = (value: number) => {
    setSelected(value);
    setAmount(value.toString());

    if (value < 10000) {
      setError('Minimum top up adalah Rp10.000');
    } else if (value > 1000000) {
      setError('Maksimum top up adalah Rp1.000.000');
    } else {
      setError('');
    }
  };

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

  const handleTopUp = async () => {
    const nominal = parseInt(amount, 10);

    try {
      const response = await axios.post(
        API_ENDPOINTS.TopUp,
        {
          top_up_amount: nominal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Top up success:', response.data);
      Toast.show({
        type: 'success',
        text1: 'Berhasil',
        text2: 'Top Up berhasil',
        position: 'bottom',
      });
      getBalance();
      setAmount('');
      setSelected(null);
    } catch (error) {
      console.error('Top up failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Gagal',
        text2: 'Terjadi kesalahan saat melakukan top up',
        position: 'bottom',
      });
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={20} color="#000" />
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Top Up</Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Saldo anda</Text>
        <Text style={styles.cardAmount}>
          {balance !== null ? `Rp ${balance.toLocaleString('id-ID')}` : 0}
        </Text>
      </View>

      <View style={{marginBottom: '10%'}}>
        <Text style={styles.inputLabel}>Silahkan masukan</Text>
        <Text style={styles.bold}>nominal Top Up</Text>
      </View>

      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons
          name="cash-plus"
          size={23}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="masukan nominal Top Up"
          keyboardType="numeric"
          value={amount ? parseInt(amount, 10).toLocaleString('id-ID') : ''}
          onChangeText={text => {
            const numericValue = text.replace(/\D/g, '');
            setAmount(numericValue);
            setSelected(null);

            const value = parseInt(numericValue || '0', 10);
            if (value < 10000) {
              setError('Minimum top up adalah Rp10.000');
            } else if (value > 1000000) {
              setError('Maksimum top up adalah Rp1.000.000');
            } else {
              setError('');
            }
          }}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.nominalWrapper}>
        {nominalOptions.map(nominal => (
          <TouchableOpacity
            key={nominal}
            style={[
              styles.nominalButton,
              selected === nominal && styles.nominalButtonSelected,
            ]}
            onPress={() => handleSelect(nominal)}>
            <Text
              style={[
                styles.nominalText,
                selected === nominal && styles.nominalTextSelected,
              ]}>
              Rp{nominal.toLocaleString('id-ID')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (!amount ||
            parseInt(amount, 10) < 10000 ||
            parseInt(amount, 10) > 1000000) &&
            styles.buttonDisabled,
        ]}
        onPress={handleTopUp}
        disabled={
          !amount ||
          parseInt(amount, 10) < 10000 ||
          parseInt(amount, 10) > 1000000
        }>
        <Text style={styles.buttonText}>Top Up</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

export default TopUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  headerText: {
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
    borderRadius: 12,
    padding: 20,
    marginBottom: '15%',
  },
  cardLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4,
  },
  cardAmount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputLabel: {
    fontSize: 20,
    marginBottom: 8,
  },
  bold: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  nominalWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  nominalButton: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  nominalButtonSelected: {
    backgroundColor: '#fef2f2',
    borderColor: '#dc2626',
  },
  nominalText: {
    color: '#000',
  },
  nominalTextSelected: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#dc2626',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  buttonText: {
    color: 'white',
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
    paddingVertical: 5,
    width: '100%',
  },
  inputIcon: {
    marginRight: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  sideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 5,
    zIndex: 2,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#000',
  },
});
