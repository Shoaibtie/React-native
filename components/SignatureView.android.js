import React, {Component} from 'react';
import {View, Text, Modal, Platform} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

const toolbarHeight = Platform.select({
  android: 0,
  ios: 22,
});

const modalViewStyle = {
  paddingTop: toolbarHeight,
  flex: 1,
};

class SignatureView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  show(display) {
    this.setState({visible: display});
  }

  render() {
    const {visible} = this.state;

    return (
      <View style={modalViewStyle}>
        <SignatureCapture
          style={{flex: 1, width: '100%'}}
          onDragEvent={this._onDragEvent.bind(this)}
          onSaveEvent={this._onSaveEvent.bind(this)}
          backgroundColor={'#ffffff'}
          strokeColor="#000000"
          minStrokeWidth={4}
          maxStrokeWidth={4}
          showNativeButtons={false}
        />
      </View>
    );
  }

  _onPressClose() {
    this.show(false);
  }

  _onRequreClose() {
    this.show(false);
  }

  _onDragEvent(drag) {
    this.setState({visible: !this.state.visible});

    this.props.DragSignature && this.props.DragSignature(drag);
  }

  _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    this.props.onSave && this.props.onSave(result);
    this.props.SaveSignature && this.props.SaveSignature(this.state.visible);
  }
}

export default SignatureView;
