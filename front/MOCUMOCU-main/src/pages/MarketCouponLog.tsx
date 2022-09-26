import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {LoggedInOwnerParamList} from '../../App';

type MarketCouponLogScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'MarketCouponLog'
>;

function MarketCouponLog({navigate, route}: MarketCouponLoglScreenProps) {
  return (
    <View>
      <Text>적립/사용 내역</Text>
    </View>
  );
}

export default MarketCouponLog;
