/* eslint-disable prettier/prettier */
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import { TextInput } from 'react-native-gesture-handler';
import { LoggedInOwnerParamList } from '../../App';

type PhoneNumScannerOwnerProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'PhoneNumScanner'
>;

function PhoneNumScanner({ navigation, route }: PhoneNumScannerOwnerProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buttonActive, setButtonActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [marketId, setMarketId] = useState(route.params.marketId);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/owner/phoneNum`, {
        phoneNumber,
      });
      if (response.data.name === undefined){
        throw new Error();
      }
      Alert.alert('알림', `${response.data.name}님이 맞는지 확인해주세요`, [
        // The "Yes" button
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('StampAmount', {
              marketId: marketId,
              customerId: response.data.customerId,
            });
          },
        },
        {
          text: '취소',
        },
      ]);
      setLoading(false);
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', '등록되어 있지 않는 전화번호입니다');
        setLoading(false);
      }
    }
  }, [loading, navigation, phoneNumber, marketId]);

  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);

  useEffect(() => {
    setPhoneNumber(phoneNumber.trim());
    // setPhoneNumber(phoneNumber.replace('-', ''));

    if (phoneNumber.length === 11) {
      setPhoneNumber(
        phoneNumber
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
      setButtonActive(true);
    }
  }, [phoneNumber]);

  return (
    <View style={styles.stampAmountWrapper}>
       <View style={styles.mainHeader}>
          <View style={styles.headerButtonWrapper}>
            <Pressable style={styles.headerButton} onPress={toBack}>
              <Image
                source={require('../assets/icon/arrowBack.png')}
                style={styles.headerSetting}/>
            </Pressable>
          </View>
        </View>
      <View style={styles.stampAmountTitleWrapper}>
        <Text style={styles.stampAmountTitleText}>전화번호를 입력해주세요</Text>
      </View>

      <View style={styles.inputPhoneNumWrapper}>
        <TextInput
          style={styles.inputPhonNumBox}
          onChangeText={v => {
            setPhoneNumber(v);
          }}
          value={phoneNumber}
          placeholder="전화번호를 입력해주세요"
          maxLength={13}
          keyboardType="decimal-pad"
          returnKeyType="next"
          onSubmitEditing={onSubmit}
          importantForAutofill="yes"
        />
      </View>

      <View style={styles.okButtonWrapper}>
        <TouchableOpacity
          style={buttonActive ? styles.okButtonActive : styles.okButton}
          disabled={!buttonActive}
          onPress={onSubmit}>
          {loading ? (
            <ActivityIndicator style={styles.indicator} color="white" />
          ) : (
            <Text style={styles.okButtonText}>다음</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  stampAmountWrapper: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
   mainHeader: {
    width: screenWidth,
    paddingVertical: 15,
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 19,
    marginTop: 5,
    // justifyContent: 'space-around',
  },
  headerSetting: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  headerButton: {
    marginHorizontal: screenHeight / 60,
  },

  stampAmountTitleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // backgroundColor: 'red',
  },
  stampAmountTitleText: {
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 25,
    color: '#363636',
  },

  inputPhoneNumWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    // backgroundColor: 'green',
  },

  inputPhonNumBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 320,
    height: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingHorizontal: 15,
  },

  okButtonWrapper: {
    flex: 4,
    // backgroundColor: 'blue',
    paddingHorizontal: 30,
  },

  okButtonActive: {
    backgroundColor: '#FA6072',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  okButton: {
    backgroundColor: '#A5A5A5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  okButtonText: {
    color: 'white',
  },

  indicator: {
    paddingHorizontal: '7%',
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PhoneNumScanner;
