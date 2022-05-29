import React from 'react';
import {View, Image, Text} from 'react-native';

function SaveUpOwner() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../assets/qrcode.png')}
        style={{height: 200, width: 200}}
      />
      <Text style={{color: 'black', fontFamily: 'NotoSansCJKkr-Black (TTF)'}}>
        QR CODE 점주
      </Text>
    </View>
  );
}

export default SaveUpOwner;
