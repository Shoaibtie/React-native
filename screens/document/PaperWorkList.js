import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native';
import * as actions from '../../redux/actions/authaction';
import * as constants from '../../appResources/constants';
import Header from '../../components/header';
import Loader from '../../utils/loader/loader';
import DateHelper from '../../utils/dateHelperModule/dateHelper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class documentandPaperList extends Component {
  state = {
    loading: false,
    setModalVisible: false,
    documentsData: '',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getCaregiverDocumentPaperList();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.onRefresh();
    });
  }

  setDrawerVisible = () => {
    this.props.navigation.toggleDrawer();
  };

  getCaregiverDocumentPaperList = () => {
    const {userData} = this.props;
    let caregivePaperDocumentData = 'Id=' + userData.LoggedUserId;

    this.props.getCaregiverDocumentAndPaperList(caregivePaperDocumentData);
  };

  handlePdfScreen = async index => {
    await this.props.setIndexData(index);
    console.log('idex on paper', index);
    console.log('documentAndPaperList', this.props.documentAndPaperList);
    this.props.navigation.navigate('PdfScreen');
  };
  onRefresh = () => {
    this.getCaregiverDocumentPaperList();
  };

  render() {
    const {documentAndPaperList, isLoading} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          screenName={constants.SCREEN_NAME.DOCUMENT_SCREEN}
          headerType="menu"
          setDrawerVisible={visible => this.setDrawerVisible()}
        />
        <View style={{flex: 9.25, marginBottom: '4%'}}>
          <View style={styles.titleView}>
            <Text style={styles.headerTextStyle}>Paper Work</Text>
          </View>
          {documentAndPaperList &&
          documentAndPaperList.lstPaperwork.length > 0 ? (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={this.onRefresh}
                />
              }
              data={documentAndPaperList.lstPaperwork}
              renderItem={({item, index}) => (
                <RenderUI
                  item={item}
                  handleScreeningScreen={() => this.handlePdfScreen(index)}
                />
              )}
              keyExtractor={item => item.Id}
            />
          ) : (
            <View style={styles.noRecordsView}>
              <View style={[styles.cardView]}>
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

function RenderUI({item, handleScreeningScreen}) {
  return (
    <View style={styles.cardView}>
      <View style={styles.rowView}>
        <View style={styles.columnView}>
          <Text style={styles.textStyle}>{item.Title}</Text>
          <Text style={styles.textDateStyle}>
            {DateHelper.momentDateConverter(item.Date)}
          </Text>
        </View>
        <View style={[styles.iconColumnView, styles.iconViewStyle]}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color={item.IsAccepted ? 'green' : 'black'}
            onPress={handleScreeningScreen}
          />
        </View>
        <View style={styles.spaceColumnView}></View>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  documentAndPaperList: state.document.documentAndPaperList,
  isLoading: state.loader.isLoading,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  getCaregiverDocumentAndPaperList: data =>
    dispatch(actions.getCaregiverDocumentAndPaperList({data})),
  setIndexData: index => dispatch(actions.setIndexData({index})),
  downloadCaregiverDocument: data =>
    dispatch(actions.downloadCaregiverDocument({data})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(documentandPaperList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleView: {
    borderRadius: 2,
    backgroundColor: constants.COLOR_CODE.APP_COLOR,
    marginVertical: '3%',
    padding: '2%',
    marginHorizontal: '1%',
  },
  cardView: {
    borderRadius: 2,
    borderWidth: 0.1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    marginHorizontal: '1.5%',
    marginVertical: '1%',
    padding: '1.5%',
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
  },
  columnView: {
    flex: 0.5,
  },
  iconColumnView: {
    flex: 0.45,
  },
  spaceColumnView: {
    flex: 0.05,
  },
  headerTextStyle: {
    fontWeight: '700',
    color: '#fff',
  },
  textStyle: {
    fontWeight: '500',
  },
  textDateStyle: {
    fontWeight: '400',
    paddingTop: '1%',
  },
  iconViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
});
