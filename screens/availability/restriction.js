import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import * as constants from '../../appResources/constants';
import * as actions from '../../redux/actions/authaction';

function Ristrictions({ data, listType, clicked, dropdownIndex }) {
    
    const [note, setNote] = React.useState();
    const [list, setList] = React.useState(data);
    const [flag, setFlag] = React.useState(true);
    const availability = useSelector(state => state.availability.availabilityDetails);

    React.useEffect(() => {
        if (clicked === listType && dropdownIndex.item === -1) {
            const newRow = {
                Attribute: 'Please Select',
                Expiration: null,
                Note: null,
                Type: 'Restriction',
                TypeId: null
            }
            data.push(newRow);
        }
    })

    const onTextChanged = (value, index) => {
        data[index].Note = value;
        setNote(value);
    }

    const setDropdownValue = (text, value, index) => {
        availability.lstRestriction.map(element => {
            if(element.Attribute === value){
                data[index].TypeId = element.Id
            }
        })
        data[index].Attribute = value;
        // update1();
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <RenderUI 
                        item={item} 
                        index={index}
                        availability={availability}
                        setDropdownIndex={setDropdownValue} 
                        onTextChanged={onTextChanged}
                        list={data}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}
function RenderUI({ item, index, availability, setDropdownIndex, onTextChanged, list }) {

    return (
        <View style={styles.cardDesign}>
            <View style={[styles.columnView, styles.rowView, { marginVertical: '2%' }]}>
                <View style={styles.dateView}>
                    <Text style={styles.textHeading}>Restrictions</Text>
                    <ModalDropdown
                        defaultValue={item.Attribute}
                        options={availability.lstRestriction.map((item)=> {
                            return item.Attribute
                        })}
                        isFullWidth
                        textStyle={styles.textStyle}
                        dropdownTextStyle={styles.textStyle}
                        onSelect={(text, value)=> setDropdownIndex(text, value, index)}
                    />
                </View>
                <View style={styles.dateView}>
                    <Text style={styles.textHeading}>Note</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        multiline
                        value={list[index].Note}
                        onChangeText={note => onTextChanged(note, index)}
                    />
                </View>
            </View>
        </View>
    )
}

export default Ristrictions;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    cardDesign: {
        borderRadius: 5,
        borderWidth: 0.5,
        // overflow: 'hidden',
        // shadowColor: '#000',
        // shadowOpacity: 0.15,
        marginVertical: '1%',
        marginHorizontal: '1%',
        padding: '2%',
        // elevation: 1
    },
    pickerStyle: {
        borderColor: 'red',
        borderWidth: 5,
        borderRadius: 3
    },
    textInputStyle: {
        color: '#000'
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
    textHeading: {
        fontWeight: '700',
        marginBottom: '2%'
    }
});
