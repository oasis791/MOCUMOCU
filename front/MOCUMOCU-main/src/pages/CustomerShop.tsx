import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {LoggedInParamList} from '../../App';

type CustomerShopScreenProps = NativeStackScreenProps<LoggedInParamList, 'customerShop'>;
function CustomerShop() {
  return (
    <View>
      <Text>CustomerShop</Text>
    </View>
  );
}

export default CustomerShop;
