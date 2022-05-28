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
    url: 'https://i.ibb.co/pjxqR6Q/111111.png',
  },
  {
    id: 2,
    url: 'https://i.ibb.co/x7jBdVh/222222.png',
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
          <Text style={styles.scrollItemText}>{coupon.couponId}</Text>
          <Text style={[styles.scrollItemText, {color: '#414FFD'}]}>
            {coupon.market}
          </Text>
        </View>
      </>
    );
  });

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={onSubmitEvent}
        activeOpacity={0.7}
        style={styles.eventImageButton}>
        <ImageBackground
          style={styles.eventImage}
          source={{uri: item.url}}
          imageStyle={{borderRadius: 20}}
        />
      </TouchableOpacity>
    );
  };
  const isCarousel = useRef(null);
  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView fadingEdgeLength={10}>
        <StatusBar hidden={true} />
        <View style={[styles.header, {position: 'absolute'}]}>
          <Image
            style={styles.headerLogo}
            source={require('../assets/blueLogo.png')}
          />
          <View style={styles.headerButtonWrapper}>
            <Pressable onPress={onSubmitSetting}>
              <Image
                source={require('../assets/icon/attendanceIcon.png')}
                style={styles.headerAttendance}
              />
            </Pressable>
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
            <Text
              style={[styles.myInfoText, {fontFamily: 'GmarketSansTTFBold'}]}>
              {userName}
            </Text>{' '}
            님,{'\n'}오늘도 모쿠하세요!
          </Text>
          <View style={styles.myInfoPoint}>
            <Text style={styles.myInfoPointText}>
              내 포인트 {'\n'}
              <Text style={{color: '#414FFD', fontSize: 24}}>{myPoint} P</Text>
            </Text>
          </View>
        </View>
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
          // sliderHeight={11}
          // itemHeight={20}
        />
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
              <Text style={styles.footerButtonText}>Q&A</Text>
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
    backgroundColor: 'white',
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // elevation: 10,
  },
  headerLogo: {
    marginTop: 22,
    resizeMode: 'contain',
    width: 100,
    height: 25,
    marginLeft: 23,
    marginBottom: 10,
    // backgroundColor: 'green',
    // elevation: 10,
    // justifyContent: 'flex-start',
  },
  headerButtonWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-around',
    // left: 100,
    // flex: 1,
    // backgroundColor: 'green',
    marginHorizontal: 21,
  },
  headerAttendance: {
    // flex: 1,
    resizeMode: 'contain',
    width: 20,
    height: 20,
    // backgroundColor: 'cyan',
  },
  headerSetting: {
    // flex: 1,
    width: 20,
    resizeMode: 'contain',
    // backgroundColor: 'yellow',
    // flex: 1 / 3,
    marginHorizontal: 15,
    height: 20,
  },
  headerAlarm: {
    // flex: 1,
    resizeMode: 'contain',
    // flex: 1,
    height: 20,
    width: 20,
    // backgroundColor: 'orange',
  },
  myInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 57,
    height: 100,
    backgroundColor: 'white',
    // backgroundColor: 'cyan',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 65,
  },
  myInfoText: {
    fontSize: 19,
    // backgroundColor: 'pink',
    marginLeft: 30,
    fontFamily: 'GmarketSansTTFMedium',
    color: '#363636',
    width: 160,
  },
  myInfoPoint: {
    // flexDirection: 'row',
    // backgroundColor: 'white',
    // justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 30,
    // alignItems: 'baseline',
    width: 87,
    height: 40,
    // borderRadius: 10,
  },
  myInfoPointText: {
    fontSize: 15,
    // paddingVertical: 5,
    fontFamily: 'GmarketSansTTFBold',
    color: '#9b9b9b',
    height: 50,
    lineHeight: 25,
    // backgroundColor: 'black',
  },
  eventBanner: {
    height: 210,
    width: screenWidth,
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
    color: '#363636',
  },
  pointButtonBar: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'white',
    fontWeight: 'bold',
    // marginLeft: 0,
    // paddingLeft: 1,
  },
  myCoupon: {
    // flex: 1,
    backgroundColor: 'cyan',
    height: 266,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 9,
    // elevation: 20,
    // elevation: 30,
  },
  myCouponboxButton: {
    justifyContent: 'center',
    marginRight: 30,
    // backgroundColor: 'pink',
    // alignItems: 'center',
  },
  myCouponboxButtonText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'gray',
    fontSize: 12,
    fontWeight: 'bold',
  },
  myCouponTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
    marginTop: 33,
    marginBottom: 35,
  },
  myCouponText: {
    // marginBottom: 39,
    marginHorizontal: 30,
    // height: 30,
    fontFamily: 'GmarketSansTTFBold',
    color: '#363636',
    fontSize: 18,
    // backgroundColor: 'pink',
  },

  scrollItem: {
    // marginTop: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 9,
    // marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignItems: 'baseline',
    width: 251,
    height: 139,
    borderRadius: 10,
    elevation: 12,
  },
  scrollItemText: {
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 18,
    marginHorizontal: 10,
  },
  eventImageButton: {
    marginBottom: 9,
    marginHorizontal: 8,
  },
  eventImage: {
    width: screenWidth - 16,
    height: 100,
    borderRadius: 10,
    // backgroundColor: 'black',
    // marginBottom: 9,
  },
  scrollView: {
    backgroundColor: '#EAEAEA',
    // backgroundColor: 'white',
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
    // marginBottom: 9,
    // elevation: 2,
  },
  footer: {
    // borderStyle: 'solid',
    // borderWidth: 1,
    backgroundColor: '#EAEAEA',
    height: 250,
    width: screenWidth,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  footerButtonWrapper: {
    flexDirection: 'row',
    // marginTop: ,
  },
  footerButtonLeft: {
    // borderWidth: 1,
    backgroundColor: 'white',
    width: screenWidth / 2,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#e5e5e5',
    // elevation: 5,
    // borderWidth: 1,
    // borderColor: '#e5e5e5',
  },
  footerButtonRight: {
    // borderWidth: 1,
    backgroundColor: 'white',
    width: screenWidth / 2,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    // elevation: 5,
    // borderWidth: 1,
    // borderColor: '#e5e5e5',
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
