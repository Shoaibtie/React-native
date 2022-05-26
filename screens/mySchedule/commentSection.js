import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import toastAlert from '../../utils/toastModule/tosatAlert';

export default function CommentSection({item, listType, props, commentData}) {
  const [commentValue, setCommentValue] = React.useState(commentData);
  const [screen, setScreen] = React.useState();
  const [keyboardValue, setKeyboard] = React.useState();
  const visitData = useSelector(state => state.caregiverSchedule.visitData);
  const scheduleData = useSelector(
    state => state.caregiverSchedule.scheduleData,
  );
  const index = useSelector(state => state.indexValue.index);

  React.useEffect(() => {
    if (props.route.params) setScreen(props.route.params.screen);
  }, []);

  const handleInput = text => {
    visitData.AdditionalComments = text;
    setCommentValue(text);
  };

  const toastMessageHandler = () => {
    if (screen !== 'previousVisits')
      toastAlert.toastMessage('Please Check-In first');
  };

  return (
    <View style={styles.flatlistViewDesign}>
      {Platform.OS === 'ios' ? (
        <KeyboardAwareScrollView
          onKeyboardWillShow={(frames: Object) => {
            setKeyboard(frames.easing ? 'keyboard' : '');
            console.log('Keyboard evenssst', frames.easing);
          }}
          style={{marginBottom: keyboardValue ? 200 : null}}
          bounces={true}
          // scrollToPosition={200}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          scrollEnabled={true}
          // extraScrollHeight={100}
          keyboardShouldPersistTaps="handled"
          scrollToOverflowEnabled={true}
          enableAutomaticScroll={true}>
          <View style={styles.cardDesign}>
            <Text style={styles.textDesign}>
              Additional Notes/Recommendation
            </Text>
            <TextInput
              value={commentValue}
              style={styles.textInputView}
              multiline={true}
              onBlur={() => setKeyboard('')}
              onChangeText={
                scheduleData[index].Status === 'Scheduled' ||
                screen === 'previousVisits'
                  ? () => toastMessageHandler()
                  : text => handleInput(text)
              }
              editable={
                scheduleData[index].Status === 'Scheduled' ||
                screen === 'previousVisits'
                  ? false
                  : true
              }
            />
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <View style={styles.cardDesign}>
          <Text style={styles.textDesign}>Additional Notes/Recommendation</Text>
          <TextInput
            value={commentValue}
            style={styles.textInputView}
            multiline={true}
            onBlur={() => {
              Keyboard.dismiss();
            }}
            onChangeText={
              scheduleData[index].Status === 'Scheduled' ||
              screen === 'previousVisits'
                ? () => toastMessageHandler()
                : text => handleInput(text)
            }
            editable={
              scheduleData[index].Status === 'Scheduled' ||
              screen === 'previousVisits'
                ? false
                : true
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flatlistViewDesign: {
    flex: 1,
    marginHorizontal: '2%',
    marginVertical: '2.5%',
  },
  cardDesign: {
    flex: 1,
    borderRadius: 2,
    borderWidth: 0.1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    padding: 8,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  textInputView: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    color: '#000',
    paddingLeft: 5,
  },
  textDesign: {
    fontWeight: '600',
  },
});
