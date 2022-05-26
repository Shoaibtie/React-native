import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import PushNotification, {Importance} from 'react-native-push-notification';
import * as RootNavigation from './RootNavigation';

class FCMService {
  register = async (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = async onRegister => {
    messaging()
      .hasPermission()
      .then(async enabled => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        console.log('FCMService permission rejected', error);
      });
  };

  getToken = onRegister => {
    PushNotification.createChannel(
      {
        channelId: 'ringing', // (required)
        channelName: 'ringing', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'ringing', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    messaging()
      .getToken()
      .then(async fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
          await AsyncStorage.setItem('deviceToken', fcmToken);
        } else {
          console.log('FCMService user does not have a device token', fcmToken);
        }
      })
      .catch(error => {
        console.log('FCMService getToken rejected', error);
      });
  };

  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
        console.log('FCMService request permission rejected', error);
      });
  };

  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch(error => {
        console.log('FCMService delete token error', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'FCMService onNotificationOpenedApp notification caused app to open',
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'FCMService getInitialNotification Notification caused app to open from quit state:',
        );
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      });
    this.messageListner = messaging().onMessage(async remoteMessage => {
      console.log('FCMService a new FCM message arrived', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.notification;
        } else {
          RootNavigation.navigate('Videocalling');
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background! for app', remoteMessage);
    });

    // //Received in Foregroung messaging
    // messaging().onMessage(async resquestMEssage => {
    //   console.log('Received in Foregroung', resquestMEssage);
    // });

    messaging().onTokenRefresh(fcmToken => {
      console.log('FCMService new token refresh', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListner();
  };
}

export const fcmService = new FCMService();

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken();
//   }
// }

// const saveData = async token => {
//   try {
//     await AsyncStorage.setItem('deviceToken', token);
//   } catch (e) {
//     // alert('Failed to save the data to the storage');
//   }
// };

// const getFcmToken = async () => {
//   messaging()
//     .getToken()
//     .then(token => {
//       // alert(token);
//       saveData(token);
//       console.log('device token token=  get b========>', token);
//     });
//   DeviceInfo.getAndroidId().then(deviceId => {
//     console.log('device id======>', deviceId);
//   });
// };

// export const notificationListner = () => {
//   messaging().onMessage(async remoteMessage => {
//     console.log('foreground messsage app', remoteMessage);
//   });
//   // Register background handler
//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background! for app', remoteMessage);
//   });

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state app:',
//       remoteMessage.notification,
//     );
//     // navigation.navigate(remoteMessage.data.type);

//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           console.log(
//             'Notification caused app to open from quit state:',
//             remoteMessage.notification,
//           );
//           // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//         }
//       });
//   });

//   //Received in Foregroung messaging
//   messaging().onMessage(async resquestMEssage => {
//     console.log('Received in Foregroung', resquestMEssage);
//   });
// };
