import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {LoggedInOwnerParamList} from '../../App';

type MarketAnalysislScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'EventControl'
>;

function MarketAnalysis({navigate, route}: MarketAnalysislScreenProps) {
  return (
    <View>
      <Text>매장 분석</Text>
    </View>
  );
}

export default MarketAnalysis;
