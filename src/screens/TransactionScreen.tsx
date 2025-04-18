import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useSelector} from 'react-redux';
import API_ENDPOINTS from '../api/api';
import {formatIndonesianDate} from '../utils/formatIndonesianDate';

const LIMIT = 5;

const TransactionScreen = () => {
  const token = useSelector(state => state.auth.token);
  const [transactions, setTransactions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [balance, setBalance] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBalance = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.Balance, {
        headers: {Authorization: `Bearer ${token}`},
      });

      if (response.data.status === 0) {
        setBalance(response.data.data.balance);
      } else {
        throw new Error('Gagal mendapatkan saldo');
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setOffset(0);
    setHasMore(true);
    try {
      await fetchBalance(); // Ambil saldo baru

      const response = await axios.get(
        `${API_ENDPOINTS.TransactionHistory}?offset=0&limit=${LIMIT}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.status === 0) {
        const fetched = response.data.data.records;
        setTransactions(fetched);
        if (fetched.length < LIMIT) setHasMore(false);
      }
    } catch (error) {
      console.error('Error refreshing data:', error.message);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchTransactions = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const nextOffset = offset + LIMIT;
      const response = await axios.get(
        `${API_ENDPOINTS.TransactionHistory}?offset=${nextOffset}&limit=${LIMIT}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.status === 0) {
        const fetched = response.data.data.records;
        setTransactions(prev => [...prev, ...fetched]);
        setOffset(nextOffset);
        if (fetched.length < LIMIT) setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more transactions:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const renderItem = ({item}) => {
    console.log('Rendering item:', item);
    const isTopup = item.transaction_type === 'TOPUP';
    const amountColor = isTopup ? styles.incomeText : styles.expenseText;
    const amountSign = isTopup ? '+' : '-';

    return (
      <View
        style={[
          styles.card,
          isTopup ? styles.incomeBorder : styles.expenseBorder,
        ]}>
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text style={[styles.amount, amountColor]}>
              {amountSign} Rp{item.total_amount.toLocaleString('id-ID')}
            </Text>
            <Text style={styles.date}>
              {formatIndonesianDate(item.created_on)}
            </Text>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.title}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} />
        <Text style={styles.headerText}>Transaksi</Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.cardLabel}>Saldo anda</Text>
        <Text style={styles.cardAmount}>
          {balance !== null ? `Rp ${balance.toLocaleString('id-ID')}` : 0}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Transaksi</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.invoice_number}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          !refreshing && (
            <Text style={styles.emptyText}>Belum ada transaksi</Text>
          )
        }
        ListFooterComponent={
          hasMore ? (
            <TouchableOpacity
              style={styles.showMoreBtn}
              onPress={fetchTransactions}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#dc2626" />
              ) : (
                <Text style={styles.showMoreText}>Show more</Text>
              )}
            </TouchableOpacity>
          ) : null
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
    fontSize: 17,
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
    marginTop: 4,
  },
  title: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'right',
  },
  showMoreBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  showMoreText: {
    color: '#dc2626',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightContent: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    maxWidth: '45%',
  },
});
