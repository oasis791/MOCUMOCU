import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Pressable,
  StatusBar,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {LoggedInUserParamList} from '../../../App';
import {Config} from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
export type History = {
  marketName: String;
  month: Number;
  day: Number;
  hour: Number;
  minute: Number;
  stamp: Number;
};
export interface userType {
  [key: string]: any;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
// const couponHistoryTestList = [
//   {
//     '5.14': [
//       {
//         date: 14,
//         hour: 16,
//         marketName: '카페현욱',
//         minute: 32,
//         month: 5,
//         stamp: -5,
//       },
//     ],
//     '5.15': [
//       {
//         date: 15,
//         hour: 16,
//         marketName: '카페현욱',
//         minute: 32,
//         month: 5,
//         stamp: 5,
//       },
//     ],
//     '5.16': [
//       {
//         date: 16,
//         hour: 16,
//         marketName: '카페현욱',
//         minute: 32,
//         month: 5,
//         stamp: -5,
//       },
//     ],
//   },
// ];

// const responseData = [
//   {
//     day: 27,
//     hour: 13,
//     marketName: '민수네 가게',
//     minute: 4,
//     month: 10,
//     stamp: 231,
//   },
//   {
//     day: 27,
//     hour: 13,
//     marketName: '민수네 가게',
//     minute: 4,
//     month: 10,
//     stamp: 231,
//   },
//   {
//     day: 27,
//     hour: 13,
//     marketName: '민수네 가게',
//     minute: 4,
//     month: 10,
//     stamp: 231,
//   },
// ];

type couponUsageHistoryScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'CouponUsageHistory'
>;
function CouponUsageHistory({navigation}: couponUsageHistoryScreenProps) {
  const [couponHistoryList, setCouponHistoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const toBack = useCallback(() => {
    navigation.popToTop(); // 뒤로 가기
  }, [navigation]);
  const customerId = useSelector((state: RootState) => state.userTest.id);
  // const mappingCouponDate: userType = useCallback(() => {
  //   console.log('mapping', couponHistory);
  //   couponHistory.reduce((acc: userType, cur) => {
  //     let key = `${cur.month}.${cur.day}`;
  //     acc[key] = [...(acc[key] || []), cur];
  //     return acc;
  //   }, {});
  // }, [couponHistory]);

  /** mappingCouponDate
   *  {
   *    "5.14": [{"date": 14, "hour": 16, "marketName": "카페현욱", "minute": 32, "month": 5, "stamp": -5}],
   *    "5.15": [{"date": 15, "hour": 16, "marketName": "카페현욱", "minute": 32, "month": 5, "stamp": 5}],
   *    "5.16": [{"date": 16, "hour": 16, "marketName": "카페현욱", "minute": 32, "month": 5, "stamp": -5}]
   *  }
   */
  async function getCouponUsageData() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${Config.API_URL}/couponlog/customer/scroll/?page=${currentPage}&size=10&sort=id&customerId=${customerId}`,
      );
      console.log('resData: ', response.data);
      const mappingCouponDate: userType = response.data.content.reduce(
        (acc: userType, cur: {month: number; day: number}) => {
          let key = `${cur.month}.${cur.day}`;
          acc[key] = [...(acc[key] || []), cur];
          return acc;
        },
        [],
      );
      console.log('mapping:', mappingCouponDate);
      setCouponHistoryList([...couponHistoryList, mappingCouponDate]);
      setIsLast(response.data.last);
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        console.log(errorResponse);
        setIsLoading(false);
      }
    }
  }

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
    isLast ? null : setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    isLast === false ? getCouponUsageData() : setIsLoading(false);
    console.log('currentPage', currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isLast]);
  // const mappingCouponDate: userType = couponHistoryList.reduce(
  //   (acc: userType, cur: {month: number; day: number}) => {
  //     let key = `${cur.month}.${cur.day}`;
  //     acc[key] = [...(acc[key] || []), cur];
  //     return acc;
  //   },
  //   [],
  // );
  // console.log('mapping', mappingCouponDate);
  const renderMappingCouponDateKey = couponHistoryList.map(couponHistory => {
    console.log('couponHistory:', couponHistory);
    return Object.keys(couponHistory).map((date: string) => {
      console.log('date', date);
      return (
        <View style={styles.historyContent}>
          <Text style={{fontWeight: 'bold'}}>{date}</Text>
          {couponHistory[date].map((history: History) => (
            // <View style={styles.historyContent}>
            <View style={styles.historyText}>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
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
    });
  });
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
