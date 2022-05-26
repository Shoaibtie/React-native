import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {Divider} from 'react-native-elements';
import {PermissionsAndroid} from 'react-native';

import * as constants from '../../appResources/constants';
import * as actions from '../../redux/actions/authaction';
import toastModule from '../toastModule/tosatAlert';

import Geolocation from '@react-native-community/geolocation';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ModalBox extends Component {
  state = {
    loading: false,
    isModalVisible: false,
    comment: '',
    currentLongitude: '',
    currentLatitude: '',
    locationStatus: '',
    permission: '',
  };

  constructor(props) {
    super(props);
  }

  // Function to handle permission access of location

  requestLocationPermission = async () => {
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
        this.setState({permission: granted});
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
    this.setState({locationStatus: 'Getting Location ...'});
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        this.setState({locationStatus: 'You are Here'});

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        this.setState({currentLongitude: currentLongitude});

        //Setting Longitude state
        this.setState({currentLatitude: currentLatitude});
        const locationData = {
          currentLongitude: currentLongitude,
          currentLatitude: currentLatitude,
        };
        this.props.saveLocationDetails(locationData);
        if (currentLongitude && currentLatitude) {
          this.apiHandler();
        } else {
          this.props.refreshScreen(true);
          this.props.props.navigation.navigate('MySchedules');
        }
      },
      error => {
        this.setState({locationStatus: error.message});
        Alert.alert(
          'Location Permission', //error.message
          'Unable to login due to no location available. Please allow location to login.',
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.refreshScreen(true);
                this.props.props.navigation.navigate('MySchedules');
              },
            },
          ],
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 5000,
      },
    );
  };

  // Function to handle tracking of location

  subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change
        this.setState({locationStatus: 'You are Here'});

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        this.setState({currentLongitude: currentLongitude});

        //Setting Latitude state
        this.setState({currentLatitude: currentLatitude});
      },
      error => {
        this.setState({locationStatus: error.message});
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  //Function to get location
  buttonHandler = async screen => {
    if (this.state.comment) {
      this.requestLocationPermission();
    } else {
      toastModule.toastMessageBox('Please enter specific reason');
    }
  };

  // Function to call API to check-in

  apiHandler = async () => {
    const {currentLongitude, currentLatitude, permission, locationStatus} =
      this.state;
    const {userData, scheduleData, index} = this.props;
    const currentDate = new Date();
    var time =
      currentDate.getHours() +
      ':' +
      currentDate.getMinutes() +
      ':' +
      currentDate.getSeconds();
    const data = {
      ScheduledId: scheduleData[index].Id,
      ClientId: scheduleData[index].ClientId,
      LoggedUserId: userData.LoggedUserId,
      CheckInTime: time,
      CheckInComment: this.state.comment,
      Latitude: currentLatitude,
      Longitude: currentLongitude,
    };

    await this.props.caregiverCheckInTime(data);
    this.props.refreshScreen(true);
    this.props.props.navigation.navigate('MySchedules');
  };

  // Function to handle navigation on close button

  closeScreen = () => {
    this.props.props.navigation.navigate('MySchedules');
  };
  render() {
    const {modalVisible, setModalVisible} = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginVertical: '2%'}}>
              <Text style={styles.forgotTextStyle}>
                {constants.QUESTIONING_SCREEN.MODAL_HEADER}
              </Text>
            </View>
            <Divider
              style={{
                backgroundColor: 'gray',
                borderWidth: 1,
                width: 300,
              }}
            />
            <View style={{marginVertical: '1%'}}>
              <Text style={[styles.textStyle, {color: '#000'}]}>
                {constants.QUESTIONING_SCREEN.MODAL_CONTENT}
              </Text>
            </View>
            <View style={{marginVertical: '1%'}}>
              <TextInput
                placeholder="Enter reason"
                multiline
                style={styles.textInputDesign}
                value={this.state.comment}
                onChangeText={text => this.setState({comment: text})}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                marginVertical: '2%',
              }}>
              <Pressable
                style={[styles.button, styles.buttonOk]}
                onPress={this.buttonHandler}>
                <Text style={styles.textStyle}>
                  {constants.BUTTON_NAME.SAVE}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOk]}
                onPress={this.closeScreen}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  scheduleData: state.caregiverSchedule.scheduleData,
  index: state.indexValue.index,
  checkInStatus: state.caregiverSchedule.checkInStatus,
  locationData: state.location.locationData,
  isLoading: state.loader.isLoading,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  caregiverCheckInTime: data => dispatch(actions.caregiverCheckInTime(data)),
  refreshScreen: data => dispatch(actions.refreshScreen({data})),
  saveLocationDetails: data => dispatch(actions.saveLocationDetails({data})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBox);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputDesign: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 2,
    minWidth: 300,
    backgroundColor: '#fff',
    padding: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    marginVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 2,
    padding: '3%',
    elevation: 2,
    alignItems: 'center',
  },
  buttonOk: {
    backgroundColor: '#4cae4c',
    marginHorizontal: '2%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  forgotTextStyle: {
    color: '#3172b6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // textInputDesign: {
  //     height: 40,
  //     borderColor: 'gray',
  //     borderBottomWidth: 2,
  //     minWidth: screenWidth < 420 && screenHeight < 700 ? 280 : 300,
  //     backgroundColor: '#fff',
  //     padding: 5,
  //     marginLeft: 'auto',
  //     marginRight: 'auto',
  //     alignItems: 'center',
  //     marginVertical: screenWidth < 420 && screenHeight < 700 ? 20 : 25,
  //     fontSize: screenWidth < 420 && screenHeight < 700 ? 15 : 16,
  //     fontWeight: 'bold',
  //     color: 'black',
  // },
});
