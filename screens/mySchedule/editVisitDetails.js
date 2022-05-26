import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import toastModule from '../../utils/toastModule/tosatAlert';
import * as actions from '../../redux/actions/authaction';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Header from '../../components/header';

class EditVisitDetails extends Component {
  state = {
    item: [],
    QuestionComments: '',
    serviceData: '',
    buttonData: '',
    refused: false,
    notDoneNA: false,
    completed: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let serviceData = this.props.route.params
      ? this.props.route.params.item
      : null;
    let buttonData = this.props.route.params
      ? this.props.route.params.buttonData
      : null;
    const {visitData, editedformDetails} = this.props;
    let list =
      editedformDetails.length > 0
        ? editedformDetails
        : visitData.PersonalCareList;
    this.props.setEditedFormData(list);
    this.setData(serviceData, buttonData);
  }

  setData = (serviceData, buttonData) => {
    const data = this.props.route.params.item;
    let item = [];
    item.push(data);
    this.setState({
      item: item,
      QuestionComments: data.QuestionComments,
      serviceData: serviceData,
      buttonData: buttonData,
    });
  };

  setBack = () => {
    this.props.navigation.navigate('CaregiverVisit');
  };

  saveEditedData = async () => {
    const {item, refused, notDoneNA, completed} = this.state;
    const {editedformDetails} = this.props;
    item[0].PossibleAnswers.map((value, index) => {
      switch (value.Text) {
        case '1':
          return (value.IsSelected = completed);
          break;
        case '2':
          return (value.IsSelected = refused);
          break;
        case '3':
          return (value.IsSelected = notDoneNA);
        default:
      }
    });
    var res = editedformDetails.map(
      obj => item.find(o => o.Id === obj.Id) || obj,
    );
    await this.props.setEditedFormData(res);
    if (editedformDetails) {
      toastModule.toastMessageBox('Data saved successfully');
      setTimeout(() => {
        this.props.navigation.navigate('CaregiverVisit');
      }, 500);
    }
  };

  handleOnChange = text => {
    const {item} = this.state;
    item[0].QuestionComments = text;
    this.setState({QuestionComments: text, item: item});
  };

  handleMultiCheckbox = name => {
    const {refused, notDoneNA, completed, item} = this.state;
    let selectedValue =
      name === 'refused'
        ? !refused
        : name === 'notDoneNA'
        ? !notDoneNA
        : !completed;
    let data = ['refused', 'notDoneNA', 'completed'];
    data.map((value, index) => {
      if (value === name) {
        this.setState({[name]: selectedValue});
        item[0].SelectedAnswer =
          name === 'refused'
            ? 2
            : name === 'notDoneNA'
            ? 3
            : name === 'completed'
            ? 1
            : 0;
      } else {
        this.setState({[value]: false});
      }
    });
  };

  render() {
    const {
      item,
      QuestionComments,
      serviceData,
      buttonData,
      completed,
      refused,
      notDoneNA,
    } = this.state;
    let refusedValue = refused
      ? true
      : item.length > 0 && item[0].SelectedAnswer == 2
      ? true
      : false;
    let notDoneNAValue = notDoneNA
      ? true
      : item.length > 0 && item[0].SelectedAnswer == 3
      ? true
      : false;
    let completedValue = completed
      ? true
      : item.length > 0 && item[0].SelectedAnswer == 1
      ? true
      : false;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <Header
            screenName="Edit Visit"
            headerType="back"
            setDrawerVisible={visible => this.setBack()}
          />
        </View>
        <ScrollView contentContainerStyle={styles.screenView}>
          <View style={{flex: 8, padding: '2%'}}>
            <View style={{flex: 6}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 3}}>
                  <Text>Task</Text>
                </View>
                <View style={{flex: 7}}>
                  <Text>{serviceData ? serviceData.Questions : null}</Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 3}}>
                  <Text>Sub Cat</Text>
                </View>
                <View style={{flex: 7}}>
                  <Text>
                    {serviceData ? serviceData.SelectedAnswersSet : null}
                  </Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 3}}>
                  <Text>Frequency</Text>
                </View>
                <View style={{flex: 7}}>
                  <Text>{serviceData ? serviceData.FrequencyKey : null}</Text>
                </View>
              </View>
              <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                  <Text>Note</Text>
                </View>
                <View style={{flex: 1}}></View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 3}}>
                  <Text>Refused</Text>
                  <MaterialIcons
                    name="cancel"
                    size={23}
                    onPress={() => this.handleMultiCheckbox('refused')}
                    color={refusedValue ? 'red' : 'gray'}
                  />
                </View>
                <View style={{flex: 3}}>
                  <Text>Not Done/NA</Text>
                  <MaterialIcons
                    name="block"
                    size={23}
                    onPress={() => this.handleMultiCheckbox('notDoneNA')}
                    color={notDoneNAValue ? 'red' : 'gray'}
                  />
                </View>
                <View style={{flex: 3}}>
                  <Text>Completed</Text>
                  <MaterialIcons
                    name="check-circle"
                    size={23}
                    onPress={() => this.handleMultiCheckbox('completed')}
                    color={completedValue ? 'green' : 'gray'}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 4}}>
              <View style={{flex: 1}}>
                <Text>Comment</Text>
              </View>
              <View style={{flex: 1}}>
                <TextInput
                  style={styles.textInputStyle}
                  value={QuestionComments}
                  multiline={true}
                  onChangeText={this.handleOnChange}
                />
              </View>
            </View>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.saveEditedData}>
              <Text style={styles.textDesign}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  visitData: state.caregiverSchedule.visitData,
  editedformDetails: state.caregiverSchedule.editedformDetails,
});

const mapDispatchToProps = dispatch => ({
  setEditedFormData: data => dispatch(actions.setEditedFormData({data})),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditVisitDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerView: {
    flex: 0.1,
    backgroundColor: 'transparent',
  },
  screenView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  textDesign: {
    fontWeight: '600',
    padding: '3%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  imageStyle: {
    width: 60,
    height: 60,
  },
  flexStyle: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  drawerFlexStyle: {
    flex: 0.12,
    backgroundColor: '#3172b6',
  },
  button: {
    flex: 0.6,
    backgroundColor: '#3172b6',
    borderRadius: 4,
    marginHorizontal: '2%',
    elevation: 1,
    justifyContent: 'space-around',
    marginBottom: '5%',
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: '#000',
    // marginHorizontal: '2%',
    width: '95%',
    height: 70,
    color: '#000',
  },
});
