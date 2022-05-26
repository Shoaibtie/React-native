import React, {Component} from 'react';
import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from '../navigation/DrawerNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import login from '../screens/auth/login';
import * as constants from '../appResources/constants';
import {navigationRef, isReadyRef} from '../services/RootNavigation';

const Stack = createStackNavigator();

class AppNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        {this.props.userData.AccessToken == null ||
        this.props.userData.LoggedRole !== constants.STRING_NAME.CAREGIVER ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              name={constants.SCREEN_STACK_NAME.SIGN_IN}
              component={login}
            />
          </Stack.Navigator>
        ) : (
          <DrawerNavigator />
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
});

export default connect(mapStateToProps)(AppNavigation);
