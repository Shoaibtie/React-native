import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import * as actions from '../../redux/actions/authaction';
import * as constants from '../../appResources/constants';
import Header from '../../components/header';
import Loader from '../../utils/loader/loader';
import CollapsibleModule from '../../components/collapsibleModule';
import toastModule from '../../utils/toastModule/tosatAlert';

const collapseHeaderContent = [
  {
    id: 0,
    title: constants.AVAILABILITY_SCREEN.SERVICE_TIMES,
    key: 'Availability',
  },
  {
    id: 1,
    title: constants.AVAILABILITY_SCREEN.RESTRICTIONS,
    key: 'restrictionLstdetails',
  },
  {
    id: 2,
    title: constants.AVAILABILITY_SCREEN.ATTRIBUTES,
    key: 'attributeLstdetails',
  },
  {
    id: 3,
    title: constants.AVAILABILITY_SCREEN.CERTIFICATIONS,
    key: 'lstCertificationsAssociation',
  },
];

class Aavailability extends Component {
  state = {
    loading: false,
    setModalVisible: false,
    documentsData: '',
    serviceTimeData: [],
    updatedData: '',
    refreshing: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getAvailabilityDetails();
  }

  setDrawerVisible = () => {
    this.props.navigation.toggleDrawer();
  };

  onRefresh = () => {
    this.setState({refreshing: true});
    this.getAvailabilityDetails();
  };

  //Function to handle Availability details API
  getAvailabilityDetails = async () => {
    const {userData} = this.props;
    let availabilityData = constants.APIS_KEY.ID + userData.LoggedUserId;
    await this.props.getAvailabilityDetails(availabilityData);
    const {availability} = this.props;
    if (userData) {
      this.setState({refreshing: false});
    }
    this.setState({updatedData: availability});
  };

  // Function to save all edited details to API
  saveAvailabilityDetailsHandler = async () => {
    const {updatedData} = this.state;
    const {updateAvailabilityDetails} = this.props;
    console.l;
    const isSave = await this.checkDetialsAreFilled(updatedData);
    console.log('updatedData===>', updatedData);
    if (isSave === 'Completed') {
      this.props.saveAvailabilityDetails(updatedData);
    } else {
      alert(`Please fill required ${isSave} fields!`);
    }
  };

  checkDetialsAreFilled = async updatedData => {
    let isSave = 'Completed';

    updatedData.restrictionLstdetails.length > 0 &&
      updatedData.restrictionLstdetails.map((item, index) => {
        if (
          item.Attribute === '' ||
          item.Attribute == null ||
          item.Attribute === 'Please Select'
        ) {
          isSave = 'Restriction';
        }
      });
    updatedData.attributeLstdetails.length > 0 &&
      updatedData.attributeLstdetails.map((item, index) => {
        if (
          item.Attribute === '' ||
          item.Attribute == null ||
          item.Attribute === 'Please Select'
        ) {
          isSave = 'Attribute';
        }
      });
    updatedData.lstCertificationsAssociation.length > 0 &&
      updatedData.lstCertificationsAssociation.map((item, index) => {
        if (
          item.Certification === '' ||
          item.Certification == null ||
          item.LicenseExpiration === '' ||
          item.LicenseExpiration == null ||
          item.Certification === 'Please Select'
        ) {
          isSave = 'Certificate';
        }
      });
    return isSave;
  };

  render() {
    const {availability, isLoading} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          screenName={constants.SCREEN_NAME.AVAILABILITY_SCREEN}
          headerType={constants.ICON_NAME.MENU}
          setDrawerVisible={visible => this.setDrawerVisible()}
        />
        <Loader loading={this.state.refreshing ? false : isLoading} />
        <View style={styles.mainView}>
          <FlatList
            data={collapseHeaderContent}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.onRefresh();
                }}
              />
            }
            renderItem={({item}) => (
              <FlatListItem
                item={item}
                props={this.props}
                availability={availability}
              />
            )}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => this.saveAvailabilityDetailsHandler()}>
            <Text style={styles.buttonText}>{constants.BUTTON_NAME.SAVE}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  availability: state.availability.availabilityDetails,
  updateAvailabilityDetails: state.availability.updateAvailabilityDetails,
  isLoading: state.loader.isLoading,
  restrictionLstdetails: state.availability.restrictionLstdetails,
});

const mapDispatchToProps = dispatch => ({
  getAvailabilityDetails: data =>
    dispatch(actions.getAvailabilityDetails({data})),
  saveAvailabilityDetails: data =>
    dispatch(actions.saveAvailabilityDetails({data})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Aavailability);

function FlatListItem({item, props, availability}) {
  const arryName = item.key;
  return (
    <CollapsibleModule
      headerContent={[{title: item.title}]}
      listType={item.title}
      props={props}
      data={availability ? availability[arryName] : null}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainView: {
    flex: 8.75,
    marginHorizontal: '2%',
  },
  buttonView: {
    flex: 0.5,
  },
  saveButton: {
    backgroundColor: constants.COLOR_CODE.APP_COLOR,
    alignItems: 'center',
    padding: '2%',
    marginHorizontal: '2%',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
