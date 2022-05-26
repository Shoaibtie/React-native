import React, {createRef} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  useWindowDimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as constants from '../appResources/constants';
import Header from '../components/header';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../utils/loader/loader';
import toastModule from '../utils/toastModule/tosatAlert';
import * as actions from '../redux/actions/authaction';
import SignatureCapture from 'react-native-signature-capture';
import AsyncStorage from '@react-native-community/async-storage';

var sign1 = null;
var signFormEncoded = null;

function useForceUpdate() {
  const [value, setValue] = React.useState(0);
  return () => setValue(value => value + 1);
}

function SignatureBox({route}) {
  const window = useWindowDimensions();
  const [formName, setFormName] = React.useState(null);
  const [loading, setLoader] = React.useState(false);
  const [pdfData, setCommentData] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [signature_path, setsignturePath] = React.useState(null);
  const [signatureData, setSignatureData] = React.useState('');
  const forceUpdate = useForceUpdate();
  const [isLoading, setIsLoading] = React.useState(false);
  const documentAndPaperList = useSelector(
    state => state.document.documentAndPaperList,
  );
  const index = useSelector(state => state.indexValue.index);
  const signature = useSelector(state => state.document.documentSignature);
  const userData = useSelector(state => state.auth.userData);
  // const isLoading1 = useSelector(state => state.loader.isLoading);

  const documentSignatureMessage = useSelector(
    state => state.document.documentSignatureMessage,
  );
  const dispatch = useDispatch();
  const getCaregiverDocumentSignature = data =>
    dispatch(actions.getCaregiverDocumentSignature({data}));

  const saveCaregiverDocumentSignature = data =>
    dispatch(actions.saveCaregiverDocumentSignature({data}));

  //  SignatureCapture*****
  const sign = createRef();

  const _onSaveEvent = result => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    setData(`data:image/png;base64,${result.encoded}`);
    signFormEncoded = `data:image/png;base64,${result.encoded}`;
    sign1 = result.pathName;
  };

  const save_Image = async () => {
    sign.current.saveImage() && (await sign.current.saveImage()) !== null;
  };
  const _onDragEvent = async data => {
    if (data.dragged) {
      setData(null);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        getSignatureHandler();
      };
    }, []),
  );

  React.useEffect(async () => {
    setIsLoading(true);

    const form = route ? (route.params ? route.params.formName : null) : null;
    const pdfData = route ? (route.params ? route.params.pdfData : null) : null;
    setFormName(form);
    setCommentData(pdfData);
    // setSignatureData(signature);
    getSignatureHandler();
    setTimeout(() => {
      if (signature) {
        setIsLoading(false);
        //
      }
    }, 1000);
  }, []);

  const closeScreen = async () => {
    const key = route ? (route.params ? route.params.key : null) : null;
    setTimeout(() => {
      route.params
        ? route.params.onbackscreen({
            signatureData: signFormEncoded,
            imagePath: sign1 ? true : false,
            key: key,
          })
        : null;
    }, 1);
    console.log();
    await AsyncStorage.setItem('signatureId', key);
    route.params.props.navigation.navigate('PdfScreen');
  };

  const getSignatureHandler = async () => {
    const url = 'DocId=' + documentAndPaperList.lstPaperwork[index].Id;
    getCaregiverDocumentSignature(url);
    setSignatureData(signature);
  };

  const clearSignature = () => {
    if (signFormEncoded && sign1) {
      signFormEncoded = null;
      sign1 = null;
      sign.current !== null && sign.current.resetImage();
      setSignatureData('');
    } else {
      setSignatureData('');
      sign.current !== null && sign.current.resetImage();
    }
  };
  const saveSignatureHandler = async () => {
    sign.current.saveImage();
    setTimeout(() => {
      if (signFormEncoded && sign1) {
        const reqData = {
          AssessmentId: 0,
          ClientSignatureData: signFormEncoded
            ? signFormEncoded
            : signatureData.ClientSignatureData,
          ClientSignaturePath: sign1
            ? sign1
            : signatureData.ClientSignaturePath,
          CreatedDate: '0001-01-01T00:00:00',
          DocumentId: documentAndPaperList.lstPaperwork[index].Id, //535138,
          Id: 0,
          IsAccepted: false,
          IsOpenformLink: false,
          IsSignFromEmailLink: false,
          ModifiedDate: '0001-01-01T00:00:00',
          ServiceEndDate: null,
          ServiceStartDate: null,
          SignatureData: null,
          SignaturePath: null,
          StaffSignatureData: '',
          StaffSignaturePath: '',
          UserId: userData.LoggedUserId, //4731ea11-2cc5-4738-a413-ce553c3c8ce8
          UserType: 'Caregiver',
        };
        if (Platform.OS == 'ios') {
          setSignatureData(signature);
        }

        saveCaregiverDocumentSignature(reqData);
      } else {
        // alert('bc');
      }
    }, 100);
  };
  console.log('signature signatureData', signatureData);
  return (
    <View style={{flex: 1}}>
      <Header
        screenName={constants.SCREEN_NAME.DOCUMENT_SCREEN}
        headerType="back"
        setDrawerVisible={visible => closeScreen()}
      />
      <Loader loading={signatureData.ClientSignatureData ? isLoading : false} />
      <View style={styles.cardDesign}>
        <View style={[styles.rowDirectionStyle, styles.commentViewHeader]}>
          <View style={[styles.columnDirectionStyle, {flex: 1.6}]}>
            <Text style={styles.commentHeader}></Text>
          </View>
          <View style={[styles.columnDirectionStyle, {flex: 8.8}]}>
            <Text style={styles.commentHeader}>
              {constants.DOCUMENT_SCREEN.SIGNATURE_BOX_TITLE}
            </Text>
          </View>
          <View style={[styles.columnDirectionStyle, {flex: 1.6}]}>
            <TouchableOpacity onPress={() => closeScreen()}>
              <Text style={styles.closeButtondesign}>
                {constants.BUTTON_NAME.S_CLOSE}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Loader loading={loading} /> */}
        <>
          {Platform.OS === 'android' ? (
            <View
              style={[
                styles.rowDirectionStyle,
                {
                  // flex: 1,
                  borderWidth: 1,
                  // width: window.width,
                  height: window.height / 2.5,
                  // marginVertical: '5%',
                  margin: window.width / 20,
                },
              ]}>
              {signatureData.ClientSignatureData ? (
                <View
                  style={[
                    styles.columnDirectionStyle,
                    {flex: 1, alignItems: 'center', justifyContent: 'center'},
                  ]}>
                  <Image
                    resizeMode="contain"
                    style={[styles.imageStyle]}
                    source={
                      // signatureData.ClientSignatureData
                      //   ? {uri: signatureData.ClientSignatureData}
                      //   : null
                      {uri: signatureData.ClientSignatureData}
                    }
                  />
                </View>
              ) : (
                <SignatureCapture
                  style={styles.signature}
                  ref={sign}
                  onSaveEvent={_onSaveEvent}
                  onDragEvent={_onDragEvent}
                  backgroundColor={'#ffffff'}
                  strokeColor="#000000"
                  showNativeButtons={false}
                  showTitleLabel={false}
                  viewMode={'portrait'}
                  minStrokeWidth={4}
                  maxStrokeWidth={4}
                />
              )}
            </View>
          ) : (
            <View
              style={[
                styles.rowDirectionStyle,
                {
                  // flex: 1,
                  borderWidth: 1,
                  height: height_Width.height * 1,
                  marginVertical: '5%',
                  marginHorizontal: '2%',
                },
              ]}>
              {signatureData ? (
                <View
                  style={[
                    styles.columnDirectionStyle,
                    {flex: 1, alignItems: 'center', justifyContent: 'center'},
                  ]}>
                  <Image
                    resizeMode="contain"
                    style={styles.imageStyle}
                    source={{
                      uri: sign1 ? sign1 : signatureData.ClientSignatureData,
                    }}
                  />
                </View>
              ) : (
                <SignatureCapture
                  style={styles.signature}
                  ref={sign}
                  onSaveEvent={_onSaveEvent}
                  onDragEvent={_onDragEvent}
                  backgroundColor={'#ffffff'}
                  strokeColor="#000000"
                  saveImageFileInExtStorage={false}
                  showNativeButtons={false}
                  showTitleLabel={false}
                />
              )}
            </View>
          )}
        </>
        <View style={[styles.rowDirectionStyle, {flex: 1, minHeight: '10%'}]}>
          <View style={[styles.columnDirectionStyle, {flex: 1}]}></View>
        </View>
        <View style={[styles.rowDirectionStyle, {flex: 1}]}>
          <View style={[styles.columnDirectionStyle, {flex: 3}]}>
            <TouchableOpacity
              onPress={() => clearSignature()}
              style={[styles.tochableButton, styles.clearButton]}>
              <Text style={styles.closeButtondesign}>
                {constants.BUTTON_NAME.CLEAR}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.columnDirectionStyle, {flex: 4}]}>
            <TouchableOpacity
              onPress={() => getSignatureHandler()}
              style={[styles.tochableButton, styles.signatureButton]}>
              <Text style={styles.closeButtondesign}>
                {constants.DOCUMENT_SCREEN.GET_SIGNATURE}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.columnDirectionStyle,
              {flex: 5, alignItems: 'flex-end'},
            ]}>
            <TouchableOpacity
              activeOpacity={signatureData.ClientSignatureData ? 0.2 : 0}
              onPress={() => saveSignatureHandler()}
              style={[styles.tochableButton, styles.signatureButton]}>
              <Text style={styles.closeButtondesign}>
                {constants.DOCUMENT_SCREEN.SAVE_SIGNATURE}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default React.memo(SignatureBox);

const styles = StyleSheet.create({
  cardDesign: {
    flex: 9.25,
    borderRadius: 5,
    borderWidth: 0.1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 1,
    marginTop: '3%',
  },
  textStyle: {
    color: 'black',
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
    fontWeight: '500',
    color: '#fff',
  },
  closeButtondesign: {
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
  tochableButton: {
    minHeight: '15%',
    backgroundColor: '#3172b6',
    padding: 5,
    borderRadius: 2.5,
  },
  signatureButton: {
    minWidth: '41%',
    marginHorizontal: '5%',
  },
  clearButton: {
    minWidth: '30%',
    marginHorizontal: '15%',
  },
  imageStyle: {
    width: 260,
    height: 260,
    marginLeft: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 5,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
});
