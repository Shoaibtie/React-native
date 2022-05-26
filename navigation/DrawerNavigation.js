import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  mySchedulesStackNavigator,
  messageStackNavigator,
  availabilityStackNavigator,
  VideoCallingStackNavigator,
} from './StackNavigator';
import TabNavigator from './TabNavigator';

import CustomDrawerContent from '../screens/share/CustomDrawerContent';
import Home from '../screens/dashborad/home';
import ImageUrl from '../appResources/imageUrl';
import Logout from '../components/logout';
import * as constants from '../appResources/constants';

const Drawer = createDrawerNavigator();

function CustomDrawerContentMap(props) {
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawerContent {...props} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={constants.SCREEN_NAME.HOME_SCREEN}
      detachInactiveScreens={false}
      screenOptions={{
        drawerStyle: {
          backgroundColor: constants.COLOR_CODE.APP_COLOR,
        },
        drawerActiveTintColor: constants.COLOR_CODE.DRAWER_ACTIVE_COLOR,
        drawerLabelStyle: {
          color: constants.COLOR_CODE.WHITE,
        },
        headerShown: false,
      }}
      drawerContent={props => (
        <CustomDrawerContentMap
          // initialParams={{signOut: authContext.signOut}}
          {...props}
        />
      )}>
      <Drawer.Screen
        name={constants.SCREEN_NAME.HOME_SCREEN}
        initialRouteName={constants.SCREEN_NAME.HOME_SCREEN}
        component={Home}
        options={{
          drawerIcon: config => (
            <Image
              style={styles.drawerIconsStyle}
              source={ImageUrl.home_icon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={constants.SCREEN_NAME.MY_SCHEDULE_SCREEN}
        initialRouteName={constants.SCREEN_NAME.HOME_SCREEN}
        component={mySchedulesStackNavigator}
        options={{
          drawerIcon: config => (
            <Image
              style={styles.drawerIconsStyle}
              source={ImageUrl.schedule_icon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={constants.SCREEN_NAME.DOCUMENT_SCREEN}
        initialRouteName={constants.SCREEN_NAME.HOME_SCREEN}
        component={TabNavigator}
        options={{
          drawerIcon: config => (
            <Image
              style={styles.drawerIconsStyle}
              source={ImageUrl.document_icon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={constants.SCREEN_NAME.AVAILABILITY_SCREEN}
        initialRouteName={constants.SCREEN_NAME.HOME_SCREEN}
        component={availabilityStackNavigator}
        options={{
          drawerIcon: config => (
            <Image
              style={styles.drawerIconsStyle}
              source={ImageUrl.availability_icon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={'Videocalling'}
        initialRouteName={constants.SCREEN_NAME.HOME_SCREEN}
        component={VideoCallingStackNavigator}
        options={{
          drawerIcon: config => (
            <Image
              style={[styles.drawerIconsStyle, {tintColor: '#fff'}]}
              source={ImageUrl.videoc_icon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={constants.SCREEN_NAME.MESSAGE_SCREEN}
        initialRouteName={constants.SCREEN_NAME.HOME_SCREEN}
        component={messageStackNavigator}
        options={{
          drawerIcon: config => (
            <Image
              style={styles.drawerIconsStyle}
              source={ImageUrl.messaging_icon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={constants.SCREEN_NAME.LOGOUT_SCREEN}
        component={Logout}
        options={{
          drawerIcon: config => (
            <Image
              style={styles.drawerIconsStyle}
              source={ImageUrl.logout_icon}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerIconsStyle: {
    width: 24,
    height: 24,
  },
});

export default DrawerNavigator;
