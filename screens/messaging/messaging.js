import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';

import * as constants from '../../appResources/constants';
import * as actions from '../../redux/actions/authaction';
import Loader from '../../utils/loader/loader';
import Header from '../../components/header';
import ToastBox from '../../utils/toastModule/toastBox';
import toastAlert from '../../utils/toastModule/tosatAlert';

class Messaging extends Component {
  state = {
    messagingData: 'Msg has been sent successfully',
    messageInputText: '',
    modalVisible: false,
  };

  constructor(props) {
    super(props);
  }

  setDrawerVisible = () => {
    this.props.navigation.toggleDrawer();
  };

  sendMessageHandler = async () => {
    const {userData} = this.props;
    const {messageInputText} = this.state;
    const messageData = {};
    await this.props.clearMessage(messageData);

    const data = {
      RecipientName: constants.MESSAGING_SCREEN.RECEIPENT,
      caregiverId: userData.LoggedUserId,
      SMSContent: messageInputText,
    };

    if (messageInputText != '') {
      await this.props.sendMessage(data);
    } else {
      toastAlert.toastMessageBox(constants.MESSAGING_SCREEN.VAIDATION_MESSAGE);
    }
  };

  setMessageText = text => {
    this.setState({messageInputText: text});
  };

  setModalVisible = async () => {
    await this.props.setModalStatus(false);
    this.setState({messageInputText: ''});
  };

  render() {
    const {messagingData, messageInputText} = this.state;
    const {isLoading, modalVisible} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          screenName={constants.SCREEN_NAME.MESSAGE_SCREEN}
          headerType="menu"
          setDrawerVisible={visible => this.setDrawerVisible()}
        />
        <Loader loading={isLoading} />
        <View style={styles.messageView}>
          <ScrollView>
            <View style={styles.cardDesign}>
              <View style={styles.columnStyle}>
                <Text style={styles.textDesign}>
                  {constants.MESSAGING_SCREEN.BOX_TITLE}
                </Text>
              </View>
              <View style={[styles.rowStyle]}>
                <View style={styles.toView}>
                  <Text style={styles.textValueDesign}>
                    {constants.COMMON_STRING.TO}
                  </Text>
                </View>
                <View style={[styles.subjectView]}>
                  <Text style={styles.textValueDesign}>
                    {constants.MESSAGING_SCREEN.RECEIPENT}
                  </Text>
                </View>
              </View>
              <View style={[styles.columnStyle]}>
                <TextInput
                  style={styles.textAreaView}
                  multiline={true}
                  onChangeText={text => this.setMessageText(text)}
                  value={messageInputText}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonView}
                onPress={() => this.sendMessageHandler()}
                underlayColor={
                  constants.COLOR_CODE.LOGIN_BUTTON_UNDERLAY_COLOR
                }>
                <Text style={styles.textStyle}>
                  {constants.BUTTON_NAME.SUBMIT}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <ToastBox
          modalVisible={modalVisible}
          messagingData={messagingData}
          setModalVisible={() => this.setModalVisible()}
        />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userData: state.auth.userData,
  messageToAgency: state.message.messageToAgency,
  isLoading: state.loader.isLoading,
  modalVisible: state.message.modalVisible,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: data => dispatch(actions.sendMessage({data})),
  clearMessage: data => dispatch(actions.clearMessage({data})),
  setModalStatus: data => dispatch(actions.setModalStatus({data})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.COLOR_CODE.APP_CONTAINER_COLOR,
  },
  messageView: {
    flex: 9.25,
  },
  textStyle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonView: {
    flex: 1,
    borderRadius: 5,
    marginVertical: '10%',
    alignItems: 'center',
    backgroundColor: constants.COLOR_CODE.APP_COLOR,
    justifyContent: 'space-around',
    padding: '1.5%',
  },
  textDesign: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardDesign: {
    flex: 1,
    borderRadius: 3,
    borderWidth: 0.3,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    marginHorizontal: '2%',
    marginVertical: '5%',
    padding: '2%',
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: '4%',
  },
  columnStyle: {
    flex: 1,
  },
  textValueDesign: {
    fontSize: 13,
  },
  toView: {
    flex: 0.15,
    justifyContent: 'space-around',
  },
  subjectView: {
    flex: 0.85,
    backgroundColor: 'lightgray',
    padding: '1.8%',
    marginRight: 15,
    paddingLeft: 10,
    borderRadius: 12,
    justifyContent: 'space-around',
  },
  textAreaView: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: Platform.OS == 'ios' ? 10 : 5,
    color: '#000',
  },
});
