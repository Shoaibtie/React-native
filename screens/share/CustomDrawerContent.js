import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

const logo = require('../../assests/logo-tendio.png');

class CustomDrawerContent extends Component {
  state = {
    count: 0,
    firstName: '',
    lastName: ''
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerView}>
          <View style={styles.imageViewStyle}>
            <Image
              source={logo}
            />
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 260,
    alignItems: 'center',
  },
  containerView: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  imageView: {
    flex: 0.1,
    flexDirection: 'column',
  },
  imageViewStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10
  },
  schoolTextStyle: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
