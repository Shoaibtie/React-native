import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import * as actions from '../../redux/actions/authaction';
import * as constants from '../../appResources/constants';
import Header from '../../components/header';
import Loader from '../../utils/loader/loader';

import RenderHtmlPdf from './renderHtmlPdf';

class Pdfscreen extends Component {
  state = {
    loading: false,
    setModalVisible: false,
    schoolData: '',
    pdfData: '',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getCaregiverDocumentTemplate();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.onRefresh();
    });
    console.log('pdf file did mount ');
    //    console.log(this.props.signatureData,'=====>signatureData');
  }

  getCaregiverDocumentTemplate = () => {
    const {documentAndPaperList, index} = this.props;
    console.log(
      'index at document',
      index,
      'documentAndPaperList',
      documentAndPaperList,
    );

    let caregivePaperDocumentData =
      'userId=' +
      documentAndPaperList.UserId +
      '&docName=' +
      documentAndPaperList.lstPaperwork[index].Title +
      '&paperDocumentId=' +
      documentAndPaperList.lstPaperwork[index].Id +
      '&option=' +
      'employee';

    this.props.getCaregiverDocumentTemplate(caregivePaperDocumentData);
  };

  setBack = () => {
    this.onRefresh();
    setTimeout(() => {
      this.props.navigation.navigate('PaperWork');
    }, 500);
  };

  modalVisibilityHandler = () => {
    this.setState({setModalVisible: true});
  };

  onRefresh = () => {
    this.getCaregiverDocumentTemplate();
  };
  render() {
    const {isLoading, documentTemplate} = this.props;
    // console.log(this.props, '===>document=====>');
    console.log('this.props.refresh', documentTemplate);
    return (
      <SafeAreaView style={styles.container}>
        <Header
          screenName={constants.SCREEN_NAME.DOCUMENT_SCREEN}
          headerType="back"
          setDrawerVisible={visible => this.setBack()}
        />
        {/* <Loader loading={isLoading} /> */}
        <View style={{flex: 9.25}}>
          <ScrollView
            contentContainerStyle={{height: '100%'}}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={isLoading}
            //     onRefresh={this.onRefresh}
            //   />
            // }
          >
            {documentTemplate != null ? (
              <RenderHtmlPdf pdfData={documentTemplate} props={this.props} />
            ) : null}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  documentAndPaperList: state.document.documentAndPaperList,
  isLoading: state.loader.isLoading,
  index: state.indexValue.index,
  documentTemplate: state.document.documentTemplate,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  getCaregiverDocumentTemplate: data =>
    dispatch(actions.getCaregiverDocumentTemplate({data})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pdfscreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
  textDesign: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});
