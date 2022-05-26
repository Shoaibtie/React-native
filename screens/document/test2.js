import React, {Component} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text} from 'react-native';

const list = [
    {   
        id: 0,
        name: 'bharti',
        contact: '5634768239'
    },
    {
        id: 1,
        name: 'bharti',
        contact: '5634768239'
    },
    {
        id: 2,
        name: 'bharti',
        contact: '5634768239'
    }
]
export default class Test extends Component{
     constructor(props){
         super(props)
     }

     state ={
         name: ''
     }

     render(){
         return(
             <SafeAreaView style={styles.container}>
                 <FlatList
                  data={list}
                  renderItem={({item})=> <RenderUI item={item}/>}
                  keyExtractor={(item) => item.id}
                 />
             </SafeAreaView>
         )
     }
}

function RenderUI({item}){
   return (
       <View style={styles.cardStyle}>
          <View style={styles.columnStyle}>
              <Text>{item.name}</Text>
              <Text>{item.contact}</Text>
          </View>
       </View>
   )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardStyle: {
        flex: 1,
        borderRadius: 2,
        borderWidth: 1,
        marginHorizontal: '1%',
        marginVertical: '1%',
        padding: '1%'
    },
    columnStyle: {
    flex: 1
    }
})