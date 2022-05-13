import { StackRouter } from '@react-navigation/native';
import React, {useRef, useState} from 'react';
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

import Carousel from 'react-native-snap-carousel';
import store from '../store';
// import LinearGradient from 'react-native-linear-gradient';
// import InsetShadow from 'react-native-inset-shadow';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Ing from './Ing';
// import Complete from './Complete';
// import { SafeAreaView } from 'react-native-safe-area-context';
// const Stack = createNativeStackNavigator();
const screenWidth = Dimensions.get('screen').width;
function Main() {
  const isAlarm = false;
  const userName = '김준서';
  const stores = [
    {
      name: '캔버스 커피',
    },

    {
      name:  "카페현욱",
    },
        
    {
      name: '라떼는말이야',
    },     
    
    {
      name: "캔버스 커피",
    },
  
  ];
  const onSubmitSetting = () => {
    Alert.alert('알림', '설정');
  };
  const onSubmitAlarm = () => {
    Alert.alert('알림', '알람');
  };
  const toUsePoint = () => {
    Alert.alert('알림', '포인트 사용내역 이동');
  };
  const toUsePointShop = () => {
    Alert.alert('알림', '포인트 상점으로 이동');
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
           {
            stores.map((stores, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    Alert.alert('알림', `${stores['name']} 세부정보로 이동`);
                  }}
                  style={styles.storeTab}
                >
                  <Text style={styles.storeTabText}>{stores["name"]}</Text>
                  {/* <Text  style={[styles.storeTabText, {alignItems: 'flex-end'}]} > {">"} </Text> */}
                </TouchableOpacity>
              );
            })
          }

          </ScrollView>
            
          <View style={styles.pointButtonWrapper}>
            <Pressable style={styles.pointButton}>
              <Text style={styles.pointButtonText} onPress={toUsePoint}>
                매장 등록
              </Text>
            </Pressable>
            <Text style={styles.pointButtonBar}>|</Text>
            <Pressable style={styles.pointButton}>
              <Text style={styles.pointButtonText} onPress={toUsePointShop}>
                매장 삭제
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.div}></View>

      <View style={styles.storeAnalysis}>
        <Text style={styles.storeAnalysisTitle}>매장 분석</Text>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          style={styles.storeAnalysisScrollView}>
          
          {

          }

          <View style={styles.analysisCard}>
            <Text style={styles.analysisStoreNameText}>쿠폰 1</Text>

          </View>
          <View style={styles.analysisCard}>
            <Text style={styles.analysisStoreNameText}>쿠폰 2</Text>
          </View>


          </ScrollView>
      </View>

      {/* <View style={styles.myCoupon}>
        <View style={styles.myCouponTextWrapper}>
          <Text style={styles.myCouponText}>내 쿠폰함</Text>
          <Pressable style={styles.myCouponboxButton}>
            <Text style={styles.myCouponboxButtonText}>전체 +</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          style={styles.scrollView}>
          <View style={styles.scrollItem}>
            <Text style={styles.myInfoPointText}>쿠폰 1</Text>
            <Text style={[styles.myInfoPointText, {color: '#ec6478'}]}>
              A 가게
            </Text>
          </View>
          <View style={styles.scrollItem}>
            <Text style={styles.myInfoPointText}>쿠폰 2</Text>
            <Text style={[styles.myInfoPointText, {color: '#ec6478'}]}>
              B 가게
            </Text>
          </View>
          <View style={styles.scrollItem}>
            <Text style={styles.myInfoPointText}>쿠폰 3</Text>
            <Text style={[styles.myInfoPointText, {color: '#ec6478'}]}>
              C 가게
            </Text>
          </View>
        </ScrollView>
      </View> */}
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
    alignItems: 'flex-end'
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
    top : 70
  },
  analysisStoreNameText: {
    marginTop: 5,
    fontSize: 15,
    top: -3,
    marginHorizontal: 25,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'black',
  },
  pointButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10
  },
  pointButton: {
    marginLeft: 45,
    flex: 1,
  },
  pointButtonText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'white',
    paddingLeft: 28
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

  storeAnalysis: {
    padding: 25
  },

  storeAnalysisTitle: {
    marginTop: -10,
    // marginLeft: 30,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'black',
    fontSize: 18,

  },

  storeAnalysisScrollView: {
    
  },
  scrollView: {
    // marginVertical: ,
    // backgroundColor: 'green',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  analysisCard: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    // marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignItems: 'baseline',
    width: 300,
    height: 80,
    borderRadius: 10,
    elevation: 20,
  },
  eventImage: {
    height: 210,
    borderRadius: 10,
  },

  storeListTitle: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: "white",
    fontSize: 18
  },

  storeListWrapper: {
    marginLeft: 25,
    marginTop: 55,
  },

  storeScrollView: {
    backgroundColor: "white",
    marginHorizontal: 25,
    height: 240,
    borderRadius: 8,
  },

  storeTab: {
    height: 80,
    width: '100%',
    alignContent: "center",
    flexDirection: "row",
    // backgroundColor: "blue"
    
  },

  storeTabText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
    padding: 18,
  },

  div: {
    width: '100%',
    height: 15,
    backgroundColor: "lightgray",

  }


});
export default Main;
