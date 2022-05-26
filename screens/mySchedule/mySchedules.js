import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import * as actions from '../../redux/actions/authaction';
import * as constants from '../../appResources/constants';
import Header from '../../components/header';
import DatePicker from '../../components/datePickerModule';
import dateHelper from '../../utils/dateHelperModule/dateHelper';
import Loader from '../../utils/loader/loader';
import Tooltip from 'react-native-walkthrough-tooltip';
const calendarIcon = require('../../assests/calendarIcon.png');
const searchIcon = require('../../assests/search.png');

class MySchedules extends Component {
  state = {
    startDate: '',
    endDate: '',
    toolTipVisible: false,
  };

  constructor(props) {
    super(props);
  }

  setDrawerVisible = () => {
    this.props.navigation.toggleDrawer();
  };

  componentDidMount() {
    this.getRewards();
    this.getscheduleDetails();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.props.refresh) {
        this.props.refreshScreen(false);
        this.getscheduleDetails();
      }
    });
  }

  getRewards = () => {
    // const data = {
    //   account: '275',
    //   key: '21C16AB9E91866121E91aasdas2769039731218192A14',
    //   secret: '63FEF4743A60718451AE13238712737192982JALSKA8A36',
    //   action: 'pull_member_point_balance',
    //   // employee_id: '4731ea11-2cc5-4738-a413-ce553c3c8ce8',
    //   // filters: {budget_name: 'Amarillo - Staff Budget 2021'},
    // };
    // this.props.getCaregiverRewardsBalance(data);
    this.props.getCaregiverBalanceReward(
      this.props?.userData?.LoggedUserId ? this.props.userData.LoggedUserId : 0,
    );
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleOnChangeValue = name => {
    return text => {
      this.setState({[name]: text});
    };
  };

  getscheduleDetails = () => {
    const {startDate, endDate} = this.state;
    const {userData} = this.props;

    const currentDate = new Date();

    const formattededStartDate = startDate
      ? dateHelper.momentDateConverter(startDate)
      : dateHelper.momentDateConverter(currentDate); // "05/06/2020";
    const formattededEndDate = endDate
      ? dateHelper.momentDateConverter(endDate)
      : dateHelper.momentDateConverter(currentDate);
    console.log('userData', userData);
    const location = 'Test';

    let caregiveScheduleData =
      'location=' +
      location +
      '&startdate=' +
      formattededStartDate +
      '&enddate=' +
      formattededEndDate +
      '&caregiverId=' +
      userData.LoggedUserId;

    this.props.getCaregiverScheduleDetails(caregiveScheduleData);
  };

  handleNavigation = async (item, index) => {
    await this.props.setIndexData(index);
    this.props.navigation.navigate('CaregiverVisit', {client_time: item});
  };
  rewardPointRedem = () => {
    Linking.openURL('https://caringsenior.rewardian-staging.com/login');
  };
  render() {
    let rewdPoint = this.props.RewardienBalance.RewardBalance;
    const {scheduleData, isLoading} = this.props;
    console.log('Reward point value', this.props.userData);
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.searchCardflexStyle]}>
          <View style={[styles.flexStyle, styles.outerSearchFlexView]}>
            <View
              style={{flex: 0.95, flexDirection: 'row', alignItems: 'center'}}>
              <Header
                screenName={constants.CAREGIVER_SCHEDULE.SCHEDULE_TITLE}
                headerType="menu"
                setDrawerVisible={visible => this.setDrawerVisible()}
              />
            </View>
            <View
              style={{
                flex: 0.15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Tooltip
                isVisible={this.state.toolTipVisible}
                content={
                  <View>
                    <TouchableOpacity onPress={() => this.rewardPointRedem()}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          backgroundColor: '#3172b6',
                          alignItems: 'center',
                          width: '100%',
                          height: 40,
                          // justifyContent: 'space-evenly',
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{height: 25, width: 20, tintColor: '#fff'}}
                          source={require('../../assests/reward1.png')}
                        />
                        <Text
                          style={{
                            paddingLeft: 10,
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: '500',
                          }}>
                          Redeem Rewards
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <Text style={styles.rewardText}>
                        {constants.REWARD_POINT.reward_balance} :{' '}
                      </Text>
                      <Text style={styles.rewardText}>{`${
                        rewdPoint ? rewdPoint : 0
                      }`}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text style={styles.rewardText}>
                        {constants.REWARD_POINT.redeem_point} :{' '}
                      </Text>
                      <Text style={styles.rewardText}>0</Text>
                    </View>
                  </View>
                }
                placement="bottom"
                onClose={() => this.setState({toolTipVisible: false})}>
                <TouchableOpacity
                  onPress={() => this.setState({toolTipVisible: true})}>
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      tintColor: '#fff',
                      resizeMode: 'cover',
                    }}
                    source={require('../../assests/reward.png')}
                  />
                </TouchableOpacity>
              </Tooltip>
            </View>
          </View>
          <View style={[styles.flexStyle, styles.outerSearchFlexView]}>
            <View style={styles.innerSearchFlexView}>
              <DatePicker
                updatedDate={date => this.setState({startDate: date})}
                iconType={calendarIcon}
              />
              <View style={styles.flexStyle}>
                <Text style={styles.textStyle}>
                  {constants.CAREGIVER_SCHEDULE.TO}
                </Text>
              </View>

              <DatePicker
                updatedDate={date => this.setState({endDate: date})}
                iconType={calendarIcon}
              />

              <View style={[styles.flexStyle, styles.buttonView]}>
                <TouchableOpacity onPress={this.getscheduleDetails}>
                  <Image source={searchIcon} style={styles.imageStyle} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Loader loading={isLoading} />

        {/* <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.rewardText}>
              {constants.REWARD_POINT.reward_balance} :{' '}
            </Text>
            <Text>0</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text>{constants.REWARD_POINT.redeem_point} : </Text>
            <Text>0</Text>
          </View> */}

        <View style={[styles.searchListFlexStyle]}>
          {scheduleData.length > 0 ? (
            <FlatList
              data={scheduleData}
              renderItem={({item, index}) => (
                <CardView
                  item={item}
                  handleNavigation={() => this.handleNavigation(item, index)}
                />
              )}
            />
          ) : (
            <View style={styles.noRecordsView}>
              <View style={[styles.cardDesign]}>
                <Text style={styles.errorStyle}>
                  {constants.NO_RECORD_FOUND.RECORDS_STRING}
                </Text>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  scheduleData: state.caregiverSchedule.scheduleData,
  checkInStatus: state.caregiverSchedule.checkInStatus,
  isLoading: state.loader.isLoading,
  refresh: state.indexValue.refresh,
  error: state.auth.error,
  RewardienBalance: state?.message?.messageToAgency,
});

const mapDispatchToProps = dispatch => ({
  getCaregiverScheduleDetails: data =>
    dispatch(actions.getCaregiverScheduleDetails({data})),
  setIndexData: index => dispatch(actions.setIndexData({index})),
  refreshScreen: data => dispatch(actions.refreshScreen({data})),
  getCaregiverRewardsBalance: data =>
    dispatch(actions.getCaregiverRewardsBalance({data})),
  getCaregiverBalanceReward: data =>
    dispatch(actions.getCaregiverBalanceReward({data})),
});

export default connect(mapStateToProps, mapDispatchToProps)(MySchedules);

function CardView({item, handleNavigation}) {
  let color =
    item.Status === 'Completed'
      ? 'green'
      : item.Status === 'Checked_In'
      ? '#FCFC21'
      : item.Status === 'Billed'
      ? 'gray'
      : item.Status === 'Open'
      ? 'red'
      : '#146ECE';
  let navigationScreen = handleNavigation;
  // console.log('clinet time', item.ScheduleTimeDetail);
  return (
    <TouchableOpacity
      style={{backgroundColor: 'transparent'}}
      onPress={navigationScreen}>
      <View style={{flex: 1, backgroundColor: '#dbd5d5', padding: '2%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>
          {item.CurrentDate}
        </Text>
      </View>
      <View style={{flex: 2, backgroundColor: 'white', flexDirection: 'row'}}>
        <View style={{flex: 0.02, backgroundColor: color}}></View>
        <View style={{flex: 0.98, flexDirection: 'row', padding: '2%'}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                marginVertical: '1%',
                textAlign: 'left',
                fontWeight: '500',
              }}>
              {item.ScheduleTimeDetail}
            </Text>
            <Text
              style={{
                marginVertical: '1%',
                textAlign: 'left',
                fontWeight: '500',
              }}>
              {item.Client}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                marginVertical: '1%',
                textAlign: 'left',
                fontWeight: '500',
              }}>
              {' '}
              {item.Caregiver}
            </Text>
            <Text
              style={{
                marginVertical: '1%',
                textAlign: 'left',
                fontWeight: '500',
              }}>
              {' '}
              {item.Status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flexStyle: {
    flex: 1,
  },
  searchCardflexStyle: {
    flex: 0.17,
  },
  outerSearchFlexView: {
    backgroundColor: '#3172b6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerSearchFlexView: {
    flexDirection: 'row',
    flex: 0.95,
    alignItems: 'center',
  },
  searchListFlexStyle: {
    flex: 0.83,
    backgroundColor: '#dbd5d5',
  },
  datePickerFlexStyle: {
    flex: 4,
  },
  searchIconFlexStyle: {
    flex: 1,
  },
  datePickerStyle: {
    width: '100%',
    borderRadius: 5,
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  datePickerIconFlexStyle: {
    height: 50,
    width: 50,
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  datePickerIconStyle: {
    height: 30,
    width: 30,
  },
  buttonView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cardDesign: {
    flex: 1,
    borderRadius: 2,
    borderWidth: 0.1,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 5,
    marginHorizontal: '3%',
    marginVertical: '5%',
    backgroundColor: '#fff',
    padding: 20,
  },
  imageStyle: {
    height: 28,
    width: 28,
  },
  noRecordsView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorStyle: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rewardsPoint: {
    width: '100%',
    height: 80,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: '700',
    padding: 3,
  },
});
