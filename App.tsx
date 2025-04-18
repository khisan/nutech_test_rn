import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigator from './src/navigation';
import RNBootSplash from 'react-native-bootsplash';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      RNBootSplash.hide({fade: true});
      setAppReady(true);
    };

    init();
  }, []);

  return (
    <Provider store={store}>
      {isAppReady ? <AppNavigator /> : <SplashScreen />}
    </Provider>
  );
}
