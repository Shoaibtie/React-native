import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import * as actions from '../../../redux/actions/authaction';
import * as constants from '../../../appResources/constants';
import Header from '../../../components/header';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import Map from './map';
import Loader from '../../../utils/loader/loader';

class Location extends Component {
  state = {
    isEnabled: false,
    startDate: '',
    endDate: '',
    loading: false,
  };

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getLocationForMapAPIHandler();
  }

  getLocationForMapAPIHandler = async () => {
    const {userData, scheduleData, index} = this.props;
    let locationUrl =
      'caregiverId=' +
      userData.LoggedUserId +
      '&location=' +
      'Test' +
      '&clientId=' +
      scheduleData[index].ClientId;

    await this.props.getClientLocationForMap(locationUrl);
  };

  setBack = () => {
    this.props.navigation.navigate('CaregiverVisit');
  };

  openGps = (lat, lng) => {
    this.setState({loading: false});
    const {locationForMap} = this.props;
    let dLat = locationForMap.ClientLatitude;
    let dLng = locationForMap.ClientLongitude;
    let CaregiverAddress = locationForMap.CaregiverAddress;
    let ClientAddress = locationForMap.ClientAddress;
    // const url3 = `http://maps.apple.com/?saddr=${lat},${lng}&daddr=${dLat},${dLng}`;
    const url3 = `http://maps.apple.com/?saddr=${CaregiverAddress}&daddr=${ClientAddress}`;
    if (dLat && dLng) {
      Linking.openURL(url3);
    } else {
      Alert.alert(
        'Location Permission', //error.message
        "Client's location is not available.",
        [
          {
            text: 'OK',
          },
        ],
      );
    }
  };

  requestLocationPermission = async () => {
    this.setState({loading: true});
    if (Platform.OS === 'ios') {
      this.getOneTimeLocation();
      this.subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        // this.setState({ permission: granted })
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getOneTimeLocation();
          // this.subscribeLocationLocation();
        } else {
          this.setState({locationStatus: 'Permission Denied'});
        }
      } catch (err) {
        console.warn('err', err);
      }
    }
  };

  //Function to get one time location

  getOneTimeLocation = async () => {
    // this.setState({ locationStatus: 'Getting Location ...' });
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        // this.setState({ locationStatus: 'You are Here' });

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        if (currentLatitude && currentLongitude) {
          this.setState({loading: false});
        }
        this.setState({currentLatitude: currentLatitude});
        const locationData = {
          currentLongitude: currentLongitude,
          currentLatitude: currentLatitude,
        };
        this.openGps(currentLatitude, currentLongitude);
      },
      error => {
        this.setState({locationStatus: error.message, loading: false});
        Alert.alert(
          'Location Permission', //error.message
          'Unable to login due to no location available. Please allow location to login.',
          [
            {
              text: 'OK',
              // onPress: () => {
              //     this.openGps(0.0000000, 0.0000000)
              // }
            },
          ],
        );
        this.setState({loading: false});
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  render() {
    const {locationForMap} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <Header
            screenName="MAP"
            headerType="back"
            setDrawerVisible={visible => this.setBack()}
          />
          <Loader loading={this.state.loading} />
        </View>
        <View style={{flex: 9}}>
          <Map
            lat={locationForMap.ClientLatitude}
            lng={locationForMap.ClientLongitude}
          />
        </View>

        <View style={[styles.buttonView, {flex: 1}]}>
          {/* <View style={styles.blankView}>
                    </View> */}
          <TouchableOpacity
            onPress={this.requestLocationPermission}
            style={styles.directionButtonStyle}>
            <Text style={styles.textStyle}>Get Direction</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  scheduleData: state.caregiverSchedule.scheduleData,
  visitData: state.caregiverSchedule.visitData,
  locationForMap: state.caregiverSchedule.locationForMap,
  locationData: state.location.locationData,
  isLoading: state.loader.isLoading,
  index: state.indexValue.index,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  getClientLocationForMap: data =>
    dispatch(actions.getClientLocationForMap({data})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
  flexStyle: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    padding: '2%',
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionButtonStyle: {
    flex: 0.6,
    backgroundColor: '#3172b6',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 1,
  },
  blankView: {
    flex: 1,
  },
});
