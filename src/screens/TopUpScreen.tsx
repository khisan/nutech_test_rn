import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const nominalOptions = [10000, 20000, 50000, 100000, 250000, 500000];

const TopUpScreen = () => {
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setSelected(value);
    setAmount(value.toString());
  };

  const handleTopUp = () => {
    if (amount) {
      // Lakukan aksi top up
      console.log('Top up:', amount);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} />
        <Text style={styles.headerText}>Top Up</Text>
        <View style={{width: 24}} /> {/* Spacer */}
      </View>

      {/* Card saldo */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Saldo anda</Text>
        <Text style={styles.cardAmount}>Rp 0</Text>
      </View>

      <Text style={styles.inputLabel}>
        Silahkan masukan <Text style={styles.bold}>nominal Top Up</Text>
      </Text>

      {/* Input nominal manual */}
      <TextInput
        style={styles.input}
        placeholder="masukan nominal Top Up"
        keyboardType="numeric"
        value={amount}
        onChangeText={text => {
          setAmount(text);
          setSelected(null);
        }}
      />

      {/* Pilihan nominal */}
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

      {/* Tombol Top Up */}
      <TouchableOpacity
        style={[styles.button, !amount && styles.buttonDisabled]}
        onPress={handleTopUp}
        disabled={!amount}>
        <Text style={styles.buttonText}>Top Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TopUpScreen;

const styles = StyleSheet.create({
  container: {
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
  },
  card: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
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
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  nominalWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  nominalButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
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
});
