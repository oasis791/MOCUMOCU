import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {LoggedInUserParamList} from '../../../App';

type UseQRScreenProps = NativeStackScreenProps<LoggedInUserParamList, 'UseQR'>;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
function UseQR({route, navigation}: UseQRScreenProps) {
  const toBack = useCallback(() => {
    navigation.popToTop(); // 뒤로 가기
  }, [navigation]);
  return (
    <>
      <View style={[styles.header]}>
        <Pressable style={styles.headerButton} onPress={toBack}>
          <Image
            source={require('../../assets/icon/arrowBack.png')}
            style={styles.headerSetting}
          />
        </Pressable>
      </View>
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
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    height: screenHeight / 12,
    // backgroundColor: 'orange',
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: 10,
    backgroundColor: '#363636',
  },
  headerButton: {
    marginHorizontal: screenHeight / 60,
  },
  headerSetting: {
    // flex: 1,
    width: 18,
    resizeMode: 'contain',
    // marginTop: screenHeight / 25,
    // flex: 1 / 3,
    // marginHorizontal: 15,
    height: 18,
  },
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
    color: 'black',
  },
});

export default UseQR;
