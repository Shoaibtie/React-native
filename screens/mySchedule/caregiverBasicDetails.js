import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';

import * as constants from '../../appResources/constants';
import {Divider} from 'react-native-elements';
import DateHelper from '../../utils/dateHelperModule/dateHelper';

const blackNoteIcon = require('../../assests/comment-black-icon.png');

class CareGiverBasicDetails extends Component {
  state = {
    formData: '',
    caregiverDataList: '',
    loading: false,
  };

  constructor(props) {
    super(props);
  }

  handleNavigation = () => {
    this.props.props.navigation.navigate(
      constants.SCREEN_STACK_NAME.COMMENT_SCREEN,
    );
  };

  render() {
    const {visitData, scheduleData, index} = this.props;
    return (
      <View>
        <View
          style={{
            backgroundColor: constants.COLOR_CODE.COMMON_BACKGROUNDCOLOR,
          }}>
          <View style={styles.rowView}>
            <View style={styles.basicDetailView}>
              <Text style={[styles.textStyle, styles.fontStyle]}>
                {visitData ? visitData.ClientName : null}
              </Text>
              <Text style={styles.textStyle}>
                {visitData
                  ? DateHelper.correctFormatOfTime(visitData.Date)
                  : null}
              </Text>
            </View>
          </View>
          <Divider style={styles.dividerStyle} />
          <View style={styles.rowView}>
            <View style={styles.scheduledDataView}>
              <Text style={[styles.textValueStyle, styles.rightAlignment]}>
                {constants.CAREGIVER_SCHEDULE.SCHEDULED_IN}
              </Text>
              <Text style={[styles.textValueStyle, styles.rightAlignment]}>
                {constants.CAREGIVER_SCHEDULE.SCHEDULED_OUT}
              </Text>
              <Text style={[styles.textValueStyle, styles.rightAlignment]}>
                {constants.CAREGIVER_SCHEDULE.ACTUAL_IN}
              </Text>
              <Text style={[styles.textValueStyle, styles.rightAlignment]}>
                {constants.CAREGIVER_SCHEDULE.ACTUAL_OUT}
              </Text>
            </View>
            <View style={styles.blankView}></View>
            <View style={styles.scheduledValueView}>
              <Text style={[styles.textValueStyle]}>
                {visitData && visitData.ScheduledTimeIn != null
                  ? DateHelper.removeTextFromDate(visitData.ScheduledTimeIn)
                  : null}
              </Text>
              <Text style={styles.textValueStyle}>
                {visitData && visitData.ScheduledTimeOut != null
                  ? DateHelper.removeTextFromDate(visitData.ScheduledTimeOut)
                  : null}
              </Text>
              <Text style={[styles.textValueStyle, {marginTop: 0}]}>
                {visitData && visitData.TimeIn != null
                  ? DateHelper.removeTextFromDate(visitData.TimeIn)
                  : null}
              </Text>
              <Text style={[styles.textValueStyle, {marginTop: 0}]}>
                {visitData && visitData.TimeOut != null
                  ? DateHelper.removeTextFromDate(visitData.TimeOut)
                  : null}
              </Text>
            </View>
            <View style={styles.mainIconView}>
              <TouchableOpacity
                style={styles.iconView}
                onPress={() =>
                  scheduleData[index].Status !== 'Scheduled'
                    ? this.handleNavigation()
                    : null
                }>
                <Image style={styles.imageStyle} source={blackNoteIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Divider style={styles.dividerStyle} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  visitData: state.caregiverSchedule.visitData,
  scheduleData: state.caregiverSchedule.scheduleData,
  index: state.indexValue.index,
  checkInStatus: state.caregiverSchedule.checkInStatus,
});

export default connect(mapStateToProps, null)(CareGiverBasicDetails);
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
  },
  textValueStyle: {
    fontSize: 16,
  },
  rowView: {
    flexDirection: 'row',
    // marginLeft: -20,
  },
  basicDetailView: {
    flexDirection: 'column',
    flex: 3,
    alignItems: 'center',
  },
  dividerStyle: {
    backgroundColor: 'black',
    borderWidth: 0.5,
    marginBottom: 10,
    marginTop: 8,
  },
  scheduledDataView: {
    flexDirection: 'column',
    flex: 4.6,
    justifyContent: 'space-around',
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
  mainIconView: {
    flexDirection: 'column',
    flex: 1.2,
    justifyContent: 'space-around',
  },
  iconView: {
    justifyContent: 'space-around',
  },
  rightAlignment: {
    textAlign: 'right',
  },
  scheduledValueView: {
    flexDirection: 'column',
    flex: 5.8,
    // alignItems: ,
    justifyContent: 'space-around',
  },
  fontStyle: {
    fontWeight: 'bold',
  },
  blankView: {
    flex: 0.3,
  },
});
