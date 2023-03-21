import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {LoggedInUserParamList} from '../../../App';
import {RootState} from '../../store/reducer';
import {userType} from './CouponUsageHistory';
import {Config} from 'react-native-config';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type Log = {
  type: string;
  month: number;
  date: number;
  hour: number;
  minute: number;
  point: number;
};
type MyPointScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'MyPointLog'
>;

// const logListTest = [
//   {
//     // date: '5월 16일',
//     marketName: '카페현욱',
//     month: 5,
//     date: 16,
//     hour: 16,
//     minute: 32,
//     // time: '16:32',
//     point: -500,
//   },
//   {
//     // date: '5월 16일',
//     marketName: '카페현욱',
//     month: 5,
//     date: 16,
//     hour: 16,
//     minute: 32,
//     // time: '16:32',
//     point: -500,
//   },
//   {
//     // date: '5월 16일',
//     marketName: '카페현욱',
//     month: 5,
//     date: 15,
//     hour: 16,
//     minute: 32,
//     // time: '16:32',
//     point: 500,
//   },
//   {
//     // date: '5월 16일',
//     marketName: '카페현욱',
//     month: 5,
//     date: 15,
//     hour: 16,
//     minute: 32,
//     // time: '16:32',
//     point: 500,
//   },
//   {
//     // date: '5월 16일',
//     marketName: '카페현욱',
//     month: 5,
//     date: 14,
//     hour: 16,
//     minute: 32,
//     // time: '16:32',
//     point: 500,
//   },
//   {
//     // date: '5월 16일',
//     marketName: '카페현욱',
//     month: 5,
//     date: 14,
//     hour: 16,
//     minute: 32,
//     // time: '16:32',
//     point: -500,
//   },
//   {
//     // date: '5월 16일',
//     marketName: '카페현욱',
//     month: 5,
//     date: 13,
//     hour: 16,
//     minute: 32,
//     // time: '16:32',
//     point: 500,
//   },
//   {
//     // date: '5월 16일',
//     marketName: '카페현욱',
//     month: 5,
//     date: 13,
//     hour: 16,
//     minute: 32,
//     // time: '16:32',
//     point: -500,
//   },
//   {
//     // date: '5월 16일',
//     marketName: '카페현욱',
//     month: 5,
//     date: 12,
//     hour: 16,
//     minute: 32,
//     // time: '16:32',
//     point: 500,
//   },
//   {
//     // date: '5월 16일',
//     marketName: '카페현욱',
//     month: 5,
//     date: 12,
//     hour: 16,
//     minute: 32,
//     // time: '16:32',
//     point: -500,
//   },
// ];
function MyPointLog({navigation}: MyPointScreenProps) {
  const [pointLogList, setPointLogList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  const toCustomShop = useCallback(() => {
    navigation.navigate('CustomShop');
  }, [navigation]);
  // const mappingPointLogDate: userType = logListTest.reduce(
  //   (acc: userType, cur) => {
  //     let key = `${cur.month}.${cur.date}`;
  //     acc[key] = [...(acc[key] || []), cur];
  //     return acc;
  //   },
  //   {},
  // );
  const logType = {
    STAMP: '도장 구매',
    BOARD: '쿠폰 판 구매',
    ATTENDANCE: '출석체크',
  };
  const customerPoint = useSelector((state: RootState) => state.userTest.point);
  async function getPointData() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${Config.API_URL}/pointlog/customer/scroll/?page=${currentPage}&size=10&sort=id&customerId=2`,
      );
      console.log('resData: ', response.data);
      const mappingPointDate: userType = response.data.content.reduce(
        (acc: userType, cur: {month: number; day: number}) => {
          let key = `${cur.month}.${cur.day}`;
          acc[key] = [...(acc[key] || []), cur];
          return acc;
        },
        [],
      );
      setPointLogList([...pointLogList, mappingPointDate]);
      setIsLast(response.data.last);
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        console.log('error', errorResponse);
        setIsLoading(false);
      }
    }
  }
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          height: screenHeight / 4,
          flexGrow: 0,
        }}>
        {item}
      </View>
    );
  };
  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="black" />
      </View>
    ) : null;
  };
  const loadMoreItem = () => {
    isLast ? null : setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    isLast === false ? getPointData() : setIsLoading(false);
    console.log('currentPage', currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isLast]);
  const renderMappingPointLogDateKey = pointLogList.map(poingLog => {
    return Object.keys(poingLog).map(date => {
      return (
        <View style={styles.logContent}>
          <Text style={{fontWeight: 'bold', color: '#a0a0a0'}}>{date}</Text>
          {poingLog[date].map((log: Log) => (
            // <View style={styles.historyContent}>
            <View style={styles.logText}>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {logType[log.type]} {'\n'}
                <Text
                  style={{
                    fontFamily: '',
                    fontSize: 15,
                    color: 'lightgray',
                  }}>
                  {`${log.hour}:${log.minute}`}
                </Text>
              </Text>
              <Text>
                {log.point <= 0 ? (
                  <>
                    <Text
                      style={{
                        color: '#363636',
                        fontFamily: '',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      {log.point}P
                    </Text>
                  </>
                ) : (
                  <Text
                    style={{
                      color: '#414FFD',
                      fontFamily: '',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    {`+ ${log.point}`}P
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
        <View style={styles.myPointTop}>
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
          <View style={styles.topContent}>
            <Text style={styles.topText}>
              <Text style={{color: 'black'}}>내 포인트{'\n'}</Text>
              <Text
                style={{
                  color: '#414FFD',
                  fontFamily: 'GmarketSansTTFBold',
                  fontSize: 25,
                }}>
                {customerPoint}P
              </Text>
            </Text>
            <TouchableOpacity
              style={styles.topButton}
              activeOpacity={0.7}
              onPress={toCustomShop}>
              <Image
                source={require('../../assets/icon/store.png')}
                style={styles.cartImage}
              />
              <Text
                style={{
                  fontFamily: 'GmarketSansTTFBold',
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 10,
                  marginVertical: 10,
                  // marginHorizontal: 5,
                }}>
                포인트 상점
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.myPointMain}>
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
            data={renderMappingPointLogDateKey}
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
    height: screenHeight / 15,
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
    height: 18,
  },
  myPointTop: {
    height: screenHeight / 3.5,
    width: screenWidth,
    alignItems: 'center',
  },
  topContent: {
    height: screenHeight / 5,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth,
  },
  topText: {
    textAlign: 'left',
    width: screenWidth / 5,
    height: screenHeight / 13,
    // backgroundColor: 'white',
    marginHorizontal: 25,
    // marginBottom: 5,
    // fontFamily: 'GmarketSansTTFBold',
    fontWeight: 'bold',
    fontSize: 15,
  },
  topButton: {
    width: screenWidth / 5,
    height: screenWidth / 5,
    marginHorizontal: screenHeight / 30,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#414FFD',
    // opacity: 10,
  },
  cartImage: {
    // flex: 1,
    marginTop: screenHeight / 60,
    width: screenHeight / 15,
    resizeMode: 'contain',
    // flex: 1 / 3,
    // marginHorizontal: 15,
    height: screenWidth / 15,
    // marginRight: screenWidth / 100,
    // backgroundColor: 'pink',
  },
  myPointMain: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: screenHeight / 1.4,
  },
  mainButtonContainer: {
    // backgroundColor: 'pink',
    fontFamily: 'GmarketSansTTF',
    width: screenWidth,
    height: screenHeight / 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    fontSize: 20,
    marginHorizontal: screenHeight / 60,
    // backgroundColor: 'green',
  },
  refreshButton: {
    // backgroundColor: 'green',
    marginHorizontal: screenHeight / 60,
  },
  buttonText: {
    marginLeft: screenWidth / 20,
    // marginHorizontal: screenWidth / 30,
    fontFamily: 'GmarketSansTTF',
    fontSize: 15,
    color: '#a0a0a0',
  },
  arrowDown: {
    width: screenWidth / 23,
    // width: 15,
    resizeMode: 'contain',
    height: screenHeight / 40,
    // height: 15,
    marginTop: screenHeight / 160,
    marginLeft: screenWidth / 80,
  },
  logContent: {
    // marginHorizontal: 20,
    height: screenHeight / 8.5,
    marginHorizontal: screenHeight / 30,
    marginVertical: screenHeight / 110,
    // width: screenWidth,
  },
  logText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 15,
    marginHorizontal: screenHeight / 40,
    // marginVertical: 15,
    marginVertical: screenHeight / 60,
    // backgroundColor: 'orange',
    // fontSize: 20,
  },
  loaderStyle: {
    marginVertical: screenHeight / 40,
    alignItems: 'center',
  },
});
export default MyPointLog;
