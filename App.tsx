import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigator from './src/navigation';
import RNBootSplash from 'react-native-bootsplash';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsAppReady(true);
      setTimeout(() => {
        setShowCustomSplash(false);
      }, 500);

      RNBootSplash.hide({fade: true});
    };
    init();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
