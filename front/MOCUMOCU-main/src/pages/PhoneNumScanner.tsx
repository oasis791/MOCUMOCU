/* eslint-disable prettier/prettier */
import { NavigationRouteContext} from '@react-navigation/native';
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import { TextInput } from 'react-native-gesture-handler';
import { LoggedInOwnerParamList } from '../../App';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

type PhoneNumScannerOwnerProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'PhoneNumScanner'
>;

function PhoneNumScanner({ navigation, route }: PhoneNumScannerOwnerProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buttonActive, setButtonActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const passfunc = useCallback(() => { }, []);

  const [marketId, setMarketId] = useState(route.params.marketId);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/phoneNum`, {
        phoneNumber,
      });

      Alert.alert('알림', `${response.data.name}님이 맞는지 확인해주세요`, [
        // The "Yes" button
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('StampAmount', {
              marketId: marketId,
              // customerId: response.data.customerId,
              customerId: '11',
            });
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: '취소',
        },
      ]);
      setLoading(false);
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        switch (errorResponse.status) {
          case 404: // 404
            Alert.alert('알림', '등록되어 있지 않는 전화번호입니다', [
              // The "Yes" button
              {
                text: '확인',
                onPress: () => {
                  navigation.navigate('StampAmount', {
                    marketId: marketId,
                    customerId: '11',
                  });
                },
              },
              // The "No" button
              // Does nothing but dismiss the dialog when tapped
              {
                text: '취소',
              },
            ]);
        }
        setLoading(false);
      }
    }
  }, [loading, navigation, phoneNumber, marketId]);

  useEffect(() => {
    setPhoneNumber(phoneNumber.trim());
    // setPhoneNumber(phoneNumber.replace('-', ''));

    if (phoneNumber.length === 10) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNumber.length === 13) {
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

const styles = StyleSheet.create({
  stampAmountWrapper: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  stampAmountTitleWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    flex: 4,
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
    flex: 1,
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
