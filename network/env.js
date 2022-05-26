class Environment {
  constructor() {
    // this.setEnvironment('dev');   //http://40.79.64.69:85/api
    //this.setEnvironment('sandbox');
    this.setEnvironment('production');
  }

  setEnvironment(env) {
    this.environment = env;

    if (env === 'production') {
      // Base URL
      this.baseURI = 'http://40.79.64.69:85/api'; //http://104.209.210.221:4446/api
      this.rewardBaseURL = 'https://secure.rewardian-staging.com/api';
      // API URLs on Login screen
      this.loginURL = '/Account/Authenticate';
      this.forgotPasswordURL = '/Account/ForgotPassword?';
      this.deviceRegisAPI = '/CommonAPI/AddUpdateGCMID?';
      this.GetTokenForVideoAPI = '/CommonAPI/GetTokenForVideo?';
      this.getLogOut = '/CommonAPI/LogoutPhoneUserById?';
      // API URLs on My Schedule screen
      this.getCaregiverScheduleListURL =
        '/MobileCareGiver/GetCaregiverScheduleList?';
      this.getCaregiverVisitURL = '/MobileCareGiver/GetCareGiverVisit?';
      this.getScreeningQuestionURL = '/MobileCareGiver/GetScreeningTemplate?';
      this.caregiverCheckInTimeURL = '/MobileCareGiver/CaregiverCheckIntime?';
      this.getClientISPURL = '/MobileCareGiver/ClientISP?';
      (this.getClientPreviousVisitsURL = '/CommonAPI/GetVisitPreviousNotes?'),
        (this.caregiverCheckoutURL = '/MobileCareGiver/CaregiverCheckOut'),
        (this.getClientLocationForMapURL =
          '/MobileCareGiver/GetClientLocationForMap?');

      // API URLs on Document screen
      this.getCaregiverDocumentPaperListURL =
        '/MobileCareGiver/CaregiverDocument?';
      this.getCaregiverDocumentTemplateURL =
        '/MobileCaregiver/ApproveCaregiverDoc?';
      this.downloadCaregiverDocumentURL =
        '/MobileCaregiver/DownloadUploadedFile?';
      this.getDocumentSignatureURL = '/MobileCaregiver/GetDocumentSignature?';
      this.saveDocumentSignatureURL = '/MobileCaregiver/SaveDocumentSignature';
      this.saveApproveDocumentURL = '/MobileCaregiver/ApproveCaregiverDocSave';

      //API URLs on Availability screen
      this.caregiverAvailabilityDetailsURL =
        '/MobileCareGiver/CareGiverAvailavility?';
      this.saveCaregiverAvailabilityDetailsURL =
        '/MobileCareGiver/UpdateCGAvailability';

      //API URLs on Messaging screen
      this.sendMessageURL = '/CommonAPI/SendMessageToAgency?';
      this.rewardsURL = '/endpoint/v1';
      this.rewardBalance = '/MobileCareGiver/GetUserProspectByCaregiverId';
    }
  }
}

const Env = new Environment();

export default Env;
