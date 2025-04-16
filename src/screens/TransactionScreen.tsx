import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const transactions = [
  {
    id: '1',
    type: 'topup',
    amount: 10000,
    date: '17 Agustus 2023',
    time: '09:00 WIB',
    title: 'Top Up Saldo',
  },
  {
    id: '2',
    type: 'expense',
    amount: 40000,
    date: '17 Agustus 2023',
    time: '12:15 WIB',
    title: 'Pulsa Prabayar',
  },
  {
    id: '3',
    type: 'expense',
    amount: 10000,
    date: '17 Agustus 2023',
    time: '13:30 WIB',
    title: 'Listrik Prabayar',
  },
  {
    id: '4',
    type: 'topup',
    amount: 50000,
    date: '17 Agustus 2023',
    time: '15:45 WIB',
    title: 'Top Up Saldo',
  },
];

const TransactionScreen = () => {
  const renderItem = ({item}: any) => (
    <View
      style={[
        styles.card,
        item.type === 'topup' ? styles.incomeBorder : styles.expenseBorder,
      ]}>
      <View>
        <Text
          style={[
            styles.amount,
            item.type === 'topup' ? styles.incomeText : styles.expenseText,
          ]}>
          {item.type === 'topup' ? '+' : '-'}Rp
          {item.amount.toLocaleString('id-ID')}
        </Text>
        <Text style={styles.date}>
          {item.date} • {item.time}
        </Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} />
        <Text style={styles.headerText}>Transaksi</Text>
        <View style={{width: 24}} /> {/* Spacer */}
      </View>

      {/* Saldo card */}
      <View style={styles.balanceCard}>
        <Text style={styles.cardLabel}>Saldo anda</Text>
        <Text style={styles.cardAmount}>Rp 10.000</Text>
      </View>

      {/* Transaksi */}
      <Text style={styles.sectionTitle}>Transaksi</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <TouchableOpacity style={styles.showMoreBtn}>
            <Text style={styles.showMoreText}>Show more</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  cardLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  cardAmount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  incomeBorder: {
    borderColor: '#bbf7d0',
    backgroundColor: '#f0fdf4',
  },
  expenseBorder: {
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeText: {
    color: '#16a34a',
  },
  expenseText: {
    color: '#dc2626',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  title: {
    fontSize: 14,
    color: '#374151',
    marginTop: 8,
    fontWeight: '500',
  },
  showMoreBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  showMoreText: {
    color: '#dc2626',
    fontWeight: '500',
  },
});
