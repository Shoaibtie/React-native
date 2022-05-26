
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

import FlatListModule from '../components/FlatListModule';
import CommentSection from '../screens/mySchedule/commentSection';
import ServiceTime from '../screens/availability/serviceTime';
import Ristrictions from '../screens/availability/ristrictions';
import Certification from '../screens/availability/certification';
import * as constants from '../appResources/constants';
import * as actions from '../redux/actions/authaction';
import Attributes from '../screens/availability/attribute';

class Accordian extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
      accordian: null,
      restClicked: '',
      attClicked: '',
      cerClicked: ''
    }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  renderContent = (item) => {
    const { data, listType, props, dropdownIndex, dropdownIndexAttribute, dropdownIndexCertificate } = this.props;
    const { restClicked, attClicked, cerClicked } = this.state;
    return (
      <View>
        {listType === 'commentSection' ?
          <CommentSection data={data} listType={listType} props={props} />
          : listType === constants.AVAILABILITY_SCREEN.SERVICE_TIMES ?
            <ServiceTime data={data} listType={listType} props={props} /> :
            listType === constants.AVAILABILITY_SCREEN.RESTRICTIONS ?
              <Ristrictions data={data} listType={listType} restClicked={restClicked} dropdownIndex={dropdownIndex} /> :
              listType === constants.AVAILABILITY_SCREEN.ATTRIBUTES ?
              <Attributes data={data} listType={listType} attClicked={attClicked} dropdownIndex={dropdownIndexAttribute} /> :
              listType === constants.AVAILABILITY_SCREEN.CERTIFICATIONS ?
                <Certification data={data} listType={listType} cerClicked={cerClicked} dropdownIndexCertificate={dropdownIndexCertificate} /> :
                <FlatListModule data={data} listType={listType} props={props} />
        }
      </View>
    );
  }

  render() {
    return (
      <View>
        <TouchableOpacity ref={a => (this.accordian = a)} onPress={() => this.toggleExpand()}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              paddingLeft: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: this.state.expanded ? '#3172b6' : '#3172b6',
              borderRadius: 5,
              borderWidth: 0.1,
              marginVertical: 15,
              paddingRight: 15,
            }}><View style={{ flex: this.props.screenName === 'Visits' ? 6 : 4 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: this.state.expanded ? '#FFFFFF' : '#FFFFFF',
                  fontSize: 15,
                }}>
                {' '}
                {this.props.title}
              </Text>
            </View>
            {this.props.screenName !== 'Visits' ?
            <View style={{ flex: 2 }}>
              {this.props.title !== 'SERVICE TIMES' ? <Icon name='add-circle-outline' size={32} color='#fff' onPress={() => this.addClick(this.props.title)} /> : null}
            </View>
            : null}
            <View style={{ flex: 4, alignItems: 'flex-end' }}>
              {this.state.expanded ? (
                <Icon name='keyboard-arrow-up' size={32} color='#fff' />
              ) : (
                <Icon name='keyboard-arrow-down' size={32} color='#fff' />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {
          this.state.expanded &&
          <View>
            {this.renderContent()}
          </View>
        }
      </View>
    )
  }

  toggleExpand = () => {
    const { scheduleData, index } = this.props;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // if(scheduleData.length > 0 && index.length > 0) 
    this.setState({ expanded: !this.state.expanded, clicked: 'toggle' })
    // this.setState({ expanded: scheduleData[index].Status === "Scheduled" ? null : !this.state.expanded, clicked: 'toggle' })
    
  }

  addClick = async (title) => {
    const { dropdownIndex, dropdownIndexAttribute, dropdownIndexCertificate, listType } = this.props;
    this.setState({ restClicked: '', attClicked: '', cerClicked: '' });
    switch(listType) {
      case constants.AVAILABILITY_SCREEN.RESTRICTIONS:
        if(dropdownIndex.item !== -1) {

          let item = -1;
          
          this.setState({ restClicked: title, attClicked: '', cerClicked: '' }, ()=> this.props.setDropdownIndex({item, listType}));
         
        } else {
          alert('Please select value');
        }
        break;
      case constants.AVAILABILITY_SCREEN.ATTRIBUTES:
        if(dropdownIndexAttribute.item !== -1) {
          let item = -1;
          
          this.setState({ attClicked: title, restClicked: '', cerClicked: ''}, ()=> this.props.setDropdownIndex({item, listType}));
        
        } else {
          alert('Please select value');
        }
        break;
      case constants.AVAILABILITY_SCREEN.CERTIFICATIONS:
        if(dropdownIndexCertificate.item !== -1) {

          let item = -1;
          
          this.setState({ cerClicked: title, restClicked: '', attClicked: '' }, ()=> this.props.setDropdownIndex({item, listType}));
        
        } else {
          alert('Please select value');
        }
        break;
      default:
        // code block
    }
   
    // if(dropdownIndex.item !== -1) {

    //   let item = -1;
    //   this.props.setDropdownIndex({item, listType});
    //   this.setState({ clicked: title });
    // } else {
    //   alert('Please select value');
    // }
    // this.setState({ clicked: title });
  }
}

const mapStateToProps = state => ({
  dropdownIndex: state.indexValue.dropdownIndex,
  dropdownIndexAttribute: state.indexValue.dropdownIndexAttribute,
  dropdownIndexCertificate: state.indexValue.dropdownIndexCertificate,
  scheduleData: state.caregiverSchedule.scheduleData,
  index: state.indexValue.index,
  isLoading: state.loader.isLoading,
  error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
  setDropdownIndex: (data) => dispatch(actions.setDropdownIndex({ data })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Accordian)

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  parentHr: {
    color: 'white',
    width: '100%'
  },
  child: {
    backgroundColor: 'gray',
    padding: 16,
  },
  cardDesign: {
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
    padding: '5%'
  },
});