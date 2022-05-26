import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

import {WebView} from 'react-native-webview';

import * as constants from '../../appResources/constants';
import * as actions from '../../redux/actions/authaction';
import DateHelper from '../../utils/dateHelperModule/dateHelper';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-modern-datepicker';
import moment from 'moment';
import RNPrint from 'react-native-print';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
let EntryList = [];
var signedId_Get = null;
const JAVASCRIPT_CODE = `
      let selected = document.getElementsByClassName("employerDtpicker");
      for(let i = 0; i < selected.length; i++) {
        document.getElementsByClassName("employerDtpicker")[i].onclick = function () {
          let key =  document.getElementsByClassName("employerDtpicker")[i].id;
          document.getElementById(key).disabled = true;
        };
      };
      let selected3 = document.getElementsByClassName("employer");
      for(let i = 0; i < selected3.length; i++) {
        document.getElementsByClassName("employer")[i].onclick = function () { 
          let key =  document.getElementsByClassName("employer")[i].id;
          let type =  document.getElementsByClassName("employer")[i].type;
          if(type === 'radio')
          document.getElementById(key).checked = false;
          else
          document.getElementById(key).disabled = true; 
        };
      };
      let selected2 = document.getElementsByClassName("employeeDtpicker");
      for(let i = 0; i < selected2.length; i++) {
        document.getElementsByClassName("employeeDtpicker")[i].onclick = function () { 
          let key =  document.getElementsByClassName("employeeDtpicker")[i].id;
          let value =  document.getElementsByClassName("employeeDtpicker")[i].Value;
          var data = {
            key: key,
            value : value,
            type: 'datepicker',
            index: i
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        };
      };
      var userSelection = document.getElementsByClassName('employee');
      for(let i = 0; i < userSelection.length; i++) {
        let type = document.getElementsByClassName("employee")[i].type;
        if(type === 'radio'){
        document.getElementsByClassName("employee")[i].addEventListener("change", function() {
          let key =  document.getElementsByClassName("employee")[i].id;
          let value =  document.getElementsByClassName("employee")[i].value;
          let type =  document.getElementsByClassName("employee")[i].type;
            let selectedItem = key.split('_') 
            if (selectedItem.length >1)
            {
              for(let i = 0; i < userSelection.length; i++) {
                eachId = document.getElementsByClassName("employee")[i].id;
                    if(key != eachId && eachId != undefined && eachId.indexOf(selectedItem[0]) != -1)
                    {
                      document.getElementById(eachId).checked = false;
                    }
                  }
            }
          var data = {
            key: key,
            value : value,
            type: type,
            index: i,
            removeId: eachId
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        });
      } else if(type === 'text'){
        document.getElementsByClassName("employee")[i].addEventListener("input", function(e) {
          if(e.target.tagName=="INPUT"){
             var data = {
              key: e.target.name,
              value : e.target.value,
              type: e.target.type,
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
            }
        });
      };
      }; 
      let selectedsign = document.getElementsByClassName("employeesign");
      for(let i = 0; i < selectedsign.length; i++) {
        document.getElementsByClassName("employeesign")[i].onclick = function () { 
          let key = document.getElementsByClassName("employeesign")[i].id;
          var data = {
            key:key,
            msg: "client button got clicked",
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        };
      };
      document.querySelector("img").onclick = function openSignature(){
     
        let url= 'https://cdn2.hubspot.net/hubfs/433510/Caregiver%20Signature%20Button.png';
        let url2= 'employeeSignatureUrl';

        let key = document.querySelector("img").getAttribute('id');
          var data = {
            key:key,
            msg: "signature button got clicked",
          };

        if(document.querySelector("img").src === url || document.querySelector("img").getAttribute('src') === url2){
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        }else if(document.querySelector("img").getAttribute('src')){
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        }
      };
      document.addEventListener('input', function(e){
        if(e.target.tagName=="INPUT" && e.target.type === 'checkbox'){
        var data = {
          key: e.target.name,
          value : e.target.value === 'on' ? 'off' : 'on',
          type: e.target.type,
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
        } else if(e.target.tagName=="INPUT" && e.target.type === 'text'){
          let name = e.target.name;
          let selected = name.split('_');
          if(selected[0] === 'txtBox'){
            var data = {
              key: e.target.name,
              value : e.target.value,
              type: e.target.type,
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
          } else if(selected[0] === 'dtpicker'){
            var data = {
              key: e.target.name,
              value : e.target.value === '' ? '1' : e.target.value,
              type: 'datepicker2',
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
            }
        }
      });
      let selectImg = document.querySelector('img').id;
      window.ReactNativeWebView.postMessage(JSON.stringify(selectImg));    
`;

// let selected = document.getElementsByClassName("employerDtpicker");
//       for(let i = 0; i < selected.length; i++) {
//         document.getElementsByClassName("employerDtpicker")[i].onclick = function () {
//           let key =  document.getElementsByClassName("employerDtpicker")[i].id;
//           let value =  document.getElementsByClassName("employerDtpicker")[i].Value;
//           var data = {
//             key: key,
//             value : value,
//             type: 'datepicker',
//             index: i
//           };
//           window.ReactNativeWebView.postMessage(JSON.stringify(data));
//         };
//       }

// document.addEventListener('input', function(e){
//   if(e.target.tagName=="INPUT"){
//   //  alert(e.target.type);
//    var data = {
//     key: e.target.name,
//     value : e.target.value,
//     type: e.target.type,
//   };
//   window.ReactNativeWebView.postMessage(JSON.stringify(data));
//   }
// });

// else if(type === 'checkbox'){
//   document.getElementsByClassName("employee")[i].addEventListener("click", function() {
//     let key =  document.getElementsByClassName("employee")[i].id;
//     let value =  document.getElementsByClassName("employee")[i].value;
//     let type =  document.getElementsByClassName("employee")[i].type;
//     alert(value)
//     var data = {
//       key: key,
//       value : value === 'on' ? 'off': 'on',
//       type: type,
//       index: i
//     };
//     window.ReactNativeWebView.postMessage(JSON.stringify(data));
//   });
// }

// let inputWithoutClass = document.getElementsByTagName("input");
// for(let i = 0; i < inputWithoutClass.length; i++) {
//   document.getElementsByTagName("input")[i].onclick = function () {
//     let key =  document.getElementsByTagName("input")[i].name;
//     let value =  document.getElementsByTagName("input")[i].value;
//     // alert(value)
//     var data = {
//       key: key,
//       msg: value,
//     };
//     window.ReactNativeWebView.postMessage(JSON.stringify(data));
//   };
// };

class RenderHtmlPdf extends Component {
  state = {
    loading: false,
    setModalVisible: false,
    profileData: '',
    documentsData: '',
    observationDate: '',
    observationArea: '',
    describeObservationPart1: '',
    describeObservationPart2: '',
    describeObservationPart3: '',
    documentDate: '',
    signatureImage: '',
    checkboxes: [],
    datepicker: [],
    webref: null,
    show: false,
    date: '',
    singleDatepickerValue: '',
    singleRadioValue: '',
    currentInputValue: '',
    flag: false,
    signatureId: '',
    signKey: '',
    value: 0,
  };

  constructor(props) {
    super(props);
  }

  async printPDF() {
    const {pdfData} = this.props;
    await RNPrint.print({
      html: pdfData.Template,
    });
  }

  useForceUpdate = () => {
    this.setState({value: this.state.value + 1});
  };

  componentDidMount() {
    var arr = this.props.pdfData.EntryList;
    EntryList =
      arr &&
      arr.reduce((unique, o) => {
        if (!unique.some(obj => obj.Key === o.Key)) {
          unique.push(o);
        }
        return unique;
      }, []);
  }

  saveDocumentHandler = async data => {
    const {documentAndPaperList, index, userData} = this.props;
    let arr = EntryList.filter(item => item.Key !== undefined);
    const reqData = {
      Id: 0,
      PaperDocumentId: documentAndPaperList.lstPaperwork[index].Id,
      DocumentId: documentAndPaperList.lstPaperwork[index].Id,
      DocumentName: documentAndPaperList.lstPaperwork[index].Title,
      UserId: userData.LoggedUserId,
      UserType: 'Caregiver',
      option: 'employee',
      Content: arr,
    };
    this.props.saveApprovedDocument(reqData);
  };

  handleScreenNavigation = (navigationScreen, key) => {
    const {props, pdfData} = this.props;
    this.setState({signatureId: key}, () =>
      console.log('signatureId', this.state.signatureId),
    );
    props.navigation.navigate(navigationScreen, {
      props: this.props.props,
      formName: 'Documents',
      pdfData: pdfData,
      key: key,
      onbackscreen: this.onbackscreen,
    });
  };
  onbackscreen = data => {
    const {signatureId} = this.state;
    if (data.screenName === 'eSignature') {
      this.webref.injectJavaScript(
        `document.getElementById('${signatureId}').value  = '${data.signatureData}'`,
      );
    } else {
      var clientSignatureImage =
        this.props.documentSignatureMessage &&
        this.props.documentSignatureMessage.data &&
        this.props.documentSignatureMessage.data.ClientSignatureData;
      if (data.imagePath === true) {
        this.webref.injectJavaScript(
          `document.getElementById('${data.key}').src  = '${data.signatureData}'`,
        );
      } else {
        var image = data.signatureData
          ? data.signatureData
          : clientSignatureImage;
        this.webref.injectJavaScript(
          `document.getElementById('${data.key}').value  = '${image}'`, //for esignature
        );
      }
    }
    let newarr = {
      Key: signatureId,
      Value: data.signatureData,
    };
    let res = this.getKeyByValue(EntryList, signatureId);
    if (res === undefined) {
      EntryList = [...EntryList, newarr];
    } else if (res) {
      EntryList[res].Value = data.signatureData;
    }
    this.useForceUpdate();
  };

  handleMultiCheckbox = name => {
    return text => {
      this.setState({[name]: text});
    };
  };

  // onMessage = (event) => {
  //   const { checkboxes, datepicker } = this.state;
  //   let navigationScreen = event.nativeEvent.data === "signature button got clicked" ? 'SignatureBox' : event.nativeEvent.data === "client button got clicked" ? 'TermEsignatureBox' : event.nativeEvent.data === 'call date picker' ? 'datePicker' : null;
  //   if (navigationScreen) {
  //     this.handleScreenNavigation(navigationScreen);
  //   } else {
  //     let webViewData = JSON.parse(event.nativeEvent.data);
  //     console.log('webViewData', webViewData);
  //     let data = [];
  //     // if (data.length > 0) {
  //     let newarr = {
  //       Key: webViewData.key,
  //       Value: webViewData.value,
  //       // Index: webViewData.index,
  //       Type: webViewData.type
  //     }
  //     console.log('newarr+++', datepicker);
  //     if (webViewData.type === 'datepicker') {
  //       this.setState({ show: true, datepicker: [...datepicker, newarr], singleDatepickerValue: newarr })
  //     } else if (webViewData.type === 'radio') {

  //       this.setState({ datepicker: [...datepicker, newarr], singleRadioValue: newarr })
  //     } else if (webViewData.type === 'text') {

  //       // datepicker.map((obj, index) => {
  //       //   console.log('map value', value);
  //       //   if(obj.Key)
  //       // })
  //       // var result = datepicker.some(e => e.hasOwnProperty(webViewData.key));
  //       var result = this.getKeyByValue(datepicker, webViewData.key)
  //       console.log('map value', result);
  //       if(result === undefined){
  //       this.setState({ datepicker: [...datepicker, newarr], singleRadioValue: newarr }, ()=> console.log('datepicker', datepicker))
  //       }else {
  //         let newEntryList = newarr.map(obj => datepicker.find(o => o.Key === obj.Key) || obj);
  //         this.setState({ datepicker: [...datepicker, newEntryList], singleRadioValue: newEntryList })
  //       }
  //     }
  //     // this.setState({ checkboxes: [...checkboxes, webViewData] })
  //     // }
  //   }
  // }

  signIdDeliver = webViewData => {
    signedId_Get = webViewData;
  };
  onMessage = event => {
    let webViewData = JSON.parse(event.nativeEvent.data);
    this.signIdDeliver(webViewData);

    let navigationScreen =
      webViewData.msg === 'signature button got clicked'
        ? 'SignatureBox'
        : webViewData.msg === 'client button got clicked'
        ? 'TermEsignatureBox'
        : null;

    if (navigationScreen) {
      this.handleScreenNavigation(navigationScreen, webViewData.key);
    } else {
      let newarr = {
        Key: webViewData.key,
        Value: webViewData.type === 'checkbox' ? 'on' : webViewData.value,
        Type: webViewData.type,
      };

      let selectedKey = webViewData.key;

      let selectedItem = selectedKey && selectedKey.split('_');
      this.setState({currentInputValue: newarr});
      if (
        webViewData.type === 'datepicker' ||
        webViewData.type === 'datepicker2'
      ) {
        this.setState({show: true, singleDatepickerValue: newarr});
      }
      let res = this.getKeyByValue(EntryList, webViewData.key);
      if (
        res &&
        webViewData.type === 'checkbox' &&
        webViewData.value === 'off'
      ) {
        EntryList[res].Value = webViewData.value;
        let newArr = EntryList.filter(item => item.Key !== webViewData.key);
        EntryList = newArr;
      } else if (webViewData.type === 'radio' && selectedItem !== undefined) {
        if (res === undefined) {
          if (selectedItem.length > 1) {
            let newArr2 = EntryList.filter(
              item => item?.Key?.indexOf(selectedItem[0]) !== 0,
            );
            EntryList = newArr2;
            EntryList = [...EntryList, newarr];
          }
        }
      } else if (res) {
        EntryList[res].Value = webViewData.value;
      } else if (res === undefined) {
        EntryList = [...EntryList, newarr];
      }
    }
  };

  getKeyByValue = (object, value) => {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (object[prop].Key === value) return prop;
      }
    }
  };

  onSelectedChange = date => {
    const formattedDate = DateHelper.momentDateConverter(date);
    const {datepicker, singleDatepickerValue} = this.state;
    for (let i = 0; i < EntryList.length; i++) {
      if (EntryList[i].Key === singleDatepickerValue.Key) {
        EntryList[i].Value = formattedDate;
        this.webref.injectJavaScript(
          `document.getElementById('${EntryList[i].Key}').value  = '${EntryList[i].Value}'`,
        );
        this.webref.injectJavaScript(
          `document.getElementsByName('${EntryList[i].Key}')[0].value = '${EntryList[i].Value}'`,
        );

        // this.webref.injectJavaScript(`document.getElementsByClassName("employerDtpicker")[${datepicker[i].Index}].value = '${formattedDate}'`);
      }
      // else{
      //   this.webref.injectJavaScript(`document.getElementById('${datepicker[i].Key}').value  = '${datepicker[i].Value}'`);
      //   // this.webref.injectJavaScript(`document.getElementsByClassName("employerDtpicker")[${datepicker[i].Index}].value = '${datepicker[i].Value}'`);
      // }
    }

    this.setState({date: formattedDate, show: false});
  };

  LoadingIndicatorView = () => {
    return (
      <ActivityIndicator
        color="#0000ff"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('signatureId');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };
  handleLoadEnd = async () => {
    let userSelectedListed = EntryList;
    var clientImg =
      this.props.documentSignatureMessage &&
      this.props.documentSignatureMessage.data.ClientSignatureData !=
        undefined &&
      this.props.documentSignatureMessage.data.ClientSignatureData;
    var sign_ImageId = await this.getData(); // signedId_Get;

    this.webref.injectJavaScript(
      `document.getElementById('${sign_ImageId}').src  = '${clientImg}'`, //for esignature
    );

    const {pdfData, documentSignatureMessage} = this.props;
    // let currentDate = new Date().toLocaleString();
    // let outTime = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');

    if (userSelectedListed != undefined) {
      for (let i = 0; i < userSelectedListed.length; i++) {
        let flagVlaue = true;
        // if(userSelectedListed[i].Key === "employeeDtpicker" && userSelectedListed[i].Value == ''){
        //   this.webref.injectJavaScript(`document.getElementById('${userSelectedListed[i].Key}').value = '${currentDate}'`);
        // }else {
        // this.webref.injectJavaScript(`document.getElementsByClassName("employerDtpicker")[${userSelectedListed[i].Index}].value = '${formattedDate}'`);
        this.webref.injectJavaScript(
          `document.getElementsByName('${userSelectedListed[i].Key}')[0].value = '${userSelectedListed[i].Value}'`,
        );
        this.webref.injectJavaScript(
          `document.getElementById('${userSelectedListed[i].Key}').checked  = '${flagVlaue}'`,
        );
        this.webref.injectJavaScript(
          `document.getElementById('${userSelectedListed[i].Key}').checked  = '${userSelectedListed[i].Value}'`,
        );
        this.webref.injectJavaScript(
          `document.getElementById('${userSelectedListed[i].Key}').value  = '${userSelectedListed[i].Value}'`,
        );
      }
    }
  };

  render() {
    const {pdfData} = this.props;
    const {show} = this.state;
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="height"
        keyboardVerticalOffset={Platform.select({ios: offset, android: 20})}
        enabled={Platform.OS === 'android'}>
        <View style={styles.container}>
          <View style={styles.printButtonView}>
            <TouchableHighlight
              style={styles.printButtondesign}
              onPress={() => this.printPDF()}>
              <Text style={styles.loginText}>PRINT</Text>
            </TouchableHighlight>
          </View>
          {pdfData != null && pdfData != '' && pdfData != undefined ? (
            <WebView
              originWhitelist={['*']}
              source={{html: pdfData.Template}}
              ref={r => (this.webref = r)}
              javaScriptEnabled={true}
              javaScriptEnabledAndroid={true}
              // scrollEnabled={false}
              // renderLoading={this.LoadingIndicatorView}
              // startInLoadingState={true}
              // onLoadStart={this.handleLoadStart}
              scrollEnabled
              onLoadEnd={this.handleLoadEnd}
              injectedJavaScript={JAVASCRIPT_CODE}
              onMessage={event => this.onMessage(event)}
            />
          ) : null}
          <View style={{alignItems: 'flex-end'}}>
            <TouchableHighlight
              onPress={() => this.saveDocumentHandler()}
              style={[
                styles.printButtondesign,
                {backgroundColor: constants.COLOR_CODE.APP_COLOR},
              ]}>
              <Text style={[styles.loginText, {color: '#fff'}]}>SUBMIT</Text>
            </TouchableHighlight>
          </View>
          {show && (
            <Modal isVisible={show}>
              <View style={styles.modalContainer}>
                <DatePicker
                  options={{
                    borderColor: 'rgba(122, 146, 165, 0.1)',
                  }}
                  mode="calendar"
                  onSelectedChange={date => this.onSelectedChange(date)}
                  style={{borderRadius: 10}}
                />
              </View>
            </Modal>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  documentAndPaperList: state.document.documentAndPaperList,
  saveDocument: state.document.saveDocument,
  documentSignatureMessage: state.document.documentSignatureMessage,
  isLoading: state.loader.isLoading,
  error: state.auth.error,
  index: state.indexValue.index,
});

const mapDispatchToProps = dispatch => ({
  saveApprovedDocument: data => dispatch(actions.saveApprovedDocument({data})),
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderHtmlPdf);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  printButtonView: {
    alignItems: 'flex-end',
  },
  loginText: {
    fontWeight: 'bold',
  },
  printButtondesign: {
    backgroundColor: '#f4f7fa',
    margin: 6,
    alignItems: 'center',
    paddingTop: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  modalContainer: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    borderWidth: 0.1,
    overflow: 'hidden',
    minHeight: 200,
  },
});
