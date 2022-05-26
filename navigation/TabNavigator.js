import React from "react";
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as Constants from '../appResources/constants';
import { caregiverVisitStackNavigator, clientISPStackNavigator, caregiverPreviousVisitStackNavigator, locationStackNavigator, documentStackNavigator, paperWorkStackNavigator } from './StackNavigator';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ route, navigation }) => {
  const scheduleData = useSelector(state => state.caregiverSchedule.scheduleData);
  const index = useSelector(state => state.indexValue.index);
  return (
    <Tab.Navigator
      initialRouteName="Services"
      screenOptions={{                 //tabBarOptions
        tabBarActiveBackgroundColor: '#0D60A9',
        tabBarInactiveBackgroundColor: Constants.COLOR_CODE.APP_COLOR,
        sceneContainerStyle: {
          backgroundColor: Constants.COLOR_CODE.APP_COLOR,
        },
        tabBarLabelStyle: {
          textAlign: 'center',
          padding: 1,
          fontSize: 14,
          fontWeight: '600',
          color: '#fff',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
        headerShown: false,
        tabBarLabelPosition: 'below-icon',

      }}
    >
      {route.name === 'CaregiverVisit' && (
        <Tab.Screen
          name={scheduleData.length > 0 && scheduleData[index].Status === 'Scheduled' ? "CLOCK-IN" : "VISIT FORM"} //location-pin
          component={caregiverVisitStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <TouchableOpacity onPress={() => scheduleData.length > 0 && scheduleData[index].Status === 'Scheduled' ? navigation.navigate('ScreeningQuestion') : null}>
                {scheduleData.length > 0 && scheduleData[index].Status && scheduleData[index].Status === 'Scheduled' ?
                  <Ionicons name="timer-outline" size={26} color="#fff" /> :
                  <MaterialCommunityIcons name="file-document-edit" size={26} color="#fff" />
                }

              </TouchableOpacity>
            ),
          }}
        />)}
      {route.name === 'CaregiverVisit' && (
        <Tab.Screen
          name={'CLIENT ISP'}
          component={clientISPStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="text-document" size={26} color="#fff" />
            ),
          }}
        />)}
      {route.name === 'CaregiverVisit' && (
        <Tab.Screen
          name='PREVIOUS VISIT'
          component={caregiverPreviousVisitStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Foundation name="page-search" size={26} color="#fff" />
            ),
          }}
        />)}
      {route.name === 'CaregiverVisit' && (
        <Tab.Screen
          name='MAP'
          component={locationStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="map-marker-alt" size={26} color="#fff" />
            ),
          }}
        />)}
      {route.name === 'Document' && (
        <Tab.Screen
          name='PAPER WORK'
          component={paperWorkStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <TouchableOpacity>
                <MaterialCommunityIcons name="file-document-edit" size={26} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />)}
      {route.name === 'Document' && (
        <Tab.Screen
          name='DOCUMENTS'
          component={documentStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="text-document" size={26} color="#fff" />
            ),
          }}
        />)}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;