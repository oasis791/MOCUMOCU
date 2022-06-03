import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Systrace,
  Alert,
} from 'react-native';
import Config from 'react-native-config';
import { LoggedInOwnerParamList } from '../../App';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

type StampAmountOwnerProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'StampAmount'
>;

function StampAmount({ navigation, route }: StampAmountOwnerProps) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const storeId = route.params.storeId;
  const phoneNumber = route.params.phoneNumber;

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/Stamp`, {
        storeId,
        phoneNumber,
        amount,
      });
      Alert.alert('알림', '적립되었습니다');
      setLoading(false);
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', '적립에 실패하였습니다.');
        setLoading(false);
      }
    }
  }, [amount, loading, phoneNumber, storeId]);
  return (
    <View style={styles.stampAmountWrapper}>
      {/* <Text>{phoneNumber}</Text> */}
      <View style={styles.stampAmountTitleWrapper}>
        <Text style={styles.stampAmountTitleText}>
          적립할 개수를 입력해 주세요
        </Text>
      </View>

      <View style={styles.counterWrapper}>
        <TouchableOpacity
          onPress={() => {
            setAmount(x => x + 1);
          }}>
          <Text style={styles.controlIcon}>+</Text>
        </TouchableOpacity>

        <Text style={styles.amountText}>{amount}</Text>

        <TouchableOpacity
          onPress={() => {
            amount > 0 ? setAmount(x => x - 1) : null;
          }}>
          <Text style={styles.controlIcon}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.okButtonWrapper}>
        <TouchableOpacity style={styles.okButton} onPress={onSubmit}>
          <Text style={styles.okButtonText}>다음</Text>
        </TouchableOpacity>
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
    marginBottom: 40,
  },
  stampAmountTitleText: {
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 25,
    color: '#363636',
  },

  counterWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  controlIcon: {
    fontSize: 100,
    color: '#363636',
  },

  amountText: {
    fontSize: 70,
    color: '#363636',
  },

  okButtonWrapper: {
    marginHorizontal: 40,
    justifyContent: 'flex-end',
  },

  okButton: {
    backgroundColor: '#FA6072',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  okButtonText: {
    color: 'white',
  },
});
export default StampAmount;