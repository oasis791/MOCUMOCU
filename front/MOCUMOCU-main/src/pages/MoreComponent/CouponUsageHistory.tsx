import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Pressable,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import {LoggedInUserParamList} from '../../../App';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const today = new Date().toLocaleTimeString();

const couponUsageHistoryTest = [
  [
    {
      date: '5월 16일',
      action: '카페현욱 쿠폰 5개 사용',
      time: '16:32',
      point: -5,
    },
    {
      // date: '5월 16일',
      action: '커피맛을 아는 승민 1개 적립',
      time: '16:02',
      point: +1,
    },
    {
      date: '5월 15일',
      action: '노무현 버거 쿠폰 2개 적립',
      time: '17:02',
      point: +2,
    },
  ],
  [
    {
      // date: '5월 15일',
      action: '김현욱 길 가다 삥 뜯김',
      time: '16:02',
      point: -5,
    },
    {
      date: '5월 14일',
      action: '리어카 끌고 가는 할머니 도와줌',
      time: '16:02',
      point: +2,
    },
    {
      action: '몰라',
      time: '16:02',
      point: +2,
    },
    {
      date: '5월 13일',
      action: '리어카 끌고 가는 할머니 도와줌',
      time: '16:02',
      point: +2,
    },
    {
      action: '몰라',
      time: '16:02',
      point: +2,
    },
  ],
];

type couponUsageHistoryScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'CouponUsageHistory'
>;
function CouponUsageHistory({navigation}: couponUsageHistoryScreenProps) {
  const toBack = useCallback(() => {
    navigation.popToTop(); // 뒤로 가기
  }, [navigation]);
  const toSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  const renderHistory = couponUsageHistoryTest.map(historyList =>
    historyList.map(history => {
      return (
        <View style={styles.historyContent}>
          {history.date ? (
            <Text style={{fontWeight: 'bold'}}>{history.date}</Text>
          ) : (
            <></>
          )}
          <View style={styles.historyText}>
            <Text style={{fontFamily: '', fontWeight: 'bold'}}>
              {history.action} {'\n'}
              <Text
                style={{
                  fontFamily: 'GmarketSansTTF',
                  fontSize: 15,
                  color: 'lightgray',
                }}>
                {history.time}
              </Text>
            </Text>
            <Text>
              {history.point <= 0 ? (
                <Text
                  style={{
                    color: '#363636',
                    fontFamily: '',
                    fontWeight: 'bold',
                  }}>
                  {`-도장 ${Math.abs(history.point)}`}개
                </Text>
              ) : (
                <Text
                  style={{
                    color: '#414FFD',
                    fontFamily: '',
                    fontWeight: 'bold',
                  }}>
                  {`+도장 ${history.point}`}개
                </Text>
              )}
            </Text>
          </View>
        </View>
      );
    }),
  );
  return (
    <>
      <SafeAreaView>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <View style={[styles.header]}>
            <Pressable style={styles.headerButton} onPress={toBack}>
              <Image
                source={require('../../assets/icon/arrowBack.png')}
                style={styles.headerSetting}
              />
            </Pressable>
            <Pressable onPress={toSettings} style={styles.headerButton}>
              <Image
                source={require('../../assets/icon/mainSetting.png')}
                style={styles.headerSetting}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.couponUsageHistoryMain}>
          {/* 내 포인트 하단 */}
          <View style={styles.mainButtonContainer}>
            <Pressable style={styles.filterButton}>
              <View
                style={{
                  flexDirection: 'row',
                  // width: screenWidth / 4,
                }}>
                <Text style={styles.buttonText}>전체</Text>
                <Image
                  source={require('../../assets/icon/arrowDown.png')}
                  style={styles.arrowDown}
                />
              </View>
            </Pressable>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.historyContainer}>{renderHistory}</View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: 'white',
    // width: screenWidth,
    // flex: 1,
    // height: screenHeight,
  },
  header: {
    height: screenHeight / 12,
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
  arrowDown: {
    width: 15,
    resizeMode: 'contain',
    height: 15,
    marginTop: screenHeight / 160,
    marginLeft: screenWidth / 80,
  },
  couponUsageHistoryMain: {
    backgroundColor: 'white',
    height: screenHeight - 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  mainButtonContainer: {
    // backgroundColor: 'pink',
    width: screenWidth,
    height: screenHeight / 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    fontSize: 20,
    marginHorizontal: 10,
    // backgroundColor: 'green',
  },
  refreshButton: {
    // backgroundColor: 'green',
    marginHorizontal: 10,
  },
  buttonText: {
    marginLeft: screenWidth / 20,
    fontSize: 15,
    // backgroundColor: 'blue',
    fontWeight: 'bold',
  },
  historyContainer: {
    width: screenWidth,
    // height: screenHeight / 6,
  },
  historyContent: {
    marginHorizontal: 20,
    marginVertical: 5,
    // backgroundColor: 'pink',
    height: screenHeight / 9,
  },
  historyText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 15,
    // backgroundColor: 'orange',
    // fontSize: 20,
  },
});
export default CouponUsageHistory;
