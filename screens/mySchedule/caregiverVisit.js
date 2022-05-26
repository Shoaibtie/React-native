import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import * as actions from '../../redux/actions/authaction';
import Header from '../../components/header';
import Loader from '../../utils/loader/loader';
import toastModule from '../../utils/toastModule/tosatAlert';
import * as constants from '../../appResources/constants';

import CollapsibleModule from '../../components/collapsibleModule';
import CareGiverBasicDetails from './caregiverBasicDetails';
import ArrayFilterHelper from '../../utils/ArrayFilterHelper/ArrayFilterHelper';
import moment from 'moment';
import CheckIN_Out_Reason from '../../utils/modal/CheckIN_Out_Reason';
import Geolocation from '@react-native-community/geolocation';

const collapseHeaderContent = [
  {id: 0, title: 'Personal Care', listType: 'visitForm', index: 0},
  {id: 1, title: 'Nutritional', listType: 'visitForm', index: 1},
  {id: 2, title: 'Household Duties', listType: 'visitForm', index: 2},
  {id: 3, title: 'Functional Assistance', listType: 'visitForm', index: 3},
  {id: 4, title: 'Comment Section', listType: 'commentSection', index: 4},
  {id: 5, title: 'Additional Item', listType: 'additionalItemView', index: 5},
];

const list = [
  {
    id: 1,
    title: 'Getting Started',
    body: 'React native Accordion/Collapse component, very good to use in toggles & show/hide content',
  },
  {
    id: 2,
    title: 'Components',
    body: 'AccordionList,Collapse,CollapseHeader & CollapseBody',
  },
];

class CaregiverVisit extends Component {
  state = {
    formData: '',
    caregiverDataList: '',
    loading: false,
    updatedData: [],
    isCheckout: true,
    isModalVisible: false,
    checkOut: '',
    checout_Comment: '',
    new_value: '',
    latitude: '',
    longitude: '',
    isLoading: this.props.isLoading,
    locationGet: false,
    currentLatitude: '',
    currentLongitude: '',
  };

  constructor(props) {
    super(props);
  }

  setBack = () => {
    this.props.navigation.navigate('MySchedules');
  };

  componentDidMount = () => {
    const data = [];
    this.props.setEditedFormData(data);
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('caregiver visits focus', this.props);
    });
    this.getVisitFormDetailsById();
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Function to call service API to get service details on care plan screen
  getVisitFormDetailsById = async data => {
    const {userData, scheduleData, index} = this.props;

    let caregiverVisitData =
      'clientId=' +
      scheduleData[index].ClientId +
      '&scheduleId=' +
      scheduleData[index].Id +
      '&assessmentId=' +
      scheduleData[index].AssessmentId +
      '&loggedUserId=' +
      userData.LoggedUserId;

    await this.props.getCaregiverVisitDetails(caregiverVisitData);

    this.setState({loading: false});
    const {visitData} = this.props;
    this.setState({updatedData: visitData});
    console.log('visitData', visitData);
    const caregiverVisitList = await this.createArrayWithFilteredData(
      visitData,
    );
    await this.props.setFilteredVisitData(caregiverVisitList);
    this.setState({
      formData: this.props.filterVisitDetails,
    });
  };

  createArrayWithFilteredData = async dataArary => {
    const filterList = collapseHeaderContent.map(item => {
      if (item.title === 'Personal Care') {
        let reduceList = ArrayFilterHelper.reduceArray(
          dataArary.PersonalCareList,
        );
        let filterList = ArrayFilterHelper.filterArray(
          reduceList,
          dataArary.PersonalCareList,
          'Visit',
        );
        let dataList = [{id: 0, noRecord: constants.CAREGIVER_SCHEDULE.RECORD}];
        return dataArary && dataArary.PersonalCareList.length > 0
          ? filterList
          : dataList;

        // let selectedList = ArrayFilterHelper.SelectedArrayByClient(filterList)

        // return selectedList.length > 0 ? selectedList : filterList;
      } else if (item.title === 'Nutritional') {
        let reduceList = ArrayFilterHelper.reduceArray(
          dataArary.NutritionalServicesList,
        );
        let filterList = ArrayFilterHelper.filterArray(
          reduceList,
          dataArary.NutritionalServicesList,
          'Visit',
        );
        let dataList = [{id: 0, noRecord: constants.CAREGIVER_SCHEDULE.RECORD}];
        return dataArary.NutritionalServicesList.length > 0
          ? filterList
          : dataList;

        // let selectedList = ArrayFilterHelper.SelectedArrayByClient(filterList)

        // return selectedList.length > 0 ? selectedList : filterList;
      } else if (item.title === 'Household Duties') {
        let reduceList = ArrayFilterHelper.reduceArray(
          dataArary.HouseholdDutiesList,
        );
        let filterList = ArrayFilterHelper.filterArray(
          reduceList,
          dataArary.HouseholdDutiesList,
          'Visit',
        );
        let dataList = [{id: 0, noRecord: constants.CAREGIVER_SCHEDULE.RECORD}];
        return dataArary.HouseholdDutiesList.length > 0 ? filterList : dataList;

        // let selectedList = ArrayFilterHelper.SelectedArrayByClient(filterList)

        // return selectedList.length > 0 ? selectedList : filterList;
      } else if (item.title === 'Functional Assistance') {
        let reduceList = ArrayFilterHelper.reduceArray(
          dataArary.FunctionalAssistanceList,
        );
        let filterList = ArrayFilterHelper.filterArray(
          reduceList,
          dataArary.FunctionalAssistanceList,
          'Visit',
        );
        let dataList = [{id: 0, noRecord: constants.CAREGIVER_SCHEDULE.RECORD}];
        return dataArary.FunctionalAssistanceList.length > 0
          ? filterList
          : dataList;

        // let selectedList = ArrayFilterHelper.SelectedArrayByClient(filterList);

        // return selectedList.length > 0 ? selectedList : filterList;
      } else if (item.title === 'Additional Item') {
        let filterList = dataArary.AdditionalItemList;
        return filterList;
      }
    });

    return filterList;
  };
  setIsModalVisible = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      checkOut: 'Check Out',
    });
  };
  checkout_Comnt_Alert_Fun = value => {
    const {updatedData} = this.state;
    this.setState({isLoading: false});
    console.log('updatessdsdasds', updatedData);
    Alert.alert(
      'Checkout',
      'After check out you will not be able to change the visit note. Do you want to check out?',
      [
        {
          text: 'Ok',
          onPress: async () => {
            await this.props.caregiverCheckOutDetails(updatedData);
            this.props.refreshScreen(true);
            if (value === 'checkout')
              this.props.navigation.navigate('MySchedules');
          },
        },
        {
          text: 'Cancel',
          onPress: () => this.setState({isLoading: false}),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  requestLocationPermission = async value => {
    this.setState({loading: true});
    if (Platform.OS === 'ios') {
      this.getOneTimeLocation(value);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        this.setState({permission: granted});
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getOneTimeLocation(value);
          this.setState({loading: true});
          // this.subscribeLocationLocation();
        } else {
          this.setState({locationStatus: 'Permission Denied'});
          this.setState({loading: false});
        }
      } catch (err) {
        console.warn('err', err);
        this.setState({loading: false});
      }
    }
  };
  getOneTimeLocation = value => {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({loading: true});
        const initialPosition = position;
        setTimeout(() => {
          console.log('initialPosition', initialPosition.coords.latitude);
          this.setState({locationStatus: 'You are Here'});
          const currentLongitude = JSON.stringify(
            initialPosition.coords.longitude,
          );
          const currentLatitude = JSON.stringify(
            initialPosition.coords.latitude,
          );
          if (currentLongitude && currentLatitude) {
            const {new_value, updatedData} = this.state;
            updatedData.CheckoutLat = currentLatitude;
            updatedData.CheckoutLng = currentLongitude;
            this.checkout_Comnt_Alert_Fun(value);
            this.setState({loading: false, locationGet: true});
          } else {
            this.setState({loading: false, locationGet: true});
          }
        }, 5000);
      },
      error => {
        setTimeout(() => {
          this.setState({
            locationStatus: error.message,
            loading: false,
            locationGet: true,
          });
          Alert.alert(
            'Location Permission', //error.message
            'Unable to login due to no location available. Please allow location to login.',
            [
              {
                text: 'OK',
                onPress: () => {
                  console.log('pk');
                  // this.props.props.navigation.navigate('MySchedules');
                },
              },
            ],
          );
          this.setState({loading: false, locationGet: true});
        }, 5000);
      },
      {
        enableHighAccuracy: false,
        timeout: Platform.OS === 'ios' ? 30000 : 30000,
        maximumAge: Platform.OS == 'ios' ? 10000 : 5000,
      },
    );
  };
  handleSaveAndCheckOut = async value => {
    const {updatedData} = this.state;
    const {checkOutData, scheduleData, index} = this.props;
    this.setState({new_value: value});
    var currenttdate = moment(new Date().toLocaleString()).format(
      'YYYY-MM-DD HH:mm:ss',
    );
    var clientDate = moment(this.props.visitData.ScheduledTimeOut).format(
      'YYYY-MM-DD HH:mm:ss',
    );

    let Clinet_Time = moment(scheduleData[index].ScheduledTimeOut).format(
      'HH:mm',
    );

    let current_time = moment(new Date().toLocaleString()).format('HH:mm');
    let outTime = moment().format('YYYY-MM-DD HH:mm:ss');

    updatedData.IsCheckedOut = value === 'checkout' ? true : false;
    updatedData.DisplayTimeOut = value === 'checkout' ? '1' : null;
    updatedData.TimeOut = value === 'checkout' ? outTime : null;
    const isCheckout = await this.checkAllServiceDetailsFilled(updatedData);
    if (value === 'save' || (value === 'checkout' && isCheckout)) {
      if (value === 'checkout') {
        if (clientDate > currenttdate) {
          this.setIsModalVisible(value);
        } else if (clientDate == currenttdate) {
          if (clientDate == currenttdate) {
            if (Clinet_Time == current_time) {
              this.requestLocationPermission(value);
            } else {
              this.setIsModalVisible(value);
            }
          } else {
            this.setIsModalVisible(value);
          }
        } else {
          this.setIsModalVisible(value);
        }
        // this.checkout_Comnt_Alert_Fun(value);
      } else {
        this.props.refreshScreen(true);
        await this.props.caregiverCheckOutDetails(updatedData);
      }
    } else {
      toastModule.toastMessageBox('Please provide all required fields !!');
    }
  };

  checkAllServiceDetailsFilled = async updatedData => {
    let isCheckout = true;
    updatedData.PersonalCareList.length > 0 &&
      updatedData.PersonalCareList.map((item, index) => {
        if (item.SelectedAnswer == 0 && !item.IsChecked) {
          isCheckout = false;
        }
      });

    updatedData.NutritionalServicesList.length > 0 &&
      updatedData.NutritionalServicesList.map((item, index) => {
        if (item.SelectedAnswer == 0 && !item.IsChecked) {
          isCheckout = false;
        }
      });

    updatedData.HouseholdDutiesList.length > 0 &&
      updatedData.HouseholdDutiesList.map((item, index) => {
        if (item.SelectedAnswer == 0 && !item.IsChecked) {
          isCheckout = false;
        }
      });

    updatedData.FunctionalAssistanceList.length > 0 &&
      updatedData.FunctionalAssistanceList.map((item, index) => {
        if (item.SelectedAnswer == 0 && !item.IsChecked) {
          isCheckout = false;
        }
      });
    return isCheckout;
  };

  saveComment = text => {
    var checkoutObj = text;
    this.setState({
      isLoading: checkoutObj.isLoading,
      latitude: checkoutObj.latitude,
      longitude: checkoutObj.longitude,
    });
    const {new_value, updatedData} = this.state; //CheckOutComment
    if (checkoutObj.comment) {
      updatedData.CheckOutComment = checkoutObj.comment;
      updatedData.CheckoutLat = checkoutObj.latitude;
      updatedData.CheckoutLng = checkoutObj.longitude;

      this.checkout_Comnt_Alert_Fun(new_value);
      this.setState({
        checout_Comment: text,
        isModalVisible: !this.state.isModalVisible,
      });
    } else {
      this.setState({isLoading: false});
      alert('Please Enter Reason!');
    }
  };

  render() {
    const {filterVisitDetails, scheduleData, index, isLoading, visitData} =
      this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          screenName="Visits"
          headerType="back"
          setDrawerVisible={visible => this.setBack()}
        />
        {this.state.isModalVisible ? (
          <CheckIN_Out_Reason
            modalVisible={this.state.isModalVisible}
            props={this.props}
            checkOut={this.state.checkOut}
            saveComment={text => this.saveComment(text)}
            setModalVisible={modalVisible => this.setIsModalVisible()}
            //setIsModalVisible
          />
        ) : null}

        <Loader
          loading={
            this.state.isLoading ? this.state.isLoading : this.state.loading
          }
        />
        <View style={{flex: 8.75, paddingHorizontal: '2%'}}>
          {!isLoading &&
          filterVisitDetails !== null &&
          filterVisitDetails !== '' &&
          filterVisitDetails.length > 0 ? (
            <View style={{flex: 1}}>
              <CareGiverBasicDetails
                data={list}
                listType="Caregiver"
                props={this.props}
              />
              <FlatList
                data={collapseHeaderContent}
                renderItem={({item}) => (
                  <FlatListItem
                    item={item}
                    props={this.props}
                    filterVisitDetails={filterVisitDetails}
                    visitData={visitData}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          ) : null}
        </View>
        {scheduleData.length > 0 &&
        scheduleData[index].Status === 'Checked_In' ? (
          <View
            style={
              Platform === 'iOS'
                ? [styles.buttonView, styles.alignStyle]
                : styles.buttonView
            }>
            <View style={[styles.button]}>
              <TouchableOpacity
                onPress={() => this.handleSaveAndCheckOut('checkout')}>
                <Text style={styles.textStyle}>CLOCK OUT</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => this.handleSaveAndCheckOut('save')}>
                <Text style={styles.textStyle}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  scheduleData: state.caregiverSchedule.scheduleData,
  visitData: state.caregiverSchedule.visitData,
  filterVisitDetails: state.caregiverSchedule.filterVisitDetails,
  editedformDetails: state.caregiverSchedule.editedformDetails,
  editedBasicDetails: state.caregiverSchedule.editedBasicDetails,
  checkOutData: state.caregiverSchedule.checkOutData,
  isLoading: state.loader.isLoading,
  index: state.indexValue.index,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  getCaregiverVisitDetails: data =>
    dispatch(actions.getCaregiverVisitDetails({data})),
  setFilteredVisitData: data => dispatch(actions.setFilteredVisitData({data})),
  caregiverCheckOutDetails: data =>
    dispatch(actions.caregiverCheckOutDetails({data})),
  setEditedFormData: data => dispatch(actions.setEditedFormData({data})),
  refreshScreen: data => dispatch(actions.refreshScreen({data})),
});

export default connect(mapStateToProps, mapDispatchToProps)(CaregiverVisit);

function FlatListItem({item, props, filterVisitDetails, visitData}) {
  return (
    <CollapsibleModule
      headerContent={[{title: item.title}]}
      listType={item.listType}
      props={props}
      data={
        filterVisitDetails !== null &&
        filterVisitDetails !== '' &&
        filterVisitDetails.length > 0
          ? filterVisitDetails[item.index]
          : null
      }
      screenName="Visits"
      commentData={visitData != null ? visitData.AdditionalComments : null}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.COLOR_CODE.APP_CONTAINER_COLOR,
    paddingBottom: '3%',
  },
  textStyle: {
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonView: {
    flex: 0.5,
    flexDirection: 'row',
  },
  alignStyle: {
    marginBottom: '5%',
  },
  button: {
    flex: 0.5,
    backgroundColor: '#3172b6',
    borderRadius: 4,
    marginHorizontal: '2%',
    elevation: 1,
    justifyContent: 'space-around',
  },
});
