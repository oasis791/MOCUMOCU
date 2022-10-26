import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {historygedInUserParamList} from '../../../App';
export type History = {
  marketName: String;
  month: Number;
  date: Number;
  hour: Number;
  minute: Number;
  stamp: Number;
};
export interface userType {
  [key: string]: any;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const couponUsageHistoryTest = [
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 16,
    hour: 16,
    minute: 32,
    // time: '16:32',
    stamp: -5,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 16,
    hour: 16,
    minute: 32,
    // time: '16:32',
    stamp: -5,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 15,
    hour: 16,
    minute: 32,
    // time: '16:32',
    stamp: 5,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 15,
    hour: 16,
    minute: 32,
    // time: '16:32',
    stamp: 5,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 14,
    hour: 16,
    minute: 32,
    // time: '16:32',
    stamp: 5,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 14,
    hour: 16,
    minute: 32,
    // time: '16:32',
    stamp: -5,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 13,
    hour: 16,
    minute: 32,
    // time: '16:32',
    stamp: 5,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 13,
    hour: 16,
    minute: 32,
    // time: '16:32',
    stamp: -5,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 12,
    hour: 16,
    minute: 32,
    // time: '16:32',
    stamp: 5,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 12,
    hour: 16,
    minute: 32,
    // time: '16:32',
    stamp: -5,
  },
];

type couponUsageHistoryScreenProps = NativeStackScreenProps<
  historygedInUserParamList,
  'CouponUsageHistory'
>;
function CouponUsageHistory({navigation}: couponUsageHistoryScreenProps) {
  const [couponHistory, setCouponHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const toBack = useCallback(() => {
    navigation.popToTop(); // 뒤로 가기
  }, [navigation]);
  const toSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);
  const mappingCouponDate: userType = couponUsageHistoryTest.reduce(
    (acc: userType, cur) => {
      let key = `${cur.month}.${cur.date}`;
      acc[key] = [...(acc[key] || []), cur];
      return acc;
    },
    {},
  );
  /** mappingCouponDate
   *  {
   *    "5.14": [{"date": 14, "hour": 16, "marketName": "카페현욱", "minute": 32, "month": 5, "stamp": -5}],
   *    "5.15": [{"date": 15, "hour": 16, "marketName": "카페현욱", "minute": 32, "month": 5, "stamp": 5}],
   *    "5.16": [{"date": 16, "hour": 16, "marketName": "카페현욱", "minute": 32, "month": 5, "stamp": -5}]
   *  }
   */

  const getData = () => {
    setIsLoading(true);
    // axios
    //   .get(`https://randomuser.me/api/?page=${currentPage}&results=10`)
    //   .then(res => {
    //     //setUsers(res.data.results);
    //     setCouponHistory([...couponHistory, ...res.data.results]);
    //     setIsLoading(false);
    //   });
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          // height: screenHeight / 10,
          flexGrow: 0,
        }}>
        {item}
      </View>
    );
  };
  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#eeeeee" />
      </View>
    ) : null;
  };
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    console.log(currentPage);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const renderMappingCouponDateKey = Object.keys(mappingCouponDate).map(
    date => {
      return (
        <View style={styles.historyContent}>
          <Text style={{fontWeight: 'bold'}}>{date}</Text>
          {mappingCouponDate[date].map((history: History) => (
            // <View style={styles.historyContent}>
            <View style={styles.historyText}>
              <Text style={{fontWeight: 'bold'}}>
                {history.marketName} {'\n'}
                <Text
                  style={{
                    fontFamily: '',
                    fontSize: 15,
                    color: 'lightgray',
                  }}>
                  {`${history.hour}:${history.minute}`}
                </Text>
              </Text>
              <Text>
                {history.stamp <= 0 ? (
                  <Text
                    style={{
                      color: '#363636',
                      fontFamily: '',
                      fontWeight: 'bold',
                    }}>
                    {`-도장 ${Math.abs(Number(history.stamp))}`}개
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: '#414FFD',
                      fontFamily: '',
                      fontWeight: 'bold',
                    }}>
                    {`+도장 ${history.stamp}`}개
                  </Text>
                )}
              </Text>
            </View>
          ))}
        </View>
      );
    },
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
                }}>
                <Text style={styles.buttonText}>전체</Text>
                <Image
                  source={require('../../assets/icon/arrowDown.png')}
                  style={styles.arrowDown}
                />
              </View>
            </Pressable>
          </View>
          <FlatList
            data={renderMappingCouponDateKey}
            renderItem={renderItem}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0.1}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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
    marginHorizontal: screenHeight / 60,
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
    // width: 15,
    width: screenWidth / 23,
    resizeMode: 'contain',
    height: screenHeight / 40,
    marginTop: screenHeight / 160,
    marginLeft: screenWidth / 80,
  },
  couponUsageHistoryMain: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: screenHeight / 1.09,
  },
  mainButtonContainer: {
    width: screenWidth,
    height: screenHeight / 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    fontSize: 20,
    marginHorizontal: screenHeight / 60,
  },
  refreshButton: {
    marginHorizontal: screenHeight / 60,
  },
  buttonText: {
    marginLeft: screenWidth / 20,
    fontSize: 15,

    fontWeight: 'bold',
  },
  historyContainer: {
    width: screenWidth,
  },
  historyContent: {
    marginHorizontal: screenHeight / 30,
    marginVertical: screenHeight / 110,
    // height: screenHeight / 5,
    // backgroundColor: 'pink',
  },
  historyText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: screenHeight / 40,
    marginVertical: screenHeight / 40,
  },
  loaderStyle: {
    marginVertical: screenHeight / 40,
    alignItems: 'center',
  },
});
export default CouponUsageHistory;
