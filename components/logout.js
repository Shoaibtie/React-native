import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as actions from '../redux/actions/authaction';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = data => dispatch(actions.handleLogout({data}));
  const userData = useSelector(state => state.auth.userData);
  const useLogoutAPI = data => dispatch(actions.useLogoutAPI({data}));
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log('logout', userData.LoggedUserId);
      };
    }, []),
  );

  React.useEffect(() => {
    AsyncStorage.removeItem('userToken');
    const id = {Id: userData.LoggedUserId};
    useLogoutAPI(id);
    const data = {};
    handleLogout(data);
  });
  return <></>;
};

export default Logout;
