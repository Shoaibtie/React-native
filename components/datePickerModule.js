import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-modern-datepicker';
import * as constants from '../appResources/constants';
import DateHelper from '../utils/dateHelperModule/dateHelper';

const BasicUsage = ({ updatedDate, pickerType, iconType, screen, existingDate }) => {
    const [currentDate, setCurrentDate] = useState();
    const [selectedDate, setSelectedDate] = useState('');
    const [show, setShow] = useState(false);


    const showDatepicker = () => {

        setSelectedDate('')
        setShow(true);
    };

    const onSelectedChange = (date) => {
        const formattedDate = DateHelper.momentDateConverter(date)
        setSelectedDate(formattedDate);
        updatedDate(date);

    }

    React.useEffect(() => {
        const currentDate = new Date();
        const formattedDate = screen === constants.AVAILABILITY_SCREEN.CERTIFICATIONS ? existingDate ? DateHelper.momentDateConverter(existingDate) : '' : DateHelper.momentDateConverter(currentDate);
        setCurrentDate(formattedDate)
    }, [])

    const handleChange = (date) => {
        setCurrentDate('')
        const formattedDate = date;
        setSelectedDate(formattedDate)
        setShow(false);
        updatedDate(formattedDate);
    }

    return (
        <View style={styles.datePickerFlexStyle}>
                <TextInput style={Platform === 'android' ? styles.datePickerStyle : [styles.datePickerStyle, styles.datePickeriOSStyle]} value={selectedDate ? selectedDate : currentDate} onChangeText={(date) => handleChange(date)} />
                <TouchableOpacity style={Platform === 'android' ? styles.datePickerIconFlexStyle : [styles.datePickerIconFlexStyle, styles.datePickerIconFlexiOSStyle]} onPress={showDatepicker}>
                    <Image source={iconType} />
                </TouchableOpacity>
                {show && selectedDate == '' && (
                    <Modal isVisible={show}>
                        <View style={styles.modalContainer}>
                            <DatePicker
                                options={{
                                    borderColor: 'rgba(122, 146, 165, 0.1)',
                                }}
                                mode="calendar"
                                onSelectedChange={date => onSelectedChange(date)}
                                style={{ borderRadius: 10 }}
                            />
                        </View>
                    </Modal>
                )}
        </View>
    );
};

export default BasicUsage;

const styles = StyleSheet.create({
    button: {
        marginHorizontal: '20%',
        marginVertical: '2%'
    },
    modalContainer: {
        backgroundColor: '#ddd',
        borderRadius: 10,
        borderWidth: 0.1,
        overflow: 'hidden',
        minHeight: 200
    },
    datePickerStyle: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#fff',
        color: '#000'
    },
    datePickerIconFlexStyle: {
        height: 50,
        width: 50,
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    datePickerFlexStyle: {
        flex: 4,
        flexDirection: 'row-reverse',
    },
    input: {
        color: 'black',
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 0.8,
        padding: 5,
    },
    datePickeriOSStyle: {	
        height: '100%',	
        padding: '7%'	
      },
    datePickerIconFlexiOSStyle: {	
        paddingBottom: '10%'	
    },
})