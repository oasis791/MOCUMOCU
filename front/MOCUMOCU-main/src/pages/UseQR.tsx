import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {LoggedInUserParamList} from '../../App';

type UseQRScreenProps = NativeStackScreenProps<LoggedInUserParamList, 'UseQR'>;
const screenHeight = Dimensions.get('screen').height;
function UseQR({route}: UseQRScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.QRCodeContainer}>
        <QRCode
          value={JSON.stringify({
            couponId: route.params.couponId,
            couponRequire: route.params.couponRequire,
          })}
          size={170}
          color="black"
          backgroundColor="white"
          ecl="Q"
        />
        <Text style={styles.QRText}>
          생성된 QR 코드를 카운터에 제시해주세요.
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
    backgroundColor: '#363636',
    height: screenHeight,
  },
  QRCodeContainer: {
    backgroundColor: 'white',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  QRText: {
    marginTop: 25,
    fontSize: 12,
    paddingHorizontal: 10,
    fontFamily: 'GmarketSansTTFMedium',
    bottom: -5,
  },
});

export default UseQR;
