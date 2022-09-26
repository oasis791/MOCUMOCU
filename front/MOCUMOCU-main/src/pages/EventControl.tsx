import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {LoggedInOwnerParamList} from '../../App';

type EventControlScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'EventControl'
>;

function EventControl({navigation, route}: EventControlScreenProps) {
  const marketIndex = route.params.marketIndex;
  return (
    <View>
      <Text>이벤트 관리</Text>
    </View>
  );
}

export default EventControl;
