import React, { Component } from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import CaregiverVisitForm from '../screens/mySchedule/caregiverVisitForm';
import NoRecordsUi from '../components/noRecordsUI';

class FlatListModule extends Component {
  state = {
    isEnabled: false,
    schoolData: '',
    NoRecords: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { data, listType } = this.props;
    return (
      <View>
        <FlatList
          data={data}
          renderItem={({ item, index }) =>
          item.noRecord ?
          <NoRecordsUi item={item} listType={listType} /> : <CaregiverVisitForm item={item} listType={listType} props={this.props.props} data={data} />
          }
          keyExtractor={(item, index) => item.noRecord != undefined ? item.id : listType === "additionalItemView" ? item.Id : item.map((i) => { i.Id })}
        />
      </View>
    );
  }
}

export default FlatListModule;

