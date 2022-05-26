import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Picker } from 'native-base';
// const dropdownIcon = require('../../assests/down-3.png')

const DropdownModule = ({ dropdownOptions, selectedOption }) => {
   
    const [selected, setSelected] = useState();

    const pickerOptionHandler = () => {

        if (dropdownOptions.length > 0) {
          return dropdownOptions.map((listItem) => {
            return (
                <Picker.Item label={listItem.label} value={listItem.value} />
            );
          });
        }
      };

    const setSelectedOption = (value) => {
      setSelected(value);
      selectedOption(value);
    }  
    return (
        <View style={styles.pickerWrapper}>
        {/* <Image
          source={dropdownIcon}
          type="MaterialIcons"
          style={styles.pickerIcon}
        /> */}
        <Picker
          mode="dropdown"
          style={styles.pickerContent}
          placeholderStyle={{ color: '#E2E2E2' }}
          placeholderIconColor='#E2E2E2'
          selectedValue={selected}
          onValueChange={(value)=> setSelectedOption(value)}
        >
          {pickerOptionHandler()}
        </Picker>
      </View>
    );
};

export default DropdownModule;

const styles = StyleSheet.create({
    
    pickerWrapper: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1
     },
     pickerIcon: {
        position: "absolute",
        bottom: 15,
        right: 10,
        fontSize: 20,
        width: 20,
        height: 20
     },
    
     pickerContent: {
        color: 'gray',
        backgroundColor: "transparent",
     },
})