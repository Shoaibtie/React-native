import {ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';

const toastAlert = {

    toastMessage: message => {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
    );
    },
    toastMessageBox: message => {
        Toast.show(message);
    },
  };
  
  export default toastAlert;