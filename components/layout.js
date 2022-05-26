import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, ImageBackground, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const backgroundImage = require('../assests/bg.jpg');

class Layout extends Component {
    render() {
        return (
            <ImageBackground
                source={backgroundImage}
                style={Styles.image}
            >
                <ScrollView contentContainerStyle={{ height: '100%' }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        {this.props.children}
                    </SafeAreaView>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
});

export default Layout;