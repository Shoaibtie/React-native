import React from "react";
import {
  Alert,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const currentLocation = {

  requestLocationPermission: async (dataArary) => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      // this.subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation();
          // this.subscribeLocationLocation();
        } else {
          // this.setState({ locationStatus: 'Permission Denied' });
        }
      } catch (err) {
        console.warn('err', err);
      }
    }
  },

  getOneTimeLocation: (dataArary) => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        // this.setState({ locationStatus: 'You are Here' });

        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state 
        // this.setState({ currentLongitude: currentLongitude });

        //Setting Longitude state
        // this.setState({ currentLatitude: currentLatitude });
        const locationData = {
          currentLongitude: currentLongitude,
          currentLatitude: currentLatitude
        }
        // setLocationData(locationData);
        return locationData;
        // this.props.saveLocationDetails(locationData);
        // if (currentLongitude && currentLatitude) {
        //   this.apiHandler();
        // } else {
        //   this.props.refreshScreen(true);
        //   this.props.props.navigation.navigate('MySchedules');
        // }
      },
      (error) => {
        // this.setState({ locationStatus: error.message });
        Alert.alert(
          "Location Permission",  //error.message
          "Unable to login due to no location available. Please allow location to login.",
          [
            {
              text: "OK",
              // onPress: () => {
              //   this.props.refreshScreen(true);
              //   this.props.props.navigation.navigate('MySchedules');
              // }
            }
          ]
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  }
}

export default currentLocation;