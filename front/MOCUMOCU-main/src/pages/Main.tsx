import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';
import {LoggedInUserParamList} from '../../App';
// import LinearGradient from 'react-native-linear-gradient';
// import InsetShadow from 'react-native-inset-shadow';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Ing from './Ing';
// import Complete from './Complete';
// import { SafeAreaView } from 'react-native-safe-area-context';
// const Stack = createNativeStackNavigator();
const screenWidth = Dimensions.get('screen').width;
const data = [
  {
    id: 1,
    url: 'https://i.ibb.co/F6rmJFW/event-Banner.png',
  },
  {
    id: 2,
    url: 'https://i.ibb.co/HCY0yzX/event-Banner2.png',
  },
];
const couponList = [
  {
    couponId: '쿠폰 1',
    market: 'A 가게',
  },
  {
    couponId: '쿠폰 2',
    market: 'B 가게',
  },
  {
    couponId: '쿠폰 3',
    market: 'C 가게',
  },
];

type MainScreenProps = NativeStackScreenProps<LoggedInUserParamList, 'Main'>;
function Main({navigation}: MainScreenProps) {
  const isAlarm = true;
  const userName = '여민수';
  const myPoint = 1000;
  const onSubmitSetting = () => {
    Alert.alert('알림', '설정');
  };
  const onSubmitAlarm = () => {
    Alert.alert('알림', '알람');
  };
  const onSubmitEvent = () => {
    Alert.alert('알림', '이벤트');
  };
  const toPointLog = useCallback(() => {
    navigation.navigate('PointLog');
  }, [navigation]);
  const toCustomShop = useCallback(() => {
    navigation.navigate('CustomShop');
  }, [navigation]);
  const toCouponList = () => {
    Alert.alert('알림', '쿠폰 리스트 화면으로 이동');
  };
  const renderCoupon = couponList.map(coupon => {
    return (
      <>
        <View style={styles.scrollItem}>
          <Text style={styles.myInfoPointText}>{coupon.couponId}</Text>
          <Text style={[styles.myInfoPointText, {color: '#ec6478'}]}>
            {coupon.market}
          </Text>
        </View>
      </>
    );
  });

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={onSubmitEvent} activeOpacity={0.7}>
        <ImageBackground
          style={styles.eventImage}
          source={{uri: item.url}}
          imageStyle={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
        />
      </TouchableOpacity>
    );
  };
  const isCarousel = useRef(null);
  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView fadingEdgeLength={10}>
        <StatusBar hidden={true} />
        <ImageBackground
          style={styles.event}
          source={require('../assets/mainMyPageBackground.png')}>
          <Carousel
            ref={isCarousel}
            layout={'default'}
            data={data}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            autoplay
            loop
            autoplayInterval={4000}
            enableSnap
            activeAnimationType="decay"
            inactiveSlideScale={1}
          />
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
              {userName} 님,{'\n'}오늘도 모쿠하세요!
            </Text>
            <View style={styles.myInfoPoint}>
              <Text style={styles.myInfoPointText}>내 포인트</Text>
              <Text style={[styles.myInfoPointText, {color: '#ec6478'}]}>
                {myPoint} P
              </Text>
            </View>
            <View style={styles.pointButtonWrapper}>
              <Pressable style={styles.pointButton}>
                <Text style={styles.pointButtonText} onPress={toPointLog}>
                  포인트 사용내역
                </Text>
              </Pressable>
              <Text style={styles.pointButtonBar}>|</Text>
              <Pressable style={styles.pointButton}>
                <Text style={styles.pointButtonText} onPress={toCustomShop}>
                  포인트 상점
                </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.myCoupon}>
          <View style={styles.myCouponTextWrapper}>
            <Text style={styles.myCouponText}>내 쿠폰함</Text>
            <Pressable style={styles.myCouponboxButton} onPress={toCouponList}>
              <Text style={styles.myCouponboxButtonText}>전체 +</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.scrollViewHorizontal}>
            {renderCoupon}
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerButtonWrapper}>
            <TouchableOpacity
              style={styles.footerButtonLeft}
              activeOpacity={0.7}>
              <Text style={styles.footerButtonText}>도움말</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerButtonRight}
              activeOpacity={0.7}>
              <Text style={styles.footerButtonText}>공지사항</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerTextWrapper}>
            <Text style={styles.footerText}>
              멤버십 모쿠모쿠 관련 문의 : 1234 - 5678
            </Text>
            <Text style={styles.footerText}>쿠폰 및 기타 문의 : 8765-4321</Text>
            <Text style={styles.footerText}>
              이용약관 {'\t'}| {'\t'}
              개인정보 처리 방침
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  event: {},
  header: {
    backgroundColor: 'trasparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // elevation: 10,
  },
  headerLogo: {
    marginTop: 10,
    resizeMode: 'contain',
    width: 50,
    height: 25,
    marginHorizontal: 10,
    marginBottom: 10,
    // elevation: 10,
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
    left: 225,
  },
  headerAlarm: {
    // marginTop: ,
    // marginLeft: 10,
    width: 50,
    resizeMode: 'contain',
    height: 20,
    left: 220,
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
    top: -3,
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
  },
  myInfoPointText: {
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
  },
  pointButton: {
    marginLeft: 45,
    flex: 1,
  },
  pointButtonText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'white',
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
    height: 250,
    // elevation: 20,
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
  myCouponText: {
    marginHorizontal: 20,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: '#414FFD',
    fontSize: 18,
  },

  scrollItem: {
    marginTop: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    // marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignItems: 'baseline',
    width: 300,
    height: 130,
    borderRadius: 10,
    elevation: 12,
  },
  eventImage: {
    width: screenWidth,
    height: 190,
    borderRadius: 10,
  },
  scrollView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  scrollViewHorizontal: {
    // backgroundColor: 'black',
    // width: '100%',
    // height: 150,
    alignItems: 'baseline',
    // elevation: 2,
    // sh``
  },
  footer: {
    // borderStyle: 'solid',
    // borderWidth: 1,
    backgroundColor: '#f7f7f7',
    height: 250,
    width: screenWidth,
    elevation: 10,
  },
  footerButtonWrapper: {
    flexDirection: 'row',
    marginTop: 18,
  },
  footerButtonLeft: {
    // borderWidth: 1,
    backgroundColor: 'white',
    width: screenWidth / 2,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    // elevation: 5,
  },
  footerButtonRight: {
    // borderWidth: 1,
    backgroundColor: 'white',
    width: screenWidth / 2,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    // elevation: 5,
  },
  footerButtonText: {
    textAlign: 'center',
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: '#aeaeae',
    fontSize: 12,
  },
  footerTextWrapper: {
    // backgroundColor: 'black',
    marginTop: 40,
    alignItems: 'center',
    height: 50,
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: '#aeaeae',
    fontSize: 10,
    lineHeight: 30,
  },
});
export default Main;
