/* eslint-disable prettier/prettier */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import Config from 'react-native-config';
import {LoggedInOwnerParamList} from '../../App';

const window = Dimensions.get('window');

type QRCodeScannerScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'QRCodeScanner'
>;

export type SaveQRProps = {
  customerId: number;
};

export type UseQRProps = {
  couponId: number;
  couponRequire: number;
};

function QRCodeScanner({navigation, route}: QRCodeScannerScreenProps) {
  const [scaned, setScaned] = useState<boolean>(true);
  const ref = useRef(null);
  const marketId = route.params.marketId;

  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScaned(true);
  }, []);

  const onBarCodeRead = async (event: any) => {
    if (!scaned) {
      return;
    }
    setScaned(false);
    // Vibration.vibrate();

    let qrValue: SaveQRProps | UseQRProps | undefined;
    switch (route.params.type) {
      case 'saveUp':
        qrValue = JSON.parse(event.nativeEvent.codeStringValue);
        break;
      case 'use':
        qrValue = JSON.parse(event.nativeEvent.codeStringValue);
        break;
      default:
        qrValue = undefined;
        return;
    }
    // const qrValue: SaveQRProps = JSON.parse(
    //   event.nativeEvent.codeStringValue,
    // );

    if (qrValue) {
      switch (route.params.type) {
        case 'saveUp': // 적립
          setScaned(true);
          navigation.navigate('StampAmount', {
            marketId: marketId,
            customerId: qrValue.customerId,
          });
          break;
        case 'use': // 사용
          setScaned(true);
          try {
            const response = await axios.patch(
              'http://54.180.91.167:8080/owner/stamp',
              {
                couponId: qrValue.couponId,
                couponRequire: qrValue.couponRequire,
              },
            );
            Alert.alert('알림', '정상적으로 사용되었습니다.');
            navigation.navigate('SaveUpOwner');
          } catch (error) {
            const errorResponse = (error as AxiosError).response;
            if (errorResponse) {
              Alert.alert('알림', '사용 처리에 실패했습니다.');
            }
          }
          break;
        default:
          Alert.alert('알림', 'default');
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.scanner}
        ref={ref}
        cameraType={CameraType.Back} // Front/Back(default)
        zoomMode={'on'}
        focusMode={'on'}
        // Barcode Scanner Props
        scanBarcode
        showFrame={true}
        laserColor="red"
        frameColor="white"
        surfaceColor="blue"
        // laserColor="rgba(0, 0, 0, 0)"
        // frameColor="rgba(0, 0, 0, 0)"
        // surfaceColor="rgba(0, 0, 0, 0)"
        onReadCode={onBarCodeRead}
      />

      <View style={styles.scanAreaBackground}>
        <Text style={styles.scanAreaText}>손님이 제시한</Text>
        <Text style={styles.scanAreaText}>QR코드를 스캔하세요</Text>
        <Text style={styles.scanAreaText}>{route.params.type}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  scanAreaBackground: {
    position: 'absolute',
    top: '70%',
    left: 0,
    width: window.width,
    height: window.height,
    // backgroundColor: 'pink',
    alignItems: 'center',
  },

  scanAreaText: {
    color: 'white',
    fontSize: 18,
  },
  scanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default QRCodeScanner;
