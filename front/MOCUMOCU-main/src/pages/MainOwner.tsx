import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import ActivityRings from 'react-native-activity-rings';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

function MainOwner() {
  const isAlarm = false;
  const userName = '김준서';
  const stores = [
    {
      name: '캔버스 커피',
      todays: 54,
      male: 42,
      female: 12,
    },

    {
      name: '카페현욱',
      todays: 30,
      male: 12,
      female: 18,
    },

    {
      name: '라떼는말이야',
      todays: 0,
      male: 0,
      female: 0,
    },

    {
      name: '민수와 아이들',
      todays: 10,
      male: 5,
      female: 5,
    },
  ];

  //   const activityData = [
  //    { value: 0.8 },
  //    { value: 0.6 },
  //    { value: 0.2 }
  //  ];

  const activityConfig = {
    width: 150,
    height: 150,
    radius: 50,
    ringSize: 14,
  };

  const activityData = [
    //  {
    //     value: 0.8, // ring will use color from theme
    //   },
    {
      label: 'ACTIVITY',
      value: 0.5,
      color: '#FA6072',
    },
  ];

  const onSubmitSetting = () => {
    Alert.alert('알림', '설정');
  };
  const onSubmitAlarm = () => {
    Alert.alert('알림', '알람');
  };
  const toAddStore = () => {
    Alert.alert('알림', '매장 등록 이동');
  };
  const toDeleteStore = () => {
    Alert.alert('알림', '매장 삭제 이동');
  };
  return (
    <ScrollView>
      <StatusBar hidden={true} />
      <ImageBackground
        style={styles.mainBackground}
        source={require('../assets/mainMyPageBackground.png')}>
        <View style={[styles.header, {position: 'absolute'}]}>
          <Image
            style={styles.headerLogo}
            source={require('../assets/mainLogo.png')}
          />
          <View style={styles.headerButtonWrapper}>
            <Pressable onPress={onSubmitSetting}>
              <Image
                source={require('../assets/icon/mainSetting.png')}
                style={styles.headerSetting}
              />
            </Pressable>
            <Pressable onPress={onSubmitAlarm}>
              <Image
                source={
                  isAlarm
                    ? require('../assets/icon/mainAlarmActive.png')
                    : require('../assets/icon/mainAlarm.png')
                }
                style={styles.headerAlarm}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.myInfo}>
          <Text style={styles.myInfoText}>
            {userName} 점주님,{'\n'}오늘도 모쿠하세요!
          </Text>

          <View style={styles.storeListWrapper}>
            <Text style={styles.storeListTitle}>매장 리스트</Text>
          </View>

          <ScrollView style={styles.storeScrollView}>
            {stores.map((stores, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    Alert.alert('알림', `${stores.name} 세부정보로 이동`);
                  }}
                  style={styles.storeTab}>
                  <Text style={styles.storeTabText}>{stores.name}</Text>
                  {/* <Text  style={[styles.storeTabText, {alignItems: 'flex-end'}]} > {">"} </Text> */}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.storeControlWrapper}>
            <Pressable style={styles.controlStoreButton}>
              <Text style={styles.controlStoreButtonText} onPress={toAddStore}>
                매장 등록
              </Text>
            </Pressable>
            <Text style={styles.pointButtonBar}>|</Text>
            <Pressable style={styles.controlStoreButton}>
              <Text
                style={styles.controlStoreButtonText}
                onPress={toDeleteStore}>
                매장 삭제
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.divider} />

      <View style={styles.storeAnalysis}>
        <Text style={styles.storeAnalysisTitle}>매장 분석</Text>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          style={styles.storeAnalysisScrollView}>
          {stores.map((stores, i) => {
            return (
              <TouchableOpacity
                style={styles.analysisCard}
                onPress={() => {
                  Alert.alert('알림', `${stores.name} 매장 분석으로 이동`);
                }}
                key={stores}>
                <Text style={styles.analysisStoreNameText}>{stores.name}</Text>
                <View style={styles.cardChart}>
                  <View style={styles.todayVistorWrapper}>
                    <View>
                      <Text style={[styles.todaysText, {top: 10}]}>
                        오늘 방문자 수
                      </Text>
                      <Text style={[styles.todaysText, {bottom: 10}]}>
                        {stores.todays}명
                      </Text>
                    </View>

                    <View>
                      <ActivityRings
                        data={activityData}
                        config={activityConfig}
                      />
                    </View>

                    <View>
                      {stores.male > stores.female ? (
                        <>
                          <Text
                            style={[
                              styles.todaysText,
                              {top: 10, color: 'blue'},
                            ]}>
                            남자 {stores.male}
                          </Text>
                          <Text
                            style={[
                              styles.todaysText,
                              {bottom: 10, color: 'red'},
                            ]}>
                            여자 {stores.female}
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text
                            style={[
                              styles.todaysText,
                              {top: 10, color: 'red'},
                            ]}>
                            여자 {stores.female}
                          </Text>
                          <Text
                            style={[
                              styles.todaysText,
                              {bottom: 10, color: 'blue'},
                            ]}>
                            남자 {stores.male}
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainBackground: {
    // height: 450
  },
  header: {
    width: '100%',
    backgroundColor: 'trasparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    marginTop: 10,
    resizeMode: 'contain',
    width: 50,
    height: 25,
    marginHorizontal: 10,
    marginBottom: 10,
    // justifyContent: 'flex-start',
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  headerSetting: {
    width: 20,
    // marginLeft: 10,
    // backgroundColor: 'black',
    resizeMode: 'contain',
    height: 18,
    // left: 225,
    // float: 'right',
  },
  headerAlarm: {
    // marginTop: ,
    // marginLeft: 10,
    width: 50,
    resizeMode: 'contain',
    height: 20,
    // left: 220,
    alignItems: 'flex-end',
    // backgroundColor: 'black',
  },
  eventBanner: {
    height: 210,
    width: screenWidth,
    // elevation: 10,
  },
  myInfo: {
    // backgroundColor: 'pink',
    // height: 200,
    // width: ,
    // elevation:
  },
  myInfoText: {
    fontSize: 18,
    // top: -3,
    top: 50,
    marginLeft: 25,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'white',
    width: 150,
  },
  myInfoPoint: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 28,
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignItems: 'baseline',
    width: 300,
    height: 80,
    borderRadius: 10,
    elevation: 10,
    top: 70,
  },
  analysisStoreNameText: {
    marginTop: 5,
    fontSize: 15,
    top: -3,
    marginHorizontal: 25,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'black',
  },

  cardChart: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  storeControlWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  controlStoreButton: {
    marginLeft: 45,
    flex: 1,
  },
  controlStoreButtonText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'white',
    paddingLeft: 28,
  },
  pointButtonBar: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'white',
    // marginLeft: 0,
    // paddingLeft: 1,
  },
  myCoupon: {
    // flex: 1,
    backgroundColor: 'white',
    height: 135,
    // elevation: 30,
  },
  myCouponboxButton: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  myCouponboxButtonText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'gray',
    fontSize: 12,
    marginRight: 20,
  },
  myCouponTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  eventImage: {
    height: 210,
    borderRadius: 10,
  },

  storeListTitle: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'white',
    fontSize: 18,
  },

  storeListWrapper: {
    marginLeft: 25,
    marginTop: 55,
  },

  storeScrollView: {
    backgroundColor: 'white',
    marginHorizontal: 25,
    height: 240,
    borderRadius: 8,
  },

  storeTab: {
    height: 80,
    width: '100%',
    alignContent: 'center',
    flexDirection: 'row',
    // backgroundColor: "blue"
  },

  storeTabText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
    padding: 18,
  },

  divider: {
    width: '100%',
    height: 15,
    backgroundColor: 'lightgray',
  },

  storeAnalysis: {
    padding: 25,
  },

  storeAnalysisTitle: {
    marginTop: -10,
    // marginLeft: 30,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'black',
    fontSize: 18,
  },

  storeAnalysisScrollView: {},

  analysisCard: {
    marginTop: 5,
    backgroundColor: 'white',
    marginHorizontal: 10,
    width: 300,
    borderRadius: 10,
    elevation: 20,
  },

  todayVistorWrapper: {
    flexDirection: 'row',
  },

  todaysText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'black',
  },
});
export default MainOwner;
