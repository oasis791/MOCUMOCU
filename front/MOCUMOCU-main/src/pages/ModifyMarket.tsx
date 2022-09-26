import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {LoggedInOwnerParamList} from '../../App';

type ModifyMarketScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'ModifyMarket'
>;

function ModifyMarket({navigate, route}: ModifyMarketScreenProps) {
  return (
    <View>
      <Text>매장 정보 수정</Text>
    </View>
  );
}

export default ModifyMarket;
