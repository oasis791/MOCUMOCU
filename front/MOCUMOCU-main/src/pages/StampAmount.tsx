import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {LoggedInOwnerParamList} from '../../App';
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

type StampAmountOwnerProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'StampAmount'
>;

function StampAmount({navigation, route}: StampAmountOwnerProps) {
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const marketId = route.params.marketId;
  const customerId = route.params.customerId;

  const upAmount = () => {
    setAmount(x => x + 1);
  };
  const downAmount = () => {
    setAmount(x => x - 1);
  };

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        'http://15.164.100.68:8080/owner/stamp',
        {
          marketId,
          customerId,
          amount,
        },
      );
      Alert.alert('알림', '적립되었습니다');
      setLoading(false);
      navigation.navigate('SaveUpOwner');
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', '적립에 실패하였습니다.');
        setLoading(false);
      }
    }
  }, [amount, customerId, loading, marketId, navigation]);
  return (
    <View style={styles.stampAmountWrapper}>
      {/* <Text>{customerId}</Text> */}
      <View style={styles.stampAmountTitleWrapper}>
        <Text style={styles.stampAmountTitleText}>
          적립할 개수를 입력해 주세요
        </Text>
      </View>

      <View style={styles.counterWrapper}>
        <TouchableOpacity onPress={upAmount}>
          <Text style={styles.controlIcon}>+</Text>
        </TouchableOpacity>

        <Text style={styles.amountText}>{amount}</Text>

        <TouchableOpacity
          onPress={() => {
            amount > 1 ? downAmount() : null;
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
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  stampAmountTitleWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
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
    flex: 4,
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
    flex: 1,
    paddingHorizontal: 30,
  },

  okButton: {
    backgroundColor: '#FA6072',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
  },

  okButtonText: {
    color: 'white',
  },
});
export default StampAmount;
