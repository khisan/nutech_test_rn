import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const menuItems = [
    'PBB',
    'Listrik',
    'Pulsa',
    'PDAM',
    'PGN',
    'Lainnya',
    'Musik',
    'Game',
    'Makanan',
    'Kurban',
    'Zakat',
    'Data',
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Image
          source={require('../assets/logo.png')} // logo SIMS PPOB
          style={styles.logo}
        />
        <Image
          source={require('../assets/profile.png')} // ikon profile user
          style={styles.profileIcon}
        /> */}
      </View>

      {/* Greeting */}
      <Text style={styles.welcome}>Selamat datang,</Text>
      <Text style={styles.username}>Kristanto Wibowo</Text>

      {/* Balance card */}
      <View style={styles.balanceCard}>
        <Text style={styles.saldoText}>Saldo anda</Text>
        <Text style={styles.saldoAmount}>Rp ••••••••</Text>
        <TouchableOpacity>
          <Text style={styles.lihatSaldo}>Lihat Saldo</Text>
        </TouchableOpacity>
      </View>

      {/* Grid Menu */}
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.gridItem}>
            {/* <Icon name="apps-outline" size={24} color="#333" /> */}
            <Text style={styles.gridText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Promo Section */}
      <Text style={styles.promoTitle}>Temukan promo menarik</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.promoCard}>
          <Text style={styles.promoText}>Saldo Gratis!</Text>
        </View>
        <View style={[styles.promoCard, {backgroundColor: '#fbbf24'}]}>
          <Text style={styles.promoText}>Diskon Listrik!</Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {width: 100, height: 30, resizeMode: 'contain'},
  profileIcon: {width: 32, height: 32, borderRadius: 16},
  welcome: {marginTop: 16, fontSize: 16, color: '#666'},
  username: {fontSize: 20, fontWeight: 'bold'},
  balanceCard: {
    backgroundColor: '#e11d48',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  saldoText: {color: '#fff'},
  saldoAmount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  lihatSaldo: {color: '#fff', textDecorationLine: 'underline'},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '22%',
    alignItems: 'center',
    marginVertical: 12,
  },
  gridText: {marginTop: 4, fontSize: 12, textAlign: 'center'},
  promoTitle: {marginTop: 20, fontWeight: 'bold', fontSize: 16},
  promoCard: {
    width: 180,
    height: 100,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 12,
  },
  promoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
