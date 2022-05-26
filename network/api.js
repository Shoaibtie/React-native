import axios from 'axios';
// import {
//     ErrorMessage,
//     baseURL,
//     labelNoRecordFound,
//     labelSWW,
// } from '../constans/string';
// import {
//   toastBottom,
//   toastWarning,
//   toastSuccess,
// } from "../constans/string";

import API from '../network/env';
import toastModule from '../utils/toastModule/tosatAlert';
import AsyncStorage from '@react-native-community/async-storage';
import ErrorHandler from '../utils/errorHandler/errorHandler';

export const apiRequest = async (
  url,
  method = 'GET',
  body = undefined,
  rewards,
) => {
  try {
    console.log('body', url);
    const userToken = await AsyncStorage.getItem('userToken');

    let params = {
      method: method,
      url:
        method === 'POST'
          ? rewards === 'rewards'
            ? API.rewardBaseURL + url
            : API.baseURI + url
          : method === 'GET' && body != undefined
          ? API.baseURI + url + body.data
          : API.baseURI + url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    if (method === 'POST' && body) {
      params.data = body;
    }
    const response = await axios(params);

    console.log('@@@@@Response', response);
    if (response && response.data) {
      if (response.status === 200 || response.data.Status === 'Active') {
        //response.data.status === 200
        return response.data;
      } else if (response.data.status === 201) {
        toastModule.toastMessageBox('Error');
        return response.data;
      } else if (response.data.status === 401) {
        toastModule.toastMessageBox('Error');
        return response.data;
      } else if (response.data.status === 402) {
        toastModule.toastMessageBox('Error');
        return response.data;
      } else if (response.data.status === 404) {
        toastModule.toastMessageBox('Error');
        return response.data;
      } else if (response.data.status === 409) {
        toastModule.toastMessageBox('Error');
        return response.data;
      } else if (response.data.status === 422) {
        toastModule.toastMessageBox('Error');
        return response.data;
      } else {
        toastModule.toastMessageBox('Error');
        return response;
      }
    } else {
      toastModule.toastMessageBox('Error');
    }
  } catch (err) {
    console.log('err', err);
    if (err && err.response && err.response.data) {
      if (err.response.status === 401) {
        ErrorHandler.handelApiResponse(err.response.data.Message);
      } else toastModule.toastMessageBox('Error');
      return err.response.data;
    } else {
      toastModule.toastMessageBox('Error');
      return {status: false};
    }
  }
};

export default apiRequest;
