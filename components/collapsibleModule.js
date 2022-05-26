import React from 'react';
import {View, StyleSheet} from 'react-native';

import Accordian from './accordianModule';

const CollapsibleModule = ({headerContent, listType, props, data, screenName, commentData}) => {
  function renderAccordians() {
    const items = [];
    for (let item of headerContent) {
        items.push(
            <Accordian 
                title = {item.title}
                data = {data}
                listType= {listType}
                props={props}
                screenName={screenName}
                commentData={commentData}
            />
        );
    }
    return items;
}

  return (
    <View>
      {renderAccordians()}
    </View>
  );
};

export default CollapsibleModule;

