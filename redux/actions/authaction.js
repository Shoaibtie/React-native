import apiRequest from '../../network/api';
import API from '../../network/env';
import AsyncStorage from '@react-native-community/async-storage';
import {Linking, Alert} from 'react-native';
import AlertHelper from '../../utils/alertModule/AlertModule';
import * as constants from '../../appResources/constants';
import toastModule from '../../utils/toastModule/tosatAlert';

// ---------------- Set loader status -------------------------//
export function isDataLoading(isLoading) {
  return {
    type: 'LOADER_STATUS',
    isLoading,
  };
}

// ------------------ Login API  ------------------------------ //
export const handleSignIn = loginData => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.loginURL, 'POST', loginData.loginData);
  console.log('response', response);
  dispatch(isDataLoading(false));
  if (response) {
    if (response.Result === 'failed') {
      AlertHelper.getAlertMessage(
        constants.ALERT_MESSAGE.LOGIN,
        constants.ALERT_MESSAGE.WRONG_EMAIL_PASSWORD,
      );
    } else if (
      response.LoggedRole === constants.LOGIN.CLIENTROLE ||
      response.LoggedRole === constants.LOGIN.FAMILYROLE
    ) {
      toastModule.toastMessageBox(constants.LOGIN.USER_TYPE_MESSAGE);
    } else {
      AsyncStorage.setItem('userToken', response.AccessToken);
      dispatch(loginSuccess(response));
    }
  }
};

// ------------------ Device Registeration API  ------------------------------ //
export const deviceRegisteration = deviceData => async dispatch => {
  console.log('devi*****', deviceData);
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.deviceRegisAPI,
    'POST',
    deviceData.deviceData,
  );
  console.log('response', response);
  dispatch(isDataLoading(false));
  toastModule.toastMessageBox(response);
  if (response) {
    console.log('responseddd=========>', response);
  }
};

// ------------------ Video call for get token  API  ------------------------------ //
export const getTokenForVideoCallId = data => async dispatch => {
  console.log('getTokenForVideoCallId*****', data);
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.GetTokenForVideoAPI, 'GET', data);
  console.log('getTokenForVideoCallId response', response);
  dispatch(isDataLoading(false));
  // toastModule.toastMessageBox(response);
  if (response) {
    console.log('getTokenForVideoCallId response=========>', response);
  }
};

export function loginSuccess(userData) {
  return {
    type: 'LOGIN_SUCCESS',
    userData,
  };
}

// ------------------ LogOut API  ------------------------------ //
export const useLogoutAPI = data => async dispatch => {
  console.log('logout*****', data);
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.getLogOut, 'POST', data.data);
  console.log('logout response', response);
  dispatch(isDataLoading(false));
  // toastModule.toastMessageBox(response);
  if (response) {
    console.log('logout response=========>', response);
  }
};

// ------------------ Logout function  ------------------------------ //
export const handleLogout = data => async dispatch => {
  dispatch(isDataLoading(true));
  dispatch(isDataLoading(false));
  dispatch(loginSuccess(data.data));
};

// ------------------ Caregiver Schedules API  ----------------------- //
export const getCaregiverScheduleDetails = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.getCaregiverScheduleListURL,
    'GET',
    data,
  );

  dispatch(isDataLoading(false));
  if (response) {
    response.sort(function (a, b) {
      if (a.CurrentDate < b.CurrentDate) {
        return -1;
      }
      if (a.CurrentDate > b.CurrentDate) {
        return 1;
      }
      return 0;
    });
    console.log('schedule data', response);
    dispatch(scheduleSuccess(response));
  }
};

export function scheduleSuccess(scheduleData) {
  return {
    type: 'STORE_SCHEDULE_DETAILS',
    scheduleData,
  };
}

// ------------------ Caregiver Visit API  ----------------------- //
export const getCaregiverVisitDetails = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.getCaregiverVisitURL, 'GET', data);
  dispatch(isDataLoading(false));
  if (response) {
    dispatch(visitSuccess(response));
  }
};

export function visitSuccess(visitData) {
  return {
    type: 'STORE_VISIT_DETAILS',
    visitData,
  };
}

// ------------------- Set visits filtered data ------------------//

export function setFilteredVisitData({data}) {
  return dispatch => {
    dispatch(filterVisitData(data));
  };
}

export function filterVisitData(filterVisitDetails) {
  return {
    type: 'FLTERED_VISIT_DETAILS',
    filterVisitDetails,
  };
}

// ------------------ Screening Questions API  ----------------------- //
export const getScreeningQuestions = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.getScreeningQuestionURL, 'GET', data);
  dispatch(isDataLoading(false));
  if (response) {
    dispatch(screeningSuccess(response));
  }
};

export function screeningSuccess(screeningData) {
  return {
    type: 'SCREENING_QUESTIONS',
    screeningData,
  };
}

// ------------------- Set Index value ------------------//

export function setIndexData({index}) {
  return dispatch => {
    dispatch(indexData(index));
  };
}

export function indexData(index) {
  return {
    type: 'INDEX',
    index,
  };
}

// ------------------- Set value to refresh screen ------------------//

export function refreshScreen({data}) {
  return dispatch => {
    dispatch(refreshValue(data));
  };
}

export function refreshValue(refresh) {
  return {
    type: 'REFRESH',
    refresh,
  };
}

// ------------------- Set Dropdown Index value ------------------//

export function setDropdownIndex({data}) {
  return dispatch => {
    dispatch(dropdownIndex(data));
  };
}

export function dropdownIndex(dropdownIndex) {
  return {
    type:
      dropdownIndex.listType === constants.AVAILABILITY_SCREEN.RESTRICTIONS
        ? 'DROPDOWN_INDEX'
        : dropdownIndex.listType === constants.AVAILABILITY_SCREEN.ATTRIBUTES
        ? 'DROPDOWN_INDEX_ATTRIBUTE'
        : 'DROPDOWN_INDEX_CERTIFICATE',
    dropdownIndex,
  };
}

// ------------------- Set Dropdown Index value ------------------//

export function setAvailabilityData({data}) {
  return dispatch => {
    dispatch(availabilityData(data));
  };
}

export function availabilityData(restrictionLstdetails) {
  return {
    type: 'AVAILABILITY_DATA',
    restrictionLstdetails,
  };
}

// -------------------- Caregiver CheckIn API ---------------------//
export const caregiverCheckInTime = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.caregiverCheckInTimeURL, 'POST', data);
  dispatch(isDataLoading(false));
  if (response) {
    dispatch(checkInSuccess(response));
  }
};

export function checkInSuccess(checkInStatus) {
  return {
    type: 'CHECK_IN_STATUS',
    checkInStatus,
  };
}

// ------------------ Caregiver Check Out API  ----------------------- //
export const caregiverCheckOutDetails = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.caregiverCheckoutURL,
    'POST',
    data.data,
  );
  dispatch(isDataLoading(false));
  if (response) {
    toastModule.toastMessageBox(response.Message);
    dispatch(checkOutSuccess(response));
  }
};

export function checkOutSuccess(checkOutData) {
  return {
    type: 'CAREGIVER_CHECKOUT',
    checkOutData,
  };
}

// -------------------- Client ISP API ---------------------//
export const getClientISP = data => async dispatch => {
  // console.log('dats get ===>', data);
  dispatch(isDataLoading(true));

  const response = await apiRequest(API.getClientISPURL, 'GET', data);
  // console.log(
  //   'response>>>>>>=====================================>>>>',
  //   response,
  // );
  dispatch(isDataLoading(false));
  if (response) {
    dispatch(clientISPSuccess(response));
  }
};

export function clientISPSuccess(iSPcomment) {
  return {
    type: 'CLIENT_ISP_COMMENT',
    iSPcomment,
  };
}

// -------------------- Client Previous Visits API ---------------------//
export const getClientPreviousVisits = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.getClientPreviousVisitsURL,
    'GET',
    data,
  );
  dispatch(isDataLoading(false));
  if (response) {
    dispatch(clientPreviousVisitsuccess(response));
  }
};

export function clientPreviousVisitsuccess(previousVisits) {
  return {
    type: 'CLIENT_PREVIOUS_VISITS',
    previousVisits,
  };
}

// -------------------- Client Location for Map API ---------------------//
export const getClientLocationForMap = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.getClientLocationForMapURL,
    'GET',
    data,
  );
  dispatch(isDataLoading(false));
  if (response) {
    dispatch(locationSuccess(response));
  }
};

export function locationSuccess(locationForMap) {
  return {
    type: 'LOCATION_FOR_MAP',
    locationForMap,
  };
}

// -------------------- Caregiver Document API ---------------------//
export const getCaregiverDocumentAndPaperList = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.getCaregiverDocumentPaperListURL,
    'GET',
    data,
  );
  dispatch(isDataLoading(false));
  if (response) {
    response.lstPaperwork.sort(function (a, b) {
      if (a.Title.toUpperCase() < b.Title.toUpperCase()) {
        return -1;
      }
      if (a.Title.toUpperCase() > b.Title.toUpperCase()) {
        return 1;
      }
      return 0;
    });

    response.UploadDocument.sort(function (a, b) {
      if (a.DocumentName.toUpperCase() < b.DocumentName.toUpperCase()) {
        return -1;
      }
      if (a.DocumentName.toUpperCase() > b.DocumentName.toUpperCase()) {
        return 1;
      }
      return 0;
    });
    dispatch(clientDocumentSuccess(response));
  }
};

export function clientDocumentSuccess(documentAndPaperList) {
  return {
    type: 'CAREGIVER_DOCUMENT_PAPER_LIST',
    documentAndPaperList,
  };
}

// -------------------- Caregiver Document Template API ---------------------//
export const getCaregiverDocumentTemplate = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.getCaregiverDocumentTemplateURL,
    'GET',
    data,
  );

  if (response) {
    dispatch(isDataLoading(false));
    dispatch(caregiverDocumentTemplateSuccess(response));
  }
};

export function caregiverDocumentTemplateSuccess(documentTemplate) {
  return {
    type: 'CAREGIVER_DOCUMENT_TEMPLATE',
    documentTemplate,
  };
}

// -------------------- Caregiver Download Document API ---------------------//
export const downloadCaregiverDocument = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.downloadCaregiverDocumentURL,
    'GET',
    data,
  );
  dispatch(isDataLoading(false));
  if (response) {
    if (response.Message) {
      Alert.alert(
        'Document',
        response.Message,
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
      dispatch(downloadSuccess(response.Message));
    } else {
      Linking.openURL(
        API.baseURI + API.downloadCaregiverDocumentURL + data.data,
      ).catch(err => {
        console.error('An error occurred', err);
      });
    }
  }
};

export function downloadSuccess(downloadedTemplate) {
  return {
    type: 'DOWNLOADED_DOCUMENT',
    downloadedTemplate,
  };
}

// -------------------- Save edited basic details of caregiver ---------------------//

export function saveEditedBasicDetails({data}) {
  return dispatch => {
    toastModule.toastMessageBox('Updated successfully');
    dispatch(editedBasicDetails(data));
  };
}

export function editedBasicDetails(editedBasicDetails) {
  return {
    type: 'EDITED_BASIC_DETAILS',
    editedBasicDetails,
  };
}

// -------------------- Save edited form details of caregiver ---------------------//

export function setEditedFormData({data}) {
  return dispatch => {
    dispatch(editedformDetails(data));
  };
}

export function editedformDetails(editedformDetails) {
  return {
    type: 'EDITED_FORM_DETAILS',
    editedformDetails,
  };
}

// -------------------- Save location details of caregiver ---------------------//

export function saveLocationDetails({data}) {
  return dispatch => {
    dispatch(locationDetails(data));
  };
}

export function locationDetails(locationData) {
  return {
    type: 'LOCATION',
    locationData,
  };
}

// -------------------- Caregiver Get Document Signature API ---------------------//
export const getCaregiverDocumentSignature = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.getDocumentSignatureURL, 'GET', data);
  console.log('response+++++++', response);
  dispatch(isDataLoading(false));
  if (response) {
    dispatch(documentSignatureSuccess(response));
  }
};

export function documentSignatureSuccess(documentSignature) {
  return {
    type: 'GET_DOCUMENT_SIGNATURE',
    documentSignature,
  };
}

// -------------------- Caregiver Save Document Signature API ---------------------//
export const saveCaregiverDocumentSignature = data => async dispatch => {
  console.log('data', data);
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.saveDocumentSignatureURL,
    'POST',
    data.data,
  );
  dispatch(isDataLoading(false));
  console.log('response=========<<<<', response);
  if (response.Message) {
    toastModule.toastMessageBox(response.Message);
    dispatch(savedocumentSignatureSuccess(data));
  } else {
    toastModule.toastMessageBox('Something went wrong!');
  }
};

export function savedocumentSignatureSuccess(documentSignatureMessage) {
  return {
    type: 'SAVE_DOCUMENT_SIGNATURE',
    documentSignatureMessage,
  };
}

// -------------------- Caregiver Save Document API ---------------------//
export const saveApprovedDocument = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.saveApproveDocumentURL,
    'POST',
    data.data,
  );
  dispatch(isDataLoading(false));
  if (response) {
    toastModule.toastMessageBox(response.Message);
    dispatch(saveApprovedDocSuccess(response));
  }
};

export function saveApprovedDocSuccess(saveDocument) {
  return {
    type: 'SAVE_DOCUMENT',
    saveDocument,
  };
}

// -------------------- Send message API ---------------------//
export const sendMessage = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.sendMessageURL, 'POST', data.data);
  dispatch(isDataLoading(false));
  if (response) {
    dispatch(isModalVisible(true));
    dispatch(sendingMessageSuccess(response));
  }
};

export function sendingMessageSuccess(messageToAgency) {
  return {
    type: 'MESSAGE_TO_AGENCY',
    messageToAgency,
  };
}

// ------------------ clear messaging data function  ------------------------------ //
export const clearMessage = data => async dispatch => {
  dispatch(isDataLoading(true));
  await dispatch(isDataLoading(false));
  dispatch(sendingMessageSuccess(data.data));
};

// ---------------- Set modal status -------------------------//
export function isModalVisible(modalVisible) {
  return {
    type: 'IS_MODAL_VISIBLE',
    modalVisible,
  };
}

export const setModalStatus = data => async dispatch => {
  dispatch(isModalVisible(false));
};

// -------------------- Caregiver Availability API ---------------------//
export const getAvailabilityDetails = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.caregiverAvailabilityDetailsURL,
    'GET',
    data,
  );
  dispatch(isDataLoading(false));
  if (response) {
    dispatch(availabilityDetailsSuccess(response));
  }
};

export function availabilityDetailsSuccess(availabilityDetails) {
  return {
    type: 'AVAILABILITY_DETAILS',
    availabilityDetails,
  };
}

// -------------------- Caregiver Availability API ---------------------//
export const saveAvailabilityDetails = data => async dispatch => {
  dispatch(isDataLoading(true));

  console.log('data======>>>', data);
  const response = await apiRequest(
    API.saveCaregiverAvailabilityDetailsURL,
    'POST',
    data.data,
  );

  dispatch(isDataLoading(false));
  if (response) {
    toastModule.toastMessage(response.Message);
    dispatch(updateAvailabilityDetailsSuccess(response));
  }
};

export function updateAvailabilityDetailsSuccess(updateAvailabilityDetails) {
  return {
    type: 'SAVE_AVAILABILITY_DETAILS',
    updateAvailabilityDetails,
  };
}

// ------------------ Caregiver Visit API  ----------------------- //
export const getCaregiverRewardsBalance = data => async dispatch => {
  console.log('data', data);
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.rewardsURL,
    'POST',
    data.data,
    'rewards',
  );
  console.log('response', response);
  // alert(JSON.stringify(response));
  dispatch(isDataLoading(false));
  // if (response) {
  //   dispatch(isModalVisible(true));
  //   dispatch(sendingMessageSuccess(response));
  // }
};

// ------------------ Caregiver Rewardien Balence Check  ----------------------- //
export const getCaregiverBalanceReward = data => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(
    API.rewardBalance + `?id=${data.data}`,
    'GET',
  );
  dispatch(isDataLoading(false));
  // if (response) {
  //   dispatch(isModalVisible(true));
  //   dispatch(sendingMessageSuccess(response));
  // }
  if (response) {
    dispatch(RewardienBalance(response));
  }
};
