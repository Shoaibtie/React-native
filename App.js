navigator.geolocation = require('@react-native-community/geolocation');
import React, {useEffect} from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import Reducer from './src/redux/reducers/index';
import {persistStore, persistReducer} from 'redux-persist';
import {createLogger} from 'redux-logger';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigation from './src/navigation/AppNavigation';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import * as constants from './src/appResources/constants';
import {fcmService} from './src/services/fcmService';
import {localNotificationService} from './src/src/services/localNotificationService';
import {View} from 'native-base';

const persistConfig = {
  key: constants.STRING_NAME.ROOT,
  storage: AsyncStorage,
  blacklist: [],
};

const enhancers = [
  applyMiddleware(
    thunkMiddleware,
    createLogger({
      collapsed: true,
      predicate: () => __DEV__,
    }),
  ),
];

const composeEnhancers =
  (__DEV__ &&
    typeof window !== constants.STRING_NAME.UNDEFINED &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  compose;

const enhancer = composeEnhancers(...enhancers);

const persistedReducer = persistReducer(persistConfig, Reducer);

const store = createStore(persistedReducer, {}, enhancer);
let persistor = persistStore(store);

const App = () => {
  useEffect(() => {
    /////////////////////////////////////////////////////
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('App onRegister', token);
    }

    function onNotification(notify) {
      console.log('App onNotification', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      let id = Math.floor(Math.random() * 1000 + 1);
      localNotificationService.showNotification(
        id,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    async function onOpenNotification(notify) {
      console.log('App onOpenNotification', notify);
    }

    return () => {
      fcmService.unRegister();
      localNotificationService.unRegister();
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
