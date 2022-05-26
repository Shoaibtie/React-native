import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

const NoRecordsUI = ({ item, listType }) => {
  return (
    <View style={styles.flatlistViewDesign}>
      <View style={styles.cardDesign}>
        <View>
          <View style={[styles.rowDirectionDesign, { marginBottom: 15 }]}>
            <Text style={styles.textDesign}>{item.noRecord}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NoRecordsUI;

const styles = StyleSheet.create({
  flatlistViewDesign: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  cardDesign: {
    flex: 1,
    borderRadius: 2,
    borderWidth: 0.1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    padding: 15,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 1,
  },
  rowDirectionDesign: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 5,
  },
  columnDirectionDesign: {
    flexDirection: 'column',
  },
  textDesign: {

    fontWeight: 'bold',
    color: 'red'
  },
});
