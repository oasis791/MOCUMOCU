Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@yms1789 
oasis791
/
MOCUMOCU
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
MOCUMOCU/front/MOCUMOCU-main/src/pages/MainOwner.tsx /
@Narcoker
Narcoker Update: mainOwner
Latest commit d3eb915 14 hours ago
 History
 2 contributors
@Narcoker@yms1789
533 lines (495 sloc)  13.7 KB
   
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
  TouchableWithoutFeedback,
} from 'react-native';

import ActivityRings from 'react-native-activity-rings';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

function MainOwner() {
  const isAlarm = false;
  const userName = '김준서';
  const stores = [
    {
      name: '카페현욱',
      todays: 54,
      male: 42,
      female: 12,
      activityData: [
        {
          label: 'ACTIVITY',
          value: 0,
          color: '#FA6072',
        },
      ],
    },
    {
      name: '커피맛을 조금 아는 승민',
      todays: 30,
      male: 12,
      female: 18,
      activityData: [
        {
          label: 'ACTIVITY',
          value: 0,
          color: '#FA6072',
        },
      ],
    },
    {
      name: 'INYEONGCAFE',
      todays: 0,
      male: 0,
      female: 0,
      activityData: [
        {
          label: 'ACTIVITY',
          value: 0,
          color: '#FA6072',
        },
      ],
    },
    {
      name: '민수와 아이들',
      todays: 10,
      male: 5,
      female: 5,
      activityData: [
        {
          label: 'ACTIVITY',
          value: 0,
          color: '#FA6072',
        },
      ],
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
    radius: 45,
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
    <ScrollView style={styles.mainBackground}>
      <StatusBar hidden={true} />
      <View style={styles.mainHeader}>
        <Image
          source={require('../assets/mainLogoOwner.png')}
          style={styles.headerLogo}
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

      <View style={styles.ownerInfoWrapper}>
        <Text style={styles.myInfoText}>
          <Text style={styles.myInfoNameText}>{userName}</Text> 점주님,{'\n'}
          오늘도 모쿠하세요!
        </Text>
      </View>

      <View style={styles.storeListWrapper}>
        <Text style={styles.storeListTitle}>매장 리스트</Text>

        {stores.length === 0 ? (
          <View style={[styles.noneStoreWrapper, {height: 60}]}>
            <Text style={{top: 5}}>등록된 매장이 없습니다.</Text>
          </View>
        ) : (
          <ScrollView
            style={[
              styles.storeScrollView,
              stores.length < 3 ? {height: 'auto'} : null,
            ]}
            nestedScrollEnabled={true}>
            {stores.map((store, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    Alert.alert('알림', `${store.name} 세부정보로 이동`);
                  }}
                  style={[
                    styles.storeTab,
                    {borderBottomWidth: stores.length - 1 === i ? 0 : 1},
                  ]}>
                  <Text style={styles.storeTabText}>{store.name}</Text>
                  <Image
                    source={require('../assets/icon/arrow.png')}
                    style={styles.storeTabArrow}
                  />
                  {/* <Text  style={[styles.storeTabText, {alignItems: 'flex-end'}]} > {">"} </Text> */}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        <View style={styles.storeControlWrapper}>
          <Pressable style={styles.controlStoreButton}>
            <Text style={styles.controlStoreButtonText} onPress={toAddStore}>
              매장 등록
            </Text>
          </Pressable>
          <Text style={styles.pointButtonBar}>|</Text>
          <Pressable style={styles.controlStoreButton}>
            <Text style={styles.controlStoreButtonText} onPress={toDeleteStore}>
              매장 삭제
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.storeAnalysisWrapper}>
        <Text style={styles.storeAnalysisTitle}>매장 분석</Text>

        {stores.length === 0 ? (
          <View style={[styles.noneStoreWrapper, {height: 200}]}>
            <Text>등록된 매장이 없습니다.</Text>
          </View>
        ) : (
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={true}
            style={styles.storeAnalysisScrollView}>
            {stores.map((store, i) => {
              store.male === store.female
                ? ((store.activityData[0].value = 0.5),
                  (store.activityData[0].color = '#363636'))
                : store.male > store.female
                ? ((store.activityData[0].value =
                    store.male / (store.male + store.female)),
                  (store.activityData[0].color = '#3F83D3'))
                : ((store.activityData[0].value =
                    store.female / (store.male + store.female)),
                  (store.activityData[0].color = '#DD4435'));
              return (
                <TouchableOpacity
                  style={styles.analysisCard}
                  onPress={() => {
                    Alert.alert('알림', `${store.name} 매장 분석으로 이동`);
                  }}
                  key={i}>
                  <Text style={styles.analysisStoreNameText}>{store.name}</Text>
                  <View style={styles.cardChart}>
                    <View style={styles.todayVistorWrapper}>
                      <View style={{left: 15}}>
                        <Text style={[styles.todaysText, {top: 10}]}>
                          오늘 방문자 수
                        </Text>
                        <Text style={[styles.todaysText, {bottom: 10}]}>
                          {store.todays}명
                        </Text>
                      </View>

                      <View>
                        <ActivityRings
                          data={store.activityData}
                          config={activityConfig}
                        />
                      </View>

                      <View style={{right: 15}}>
                        {store.male > store.female ? (
                          <>
                            <Text style={[styles.todaysText, {top: 10}]}>
                              <Text style={{fontSize: 10}}>🔵 </Text>
                              남자 {store.male}
                            </Text>
                            <Text style={[styles.todaysText, {bottom: 10}]}>
                              &nbsp; &nbsp; &nbsp;여자 {store.female}
                            </Text>
                          </>
                        ) : store.male === store.female ? (
                          <>
                            <Text style={[styles.todaysText, {top: 10}]}>
                              <Text style={{fontSize: 10}}>🔵 </Text>
                              남자 {store.male}
                            </Text>
                            <Text style={[styles.todaysText, {bottom: 10}]}>
                              <Text style={{fontSize: 10}}>🔴 </Text>
                              여자 {store.female}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text style={[styles.todaysText, {top: 10}]}>
                              <Text style={{fontSize: 10}}>🔴 </Text>
                              여자 {store.female}
                            </Text>
                            <Text style={[styles.todaysText, {bottom: 10}]}>
                              &nbsp; &nbsp; &nbsp;남자 {store.male}
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
        )}
      </View>

      <View style={styles.bottomWrapper}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>자주묻는질문</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>공지사항</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainBackground: {
    backgroundColor: '#EAEAEA',
  },

  mainHeader: {
    width: screenWidth,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
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
    marginRight: 15,
  },
  headerAlarm: {
    resizeMode: 'contain',
    // backgroundColor: 'black',
    width: 20,
    height: 20,
  },

  ownerInfoWrapper: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: 'white',
    marginBottom: 9,
  },

  myInfoNameText: {
    fontFamily: 'GmarketSansTTFBold',
  },
  myInfoText: {
    marginLeft: 27,
    fontSize: 18,
    fontFamily: 'GmarketSansTTFMedium',
    color: '#363636',
    marginTop: 10,
    marginBottom: 30,
  },

  storeListWrapper: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 9,
  },

  storeListTitle: {
    fontFamily: 'GmarketSansTTFBold',
    color: '#363636',
    fontSize: 18,
    marginLeft: 27,
    marginTop: 20,
  },

  noneStoreWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeScrollView: {
    backgroundColor: 'white',
    marginHorizontal: 34,
    height: 240,
    borderRadius: 8,
  },

  storeTab: {
    height: 80,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    // backgroundColor: 'pink',
  },

  storeTabText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    fontSize: 14,
    color: 'black',
    paddingVertical: 22,
  },

  storeTabArrow: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    top: 30,
  },

  analysisStoreNameText: {
    marginTop: 5,
    fontSize: 15,
    top: -3,
    marginHorizontal: 18,
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
    color: '#727272',
    paddingLeft: 28,
  },
  pointButtonBar: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: '#727272',
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

  storeAnalysisWrapper: {
    padding: 25,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 9,
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
    backgroundColor: '#EFEFEF',
    marginHorizontal: 10,
    marginBottom: 10,
    width: 300,
    borderRadius: 10,
    elevation: 5,
  },

  todayVistorWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },

  todaysText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'black',
  },

  bottomWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 9,
    // paddingVertical: 10,
  },

  bottomButton: {
    flex: 1,
    alignItems: 'center',
  },

  bottomButtonText: {
    fontSize: 12,
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    color: '#A5A5A5',
  },
});
export default MainOwner;