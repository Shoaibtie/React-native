import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    StyleSheet,
    TextInput,
    Text,
    Pressable,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/authaction';

import Header from '../components/header';
import * as constants from '../appResources/constants';
import Loader from '../utils/loader/loader';
import toastModule from '../utils/toastModule/tosatAlert';

class CommentScreen extends Component {
    state = {
        checkInComment: this.props.visitData.CheckinComment,
        checkOutComment: this.props.visitData.CheckOutComment
    };

    constructor(props) {
        super(props);
    }


    setBack = () => {
        this.props.navigation.navigate(constants.SCREEN_NAME.CAREGIVER_VISIT_SCREEN);
    };

    handleMultipleInput = (name) => {
        return (text) => {
            this.setState({ [name]: text })
        }
    }

    onPressFunction = async () => {
        const { checkInComment, checkOutComment } = this.state;
        const { visitData, editedBasicDetails } = this.props;
        visitData.CheckinComment = checkInComment;
        visitData.CheckOutComment = checkOutComment;
        const data = {
            checkInComment: checkInComment,
            checkOutComment: checkOutComment
        }
        if(checkInComment || checkOutComment)
        await this.props.saveEditedBasicDetails(data);
        else
        toastModule.toastMessageBox('Please fill comment!');

        // if(Object.keys(editedBasicDetails).length !== 0)
        // toastModule.toastMessageBox('Updated successfully');

    }
    render() {
        const { visitData, isLoading } = this.props;
        const { checkInComment, checkOutComment } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    screenName={constants.CAREGIVER_SCHEDULE.COMMENT_SCREEN}
                    headerType={constants.ICON_NAME.ARROW_BACK}
                    setDrawerVisible={(visible) => this.setBack()}
                />
                 <Loader loading={isLoading} />
                <View style={styles.mainView}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={[styles.commentView]}>
                            <View style={[styles.innerView]}>
                                <Text style={styles.textDesign}>{constants.CAREGIVER_SCHEDULE.CHECK_IN_COMMENT}</Text>
                                <TextInput value={checkInComment} style={styles.textInputView} onChangeText={this.handleMultipleInput(constants.CAREGIVER_SCHEDULE.CHECK_IN_INPUT)} />
                            </View>
                            <View style={[styles.innerView]}>
                                <Text style={styles.textDesign}>{constants.CAREGIVER_SCHEDULE.STAFF_CHECK_IN_COMMENT}</Text>
                                <TextInput value={visitData.StaffCheckInComment} editable={false} style={styles.textInputView} />
                            </View>
                        </View>
                        <View style={[styles.commentView]}>
                            <View style={[styles.innerView]}>
                                <Text style={styles.textDesign}>{constants.CAREGIVER_SCHEDULE.CHECK_OUT_COMMENT}</Text>
                                <TextInput value={checkOutComment} style={styles.textInputView} onChangeText={this.handleMultipleInput(constants.CAREGIVER_SCHEDULE.CHECK_OUT_INPUT)} />
                            </View>
                            <View style={[styles.innerView]}>
                                <Text style={styles.textDesign}>{constants.CAREGIVER_SCHEDULE.STAFF_CHECK_OUT_COMMENT}</Text>
                                <TextInput value={visitData.StaffCheckOutComment} editable={false} style={styles.textInputView} />
                            </View>
                        </View>
                        <View style={[styles.buttonView]}>
                            <Pressable style={styles.button} onPress={this.onPressFunction}>
                                <Text style={styles.buttonText}>{constants.BUTTON_NAME.SAVE}</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    visitData: state.caregiverSchedule.visitData,
    editedBasicDetails: state.caregiverSchedule.editedBasicDetails,
    isLoading: state.loader.isLoading,
})

const mapDispatchToProps = dispatch => ({
    saveEditedBasicDetails: (data) => dispatch(actions.saveEditedBasicDetails({ data }))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
        flex: 9.25
    },
    scrollView: {
        height: '100%'
    },
    cardDesign: {
        borderRadius: 15,
        borderWidth: 0.1,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        elevation: 5,
    },
    commentView: {
        flex: 0.45,
    },
    buttonView: {
        flex: 0.1,
        justifyContent: 'space-around'
    },
    innerView: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textDesign: {
        fontWeight: '600',
    },
    textInputView: {
        width: '70%',
        borderColor: '#000',
        borderBottomWidth: 1,
        color: '#000',
        textAlign: 'center'
    },
    button: {
        flex: 0.5,
        marginHorizontal: '40%',
        backgroundColor: 'green',
        justifyContent: 'space-around',
        borderRadius: 2
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '500'
    },
});
