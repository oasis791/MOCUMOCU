import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export interface SaveQRProps {
  customerId: number;
}

// const logoFile = require('../assets/icon/arrow.png');
function SaveUpQR(props: {qrValue: SaveQRProps}) {
  // const [input, setInput] = useState('');
  // const [qrValue, setQrValue] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.QRCodeContainer}>
        <QRCode
          value={JSON.stringify({
            customerId: props.qrValue?.customerId,
          })}
          size={150}
          color="black"
          backgroundColor="white"
          ecl="Q"
        />
        <Text style={styles.QRText}>
          생성된 QR코드를 카운터에 제시해 주세요
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
    marginBottom: 10,
    // backgroundColor: '#363636',
    // height: 20,1
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
    marginTop: 20,
    fontSize: 12,
    paddingHorizontal: 10,
    fontFamily: 'GmarketSansTTFMedium',
    bottom: -5,
  },
});
export default SaveUpQR;
