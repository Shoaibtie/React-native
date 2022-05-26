import React from 'react';
import {Alert, Platform} from 'react-native';
import * as constants from '../../appResources/constants';
import Logout from '../../components/logout';

const ErrorHandler = {
  handelApiResponse: (response) => {
    Alert.alert(
        constants.ALERT_MESSAGE.RE_LOGIN,
        response,
        [
          {
            text: constants.BUTTON_NAME.OK,
            // onPress: () => {
            //   return <Logout />
            // },
          },
        ],
        {cancelable: false},
      );
  },
};

export default ErrorHandler;
