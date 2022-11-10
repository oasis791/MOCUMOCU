import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {LoggedInOwnerParamList} from '../../App';
import {RootState} from '../store/reducer';

type MarketInfoScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'MarketInfo'
>;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('window').height;

function MarketInfo({navigation, route}: MarketInfoScreenProps) {
  const marketIndex = route.params.marketIndex;
  const marketName = useSelector(
    (state: RootState) => state.marketOwner.markets[marketIndex].name,
  );
  const isAlarm = false;

  const toMarektAnalysis = () => {
    // Alert.alert('알림', '매장 분석으로 이동');
    navigation.navigate('MarketAnalysis', {marketIndex});
  };

  const toMarketModify = () => {
    // Alert.alert('알림', '매장정보 수정로 이동');
    navigation.navigate('ModifyMarket', {marketIndex});
  };

  const toMarketReward = () => {
    navigation.navigate('MarketReward', {marketIndex});
  };

  const toMarketEvent = () => {
    // Alert.alert('알림', '이벤트 관리로 이동');
    navigation.navigate('EventControl', {marketIndex});
  };

  const toMarketUsageHistory = () => {
    // Alert.alert('알림', '적립/사용 내역으로 이동');
    navigation.navigate('MarketCouponLog', {marketIndex});
  };

  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  return (
    <View style={styles.mainBackground}>
      <StatusBar hidden={true} />
      <View style={styles.mainHeader}>
        <View style={styles.headerButtonWrapper}>
          <Pressable style={styles.headerButton} onPress={toBack}>
            <Image
              source={require('../assets/icon/arrowBack.png')}
              style={styles.headerSetting}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.marketTitleWrapper}>
        <Text style={styles.marketTitleText}>{marketName}</Text>
      </View>

      <View style={styles.marketControlWrapper}>
        <View style={styles.marketControlButtonLine}>
          <TouchableOpacity
            style={styles.marketControlButtonWrapper}
            onPress={toMarektAnalysis}>
            <Image
              source={require('../assets/icon/marketAnalysisIcon.png')}
              style={styles.marketControlButtonIcon}
            />
            <Text style={styles.marketControlButtonText}>매장 분석</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.marketControlButtonWrapper}
            onPress={toMarketModify}>
            <Image
              source={require('../assets/icon/marketModifyIcon.png')}
              style={styles.marketControlButtonIcon}
            />
            <Text style={styles.marketControlButtonText}>매장정보 수정</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.marketControlButtonLine}>
          <TouchableOpacity
            style={styles.marketControlButtonWrapper}
            onPress={toMarketReward}>
            <Image
              source={require('../assets/icon/marketRewardIcon.png')}
              style={styles.marketControlButtonIcon}
            />
            <Text style={styles.marketControlButtonText}>리워드 관리</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.marketControlButtonWrapper}
            onPress={toMarketEvent}>
            <Image
              source={require('../assets/icon/marketEventIcon.png')}
              style={styles.marketControlButtonIcon}
            />
            <Text style={styles.marketControlButtonText}>이벤트 관리</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.marketControlButtonLine}>
          <TouchableOpacity
            style={styles.marketControlButtonWrapper}
            onPress={toMarketUsageHistory}>
            <Image
              source={require('../assets/icon/marketUsageHistoryIcon.png')}
              style={styles.marketControlButtonIcon}
            />
            <Text style={styles.marketControlButtonText}>적립/사용 내역</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#F7F7F7',
  },

  mainHeader: {
    width: screenWidth,
    paddingVertical: 15,
    flexDirection: 'row',
    marginBottom: 10,
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
  headerButton: {
    marginHorizontal: screenHeight / 60,
  },

  marketTitleWrapper: {
    marginLeft: 30,
    marginBottom: 40,
  },

  marketTitleText: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 24,
    color: 'black',
  },

  marketControlWrapper: {
    alignItems: 'center',
    marginLeft: 10,
  },

  marketControlButtonLine: {
    flexDirection: 'row',
  },

  marketControlButtonWrapper: {
    width: 110,
    height: 110,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 10,
    marginRight: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },

  marketControlButtonIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginBottom: 5,
  },

  marketControlButtonText: {
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    color: 'black',
    fontSize: 13,
  },
});

export default MarketInfo;
