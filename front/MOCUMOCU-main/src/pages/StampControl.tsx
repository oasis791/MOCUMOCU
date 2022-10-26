import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {LoggedInOwnerParamList} from '../../App';

type StampControlProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'StampControl'
>;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function StampControl({navigation, route}: StampControlProps) {
  const [marketId, setMarketId] = useState(route.params.marketId);
  const [isAlarm, setIsAlarm] = useState(false);

  const onSubmitSetting = () => {
    Alert.alert('알림', '설정');
  };
  const onSubmitAlarm = () => {
    Alert.alert('알림', '알람');
  };

  return (
    <View style={styles.screen}>
      <StatusBar hidden={true} />
      <View style={styles.mainHeader}>
        <View style={styles.headerButtonWrapper}>
          <Pressable onPress={onSubmitAlarm}>
            <Image
              source={
                isAlarm
                  ? require('../assets/icon/mainAlarmActive.png')
                  : require('../assets/icon/mainAlarm.png')
              }
              style={styles.buttonIcon}
            />
          </Pressable>
          <Pressable onPress={onSubmitSetting}>
            <Image
              source={require('../assets/icon/mainSetting.png')}
              style={styles.headerSetting}
            />
          </Pressable>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => {
            navigation.navigate('QRCodeScanner', {
              marketId: marketId,
              type: 'saveUp',
            });
          }}>
          <View style={styles.buttonTextWapper}>
            <Image
              source={require('../assets/icon/QRcodeIconRed.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>QR코드로 적립</Text>
          </View>
          <Image
            source={require('../assets/icon/arrowGray.png')}
            style={styles.storeTabArrow}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => {
            navigation.navigate('PhoneNumScanner', {marketId: marketId});
          }}>
          <View style={styles.buttonTextWapper}>
            <Image
              source={require('../assets/icon/phoneIconRed.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>전화번호로 적립</Text>
          </View>
          <Image
            source={require('../assets/icon/arrowGray.png')}
            style={styles.storeTabArrow}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => {
            navigation.navigate('QRCodeScanner', {
              marketId: marketId,
              type: 'use',
            });
          }}>
          <View style={styles.buttonTextWapper}>
            <Image
              source={require('../assets/icon/couponIconRed.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>쿠폰 사용하기</Text>
          </View>

          <Image
            source={require('../assets/icon/arrowGray.png')}
            style={styles.storeTabArrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#F7F7F7',
  },
  mainHeader: {
    width: screenWidth,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 85,
    left: 15,
  },
  headerLogo: {
    resizeMode: 'contain',
    width: 100,
    height: 25,
    marginLeft: 27,
    marginTop: 5,
    // justifyContent: 'flex-start',
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 19,
    marginTop: 5,
    // justifyContent: 'space-around',
  },
  headerSetting: {
    // marginTop: screenHeight / 25,
    resizeMode: 'contain',
    width: 20,
    height: 20,
    marginRight: 15,
  },

  selectStoreListTitle: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },

  selectStoreListTitleText: {
    fontSize: 23,
    fontFamily: 'GmarketSansTTFMedium',
    color: '#363636',
  },

  buttonWrapper: {
    width: screenWidth,
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 9,
    paddingHorizontal: 33,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  buttonTextWapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonIcon: {
    resizeMode: 'contain',
    // backgroundColor: 'black',
    width: 20,
    height: 20,
    marginRight: 15,
  },

  buttonText: {
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 15,
    color: 'black',
  },

  storeTabArrow: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
});

export default StampControl;
