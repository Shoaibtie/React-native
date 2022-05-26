import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/authaction';
import * as constants from '../../appResources/constants';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import IncomingCallScreen from '../../utils/modal/IncommingCall';

const TendioLogo = require('../../assests/Tendio.png');
const drawerIcon = require('../../assests/drawer-icon.png');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceToken: '',
      deviceId: '',
      buildNumber: '',
      number: '',
    };
  }

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('focus======>', this.props);
    });

    this.deviceTokenGet();
    DeviceInfo.getBuildId().then(deviceId => {});
    let buildNumber = DeviceInfo.getReadableVersion();
    if (buildNumber) {
      this.setState({
        buildNumber: buildNumber,
      });
    }
    setTimeout(() => {
      this.props.navigation.openDrawer();
    }, 1);
  };

  shouldComponentUpdate(nextProps, nextState) {
    // this.setState({buildNumber:nextState})
    console.log('nextProps', nextProps, 'nextState', nextState);
    console.log('async', JSON.stringify(AsyncStorage.getItem('Notify')));
  }

  deviceTokenGet = async () => {
    try {
      const token = await AsyncStorage.getItem('deviceToken');
      console.log('device****************', token);
      // alert(token);
      if (token !== null) {
        DeviceInfo.getAndroidId().then(deviceId => {
          this.setState({deviceId: deviceId});
          const deviceData = {
            id: this.props.userData.LoggedUserId,
            GcmRegisterdId: token,
            DeviceId: deviceId,
          };
          console.log('deviceData=========>', deviceData);
          this.props.deviceRegisteration(deviceData);
        });
      }
    } catch (e) {
      // alert('Failed to fetch the data from storage');
    }
  };
  input = text => {
    return c => {
      console.log(c);
    };
  };

  changeHandle = text => {
    if (text - text == 0) {
      this.setState({number: text});
    } else {
      this.setState({number: ''});
    }
  };
  setDrawerVisible = () => {
    this.props.navigation.toggleDrawer();
  };
  setModalVisible = () => {
    this.set;
  };

  componentWillUnmount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('focus======>', this.props);
    });
  }

  render() {
    console.log('this.props', this.props);
    const {buildNumber, modalVisible} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.drawerFlexStyle}>
          <Pressable onPress={this.setDrawerVisible}>
            <Image source={drawerIcon} />
          </Pressable>
        </View>
        <View style={styles.flexStyle}>
          <Image source={TendioLogo} />
        </View>
        <View style={styles.flexStyle}>
          <Text style={styles.textDesign}>
            {constants.VERSION.VERSION_NUMBER}-{buildNumber}
          </Text>
        </View>
        {/* {
          <IncomingCallScreen
            modalVisible={modalVisible}
            setModalVisible={() => this.setModalVisible()}
          />
        } */}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  // error: state.auth.error,
  // isLoading: state.loader.isLoading,
});

const mapDispatchToProps = dispatch => ({
  deviceRegisteration: deviceData =>
    dispatch(actions.deviceRegisteration({deviceData})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  textDesign: {
    fontWeight: '700',
    color: '#21225B',
    padding: '3%',
  },
  imageStyle: {
    width: 60,
    height: 60,
  },
  flexStyle: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  drawerFlexStyle: {
    flex: 0.12,
    backgroundColor: '#3172b6',
  },
});
