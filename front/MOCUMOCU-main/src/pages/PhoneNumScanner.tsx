import { NavigationRouteContext } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
              phoneNumber: phoneNumber,
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
                    phoneNumber: phoneNumber,
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
    <View>
      <View style={styles.stampAmountWrapper}>
        <View style={styles.stampAmountTitleWrapper}>
          <Text style={styles.stampAmountTitleText}>
            전화번호를 입력해주세요
          </Text>
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
            returnKeyType="send"
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
    </View>
  );
}

const styles = StyleSheet.create({
  stampAmountWrapper: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#F7F7F7',
  },

  stampAmountTitleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  stampAmountTitleText: {
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 25,
    color: '#363636',
  },

  inputPhoneNumWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },

  inputPhonNumBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 320,
    marginBottom: 300,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingHorizontal: 15,
  },

  okButtonWrapper: {
    marginHorizontal: 40,
    justifyContent: 'flex-end',
  },

  okButtonActive: {
    backgroundColor: '#FA6072',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  okButton: {
    backgroundColor: '#A5A5A5',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  okButtonText: {
    color: 'white',
  },

  indicator: {
    // backgroundColor: 'gray',
    paddingHorizontal: '7%',
    // paddingVertical: 10,
    borderRadius: 5,
    // marginTop: '4%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PhoneNumScanner;