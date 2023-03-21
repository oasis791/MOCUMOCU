import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import {LoggedInUserParamList} from '../../../App';
// import {SafeAreaView} from 'react-native-safe-area-context';

type HelpScreenProps = NativeStackScreenProps<LoggedInUserParamList, 'Help'>;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function Help({navigation}: HelpScreenProps) {
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  const toCouponReserve = useCallback(() => {
    navigation.navigate('CouponReserveHelp');
  }, [navigation]);
  const toCouponUsage = useCallback(() => {
    navigation.navigate('CouponUsageHelp');
  }, [navigation]);
  const toCustomizingHelp = useCallback(() => {
    navigation.navigate('CustomizingHelp');
  }, [navigation]);
  return (
    <View>
      <View style={styles.header}>
        <Pressable style={styles.headerButton} onPress={toBack}>
          <Image
            source={require('../../assets/icon/arrowBack.png')}
            style={styles.headerSetting}
          />
        </Pressable>
      </View>
      <View style={styles.titleContiner}>
        <Text style={styles.titleText}>도움말</Text>
        {/* <Text style={styles.titleText}>선택해 주세요</Text> */}
      </View>
      <View style={styles.continer}>
        <Pressable style={styles.marketContainer} onPress={toCouponReserve}>
          <Text style={styles.marketText}>쿠폰 적립</Text>
          <Image
            style={styles.arrowButton}
            source={require('../../assets/icon/arrowNormal.png')}
          />
        </Pressable>
      </View>
      <View style={styles.continer}>
        <Pressable style={styles.marketContainer} onPress={toCouponUsage}>
          <Text style={styles.marketText}>쿠폰 사용</Text>
          <Image
            style={styles.arrowButton}
            source={require('../../assets/icon/arrowNormal.png')}
          />
        </Pressable>
      </View>
      <View style={styles.continer}>
        <Pressable style={styles.marketContainer} onPress={toCustomizingHelp}>
          <Text style={styles.marketText}>커스터마이징 및 구매</Text>
          <Image
            style={styles.arrowButton}
            source={require('../../assets/icon/arrowNormal.png')}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default Help;

const styles = StyleSheet.create({
  header: {
    height: screenHeight / 15,
    // backgroundColor: 'orange',
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: 10,
  },
  headerButton: {
    marginHorizontal: 10,
  },
  headerSetting: {
    // flex: 1,
    width: 18,
    resizeMode: 'contain',
    // marginTop: screenHeight / 25,
    // flex: 1 / 3,
    // marginHorizontal: 15,
    height: 18,
  },
  titleContiner: {
    marginLeft: screenWidth / 15,
    marginTop: screenHeight / 50,
    marginBottom: screenHeight / 20,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'GmarketSansTTFMedium',
    color: '#414FFD',
    // marginLeft: screenWidth / 25,
    // backgroundColor: 'pink',
  },
  continer: {
    justifyContent: 'center',
    marginTop: screenHeight / 40,
    height: screenHeight / 10,
    width: screenWidth,
  },
  marketContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: screenWidth,
    justifyContent: 'space-between',
    // height: 77,
    height: screenHeight / 9,
    // top: 120,
    borderRadius: 20,
    // marginBottom: 7,
    // padding: 10,
  },
  marketText: {
    paddingHorizontal: 36,
    // backgroundColor: 'cyan',
    // width: 200,
    paddingTop: 12,
    color: '#363636',
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 14,
    // backgroundColor: 'blue',
    // paddingVertical: 10,
    // top: -10,
  },
  arrowButton: {
    resizeMode: 'contain',
    marginTop: 23,
    height: 20,
    width: 40,
    paddingHorizontal: 36,
  },
});
