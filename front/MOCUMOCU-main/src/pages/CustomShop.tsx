import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {LoggedInUserParamList} from '../../App';

type CustomShopScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'CustomShop'
>;
function CustomShop() {
  return (
    <View>
      <Text>포인트 상점</Text>
    </View>
  );
}

export default CustomShop;
