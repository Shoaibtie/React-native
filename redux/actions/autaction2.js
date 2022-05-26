import apiRequest from "../network/api";
	import {
	  loginApi,
	  isLoading,
	  profession,
	  resetStore,
	  changePasswordApi,
	  logOut,
	} from "../constans/actionString";
	import API from "../constans/api";
	import AsyncStorage from "@react-native-community/async-storage";
	
	// -------------  set user details ------- //
	export const setUserDetails = () => async (dispatch) => {
	  const user = await AsyncStorage.getItem("user");
	  if (user) {
	    dispatch({ type: loginApi, payload: { user: JSON.parse(user) } });
	  }
	};
	
	// ------------------ Login API  ----------------------- //
	export const handleSignIn = (loginData) => async (dispatch) => {
	  dispatch({ type: isLoading, payload: { loader: true } });
	  const response = await apiRequest(API.login, 'POST', loginData);
	  if (response && response.success) {
	    AsyncStorage.setItem('userToken', response.token);
	    AsyncStorage.setItem('user', JSON.stringify(response));
	    dispatch({type: loginApi, payload: {user: response}});
	  }
	  dispatch({type: isLoading, payload: {loader: false}});
	  return response ? response : false;
	};
	
	// ------------------ Google Login API  ----------------------- //
	export const handleGoogleLogIn = (googleloginData) => async (dispatch) => {
	  dispatch({ type: isLoading, payload: { loader: true } });
	  const response = await apiRequest(API.googleLogin, 'POST', googleloginData);
	  if (response && response.success) {
	    AsyncStorage.setItem('userToken', response.token);
	    AsyncStorage.setItem('user', JSON.stringify(response));
	    dispatch({type: loginApi, payload: {user: response}});
	  }
	  dispatch({type: isLoading, payload: {loader: false}});
	  //return response ? response : false;
	};
	
	// ----------------Sign Up API--------------------- //
	export const handleSignUp = (signUpData) => async (dispatch) => {
	  dispatch({type: isLoading, payload: {loader: true}});
	  const response = await apiRequest(API.signUp, 'POST', signUpData);
	  if (response && response.success) {
	    // AsyncStorage.setItem('userToken', response.token);
	    // AsyncStorage.setItem('user', JSON.stringify(response));
	    dispatch({type: loginApi, payload: {user: response}});
	  }
	  dispatch({type: isLoading, payload: {loader: false}});
	};
	
	// ----------------Forgot password API--------------------- //
	export const handleForgotPassword = (forgotPasswordData) => async (
	  dispatch
	) => {
	  dispatch({ type: isLoading, payload: { loader: true } });
	  const response = await apiRequest(
	    API.forgotPassword,
	    "POST",
	    forgotPasswordData
	  );
	  if (response && response.status) {
	    dispatch({ type: loginApi, payload: { user: response } });
	  }
	  dispatch({ type: isLoading, payload: { loader: false } });
	};
	
	// ----------------Otp password API--------------------- //
	export const handleSendOtp = (otpData) => async (dispatch) => {
	  dispatch({type: isLoading, payload: {loader: true}});
	  const response = await apiRequest(API.resendOtp, 'POST', otpData);
	  if (response && response.success) {
	    dispatch({type: loginApi, payload: {user: response}});
	  }
	  dispatch({type: isLoading, payload: {loader: false}});
	  return response && response.success ? response : false;
	};
	
	// -------------- forgot send OTP password API ---------------//
	export const handleForgotSendOTP = (data) => async (dispatch) => {
	  dispatch({type: isLoading, payload: {loader: true}});
	  const response = await apiRequest(API.sendOTP, 'POST', data);
	  if (response && response.success) {
	    dispatch({type: loginApi, payload: {user: response}});
	  }
	  dispatch({type: isLoading, payload: {loader: false}});
	  return response && response.success ? response : false;
	};
	
	// ----------------Otp password API--------------------- //
	export const handleOtpVerify = (otpNumber) => async (dispatch) => {
	  dispatch({type: isLoading, payload: {loader: true}});
	  const response = await apiRequest(API.verifyOtp, 'POST', otpNumber);
	  if (response && response.success) {
	    dispatch({type: loginApi, payload: {user: response}});
	  }
	  dispatch({type: isLoading, payload: {loader: false}});
	  return response && response.success ? response : false;
	};
	
	// ---------- Reset password otp verify ------------------//
	export const handleOtpVerifyForResetPassword = (otpNumber) => async (dispatch) => {
	  dispatch({type: isLoading, payload: {loader: true}});
	  const response = await apiRequest(API.forgotVerifyOTP, 'POST', otpNumber);
	  if (response && response.success) {
	    dispatch({type: loginApi, payload: {user: response}});
	  }
	  dispatch({type: isLoading, payload: {loader: false}});
	  return response && response.success ? response : false;
	};
	// ----------------Reset password API--------------------- //
	export const handleResetPassword = (resetPasswordData) => async (dispatch) => {
	  dispatch({type: isLoading, payload: {loader: true}});
	  const response = await apiRequest(
	    API.changePassword,
	    'POST',
	    resetPasswordData,
	  );
	  if (response && response.success) {
	    dispatch({type: changePasswordApi, payload: {changePassword: response}});
	    dispatch({type: resetStore});
	  }
	  dispatch({type: isLoading, payload: {loader: false}});
	  return response && response.success  ? response : false;
	};
	// ----------------get all Profession list  --------------- //
	export const handleAllProfession = () => async (dispatch) => {
	  dispatch({type: isLoading, payload: {loader: true}});
	  const response = await apiRequest(API.getAllProfessions, 'GET');
	  if (response && response.success) {
	    dispatch({type: profession, payload: response.data});
	  }
	  dispatch({type: isLoading, payload: {loader: false}});
	};
	// -------------logout handler----------------- //
	export const handleLogout = (logOutData) => async (dispatch) => {
	  dispatch({ type: isLoading, payload: { loader: true } });
	  const response = await apiRequest(API.logOutUser, "POST", logOutData);
	  if (response && response.success) {
	    dispatch({ type: logOut, payload: { logOut: response } });
	  }
	  dispatch({ type: isLoading, payload: { loader: false } });
	  return response && response.success ? response : false;
	};
	// ----------------Reset password API--------------------- //
	export const handleUpdate= (data) => async (dispatch) => {
	  alert(JSON.stringify(data))
    }
