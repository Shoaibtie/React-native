import {Alert} from 'react-native';
import * as Constants from '../../appResources/constants';
// const ColorCodeHelper = props => {
const AlertHelper = {
  getAlertMessage: (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: Constants.BUTTON_NAME.OK,
        },
      ],
      {cancelable: false},
    );
  },
  actionAlertMessage: (message, props, screenName, screen) => {
    Alert.alert(
      Constants.ALERT_MESSAGE.ALERT_MESSAGE_TITLE,
      message,
      [
        {
          text: Constants.BUTTON_NAME.OK,
          onPress: () => {
            props.route.params.onNavigateBack();
            props.navigation.navigate(screenName, {screen: screen});
          },
        },
      ],
      {cancelable: false},
    );
  },
  flexActionAlertMessage: (message, props, screenName, screen) => {
    Alert.alert(
      Constants.ALERT_MESSAGE.ALERT_MESSAGE_TITLE,
      message,
      [
        {
          text: Constants.BUTTON_NAME.OK,
          onPress: () => {
            return 'OK';
          },
        },
      ],
      {cancelable: false},
    );
  },
};
export default AlertHelper;
