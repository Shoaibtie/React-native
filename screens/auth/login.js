import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import * as actions from '../../redux/actions/authaction';
import * as constants from '../../appResources/constants';
import Loader from '../../utils/loader/loader';
import toastModule from '../../utils/toastModule/tosatAlert';
import Layout from '../../components/layout';

const logo = require('../../assests/logo-tendio.png');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buildVersion: '',
      isLoading: this.props,
    };
  }

  componentDidMount() {
    DeviceInfo.getBuildId().then(deviceId => {
      console.log(constants.DEVICEID.DEVICE_ID, deviceId);
    });
    let buildNumber = DeviceInfo.getReadableVersion();
    if (buildNumber) {
      this.setState({buildVersion: buildNumber});
    }
  }

  //Function to handle email input field on change method
  validationOfEmail = async text => {
    if (text) {
      const validEmail = await this.validate(text);
      if (!validEmail) {
        toastModule.toastMessageBox(constants.LOGIN.EMAIL_ERROR_MESSAGE);
      }
    } else {
      toastModule.toastMessageBox(constants.LOGIN.EMAIL_REQUIRED_ERROR);
    }
  };

  //Function to handle input fieldS on change method
  handleOnChangeValue = name => {
    return text => {
      this.setState({[name]: text});
      if (name === constants.LOGIN.PASSWORD && this.state.email == '') {
        toastModule.toastMessageBox(constants.LOGIN.EMAIL_REQUIRED_ERROR);
      }
    };
  };

  // Function to handle Validation of email
  validate = async email => {
    const expression = constants.VALIDATION.VALIDATION_STRING;

    return expression.test(email);
  };

  //Function to handle login API
  login = async () => {
    const {email, password} = this.state;
    const validEmail = await this.validate(email);

    if (email == '' && password == '') {
      toastModule.toastMessageBox(constants.LOGIN.WRONG_INPUT_ERROR_MESSAGE);
    } else if (email != '' && password == '') {
      toastModule.toastMessageBox(constants.LOGIN.PASSWORD_REQUIRED_ERROR);
    } else if (email == '' && password != '') {
      toastModule.toastMessageBox(constants.LOGIN.EMAIL_REQUIRED_ERROR);
    } else if (validEmail == false) {
      toastModule.toastMessageBox(constants.LOGIN.EMAIL_ERROR_MESSAGE);
    } else {
      const loginData = {
        UserName: email,
        Password: password,
      };
      this.setState({isLoading: true});
      await this.props.handleSignIn(loginData);
    }
  };

  render() {
    const {buildVersion} = this.state;
    const {isLoading} = this.props;
    return (
      <Layout>
        <View
          style={[
            styles.flex1Style,
            styles.itemAlignment,
            styles.contentCenterAlignment,
          ]}>
          <Image source={logo} style={styles.imageStyle} />
        </View>
        <Loader loading={this.props.error ? false : isLoading} />
        <View
          style={[
            styles.flex3Style,
            styles.itemAlignment,
            styles.contentAlignment,
          ]}>
          <View style={styles.textInputViewDesign}>
            <TextInput
              placeholderTextColor={constants.COLOR_CODE.BLACK}
              keyboardType={constants.KEYBOARD_AWARE_VALUES.KEYBOARD_TYPE}
              onChange={this.handleOnChangeValue(constants.LOGIN.EMAIL)}
              style={styles.textInputDesign}
              placeholder={constants.LOGIN.EMAIL_PLACEHOLDER}
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />
          </View>
          <View style={styles.textInputViewDesign}>
            <TextInput
              placeholderTextColor={constants.COLOR_CODE.BLACK}
              secureTextEntry
              style={styles.textInputDesign}
              onChange={this.handleOnChangeValue(constants.LOGIN.PASSWORD)}
              placeholder={constants.LOGIN.PASSWORD_PLACEHOLDER}
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />
          </View>
          <View style={styles.flex2Style}></View>
        </View>
        <View
          style={[
            styles.flex1Style,
            styles.itemAlignment,
            styles.contentCenterAlignment,
          ]}>
          <TouchableOpacity
            style={styles.Buttondesign}
            onPress={() => this.login()}>
            <Text style={styles.loginText}>{constants.LOGIN.LOGIN_BUTTON}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.flexStyle,
            styles.itemAlignment,
            styles.reverseFlexStyle,
          ]}>
          <Text style={styles.vesionTextStyle}>{buildVersion}</Text>
        </View>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  error: state.auth.error,
  isLoading: state.loader.isLoading,
});

const mapDispatchToProps = dispatch => ({
  handleSignIn: loginData => dispatch(actions.handleSignIn({loginData})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  itemAlignment: {
    alignItems: 'center',
  },
  imageStyle: {
    width: 215,
    height: 67,
  },
  contentCenterAlignment: {
    justifyContent: 'center',
  },
  contentAlignment: {
    justifyContent: 'flex-start',
  },
  flex1Style: {
    flex: 1.5,
  },
  flex2Style: {
    flex: 2,
  },
  flex3Style: {
    flex: 3,
  },
  flexStyle: {
    flex: 0.8,
  },
  columnFlexStyle: {
    flex: 2,
    alignItems: 'center',
  },
  reverseFlexStyle: {
    flexDirection: 'column-reverse',
  },
  textInputViewDesign: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textInputDesign: {
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: Dimensions.get('screen').width / 1.2,
    color: '#000',
  },
  Buttondesign: {
    borderRadius: 4,
    backgroundColor: '#6BDFD8',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'space-around',
    width: '80%',
    flex: 0.2,
  },
  loginText: {
    color: 'black',
    textAlign: 'center',
  },
  vesionTextStyle: {
    color: '#fff',
    fontWeight: '700',
    marginVertical: '5%',
  },
});
