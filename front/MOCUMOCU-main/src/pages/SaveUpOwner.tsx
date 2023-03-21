import {NativeStackScreenProps} from '@react-navigation/native-stack';

import React, {useCallback} from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {LoggedInOwnerParamList} from '../../App';
import {RootState} from '../store/reducer';

export interface AcitivityData {
  label: string;
  value: string;
  color: string;
}

export interface Store {
  id: number;
  name: number;
  male: number;
  female: number;
  activityData: Array<AcitivityData>;
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('window').height;

type SaveUpOwnerProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'SaveUpOwner'
>;

function SaveUpOwner({navigation}: SaveUpOwnerProps) {
  const markets = useSelector((state: RootState) => state.marketOwner.markets);
  const isAlarm = false;

  const onSubmitSetting = () => {
    // Alert.alert('알림', '설정');
    navigation.navigate('SettingsOwner');
  };

  const onSubmitAlarm = () => {
    Alert.alert('알림', '알람');
  };

  return (
    <View style={styles.screen}>
      <StatusBar hidden={true} />
      <View style={styles.selectMarketListTitle}>
        <Text style={styles.selectMarketListTitleText}>
          매장을 선택해 주세요
        </Text>
      </View>

      <ScrollView>
        {markets.length === 0 ? (
          <View
            style={{
              height: 400,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>등록된 매장이 없습니다.</Text>
          </View>
        ) : (
          markets.map(market => {
            return (
              <TouchableOpacity
                style={styles.marketTabWrapper}
                key={market.id}
                onPress={() => {
                  navigation.navigate('StampControl', {
                    marketId: market.id,
                  });
                }}>
                <Text style={styles.marketTabNameText}>{market.name}</Text>
                <Image
                  source={require('../assets/icon/arrowGray.png')}
                  style={styles.marketTabArrow}
                />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#F7F7F7',
  },

  mainHeader: {
    width: screenWidth,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerLogo: {
    resizeMode: 'contain',
    width: 100,
    height: 25,
    marginLeft: 27,
    marginTop: 5,
    // justifyContent: 'flex-start',
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 19,
    marginTop: 5,
    // justifyContent: 'space-around',
  },
  headerSetting: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  headerAlarm: {
    resizeMode: 'contain',
    // backgroundColor: 'black',
    width: 20,
    height: 20,
    marginRight: 15,
  },

  selectMarketListTitle: {
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
    marginTop: 30,
  },

  selectMarketListTitleText: {
    fontSize: 23,
    fontFamily: 'GmarketSansTTFMedium',
    color: '#363636',
  },

  marketTabWrapper: {
    width: screenWidth,
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 9,
    paddingHorizontal: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  marketTabNameText: {
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 15,
    color: '#a0a0a0',
  },

  marketTabArrow: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
});
export default SaveUpOwner;
