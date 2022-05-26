import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const list = [
    {
        id: 0,
        name: 'bharti',
        contact: '4676476789'
    },
    {
        id: 1,
        name: 'bharti',
        contact: '4676476789'
    },
    {
        id: 2,
        name: 'bharti',
        contact: '4676476789'
    },
]
export default function Test({ }) {
    const [contactList, updatedContactList] = React.useState(list);
    const [id, setId] = React.useState(0);
    const deleteItem = (id) => {
        let newList = contactList.filter((item) => item.id !== id)
        updatedContactList(newList);
    }

    const addItem = () => {
        let addObject = {
            id: contactList.length,
            name: 'bharti123',
            contact: '6584839200'
        }
        contactList.push(addObject);
        updatedContactList(contactList);
        setId(id + 1);
    }
    return (
        <SafeAreaView>
            <FlatList
                data={contactList}
                renderItem={({ item }) => <RenderUI item={item} deleteItem={deleteItem} />}
                extraData={id}
                keyExtractor={(item) => item.id}
            />
            <View>
                <TouchableOpacity onPress={() => addItem()}>
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

function RenderUI({ item, deleteItem }) {
    return (
        <View style={styles.cardView}>
            <View style={styles.columnView}>
                <Text>{item.name}</Text>
                <Text>{item.contact}</Text>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                    <Text>delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        borderRadius: 2,
        borderWidth: 1,
        marginVertical: '1%',
        marginHorizontal: '1%',
        padding: '1%'
    },
    columnView: {
        flex: 1,
    },
    textInputStyle: {
        width: '30%',
        borderWidth: 1
    }
})