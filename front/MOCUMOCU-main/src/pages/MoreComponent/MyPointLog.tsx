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
import {LoggedInUserParamList} from '../../../App';
import {userType} from './CouponUsageHistory';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const today = new Date().toLocaleTimeString();

type Log = {
  marketName: String;
  month: Number;
  date: Number;
  hour: Number;
  minute: Number;
  point: Number;
};

type MyPointScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'MyPointLog'
>;

const logListTest = [
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 16,
    hour: 16,
    minute: 32,
    // time: '16:32',
    point: -500,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 16,
    hour: 16,
    minute: 32,
    // time: '16:32',
    point: -500,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 15,
    hour: 16,
    minute: 32,
    // time: '16:32',
    point: 500,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 15,
    hour: 16,
    minute: 32,
    // time: '16:32',
    point: 500,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 14,
    hour: 16,
    minute: 32,
    // time: '16:32',
    point: 500,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 14,
    hour: 16,
    minute: 32,
    // time: '16:32',
    point: -500,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 13,
    hour: 16,
    minute: 32,
    // time: '16:32',
    point: 500,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 13,
    hour: 16,
    minute: 32,
    // time: '16:32',
    point: -500,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 12,
    hour: 16,
    minute: 32,
    // time: '16:32',
    point: 500,
  },
  {
    // date: '5월 16일',
    marketName: '카페현욱',
    month: 5,
    date: 12,
    hour: 16,
    minute: 32,
    // time: '16:32',
    point: -500,
  },
];
function MyPointLog({navigation}: MyPointScreenProps) {
  const [pointLogList, setPointLogList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  const toSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);
  const toCustomShop = useCallback(() => {
    navigation.navigate('CustomShop');
  }, [navigation]);
  const mappingPointLogDate: userType = logListTest.reduce(
    (acc: userType, cur) => {
      let key = `${cur.month}.${cur.date}`;
      acc[key] = [...(acc[key] || []), cur];
      return acc;
    },
    {},
  );
  async function getData() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://aa2d-2001-2d8-6715-79fb-c946-ae04-da44-c084.jp.ngrok.io/couponlog/customer/scroll/?page=0&size=2&sort=id&customerId=2',
      );
      console.log('resData: ', response.data);
      const mappingPointDate: userType = response.data.reduce(
        (acc: userType, cur: {month: number; day: number}) => {
          let key = `${cur.month}.${cur.day}`;
          acc[key] = [...(acc[key] || []), cur];
          return acc;
        },
        [],
      );
      setPointLogList([...pointLogList, mappingPointDate]);
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
    setCurrentPage(currentPage + 1);
    console.log(currentPage);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  const renderMappingPointLogDateKey = pointLogList.map(poingLog => {
    return Object.keys(poingLog).map(date => {
      return (
        <View style={styles.logContent}>
          <Text style={{fontWeight: 'bold'}}>{date}</Text>
          {mappingPointLogDate[date].map((log: Log) => (
            // <View style={styles.historyContent}>
            <View style={styles.logText}>
              <Text style={{fontWeight: 'bold'}}>
                {log.marketName} {'\n'}
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
                  <Text
                    style={{
                      color: '#363636',
                      fontFamily: '',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    {log.point}P
                  </Text>
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
              <Text>내 포인트{'\n'}</Text>
              <Text
                style={{
                  color: '#414FFD',
                  fontFamily: 'GmarketSansTTFBold',
                  fontSize: 25,
                }}>
                500P
              </Text>
            </Text>
            <TouchableOpacity
              style={styles.topButton}
              activeOpacity={0.7}
              onPress={toCustomShop}>
              <Text>이미지</Text>
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
