import React from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';

const drawerIcon = require('../assests/drawer-icon.png');
const backArrow = require('../assests/back-arrow.png');

const HeaderComponent = ({screenName, headerType, setDrawerVisible}) => {
  return (
    <View
      style={[
        styles.flexStyle,
        {
          backgroundColor: '#3172b6',
          flexDirection: 'row',
          justifyContent: 'center',
        },
      ]}>
      <View style={{flex: 0.95, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Pressable onPress={() => setDrawerVisible()}>
            <Image
              source={headerType === 'menu' ? drawerIcon : backArrow}
              style={{height: 35, width: 35}}
            />
          </Pressable>
        </View>
        <View style={{flex: 8, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 21, fontWeight: '500', color: '#fff'}}>
            {screenName}
          </Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  flexStyle: {
    flex: 0.75,
  },
});
