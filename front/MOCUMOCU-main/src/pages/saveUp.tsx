import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export interface QrValue {
  id: number;
  count: number;
  marketId: number;
}

function SaveUp(props: {qrValue: QrValue | null}) {
  // const [input, setInput] = useState('');
  // const [qrValue, setQrValue] = useState('');
  return (
    <View style={styles.container}>
      <QRCode
        value={JSON.stringify({
          id: props.qrValue?.id,
          count: props.qrValue?.count,
          marketId: props.qrValue?.marketId,
        })}
        size={150}
        color="white"
        // style={{width: 10, height: 10}}
        backgroundColor="black"
      />
      <Text>Generate QR Code</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'grey',
  },
});

export default SaveUp;
