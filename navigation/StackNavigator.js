import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';

import MySchedules from '../screens/mySchedule/mySchedules';
import CaregiverVisit from '../screens/mySchedule/caregiverVisit';
import EditVisitDetails from '../screens/mySchedule/editVisitDetails';
import ClientISPComment from '../screens/mySchedule/clientISP/clientISPComment';
import PreviousVisits from '../screens/mySchedule/previousVisits/previousVisits';
import ScreeningQuestion from '../screens/mySchedule/screeningQuestion';
import PaperWork from '../screens/document/PaperWorkList';
import Document from '../screens/document/document';

import PdfScreen from '../screens/document/pdfScreen';
import CommentScreen from '../components/commentModule';
import NoteScreen from '../components/noteModule';
import SignatureBox from '../components/signatureBox';
import TermEsignatureBox from '../components/termEsignatureBox';
import Messaging from '../screens/messaging/messaging';
import Availability from '../screens/availability/availability';
import Location from '../screens/mySchedule/map/location';
import Map from '../screens/mySchedule/map/map';
import VideocallingConnect from '../screens/videoCalling/VideoCalling';
import Videocalling from '../utils/modal/IncommingCall';
import * as constants from '../appResources/constants';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

//--- stacks for mySchedules screen
const mySchedulesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.MY_SCHEDULE_STACK}
        component={MySchedules}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.CAREGIVER_VISIT_STACK}
        component={TabNavigator}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.NOTE_STACK}
        component={NoteScreen}
      />
    </Stack.Navigator>
  );
};

//--- stacks for mySchedules screen
const caregiverVisitStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.CAREGIVER_VISIT_STACK}
        component={CaregiverVisit}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.COMMENT_SCREEN}
        component={CommentScreen}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.EDIT_VISIT_DETAILS_STACK}
        component={EditVisitDetails}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.SCREENING_QUESTIONS_STACK}
        component={ScreeningQuestion}
      />
    </Stack.Navigator>
  );
};

//--- stacks for mySchedules screen
const caregiverPreviousVisitStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.PREVIOUS_VISITS_STACK}
        component={PreviousVisits}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.CAREGIVER_VISIT_STACK}
        component={CaregiverVisit}
      />
    </Stack.Navigator>
  );
};

//--- stacks for Client ISP comment screen
const clientISPStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.ISP_STACK}
        component={ClientISPComment}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.CAREGIVER_VISIT_STACK}
        component={CaregiverVisit}
      />
    </Stack.Navigator>
  );
};

//--- stacks for Location screen
const locationStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.LOCATION_STACK}
        component={Location}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.MAP_STACK}
        component={Map}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.CAREGIVER_VISIT_STACK}
        component={CaregiverVisit}
      />
    </Stack.Navigator>
  );
};

//--- stacks for Paper Work screen
const paperWorkStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.PAPER_WORK_STACK}
        component={PaperWork}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.PDF_SCREEN}
        component={PdfScreen}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.SIGNATURE_STACK}
        component={SignatureBox}
      />
      <Stack.Screen name="TermEsignatureBox" component={TermEsignatureBox} />
    </Stack.Navigator>
  );
};

//--- stacks for Document screen
const documentStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.DOCUMENT_STACK}
        component={Document}
      />
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.PDF_SCREEN}
        component={PdfScreen}
      />
      {/* <Stack.Screen name={constants.SCREEN_STACK_NAME.SIGNATURE_STACK} component={SignatureBox} /> */}
    </Stack.Navigator>
  );
};

//--- stacks for messaging screen
const messageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.MESSAGING_STACK}
        component={Messaging}
      />
    </Stack.Navigator>
  );
};

//--- stacks for Availability screen
const availabilityStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name={constants.SCREEN_STACK_NAME.AVAILABILITY_STACK}
        component={Availability}
      />
    </Stack.Navigator>
  );
};
//--- stacks for Availability screen
const VideoCallingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Videocalling" component={Videocalling} />
      <Stack.Screen name="videoCallingAccept" component={VideocallingConnect} />
    </Stack.Navigator>
  );
};

// const VideoCallingAcceptStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={screenOptionStyle}>
//       <Stack.Screen name="videoCallingAccept" component={VideocallingConnect} />
//     </Stack.Navigator>
//   );
// };

export {
  mySchedulesStackNavigator,
  VideoCallingStackNavigator,
  caregiverVisitStackNavigator,
  clientISPStackNavigator,
  locationStackNavigator,
  caregiverPreviousVisitStackNavigator,
  documentStackNavigator,
  paperWorkStackNavigator,
  messageStackNavigator,
  availabilityStackNavigator,
  // VideoCallingAcceptStackNavigator,
};
