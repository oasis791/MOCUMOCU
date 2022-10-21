import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
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
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {LoggedInUserParamList} from '../../../App';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const today = new Date().toLocaleTimeString();
type MyPointScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'MyPointLog'
>;

const logListTest = [
  [
    {
      date: '5월 15일',
      action: '쿠폰 판 스킨 구매',
      time: '16:02',
      point: -300,
    },
    {
      date: '5월 15일',
      action: '출석 체크',
      time: '16:02',
      point: +10,
    },
  ],
  [
    {
      date: '5월 16일',
      action: '쿠폰 판 스킨 구매',
      time: '16:02',
      point: -300,
    },
    {
      date: '5월 16일',
      action: '출석 체크',
      time: '16:02',
      point: +10,
    },
    {
      date: '5월 16일',
      action: '출석 체크',
      time: '16:02',
      point: +10,
    },
    {
      date: '5월 16일',
      action: '출석 체크',
      time: '16:02',
      point: +10,
    },
  ],
];
function MyPointLog({navigation}: MyPointScreenProps) {
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  const toSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);
  const toCustomShop = useCallback(() => {
    navigation.navigate('CustomShop');
  }, [navigation]);
  const renderLog = logListTest.map(logList =>
    logList.map(log => {
      return (
        <View style={styles.logContent}>
          <Text style={{fontWeight: 'bold'}}>{log.date}</Text>
          <View style={styles.logText}>
            <Text style={{fontWeight: 'bold'}}>
              {log.action} {'\n'}
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: 'lightgray',
                }}>
                {log.time}
              </Text>
            </Text>
            <Text>
              {log.point <= 0 ? (
                <Text
                  style={{
                    color: '#363636',
                    fontFamily: 'GmarketSansTTFBold',
                  }}>
                  {log.point}P
                </Text>
              ) : (
                <Text style={{color: '#414FFD', fontWeight: 'bold'}}>
                  {`+ ${log.point}`}P
                </Text>
              )}
            </Text>
          </View>
        </View>
      );
    }),
  );
  // console.log(renderLog[0]);
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
              <Pressable onPress={toSettings} style={styles.headerButton}>
                <Image
                  source={require('../../assets/icon/mainSetting.png')}
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
          <ScrollView>
            <View style={styles.logContainer}>{renderLog}</View>
          </ScrollView>
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
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#414FFD',
    // opacity: 10,
  },
  myPointMain: {
    backgroundColor: 'white',
    height: screenHeight - 170,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
    marginHorizontal: 10,
    // backgroundColor: 'green',
  },
  refreshButton: {
    // backgroundColor: 'green',
    marginHorizontal: 10,
  },
  buttonText: {
    marginLeft: screenWidth / 20,
    // marginHorizontal: screenWidth / 30,
    fontFamily: 'GmarketSansTTF',
    fontSize: 15,
  },
  arrowDown: {
    width: 15,
    resizeMode: 'contain',
    height: 15,
    marginTop: screenHeight / 160,
    marginLeft: screenWidth / 80,
  },
  logContainer: {
    width: screenWidth,
    // backgroundColor: 'pink'
  },
  logContent: {
    marginHorizontal: 20,
    marginVertical: 5,
    // backgroundColor: 'pink',
    height: screenHeight / 9,
  },
  logText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 15,
    // backgroundColor: 'orange',
    // fontSize: 20,
  },
});
export default MyPointLog;
