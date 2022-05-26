import {combineReducers} from 'redux'
import loader from './loaderReducer';
import auth from './authReducer';
import caregiverSchedule from './scheduleDetailsReducer';
import indexValue from './indexReducer';
import document from './documentReducer';
import availability from './availabilityReducer';
import message from './messagingReducer';
import location from './loaderReducer';

const rootReducer = combineReducers({
  loader,
  auth,
  caregiverSchedule,
  indexValue,
  document,
  availability,
  message,
  location
})

export default rootReducer;