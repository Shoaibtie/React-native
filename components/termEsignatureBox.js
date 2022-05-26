import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Card} from 'native-base';
import Header from '../components/header';
import * as constants from '../appResources/constants';
import {Divider} from 'react-native-elements';

export default function TermEsignatureBox({route}) {
  const [formName, setFormName] = React.useState(null);
  const [signatureText, setSignatureText] = React.useState('');

  React.useEffect(() => {
    const form = route ? (route.params ? route.params.formName : null) : null;

    setFormName(form);
  });

  const closeScreen = () => {
    route.params.props.navigation.navigate('PdfScreen');
  };

  const getSignatureHandler = async () => {
    setTimeout(() => {
      route.params
        ? route.params.onbackscreen({
            signatureData: signatureText,
            screenName: 'eSignature',
          })
        : null;
    }, 1);

    route.params.props.navigation.navigate('PdfScreen', {
      signatureData: signatureText,
      screenName: 'eSignature',
    });
  };

  const handleChangeText = () => {
    return text => {
      setSignatureText(text);
    };
  };

  return (
    <View style={{flex: 1}}>
      <Header
        screenName={constants.CAREGIVER_SCHEDULE.COMMENT_SCREEN}
        headerType={constants.ICON_NAME.ARROW_BACK}
        setDrawerVisible={visible => closeScreen()}
      />
      <View style={styles.blankView}></View>
      <View style={styles.cardDesign}>
        <View
          style={[
            styles.rowDirectionStyle,
            styles.commentViewHeader,
            {flex: 1, padding: '1%'},
          ]}>
          <View style={{flex: 4, justifyContent: 'space-around'}}>
            <Text style={styles.commentHeader}></Text>
          </View>
          <View style={{flex: 4, justifyContent: 'space-around'}}>
            <Text style={styles.commentHeader}>Terms</Text>
          </View>
          <View style={{flex: 4, justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={() => closeScreen()}>
              <Text style={styles.closeButtondesign}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.columnDirectionStyle,
            {flex: 3, backgroundColor: 'transparent', padding: '1%'},
          ]}>
          <Text style={{fontWeight: '600', fontSize: 15}}>
            By my eSignature below, I certify that I have read, fully understand
            and accept all terms of the foregoing statement. Please signify your
            acceptance by entering the information requested in the fields
            below.
          </Text>
        </View>
        <View
          style={[
            styles.columnDirectionStyle,
            {flex: 3, backgroundColor: 'transparent', marginLeft: 2},
          ]}>
          <TextInput
            style={{
              width: '60%',
              height: '40%',
              borderWidth: 1,
              marginLeft: 1,
            }}
            onChangeText={handleChangeText()}
            value={signatureText}
          />
          <View style={[styles.rowDirectionStyle, {flex: 1}]}>
            <View style={[styles.columnDirectionStyle, {flex: 2.2}]}>
              <Text style={{fontSize: 16, fontWeight: '600'}}>Signature</Text>
            </View>
            <View style={[styles.columnDirectionStyle, {flex: 0.5}]}>
              <Text style={{color: 'red', fontSize: 16}}>*</Text>
            </View>
            <View style={[styles.columnDirectionStyle, {flex: 7.7}]}></View>
          </View>
        </View>
        <View
          style={[
            styles.columnDirectionStyle,
            {flex: 1, backgroundColor: 'transparent', padding: '1%'},
          ]}>
          <Divider style={styles.dividerStyle} />
        </View>
        <View
          style={[
            styles.rowDirectionStyle,
            {flex: 2, backgroundColor: 'transparent'},
          ]}>
          <View style={[styles.columnDirectionStyle, {flex: 5}]}></View>
          <View
            style={[
              styles.columnDirectionStyle,
              {flex: 4, alignItems: 'flex-end'},
            ]}>
            <TouchableOpacity
              onPress={() => getSignatureHandler()}
              style={[styles.tochableButton]}>
              <Text style={styles.closeButtondesign}>Apply</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.columnDirectionStyle,
              {flex: 3, alignItems: 'flex-end', marginRight: '5%'},
            ]}>
            <TouchableOpacity
              onPress={() => closeScreen()}
              style={[styles.tochableButton]}>
              <Text style={styles.closeButtondesign}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={[styles.rowDirectionStyle, styles.commentViewHeader]}>
                    <View style={[styles.columnDirectionStyle, { flex: 1.6 }]}>
                        <Text style={styles.commentHeader}></Text>
                    </View>
                    <View style={[styles.columnDirectionStyle, { flex: 8.8 }]}>
                        <Text style={styles.commentHeader}>
                            Terms
                        </Text>
                    </View>
                    <View style={[styles.columnDirectionStyle, { flex: 1.6 }]}>
                        <TouchableOpacity onPress={() => closeScreen()}>
                            <Text style={styles.closeButtondesign}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.rowDirectionStyle, { flex: 1, marginVertical: '3%', marginHorizontal: '1%' }]}>
                    <View style={[styles.columnDirectionStyle, { flex: 1 }]}>
                        <Text style={{ fontWeight: '600', fontSize: 15 }}>By my eSignature below, I certify that I have read, fully understand and accept all terms of the foregoing statement. Please signify your acceptance by entering the information requested in the fields below.</Text>
                    </View>
                </View>
                <View style={[styles.rowDirectionStyle, { flex: 1, marginVertical: '10%', marginHorizontal: '1%' }]}>
                    <View style={[styles.columnDirectionStyle, { flex: 1 }]}>
                        <TextInput style={{ width: '60%', height: '40%', borderWidth: 1 }} onChangeText={handleChangeText()} value={signatureText} />
                        <View style={[styles.rowDirectionStyle, { flex: 1 }]}>
                            <View style={[styles.columnDirectionStyle, { flex: 1.8 }]}>
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>Signature</Text>
                            </View>
                            <View style={[styles.columnDirectionStyle, { flex: 0.5 }]}>
                                <Text style={{ color: 'red', fontSize: 16 }}>*</Text>
                            </View>
                            <View style={[styles.columnDirectionStyle, { flex: 7.7 }]}>

                            </View>
                        </View>

                    </View>
                </View>
                <Divider style={styles.dividerStyle} />
                <View style={[styles.rowDirectionStyle, { flex: 1, minHeight: '10%' }]}>
                    <View style={[styles.columnDirectionStyle, { flex: 1 }]}>
                    </View>
                </View>
                <View style={[styles.rowDirectionStyle, { flex: 1 }]}>
                    <View style={[styles.columnDirectionStyle, { flex: 5 }]}>
                    </View>
                    <View style={[styles.columnDirectionStyle, { flex: 4, alignItems: 'flex-end' }]}>
                        <TouchableOpacity onPress={() => getSignatureHandler()} style={[styles.tochableButton]}>
                            <Text style={styles.closeButtondesign}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.columnDirectionStyle, { flex: 3, alignItems: 'flex-end', marginRight: '5%' }]}>
                        <TouchableOpacity onPress={() => closeScreen()} style={[styles.tochableButton]}>
                            <Text style={styles.closeButtondesign}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardDesign: {
    flex: 7.0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 0.1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    backgroundColor: 'transparent',
  },
  blankView: {
    flex: 2.25,
  },
  rowDirectionStyle: {
    flexDirection: 'row',
  },
  columnDirectionStyle: {
    flex: 1,
  },
  commentViewHeader: {
    backgroundColor: '#3172b6',
  },
  commentHeader: {
    fontSize: 19,
    textAlign: 'center',
    fontWeight: '500',
    color: '#fff',
  },
  closeButtondesign: {
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'right',
  },
  buttondesign: {
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
  tochableButton: {
    minHeight: '15%',
    width: '80%',
    backgroundColor: '#3172b6',
    padding: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#3172b6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
