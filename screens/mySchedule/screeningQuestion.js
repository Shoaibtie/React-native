import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';
import {Card} from 'native-base';
import Header from '../../components/header';
import Loader from '../../utils/loader/loader';
import ModalBox from '../../utils/modal/modalBox';
import * as actions from '../../redux/actions/authaction';
import Entypo from 'react-native-vector-icons/Entypo';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ScreeningQuestion extends Component {
  state = {
    loading: false,
    isModalVisible: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getScreeningQuestions();
  }

  setBack = () => {
    this.props.navigation.navigate('MySchedules');
  };

  setIsModalVisible = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  handleConfirmation = () => {
    Alert.alert('Confirmation', 'Please confirm clock in Ok or Cancel !', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('ok pressed');
        },
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.setIsModalVisible()},
    ]);
  };

  // Function to call service API to get service details on care plan screen
  getScreeningQuestions = async data => {
    this.props.getScreeningQuestions(null);
  };

  render() {
    const {screeningData, isLoading, checkInStatus} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
        <View style={{flex: 0.1}}>
          <Header
            screenName="Visits"
            headerType="back"
            setDrawerVisible={visible => this.setBack()}
          />
        </View>
        <Loader loading={isLoading} />
        <View style={{flex: 0.9, backgroundColor: 'transparent'}}>
          <View
            style={[
              styles.cardDesign,
              {flex: 1, backgroundColor: 'transparent'},
            ]}>
            <View
              style={{
                flex: 0.08,
                backgroundColor: '#3172b6',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flex: 0.15, justifyContent: 'center'}}></View>
              <View style={{flex: 0.7, justifyContent: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: '500',
                  }}>
                  REMINDER
                </Text>
              </View>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                }}>
                <Entypo
                  name="cross"
                  size={30}
                  color="#fff"
                  onPress={() => {
                    this.setBack();
                  }}
                />
              </View>
            </View>
            <View style={{flex: 0.82}}>
              {screeningData != null &&
              screeningData != undefined &&
              screeningData != '' ? (
                <WebView
                  originWhitelist={['*']}
                  source={{html: screeningData.Content}}
                  javaScriptEnabled={true}
                  javaScriptEnabledAndroid={true}
                  scalesPageToFit={false}
                />
              ) : null}
            </View>
            <View
              style={{
                flex: 0.1,
                backgroundColor: '#fff',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.ConfimationButton}
                onPress={this.handleConfirmation}>
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ModalBox
          modalVisible={this.state.isModalVisible}
          props={this.props}
          setModalVisible={modalVisible => this.setIsModalVisible()}
        />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  screeningData: state.caregiverSchedule.screeningData,
  checkInStatus: state.caregiverSchedule.checkInStatus,
  isLoading: state.loader.isLoading,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  getScreeningQuestions: data => dispatch(actions.getScreeningQuestions(data)),
  caregiverCheckInTime: data => dispatch(actions.caregiverCheckInTime(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreeningQuestion);

const styles = StyleSheet.create({
  cardDesign: {
    flex: 1,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    borderWidth: 0.2,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    marginHorizontal: '3%',
    marginVertical: '3%',
  },
  textStyle: {
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
  rowDirectionStyle: {
    flexDirection: 'row',
  },
  columnDirectionStyle: {
    flexDirection: 'column',
  },
  commentViewHeader: {
    height: 50,
    padding: 12,
    backgroundColor: '#3172b6',
  },
  commentHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15,
  },
  closeButtondesign: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 15,
  },
  webview: {
    flex: 1,
    marginTop: '2%',
    fontWeight: '700',
  },
  ConfimationButton: {
    width: '15%',
    height: '40%',
    backgroundColor: '#3172b6',
  },
});
