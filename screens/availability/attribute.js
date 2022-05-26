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
import Icon from "react-native-vector-icons/MaterialIcons";
import * as constants from '../../appResources/constants';
import * as actions from '../../redux/actions/authaction';

function Attribute({ data, listType, clicked, dropdownIndexAttribute }) {
 
    const [note, setNote] = React.useState();
    const [list, setList] = React.useState(data);
    const [flag, setFlag] = React.useState(true);
    const availability = useSelector(state => state.availability.availabilityDetails);

    // React.useEffect(() => {
    //     if (clicked === listType && dropdownIndexAttribute.item === -1 && flag) {
    //         const newRow = {
    //             Attribute: 'Please Select',
    //             Expiration: null,
    //             Note: null,
    //             Type: 'Attribute',
    //             TypeId: null
    //         }
    //         data.push(newRow);
    //     }
    // })

    const onTextChanged = (value, index) => {
        data[index].Note = value;
        setNote(value);
    }

    const setDropdownValue = (text, value, index) => {
        availability.lstAttribute.map(element => {
            if(element.Attribute === value){
                data[index].TypeId = element.Id
            }
        })
        data[index].Attribute = value;
        setFlag(true)
        // update2();
    }

    const addClick = () => {
        if(flag){
        const newRow = {
            Attribute: 'Please Select',
            Expiration: null,
            Note: null,
            Type: 'Restriction',
            TypeId: null
        }
        data.push(newRow);
        // setList(list);
        setFlag(false);
    }else {
        alert('Please Select')
    }
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity>
                    <Icon name='add-circle-outline' size={32} color='#3172b6' onPress={() => addClick()} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <RenderUI 
                        item={item} 
                        index={index}
                        listType={listType} 
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
                    <Text style={styles.textHeading}>Attributes</Text>
                    <ModalDropdown
                        defaultValue={item.Attribute}
                        options={availability.lstAttribute.map((item)=> {
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

export default Attribute;

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
        color: '#000',
        height: '50%',
        padding: 1
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
