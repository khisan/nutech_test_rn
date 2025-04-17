import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import API_ENDPOINTS from '../api/api';

export default function HomeScreen() {
  const profile = useSelector(state => state.user.profile);
  const token = useSelector(state => state.auth.token);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [balance, setBalance] = useState(null);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.Services, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.data.status === 0) {
          setServices(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get(API_ENDPOINTS.Banner, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.data.status === 0) {
          setBanners(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching banners:', error);
      })
      .finally(() => {
        setLoadingBanner(false);
      });

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

  const toggleShowBalance = () => {
    setShowBalance(prev => !prev);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: '15%'}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/Logo.png')}
            style={{width: 30, height: 30, marginRight: 10}}
          />
          <Text style={styles.heading}>SIMS PPOB</Text>
        </View>
        <Image
          source={
            profile?.profile_image
              ? {uri: profile.profile_image}
              : require('../assets/Profile_Photo-1.png')
          }
          style={styles.avatar}
        />
      </View>

      <Text style={styles.welcome}>Selamat datang,</Text>
      <Text style={styles.username}>
        {`${profile.first_name} ${profile.last_name}`}
      </Text>

      <View style={styles.balanceCard}>
        <Text style={styles.saldoText}>Saldo anda</Text>
        <Text style={styles.saldoAmount}>
          {showBalance && balance !== null
            ? `Rp ${balance.toLocaleString('id-ID')}`
            : 'Rp ••••••••'}
        </Text>
        <TouchableOpacity onPress={toggleShowBalance}>
          <Text style={styles.lihatSaldo}>
            {showBalance ? 'Sembunyikan Saldo' : 'Lihat Saldo'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {loading ? (
          <ActivityIndicator size="large" color="#e11d48" />
        ) : (
          services.map((service, index) => (
            <TouchableOpacity key={index} style={styles.gridItem}>
              <Image
                source={{uri: service.service_icon}}
                style={{width: 40, height: 40, marginBottom: 6}}
                resizeMode="contain"
              />
              <Text style={styles.gridText} numberOfLines={1}>
                {service.service_name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <Text style={styles.promoTitle}>Temukan promo menarik</Text>
      {loadingBanner ? (
        <ActivityIndicator size="small" color="#e11d48" />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {banners.map((banner, index) => (
            <View key={index} style={styles.promoCard}>
              <Image
                source={{uri: banner.banner_image}}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome: {marginTop: 16, fontSize: 16, color: '#666'},
  username: {fontSize: 23, fontWeight: 'bold'},
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
  gridText: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  promoTitle: {marginTop: 20, fontWeight: 'bold', fontSize: 16},
  promoCard: {
    width: 230,
    borderRadius: 12,
    marginRight: 12,
    marginTop: 12,
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'greydark',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
