import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, View, Pressable, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import * as actions from '../../../redux/actions/authaction';
import * as constants from '../../../appResources/constants';
import Header from '../../../components/header';
import DateHelper from '../../../utils/dateHelperModule/dateHelper';
import Ionicons from "react-native-vector-icons/Ionicons";

class PreviousVisits extends Component {
    state = {
        isEnabled: false,
        startDate: '',
        endDate: ''
    };

    constructor(props) {
        super(props);
    }

    setBack = () => {
        this.props.navigation.navigate('CaregiverVisit');
    };

    handleNavigation = () => {
        this.props.navigation.navigate('CaregiverVisit',{
            screen: 'previousVisits'
        });
    };

    componentDidMount() {
        this.getPreviousVisitsDetails()
    }

    getPreviousVisitsDetails = () => {
        const { userData, visitData } = this.props;
        const location = 'Test';

        let previousVisitsData = 'clientId=' + visitData.ClientId + '&caregiverId=' + userData.LoggedUserId + '&location=' + location;

        this.props.getClientPreviousVisits(previousVisitsData)
    }

    render() {
        const { previousVisits, isLoading } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 0.1 }}>
                    <Header
                        screenName='Visit History'
                        headerType="back"
                        setDrawerVisible={(visible) => this.setBack()}
                    />
                </View>
                <View style={{ flex: 0.9 }}>
                    {previousVisits.length > 0 ?
                        <FlatList
                            data={previousVisits}
                            renderItem={({ item, index }) => (
                                <CardView
                                    item={item}
                                    handleNavigation={()=> this.handleNavigation()}
                                />
                            )}
                        />
                        :
                        <View style={styles.noRecordsView}>
                            <View style={[styles.cardDesign]}>
                                <Text style={styles.errorStyle}>{constants.NO_RECORD_FOUND.RECORDS_STRING}</Text>
                            </View>
                        </View>
                    }
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.auth.userData,
    visitData: state.caregiverSchedule.visitData,
    previousVisits: state.caregiverSchedule.previousVisits,
    isLoading: state.loader.isLoading,
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    getClientPreviousVisits: (data) => dispatch(actions.getClientPreviousVisits({ data })),
    setIndexData: (index) => dispatch(actions.setIndexData({ index }))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviousVisits)

function CardView({ item, handleNavigation }) {
    const startDate = item.StartDate ? DateHelper.momentDateConverter(item.StartDate) : null;
    const startTime = item.StartDate ? item.StartDate.split('T') : null;
    const modifiedStartTime = startTime != null ? DateHelper.timeConvert(startTime[1]) : null;
    const endTime = item.EndDate ? item.EndDate.split('T') : null;
    const modifiedEndTime = endTime != null ? DateHelper.timeConvert(endTime[1]) : null;
    const dayName = item.StartDate ? DateHelper.momentGetDayName(item.StartDate) : '';
    return (
        <TouchableOpacity>
            <View style={{ flex: 1, backgroundColor: '#dbd5d5', padding: '2%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{startDate} {dayName}</Text>
            </View>
            <View style={{ flex: 2, backgroundColor: 'white', flexDirection: 'row', padding: '2%' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ marginVertical: '1%', textAlign: 'left', fontWeight: '500' }}>{modifiedStartTime}-{modifiedEndTime}</Text>
                    <Text style={{ marginVertical: '1%', textAlign: 'left', fontWeight: '500' }}>{item.Client}</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ marginVertical: '1%', textAlign: 'center', fontWeight: '500' }}>{item.Caregiver}</Text>
                </View>
                <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                    <Ionicons name="document-outline" size={23} color='black' onPress={handleNavigation}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFFFFF',
    },
    flexStyle: {
        flex: 1,
    },
    searchCardflexStyle: {
        flex: 0.1,
    },
    outerSearchFlexView: {
        backgroundColor: '#3172b6',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerSearchFlexView: {
        flexDirection: 'row',
        flex: 0.95,
        alignItems: 'center'
    },
    searchListFlexStyle: {
        flex: 0.83,
        backgroundColor: '#dbd5d5'
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
        fontWeight: '700'
    },
    datePickerIconFlexStyle: {
        height: 50,
        width: 50,
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    datePickerIconStyle: {
        height: 30,
        width: 30
    },
    buttonView: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
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
        padding: 20
    },
    imageStyle: {
        height: 28,
        width: 28
    },
    noRecordsView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    errorStyle: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
