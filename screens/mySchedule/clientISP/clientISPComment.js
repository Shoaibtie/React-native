import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as actions from '../../../redux/actions/authaction';
import * as constants from '../../../appResources/constants';
import Header from '../../../components/header';
import dateHelper from '../../../utils/dateHelperModule/dateHelper';

const servicePlanData = [
  {
    id: 1,
    title: 'SOC Data',
  },
  {
    id: 2,
    title: 'ISP Start Date',
  },
  {
    id: 3,
    title: 'ISP End Date',
  },
];

const clientInfoData = [
    {
      id: 1,
      title: 'Name',
    },
    {
      id: 2,
      title: 'Address',
    },
    {
      id: 3,
      title: 'Phone',
    },
    {
      id: 4,
      title: 'Email',
    },
    {
      id: 5,
      title: 'Gender',
    },
    {
      id: 6,
      title: 'DOB',
    },
    {
      id: 7,
      title: 'Height',
    },
    {
      id: 8,
      title: 'Weight',
    },
  ],
  contactListData = [
    {
      id: 1,
      title: 'Name',
    },
    {
      id: 2,
      title: 'Relation',
    },
    {
      id: 3,
      title: 'Phone',
    },
    {
      id: 4,
      title: 'Address',
    },
  ];

const physicianListData = [
  {
    id: 1,
    title: 'Name',
  },
  {
    id: 2,
    title: 'Phone',
  },
  {
    id: 3,
    title: 'Specialty',
  },
];

const serviceListData = [
  {
    id: 1,
    title: 'Name',
  },
  {
    id: 2,
    title: 'Start Date',
  },
];

const servicesData = [
  {
    id: 1,
    title: 'Services/sub cat',
  },
  {
    id: 2,
    title: 'Comments',
  },
];

const serviceScheduleData = [
  {
    id: 1,
    title: 'Days of Week',
  },
  {
    id: 2,
    title: 'Start Time',
  },
  {
    id: 3,
    title: 'End Time',
  },
];

class ClientISPComment extends Component {
  state = {
    isEnabled: false,
    startDate: '',
    endDate: '',
  };

  constructor(props) {
    super(props);
  }

  setBack = () => {
    this.props.navigation.navigate('CaregiverVisit');
  };

  componentDidMount() {
    this.getClientISPComment();
  }

  getClientISPComment = () => {
    const {startDate, endDate} = this.state;
    const {scheduleData, index} = this.props;

    const currentDate = new Date();

    const formattededStartDate = scheduleData[index]?.CurrentDate
      ? scheduleData[index].CurrentDate
      : null;
    // startDate
    //   ? dateHelper.momentDateConverter(startDate)
    //   : dateHelper.momentDateConverter(currentDate);
    const formattededEndDate = scheduleData[index]?.CurrentDate
      ? scheduleData[index].CurrentDate
      : null;
    // endDate
    //   ? dateHelper.momentDateConverter(endDate)
    //   : dateHelper.momentDateConverter(currentDate);

    let clientISPParamsURL =
      'id=' +
      scheduleData[index].AssessmentId +
      '&sdate=' +
      formattededStartDate +
      '&edate=' +
      formattededEndDate +
      '&IsPDF=' +
      'yes' +
      '&isaccpted=' +
      false +
      '&isopenformLink=' +
      false +
      '&isISPForVisitNote=' +
      false;

    this.props.getClientISP(clientISPParamsURL);
  };

  servicePlanUI = () => {
    const {iSPcomment} = this.props;
    console.log('useDatas======>', this.props.client_time);
    let currentDate = new Date();
    return servicePlanData.map(item => {
      return (
        <View style={styles.rowStyle}>
          <View style={styles.imageRow}>
            <Text>{item.title}</Text>
          </View>
          <View style={styles.locationRow}>
            <Text>
              {item.id == 1
                ? dateHelper.momentDateConverter(
                    iSPcomment.clientAssessment.SOCDate,
                  )
                : item.id == 2
                ? dateHelper.momentDateConverter(
                    iSPcomment.clientAssessment.ServiceStartDate
                      ? iSPcomment.clientAssessment.ServiceStartDate
                      : null,
                  )
                : dateHelper.momentDateConverter(
                    iSPcomment.clientAssessment.ServiceEndDate
                      ? iSPcomment.clientAssessment.ServiceEndDate
                      : null,
                  )}
            </Text>
          </View>
        </View>
      );
    });
  };

  commonListUI = text => {
    let list =
      text === 'contact'
        ? contactListData
        : text === 'physicians'
        ? physicianListData
        : text === 'service'
        ? serviceListData
        : text === 'services'
        ? servicesData
        : serviceScheduleData;
    return (
      list &&
      list.map(item => {
        return (
          <View
            style={
              text === 'contact'
                ? styles.columnDividerView
                : styles.columnDividerView2
            }>
            <Text style={styles.commonHeaderTitle}>{item.title}</Text>
          </View>
        );
      })
    );
  };

  clientInfoUI = () => {
    const {iSPcomment} = this.props;
    return clientInfoData.map(item => {
      return (
        <View style={styles.rowStyle}>
          <View style={styles.imageRow}>
            <Text style={styles.textBoldStyle}>{item.title}</Text>
          </View>
          <View style={[styles.locationRow, {alignItems: 'flex-end'}]}>
            <Text>
              {item.id == 1
                ? iSPcomment.appUserDetail.FirstName +
                  iSPcomment.appUserDetail.LastName
                : item.id == 2
                ? iSPcomment.appUserDetail.Address1
                : item.id == 3
                ? iSPcomment.appUserDetail.PhoneNumber
                : item.id == 4
                ? iSPcomment.appUserDetail.Email
                : item.id == 5
                ? iSPcomment.appUserDetail.Gender
                : item.id == 6
                ? iSPcomment.appUserDetail.DateOfBirth
                  ? dateHelper.momentDateConverter(
                      iSPcomment.appUserDetail.DateOfBirth,
                    )
                  : 'N/A'
                : item.id == 7
                ? iSPcomment.objCCC.Height
                : iSPcomment.objCCC.Weight}
            </Text>
          </View>
        </View>
      );
    });
  };

  render() {
    const {iSPcomment, isLoading} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          screenName="Client ISP"
          headerType="back"
          setDrawerVisible={visible => this.setBack()}
        />
        <View style={styles.mainView}>
          <ScrollView>
            <View style={styles.locationCardView}>
              <View style={[styles.rowStyle]}>
                <View style={styles.imageRow}>
                  <Image
                    style={styles.imageStyle}
                    source={{
                      uri: 'http://cdn2.hubspot.net/hub/433510/file-1794748919-jpg/images/css_logo_hr-clr.jpg?t=1444761412728',
                    }}
                  />
                </View>
                <View style={[styles.locationRow, styles.commonStyle]}>
                  <Text style={styles.textStyle}>
                    {iSPcomment ? iSPcomment.LocationAddress.AgencyName : null}
                  </Text>
                  <Text style={styles.locationTextStyle}>
                    {iSPcomment ? iSPcomment.LocationAddress.Address : null}
                  </Text>
                  <Text style={styles.locationTextStyle}>
                    Telephone:{' '}
                    {iSPcomment ? iSPcomment.LocationAddress.Telephone : null}
                  </Text>
                  <Text style={styles.locationTextStyle}>
                    Fax: {iSPcomment ? iSPcomment.LocationAddress.Fax : null}
                  </Text>
                </View>
              </View>
              <View style={styles.columnStlye}>
                <Text>
                  {constants.CAREGIVER_SCHEDULE.INDIVISUAL_SERVICE_PLAN}
                </Text>
              </View>
              {iSPcomment ? this.servicePlanUI() : null}
            </View>
            <View style={styles.locationCardView}>
              <View style={[styles.columnStlye, styles.clientInfoView]}>
                <Text style={styles.commonHeaderTitle}>
                  {constants.CAREGIVER_SCHEDULE.CLIENT_INFORMATION}
                </Text>
              </View>
              {iSPcomment ? this.clientInfoUI() : null}
              <View style={[styles.columnStlye]}>
                <Text style={styles.textBoldStyle}>Disaster Code</Text>
                <Text>
                  {iSPcomment ? iSPcomment.objCCC.DisasterCode : null}
                </Text>
              </View>
              <View style={[styles.columnStlye]}>
                <Text style={styles.textBoldStyle}>Disaster Note</Text>
                <Text>
                  {iSPcomment ? iSPcomment.objCCC.DisasterNote : null}
                </Text>
              </View>
            </View>
            <View style={styles.locationCardView}>
              <View style={[styles.columnStlye, styles.clientInfoView]}>
                <Text style={styles.commonHeaderTitle}>
                  {constants.CAREGIVER_SCHEDULE.CONTACT_LIST}
                </Text>
              </View>
              <View style={[styles.clientInfoView, styles.rowStyle]}>
                {this.commonListUI('contact')}
              </View>
              {iSPcomment
                ? iSPcomment.objCCC.lstEmergencyContact.map(item => {
                    return (
                      <View style={[styles.rowStyle]}>
                        <View style={styles.columnDividerView}>
                          <Text>{item.Name}</Text>
                        </View>
                        <View style={styles.columnDividerView}>
                          <Text>{item.Relationship}</Text>
                        </View>
                        <View style={styles.columnDividerView}>
                          <Text>{item.Phone}</Text>
                        </View>
                        <View style={styles.columnDividerView}>
                          <Text>{item.Address}</Text>
                        </View>
                      </View>
                    );
                  })
                : null}
            </View>
            <View style={styles.locationCardView}>
              <View style={[styles.columnStlye, styles.clientInfoView]}>
                <Text style={styles.commonHeaderTitle}>
                  {constants.CAREGIVER_SCHEDULE.PHYSICIANS}
                </Text>
              </View>
              <View style={[styles.clientInfoView, styles.rowStyle]}>
                {this.commonListUI('physicians')}
              </View>
              {iSPcomment
                ? iSPcomment.objCCC.lstRelatedDoctor.map(item => {
                    return (
                      <View style={[styles.rowStyle]}>
                        <View style={styles.columnDividerView2}>
                          <Text>{item.FullName}</Text>
                        </View>
                        <View style={styles.columnDividerView2}>
                          <Text>{item.PhoneNo}</Text>
                        </View>
                        <View style={styles.columnDividerView2}>
                          <Text>{item.Speciality}</Text>
                        </View>
                      </View>
                    );
                  })
                : null}
            </View>
            <View style={styles.locationCardView}>
              <View style={[styles.columnStlye, styles.clientInfoView]}>
                <Text style={styles.commonHeaderTitle}>
                  {constants.CAREGIVER_SCHEDULE.OTHERS}
                </Text>
              </View>
              <View style={[styles.columnStlye]}>
                <Text>
                  Primary Diagnosis:{' '}
                  {iSPcomment && iSPcomment.objCCC.PrimaryDiagnosis
                    ? iSPcomment.objCCC.PrimaryDiagnosis
                    : 'N/A'}
                </Text>
                <Text>
                  Secondary Diagnosis:{' '}
                  {iSPcomment && iSPcomment.objCCC.SecondaryDiagnosis
                    ? iSPcomment.objCCC.SecondaryDiagnosis
                    : 'N/A'}
                </Text>
                <Text>
                  Diagnosis Comments:{' '}
                  {iSPcomment && iSPcomment.objCCC.DiagnosisComment
                    ? iSPcomment.objCCC.DiagnosisComment
                    : 'N/A'}
                </Text>
              </View>
            </View>
            <View style={styles.locationCardView}>
              <View style={[styles.columnStlye, styles.clientInfoView]}>
                <Text style={styles.commonHeaderTitle}>
                  {constants.CAREGIVER_SCHEDULE.SERVICE}
                </Text>
              </View>
              <View style={[styles.clientInfoView, styles.rowStyle]}>
                {this.commonListUI('service')}
              </View>
              {iSPcomment
                ? iSPcomment.objCCC.lstService.map(item => {
                    return (
                      <View style={[styles.rowStyle]}>
                        <View style={styles.columnDividerView2}>
                          <Text>{item.CSSServiceCode}</Text>
                        </View>
                        <View style={styles.columnDividerView3}>
                          <Text>
                            {item.StartPayroll
                              ? dateHelper.momentDateConverter(
                                  item.StartPayroll,
                                )
                              : null}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                : null}
            </View>
            <View style={styles.locationCardView}>
              <View style={[styles.columnStlye, styles.clientInfoView]}>
                <Text style={styles.commonHeaderTitle}>
                  {constants.CAREGIVER_SCHEDULE.SERVICES}
                </Text>
              </View>
              <View style={[styles.clientInfoView, styles.rowStyle]}>
                {this.commonListUI('services')}
              </View>
              {iSPcomment
                ? iSPcomment.PersonalCareList.map(item => {
                    return (
                      <View style={[styles.rowStyle, {marginVertical: '1%'}]}>
                        <View style={[styles.imageRow, styles.spaceStyle]}>
                          <Text>{item.Questions}</Text>
                          <Text>{item.SelectedAnswersSet}</Text>
                        </View>
                        <View style={styles.locationRow}>
                          <Text>{item.answeredText}</Text>
                        </View>
                      </View>
                    );
                  })
                : null}
              {iSPcomment
                ? iSPcomment.NutritionalServicesList.map(item => {
                    return (
                      <View style={[styles.rowStyle, {marginVertical: '1%'}]}>
                        <View style={[styles.imageRow, styles.spaceStyle]}>
                          <Text>{item.Questions}</Text>
                          <Text>{item.SelectedAnswersSet}</Text>
                        </View>
                        <View style={styles.locationRow}>
                          <Text>{item.answeredText}</Text>
                        </View>
                      </View>
                    );
                  })
                : null}
              {iSPcomment
                ? iSPcomment.HouseholdDutiesList.map(item => {
                    return (
                      <View style={[styles.rowStyle, {marginVertical: '1%'}]}>
                        <View style={[styles.imageRow, styles.spaceStyle]}>
                          <Text>{item.Questions}</Text>
                          <Text>{item.SelectedAnswersSet}</Text>
                        </View>
                        <View style={styles.locationRow}>
                          <Text>{item.answeredText}</Text>
                        </View>
                      </View>
                    );
                  })
                : null}
              {iSPcomment
                ? iSPcomment.FunctionalAssistanceList.map(item => {
                    return (
                      <View style={[styles.rowStyle, {marginVertical: '1%'}]}>
                        <View style={[styles.imageRow, styles.spaceStyle]}>
                          <Text>{item.Questions}</Text>
                          <Text>{item.SelectedAnswersSet}</Text>
                        </View>
                        <View style={styles.locationRow}>
                          <Text>{item.answeredText}</Text>
                        </View>
                      </View>
                    );
                  })
                : null}
            </View>
            {iSPcomment
              ? iSPcomment.lstClientChoiceservices.map(item => {
                  return (
                    <View style={styles.locationCardView}>
                      <View style={[styles.columnStlye, styles.clientInfoView]}>
                        <Text style={styles.commonHeaderTitle}>
                          {item.Questions}
                        </Text>
                      </View>
                      <View
                        style={[styles.columnStlye, {marginVertical: '1%'}]}>
                        <Text>{item.SelectedAnswersSet}</Text>
                        <Text>{item.answeredText}</Text>
                      </View>
                    </View>
                  );
                })
              : null}
            <View style={styles.locationCardView}>
              <View style={[styles.columnStlye, styles.clientInfoView]}>
                <Text style={styles.commonHeaderTitle}>
                  {constants.CAREGIVER_SCHEDULE.SERVICE_SCHEDULE}
                </Text>
              </View>
              <View style={[styles.clientInfoView, styles.rowStyle]}>
                {this.commonListUI('service schedule')}
              </View>
              {iSPcomment
                ? iSPcomment.lstTime.map(item => {
                    return (
                      <View style={[styles.rowStyle]}>
                        <View style={styles.columnDividerView2}>
                          <Text>{item.QuestionName}</Text>
                        </View>
                        <View style={styles.columnDividerView2}>
                          <Text>{item.SelectedStartTime}</Text>
                        </View>
                        <View style={styles.columnDividerView2}>
                          <Text>{item.SelectedEndTime}</Text>
                        </View>
                      </View>
                    );
                  })
                : null}
            </View>
            <View style={styles.locationCardView}>
              <View style={[styles.columnStlye, styles.clientInfoView]}>
                <Text style={styles.commonHeaderTitle}>
                  {constants.CAREGIVER_SCHEDULE.SAFETY_COMMENTS_CONCERNS}
                </Text>
              </View>
              {iSPcomment
                ? iSPcomment.safetyConcerns.map(item => {
                    return (
                      <View style={[styles.rowStyle]}>
                        <Text>{item.Questions}</Text>
                      </View>
                    );
                  })
                : null}
            </View>
            <View style={styles.locationCardView}>
              <View style={[styles.columnStlye, styles.clientInfoView]}>
                <Text style={styles.commonHeaderTitle}>
                  {constants.CAREGIVER_SCHEDULE.SERVICE_SCHEDULE_NOTE}
                </Text>
              </View>
              <View style={[styles.rowStyle]}>
                <Text>
                  {iSPcomment
                    ? iSPcomment.objCCC.ServiceScheduleNote
                      ? iSPcomment.objCCC.ServiceScheduleNote
                      : 'N/A'
                    : null}
                </Text>
              </View>
            </View>
            <View style={styles.locationCardView}>
              <View style={[styles.columnStlye, styles.clientInfoView]}>
                <Text style={styles.commonHeaderTitle}>
                  {constants.CAREGIVER_SCHEDULE.GOALS}
                </Text>
              </View>
              <View style={[styles.rowStyle]}>
                <Text>
                  {iSPcomment
                    ? iSPcomment.objCCC.Goal
                      ? iSPcomment.objCCC.Goal
                      : 'N/A'
                    : null}
                </Text>
              </View>
            </View>
            <View style={styles.locationCardView}>
              <View style={[styles.columnStlye, styles.clientInfoView]}>
                <Text style={styles.commonHeaderTitle}>
                  {constants.CAREGIVER_SCHEDULE.DIRECTIONS}
                </Text>
              </View>
              <View style={[styles.rowStyle]}>
                <Text>
                  {iSPcomment
                    ? iSPcomment.objCCC.Direction
                      ? iSPcomment.objCCC.Direction
                      : 'N/A'
                    : null}
                </Text>
              </View>
            </View>
            <View style={styles.rowStyle}>
              <View
                style={[
                  styles.signatureColumnView,
                  styles.signatureView,
                  styles.commonStyle,
                ]}>
                <Image
                  resizeMode="contain"
                  style={styles.signatureImageStyle}
                  source={
                    iSPcomment.ClientSignatureData
                      ? {uri: iSPcomment.ClientSignatureData}
                      : null
                  }
                />
                <Text style={styles.locationTextStyle}>
                  {constants.CAREGIVER_SCHEDULE.CLIENT_SIGNATURE}
                </Text>
              </View>
              <View style={[styles.signatureColumnView, styles.commonStyle]}>
                <Image
                  resizeMode="contain"
                  style={styles.signatureImageStyle}
                  source={
                    iSPcomment.StaffSignatureData
                      ? {uri: iSPcomment.StaffSignatureData}
                      : null
                  }
                />
                <Text style={styles.locationTextStyle}>
                  {constants.CAREGIVER_SCHEDULE.STAFF_SIGNATURE}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  scheduleData: state.caregiverSchedule.scheduleData,
  index: state.indexValue.index,
  iSPcomment: state.caregiverSchedule.iSPcomment,
  isLoading: state.loader.isLoading,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  getClientISP: data => dispatch(actions.getClientISP({data})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientISPComment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainView: {
    flex: 9.25,
    padding: '2%',
  },
  locationCardView: {
    flex: 1,
    marginVertical: '1%',
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: '1%',
  },
  columnStlye: {
    flex: 1,
    paddingLeft: '1%',
  },
  imageRow: {
    flex: 0.3,
  },
  locationRow: {
    flex: 0.7,
  },
  commonStyle: {
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '400',
  },
  textBoldStyle: {
    fontWeight: '600',
  },
  locationTextStyle: {
    fontSize: 10,
  },
  imageStyle: {
    width: 100,
    height: 45,
  },
  clientInfoView: {
    backgroundColor: '#3172b6',
    paddingLeft: '1%',
  },
  commonHeaderTitle: {
    color: '#fff',
    fontWeight: '500',
  },
  columnDividerView: {
    flex: 0.25,
  },
  columnDividerView2: {
    flex: 0.33,
  },
  columnDividerView3: {
    flex: 0.4,
  },
  signatureView: {
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  signatureColumnView: {
    flex: 0.5,
  },
  signatureImageStyle: {
    width: 180,
    height: 180,
    marginLeft: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: '1%',
  },
  spaceStyle: {
    paddingRight: '1%',
  },
});
