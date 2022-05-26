import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {connect, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../redux/actions/authaction';
const IncomingCallScreen = props => {
  const [caller, setCaller] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const [userId, setUSerId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [loginAccessToken, setLoginAccessToken] = useState('');
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const getTokenForVideoCallId = data =>
    dispatch(actions.getTokenForVideoCallId({data}));

  useEffect(() => {
    setUSerId(userData.LoggedUserId);
    setVideoId(userData.VideoCallId);
    setLoginAccessToken(userData.AccessToken);
    const v1 = userData.LoggedUserId;
    const v2 = userData.VideoCallId;
    const v3 = userData.AccessToken;
    GetTokenForVideo(v1, v2, v3);
  }, []);

  //GetVideoCallToken API function

  // const getTokenForVideoCallId = data => {
  //   console.log('data', data);
  //   dispatch(actions.getTokenForVideoCallId({data}));
  // };

  const GetTokenForVideo = (userId, videoId, loginAccessToken) => {
    alert(userId);
    console.log(
      'props  userData=======> v1',
      userId,
      'videoId',
      videoId,
      loginAccessToken,
    );
    let getVideoTokenDetail = 'UID=' + userId + '&ExpireTime=' + 20000;
    getTokenForVideoCallId(getVideoTokenDetail);
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log(
          'props  userData=======>',
          userId,
          videoId,
          loginAccessToken,
        );
      };
    }, []),
  );
  const onDecline = () => {
    navigation.navigate('Home');
  };

  const onAccept = () => {
    navigation.navigate('videoCallingAccept');
  };

  return (
    <View style={styles.bg}>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}> */}
      <Text style={styles.name}>Jaff </Text>
      <Text style={styles.phoneNumber}>Incoming call...</Text>

      <View style={[styles.row, {marginTop: 'auto'}]}>
        <View style={styles.iconContainer}>
          {/* <Ionicons name="alarm" color="white" size={30} />
          <Text style={styles.iconText}>Remind me</Text> */}
        </View>
        <View style={styles.iconContainer}>
          {/* <Entypo name="message" color="white" size={30} />
          <Text style={styles.iconText}>Message</Text> */}
        </View>
      </View>

      <View style={styles.row}>
        {/* Decline Button */}
        <TouchableOpacity onPress={onDecline} style={styles.iconContainer}>
          <View style={styles.iconButtonContainer}>
            <Feather name="x" color="white" size={40} />
          </View>
          {/* <Text style={styles.iconText}>Decline</Text> */}
        </TouchableOpacity>

        {/* Accept Button */}
        <TouchableOpacity onPress={onAccept} style={styles.iconContainer}>
          <View
            style={[styles.iconButtonContainer, {backgroundColor: 'green'}]}>
            <Feather name="check" color="white" size={40} />
          </View>
          {/* <Text style={styles.iconText}>Accept</Text> */}
        </TouchableOpacity>
      </View>
      {/* </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 100,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: '#000',
  },
  bg: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 50,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconText: {
    color: 'white',
    marginTop: 10,
  },
  iconButtonContainer: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },
});

const mapStateToProps = state => ({
  userData: state.auth.userData,
  // error: state.auth.error,
  // isLoading: state.loader.isLoading,
});

// const mapDispatchToProps = dispatch => ({
//   getTokenForVideoCallId: data =>
//     dispatch(actions.getTokenForVideoCallId({data})),
// });

export default IncomingCallScreen; //connect(mapStateToProps, mapDispatchToProps)(IncomingCallScreen);
