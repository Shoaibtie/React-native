export const SCREEN_NAME = {
  HOME_SCREEN: 'Home',
  MY_SCHEDULE_SCREEN: 'My Schedules',
  DOCUMENT_SCREEN: 'Document',
  CAREGIVER_VISIT_SCREEN: 'CaregiverVisit',
  MESSAGE_SCREEN: 'Messaging',
  AVAILABILITY_SCREEN: 'Availability',
  LOGOUT_SCREEN: 'Logout',
};

export const SCREEN_STACK_NAME = {
  SIGN_IN: 'login',
  HOME_STACK: 'Home',
  MY_SCHEDULE_STACK: 'MySchedules',
  CAREGIVER_VISIT_STACK: 'CaregiverVisit',
  SCREENING_QUESTIONS_STACK: 'ScreeningQuestion',
  NOTE_STACK: 'noteScreen',
  EDIT_VISIT_DETAILS_STACK: 'EditVisitDetails',
  PREVIOUS_VISITS_STACK: 'PreviousVisits',
  ISP_STACK: 'ClientISPComment',
  LOCATION_STACK: 'Location',
  MAP_STACK: 'Map',
  PAPER_WORK_STACK: 'PaperWork',
  DOCUMENT_STACK: 'Document',
  SIGNATURE_STACK: 'SignatureBox',
  COMMENT_SCREEN: 'CommentScreen',
  PDF_SCREEN: 'PdfScreen',
  MESSAGING_STACK: 'Messaging',
  AVAILABILITY_STACK: 'Availability',
};

export const ASYNCSTORAGE_VALUES = {
  USER_DETAILS: 'userDetails',
  USER_TOKEN: 'userToken',
  FCM_TOKEN: 'Token',
  RESTORE_TOKEN: 'RESTORE_TOKEN',
};

export const DEVICEID = {
  DEVICE_ID: 'deviceId',
};

export const VERSION = {
  VERSION_NUMBER: 'Version',
};

export const KEYBOARD_AWARE_VALUES = {
  ALWAYS: 'always',
  KEYBOARD_TYPE: 'email-address',
};

export const APIS_KEY = {
  ID: 'Id=',
};

export const NO_RECORD_FOUND = {
  RECORDS_STRING: 'No Records Found',
};

export const REWARD_POINT = {
  reward_balance: 'Caring Rewards Balance',
  redeem_point: 'Caring Reward Points Redeemed',
};

export const COLOR_CODE = {
  UNDERLAYCOLOR: '#fff',
  COLOR: '#FFFFFF',
  JOIN_ACTIVITY_UNDERLAY: '#2196F3',
  BACKGROUNDCOLOR: '#2196F3',
  COMMON_BACKGROUNDCOLOR: '#FFFFFF',
  GRAY_BACKGROUNDCOLOR: '#ECE8E',
  SWIPE_COLOR: 'green',
  MESSAGE_BACKGROUNDCOLOR: '#E6E6E6',
  ICON_COLOR: 'black',
  ACTIVITY_BORDER_COLOR: '#957641',
  LOGIN_BUTTON_UNDERLAY_COLOR: '#1990CF',
  ACTIVITY_BACKGROUND_COLOR: '#E6CAA5',
  LUNCH_BACKGROUND_COLOR: '#A7F72D',
  APP_COLOR: '#3172b6',
  APP_CONTAINER_COLOR: '#f7f8fc',
  BLACK: '#000',
  WHITE: '#fff',
  DRAWER_ACTIVE_COLOR: '#e91e63',
};

export const ALERT_MESSAGE = {
  ALERT_MESSAGE_TITLE: 'FTM',
  LOGIN: 'Login',
  RE_LOGIN: 'PLease login again!',
  WRONG_EMAIL_PASSWORD:
    'Login Failed! You have entered wrong email id or password.',
  OK: 'Ok',
};

export const ICON_NAME = {
  MENU: 'menu',
  ARROW_BACK: 'back',
};

export const BUTTON_NAME = {
  BACK_BUTTON: 'Back',
  CLOSE: 'CLOSE',
  OK: 'OK',
  SAVE: 'SAVE',
  SEARCH: 'Search',
  CANCEL: 'CANCEL',
  SUBMIT: 'Submit',
  CLEAR: 'Clear',
  S_CLOSE: 'Close',
};

export const STRING_NAME = {
  CAREGIVER: 'CareGiver',
  UNDEFINED: 'undefined',
  ROOT: 'root',
};

export const COMMON_STRING = {
  TO: 'To:',
};

export const LOGIN = {
  EMAIL: 'email',
  PASSWORD: 'password',
  LOGIN_BUTTON: 'LOGIN',
  EMAIL_PLACEHOLDER: 'Enter Email',
  PASSWORD_PLACEHOLDER: 'Enter Password',
  EMAIL_REQUIRED_ERROR: 'Email is required !',
  PASSWORD_REQUIRED_ERROR: 'Password is required !',
  EMAIL_ERROR_MESSAGE: 'Invalid Email id',
  WRONG_INPUT_ERROR_MESSAGE: 'Email and Password are required !',
  FORGOT_PASSWORD: 'Forgot Password?',
  CLIENTROLE: 'Client',
  FAMILYROLE: 'Family',
  USER_TYPE_MESSAGE: 'Only CssStaff, admin and Caregiver users can Login',
};

export const VALIDATION = {
  VALIDATION_STRING:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const CAREGIVER_SCHEDULE = {
  TO: 'To',
  SCHEDULE_TITLE: 'My Schedule',
  COMMENT_SCREEN: 'Visit Note Comment',
  CHECK_IN_COMMENT: 'Check In comments by Caregiver',
  CHECK_OUT_COMMENT: 'Check Out comments by Caregiver',
  STAFF_CHECK_IN_COMMENT: 'Check In comments by Staff',
  STAFF_CHECK_OUT_COMMENT: 'Check Out comments by Staff',
  CHECK_IN_INPUT: 'checkInComment',
  CHECK_OUT_INPUT: 'checkOutComment',
  SCHEDULED_IN: 'Scheduled In :',
  SCHEDULED_OUT: 'Scheduled Out :',
  ACTUAL_IN: 'Actual In :',
  ACTUAL_OUT: 'Actual Out :',
  RECORD: 'No tasks assigned.',
  INDIVISUAL_SERVICE_PLAN: 'Individual Service Plan',
  CLIENT_INFORMATION: 'Client Information',
  CONTACT_LIST: 'Contact List',
  PHYSICIANS: 'Physicians',
  OTHERS: 'Others',
  SERVICE: 'Service',
  SERVICES: 'Services',
  SERVICE_SCHEDULE: 'Service Schedule',
  SAFETY_COMMENTS_CONCERNS: 'Safety Comments/Concerns',
  SERVICE_SCHEDULE_NOTE: 'Service Schedule Note',
  GOALS: 'Goals',
  DIRECTIONS: 'Directions',
  CLIENT_SIGNATURE: 'Client/Responsible party signature',
  STAFF_SIGNATURE: 'Staff signature',
};

export const QUESTIONING_SCREEN = {
  MODAL_HEADER: 'Early/Late Check In Reason',
  MODAL_CONTENT:
    'Please provide reason for checking in before/after shift start time and tell us what time your work started',
};
export const QUESTIONING_SCREEN_CHECKIN = {
  MODAL_HEADER: 'Early/Late Check In Reason',
  MODAL_CONTENT:
    'Please provide reason for checking in before/after shift start time and tell us what time your work started',
};
export const QUESTIONING_SCREEN_CHECtOUT = {
  MODAL_HEADER: 'Early/Late Check out Reason',
  MODAL_CONTENT:
    'Please provide reason for checking out before/after shift start time and tell us what time your work started',
};
export const DOCUMENT_SCREEN = {
  SIGNATURE_BOX_TITLE: 'Signature Capture',
  GET_SIGNATURE: 'Get Signature',
  SAVE_SIGNATURE: 'Save Signature',
};

export const AVAILABILITY_SCREEN = {
  SELECT: 'Select',
  SERVICE_TIMES: 'SERVICE TIMES',
  RESTRICTIONS: 'RESTRICTIONS',
  ATTRIBUTES: 'ATTRIBUTES',
  CERTIFICATIONS: 'CERTIFICATIONS',
  DAYS_HOURS: 'daysHours',
  COMMON_UI: 'commonUI',
  ATTRIBUTE_UI: 'attrbuteUI',
  CERTIFICAT_UI: 'certificate',
  NOTE: 'Note',
  RESTRICTION_KEY: 'Restrictions',
  ATTRIBUTE_KEY: 'Attributes',
  SELECT_OPTION: 'Please Select',
  ATTRIBUTE: 'Attribute',
  CERTIFICATION_KEY: 'Certification',
  EXPIRATION: 'Expiration',
  CERTIFICATE_NUMBER: 'Certificate No.',
};

export const MESSAGING_SCREEN = {
  BOX_TITLE: 'Text Message to Agency',
  RECEIPENT: 'Caring Senior Service of Test',
  VAIDATION_MESSAGE: 'Please enter the message',
};
