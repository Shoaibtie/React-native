import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from '../../components/datePickerModule';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as constants from '../../appResources/constants';
import * as actions from '../../redux/actions/authaction';

const calendarIcon = require('../../assests/calendarIcon.png');

function Certification({ data, listType, clicked }) {

    const [note, setNote] = React.useState();
    const [certificateNumber, setcertificateNumber] = React.useState();
    const [expirationDate, setExpirationDate] = React.useState();
    const [list, setList] = React.useState(data);
    const [flagForExpiration, setFlagForExpiration] = React.useState(true);
    const [flagForCertification, setFlagForCertification] = React.useState(true);
    const availability = useSelector(state => state.availability.availabilityDetails);

    // React.useEffect(() => {
    //     if (clicked === listType && dropdownIndexCertificate.item === -1) {
    //         const newRow = {
    //             Certification: 'Please Select',
    //             Id: null,
    //             LicenseCertificartionNo: null,
    //             LicenseExpiration: null,
    //             Notes: null,
    //             ProspectId: null,
    //         }
    //         data.push(newRow);
    //     }
    // })

    const setDropdownValue = (text, value, index) => {
        data[index].Certification = value;
        setFlagForCertification(true);
    }

    const handleCertificateNumber = (number, index) => {
        data[index].LicenseCertificartionNo = number;
        setcertificateNumber(number);
    }

    const handleExpirationDate = (date, index) => {
        data[index].LicenseExpiration = date;
        setExpirationDate(date);
        setFlagForExpiration(true);
    }

    const onTextChanged = (value, index) => {
        data[index].Notes = value;
        setNote(value);
    }

    const addClick = () => {
        if (flagForExpiration && flagForCertification) {
            const newRow = {
                Certification: 'Please Select',
                Id: null,
                LicenseCertificartionNo: null,
                LicenseExpiration: null,
                Notes: null,
                ProspectId: null,
            }
            data.push(newRow);
            // setList(list);
            setFlagForCertification(false);
            setFlagForExpiration(false);
        } else {
            alert('Please Select')
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => addClick()}>
                    <Icon name='add-circle-outline' size={32} color='#3172b6' />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <RenderUI
                        item={item}
                        index={index}
                        onTextChanged={onTextChanged}
                        handleCertificateNumber={handleCertificateNumber}
                        handleExpirationDate={handleExpirationDate}
                        availability={availability}
                        setDropdownIndex={setDropdownValue}
                        list={data}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

function RenderUI({ item, index, onTextChanged, handleCertificateNumber, handleExpirationDate, availability, setDropdownIndex, list }) {

    return (
        <View style={styles.cardDesign}>
            <View style={[styles.columnView, styles.rowView, styles.alignStyle]}>
                <View style={styles.dateView}>
                    <Text style={styles.keyTextStyle}>{constants.AVAILABILITY_SCREEN.CERTIFICATION_KEY}</Text>
                    <ModalDropdown
                        defaultValue={item.Certification}
                        options={availability.lstCertifications.map((item) => {
                            return item.Attribute
                        })}
                        isFullWidth
                        textStyle={styles.textStyle}
                        dropdownTextStyle={styles.textStyle}
                        onSelect={(text, value) => setDropdownIndex(text, value, index)}
                    />
                </View>
                <View style={styles.dateView}>
                    <Text style={[styles.fontStyle, styles.marginStyle]}>{constants.AVAILABILITY_SCREEN.CERTIFICATE_NUMBER}</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        multiline
                        value={list[index].LicenseCertificartionNo}
                        onChangeText={(number) => handleCertificateNumber(number, index)}
                        keyboardType='numeric'
                    />
                </View>
            </View>
            <View style={[styles.columnView, styles.rowView, styles.alignStyle]}>
                <View style={[styles.dateView]}>
                    <Text style={styles.keyTextStyle}>{constants.AVAILABILITY_SCREEN.EXPIRATION}</Text>
                    <View style={styles.datePickerView}>
                        <DatePicker
                            updatedDate={(date) => handleExpirationDate(date, index)}
                            iconType={calendarIcon}
                            screen={constants.AVAILABILITY_SCREEN.CERTIFICATIONS}
                            existingDate={item.LicenseExpiration}
                        />
                    </View>
                </View>
                <View style={styles.dateView}>
                    <Text style={[styles.fontStyle, {marginBottom: '3%'}]}>{constants.AVAILABILITY_SCREEN.NOTE}</Text>
                    <TextInput
                        multiline
                        style={styles.textInputStyle}
                        value={list[index].Notes}
                        onChangeText={note => onTextChanged(note, index)}
                    />
                </View>
            </View>
        </View>
    )
}

export default Certification;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    cardDesign: {
        borderRadius: 5,
        borderWidth: 0.5,
        marginVertical: '1%',
        marginHorizontal: '1%',
        padding: '2%',
    },
    textInputStyle: {
        height: '50%',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'black',
        color: '#000',
    },
    columnView: {
        flex: 1,
    },
    rowView: {
        flexDirection: 'row'
    },
    dateView: {
        flex: 0.5,
    },
    textStyle: {
        fontSize: 13
    },
    alignStyle: {
        // marginVertical: '1%'
    },
    keyTextStyle: {
        marginBottom: '3%',
        fontWeight: '700'
    },
    fontStyle: {
        fontWeight: '700'
    },
    marginStyle: {
        marginBottom: '5%'
    },
    datePickerView: {
        marginRight: '10%',
        borderColor: '#000',
        borderWidth: 0.5,
        borderRadius: 3,
        padding: '1%'
    }
});
