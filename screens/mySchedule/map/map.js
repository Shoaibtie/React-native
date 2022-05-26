import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class Map extends Component {
    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        destination: {

        }
    };

    constructor(props) {
        super(props);
    }

    setBack = () => {
        this.props.navigation.navigate('CaregiverVisit');
    };


    render() {
        const { lat, lng } = this.props;
        return (
            <MapView
                style={{ flex: 1 }}
                region={{
                    latitude: lat ? lat : 37.78825,
                    longitude: lng ? lng : -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Marker
                    coordinate={{
                        latitude: lat ? lat : 37.78825,
                        longitude: lng ? lng : -122.4324,
                    }}>
                </Marker>
            </MapView>
        );
    }
}


export default Map;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flexStyle: {
        flex: 1,
    },
    searchCardflexStyle: {
        flex: 0.1,
    },
    outerSearchFlexView: {
        backgroundColor: '#3172b6',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerSearchFlexView: {
        flexDirection: 'row',
        flex: 0.95,
        alignItems: 'center'
    },
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '700'
    },
    buttonView: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
});



