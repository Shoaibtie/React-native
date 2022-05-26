import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ToastBox = ({modalVisible, messagingData, setModalVisible}) => {
   
  function submit() {
    setModalVisible(!modalVisible)
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.forgotTextStyle}>{messagingData}</Text>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => submit()}>
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    overflow: 'hidden',
    padding: 10,
    elevation: 2,
    marginTop: '8%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#3172b6', // 2196F3
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: screenWidth < 420 && screenHeight < 700 ? 18 : 20,
  },
  forgotTextStyle: {
    color: '#3172b6',
    textAlign: 'center',
    fontSize: screenWidth < 420 && screenHeight < 700 ? 20 : 20,
    fontWeight: 'bold',
    marginVertical: '5%',
  },
});

export default ToastBox;
