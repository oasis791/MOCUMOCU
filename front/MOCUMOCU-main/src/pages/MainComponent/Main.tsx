import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useRef, useState} from 'react';
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
import {LoggedInUserParamList} from '../../../App';
import couponSlice, {Coupon} from '../../slices/coupon';
import {useAppDispatch} from '../../store';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import {useFocusEffect} from '@react-navigation/native';
import AttendanceModal from '../../components/AttendanceModal';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const data = [
  {
    id: 1,
    url: 'https://mocumocu-bucket.s3.ap-northeast-2.amazonaws.com/temp/banner1.png',
  },
  {
    id: 2,
    url: 'https://mocumocu-bucket.s3.ap-northeast-2.amazonaws.com/temp/banner2.png',
  },
];
let myPoint = 500;

type MainScreenProps = NativeStackScreenProps<LoggedInUserParamList, 'Main'>;
function Main({navigation}: MainScreenProps) {
  // const customerId = useSelector((state: RootState) => state.user.id);
  // const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const customerIdTest = useSelector((state: RootState) => state.userTest.id);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAttandance, setIsAttandance] = useState(0);
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const getCouponInfo = async () => {
        try {
          const response = await axios.get<Coupon[]>(
            `http://54.180.91.167:8080/user/${customerIdTest}/coupon`,
            {
              headers: {
                // authorization: `Bearer ${accessToken}`,
              },
            },
          );
          if (isActive) {
            console.log('coupon', response.data);
            setLoading(false);
            dispatch(couponSlice.actions.setCouponInfo(response.data));
          }
        } catch (error) {
          setLoading(false);
          const errorResponse = (error as AxiosError<any>).response;
          if (errorResponse) {
            Alert.alert('알림', errorResponse.data.message);
            setLoading(false);
          }
        }
      };
      getCouponInfo();
      return () => {
        isActive = false;
      };
    }, [customerIdTest, dispatch]),
  );

  const isAlarm = true;
  // const customerName = useSelector((state: RootState) => state.user.name);
  const customerNameTest = useSelector(
    (state: RootState) => state.userTest.name,
  );
  const coupons = useSelector((state: RootState) => state.coupon.coupons);
  const toSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);
  const toPushNotice = useCallback(() => {
    navigation.navigate('PushNotice');
  }, [navigation]);
  const toMyPointLog = useCallback(() => {
    navigation.navigate('MyPointLog');
  }, [navigation]);
  const toQna = useCallback(() => {
    navigation.navigate('QnA');
  }, [navigation]);
  const toNotice = useCallback(() => {
    navigation.navigate('Notice');
  }, [navigation]);

  const onSubmitAttendance = () => {
    // 모달 창으로 출석체크 완료!
    setShowModal(true);
  };
  const onSubmitEvent = () => {
    Alert.alert('알림', '이벤트');
  };
  // 쿠폰 등록 관련 로직
  const toCouponDetail = useCallback(() => {
    navigation.navigate('CouponDetail');
  }, [navigation]);
  const renderCoupon =
    coupons.length !== 0 ? (
      coupons.map(coupon => {
        return (
          <View style={styles.scrollItem} key={coupon.couponId}>
            {/* <Text style={styles.scrollItemText}>{coupon.couponId}</Text> */}
            <Text style={[styles.scrollItemText, {color: '#414FFD'}]}>
              {coupon.marketName}
            </Text>
            <Text style={styles.scrollItemText}>{coupon.stampAmount} 장</Text>
          </View>
        );
      })
    ) : (
      <View style={styles.scrollItemNone}>
        <Text style={styles.myCouponText}>보유한 쿠폰이 없습니다</Text>
      </View>
    );

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
    <>
      <SafeAreaView style={styles.scrollView}>
        <AttendanceModal
          isVisible={showModal}
          onBackdropPress={() => {
            setShowModal(false);
            isAttandance <= 0 ? (myPoint += 10) : myPoint;
            setIsAttandance(1);
          }}
          hideModal={() => setShowModal(false)}
          animationIn="fadeIn"
          animationOut="fadeOut"
          coverScreen={false}
          deviceHeight={Dimensions.get('window').height}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>출석체크 완료!</Text>
            <Text style={[styles.modalText, {color: '#414FFD'}]}>+10P</Text>
          </View>
        </AttendanceModal>
        <ScrollView fadingEdgeLength={10}>
          <StatusBar hidden={true} />
          <View style={[styles.header, {position: 'absolute'}]}>
            <Image
              style={styles.headerLogo}
              source={require('../../assets/blueLogo.png')}
            />
            <View style={styles.headerButtonWrapper}>
              {isAttandance <= 0 ? (
                <Pressable onPress={onSubmitAttendance}>
                  <Image
                    source={require('../../assets/icon/attendanceIcon.png')}
                    style={styles.headerAttendance}
                  />
                </Pressable>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View style={styles.myInfo}>
            <Text style={styles.myInfoText}>
              <Text
                style={[styles.myInfoText, {fontFamily: 'GmarketSansTTFBold'}]}>
                {customerNameTest}
              </Text>{' '}
              님,{'\n'}오늘도 모쿠하세요!
            </Text>
            <View style={styles.myInfoPoint}>
              <Text style={styles.myInfoPointText}>
                <Pressable
                  style={styles.toMyPointButton}
                  onPress={toMyPointLog}>
                  <Text
                    style={{
                      marginRight: 8,
                      fontFamily: 'GmarketSansTTFBold',
                      color: '#9b9b9b',
                      fontSize: 14,
                    }}>
                    내 포인트
                  </Text>
                  <Image
                    source={require('../../assets/icon/arrowGray.png')}
                    style={styles.toMyPointImg}
                  />
                </Pressable>
                <Text style={{color: '#414FFD', fontSize: 24}}>
                  {myPoint} P
                </Text>
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
          />
          <View style={styles.myCoupon}>
            <View style={styles.myCouponTextWrapper}>
              <Text style={styles.myCouponText}>내 쿠폰함</Text>
              <Pressable
                style={styles.myCouponboxButton}
                onPress={toCouponDetail}>
                <Text style={styles.myCouponboxButtonText}>전체 +</Text>
              </Pressable>
            </View>
            <View style={styles.ScrollViewWrapper}>
              <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.scrollViewHorizontal}>
                {renderCoupon}
              </ScrollView>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.footerButtonWrapper}>
              <TouchableOpacity
                style={styles.footerButtonLeft}
                activeOpacity={0.7}
                onPress={toQna}>
                <Text style={styles.footerButtonText}>Q&A</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.footerButtonRight}
                activeOpacity={0.7}
                onPress={toNotice}>
                <Text style={styles.footerButtonText}>공지사항</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerTextWrapper}>
              <Text style={styles.footerText}>
                멤버십 모쿠모쿠 관련 문의 : 1234 - 5678
              </Text>
              <Text style={styles.footerText}>
                쿠폰 및 기타 문의 : 8765-4321
              </Text>
              <Text style={styles.footerText}>
                이용약관 {'\t'}| {'\t'}
                개인정보 처리 방침
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    marginTop: 22,
    resizeMode: 'contain',
    width: 100,
    height: 25,
    marginLeft: 23,
    marginBottom: 10,
  },
  headerButtonWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 21,
  },
  headerAttendance: {
    // flex: 1,
    resizeMode: 'contain',
    width: screenWidth / 7,
    height: 19,
    // backgroundColor: 'cyan',
  },
  headerSetting: {
    // marginTop: screenHeight / 25,
    // flex: 1,
    width: 20,
    resizeMode: 'contain',
    // flex: 1 / 3,
    // marginHorizontal: 15,
    height: 20,
  },
  headerAlarm: {
    // flex: 1,
    resizeMode: 'contain',
    // flex: 1,
    height: 22,
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
    width: screenWidth / 4,
    // width: 87,
    // height: 40,
    // borderRadius: 10,
  },
  myInfoPointText: {
    fontSize: 15,
    // paddingVertical: 5,
    fontFamily: 'GmarketSansTTFBold',
    color: '#9b9b9b',
    height: screenHeight / 10,
    lineHeight: 25,
    // backgroundColor: 'black',
  },
  eventBanner: {
    // height: 210,
    // height: screenHeight / 10,
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
  toMyPointButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    // marginBottom: 10,
  },
  toMyPointImg: {
    resizeMode: 'contain',
    height: 15,
    width: 12,
    marginBottom: 1,
    // top: -100,
    // marginLeft: 20,
    // backgroundColor: 'pink',
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
    backgroundColor: 'white',
    height: 266,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 9,
    // elevation: 20,
    // elevation: 30,
  },
  myCouponboxButton: {
    // backgroundColor: 'white',
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
    height: 18,
    marginTop: 33,
    marginBottom: 35,
    // backgroundColor: 'green',
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
    width: 260,
    // height: 139,
    height: screenHeight / 4.3,
    borderRadius: 10,
    elevation: 12,
  },
  scrollItemNone: {
    // backgroundColor: 'pink',
    width: screenWidth,
    height: screenHeight / 4.3,
    // height: 139,
    alignItems: 'center',
    justifyContent: 'center',
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
  ScrollViewWrapper: {
    width: screenWidth,
    height: screenHeight / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  scrollViewHorizontal: {
    // top: -10,
    // // backgroundColor: 'black',
    // width: screenWidth - 100,
    // backgroundColor: 'green',
    // backgroundColor: 'pink',
    height: 150,
    // backgroundColor: 'green',
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
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
  modalContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 85,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: 10,
  },
  modalText: {
    fontFamily: 'GmarketSansTTFBold',
    color: '#aeaeae',
    marginHorizontal: 30,
    fontSize: 18,
  },
});
export default Main;
