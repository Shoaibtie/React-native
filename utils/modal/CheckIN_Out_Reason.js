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
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {Divider} from 'react-native-elements';
import {PermissionsAndroid} from 'react-native';
import Loader from '../../utils/loader/loader';

import * as constants from '../../appResources/constants';
import * as actions from '../../redux/actions/authaction';
import toastModule from '../toastModule/tosatAlert';

import Geolocation from '@react-native-community/geolocation';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

import moment from 'moment';
import {position} from 'styled-system';

const HideKeyboard = ({children}) => (
  <View
    onStartShouldSetResponder={() => true}
    onResponderGrant={() => Keyboard.dismiss()}>
    {children}
  </View>
);
class CheckIn_OutReason extends Component {
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
  componentDidMount() {
    var time = new Date().toLocaleString();
    let outTime = moment().format('YYYY-MM-DD HH:mm:ss');
    var pastTimeCompare = this.props.props.visitData;
  }

  // Function to handle permission access of location

  requestLocationPermission = async () => {
    this.setState({loading: true});
    if (Platform.OS === 'ios') {
      this.getOneTimeLocation();
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
        this.setState({permission: granted});
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getOneTimeLocation();
          // this.setState({loading: true});
          // this.subscribeLocationLocation();
        } else {
          this.setState({locationStatus: 'Permission Denied'});
          this.setState({loading: false});
        }
      } catch (err) {
        console.warn('err', err);
        this.setState({loading: false});
      }
    }
  };

  getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({loading: true});
        const initialPosition = position;
        setTimeout(() => {
          console.log('initialPosition', initialPosition.coords.latitude);
          this.setState({locationStatus: 'You are Here'});

          //getting the Longitude from the location json
          const currentLongitude = JSON.stringify(
            initialPosition.coords.longitude,
          );

          //getting the Latitude from the location json
          const currentLatitude = JSON.stringify(
            initialPosition.coords.latitude,
          );

          //Setting Longitude state
          this.setState({currentLongitude: currentLongitude});

          //Setting Longitude state
          this.setState({currentLatitude: currentLatitude});

          if (currentLongitude && currentLatitude) {
            var checkout_obj = {
              comment: this.state.comment,
              latitude: currentLatitude,
              longitude: currentLongitude,
              loading: false,
            };
            this.setState({loading: false});
            this.props.saveComment(checkout_obj);
          } else {
            this.setState({loading: false});
          }
        }, 5000);
      },
      error => {
        setTimeout(() => {
          this.setState({locationStatus: error.message, loading: false});
          Alert.alert(
            'Location Permission', //error.message
            'Unable to login due to no location available. Please allow location to login.',
            [
              {
                text: 'OK',
                onPress: () => {
                  this.props.setModalVisible(false);
                  // this.props.refreshScreen(true);
                  // this.props.props.navigation.navigate('MySchedules');
                },
              },
            ],
          );
          this.setState({loading: false});
        }, 5000);
      },
      {
        enableHighAccuracy: false,
        timeout: Platform.OS === 'ios' ? 30000 : 30000,
        maximumAge: Platform.OS == 'ios' ? 10000 : 5000,
      },
    );
  };

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
    console.log('apiHandler', currentLongitude, '  ', currentLatitude);
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
  backhandler = async screen => {
    if (this.state.comment) {
      this.requestLocationPermission();
    } else {
      toastModule.toastMessageBox('Please enter specific reason');
    }
  };

  render() {
    const {modalVisible, setModalVisible, checkOut, saveComment} = this.props;
    // console.log('checkout', this.props.props.visitData);
    return (
      <View style={{flex: 1}}>
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
              <HideKeyboard>
                {this.state.loading ? (
                  <Loader loading={this.state.loading} />
                ) : null}
                <View style={{marginVertical: '2%'}}>
                  <Text style={styles.forgotTextStyle}>
                    {checkOut == 'Check Out'
                      ? constants.QUESTIONING_SCREEN_CHECtOUT.MODAL_HEADER
                      : constants.QUESTIONING_SCREEN_CHECKIN.MODAL_HEADER}
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
                    {checkOut == 'Check Out'
                      ? constants.QUESTIONING_SCREEN_CHECtOUT.MODAL_CONTENT
                      : QUESTIONING_SCREEN_CHECKIN.MODAL_CONTENT}
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
                  <TouchableOpacity
                    style={[styles.button, styles.buttonOk]}
                    // onPress={() => saveComment(this.state.comment)}
                    onPress={
                      () => this.backhandler()
                      // saveComment(this.state.comment)
                    }>
                    <Text style={styles.textStyle}>
                      {constants.BUTTON_NAME.SAVE}
                    </Text>
                  </TouchableOpacity>
                  <Pressable
                    style={[styles.button, styles.buttonOk]}
                    onPress={() => {
                      setModalVisible(!modalVisible),
                        this.setState({loading: false});
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </HideKeyboard>
            </View>
          </View>
        </Modal>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn_OutReason);

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
});
