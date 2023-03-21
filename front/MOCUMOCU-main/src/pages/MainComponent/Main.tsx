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
  Modal,
  FlatList,
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
import userSlice from '../../slices/user';
import userSliceTest from '../../slices/userTest';
import Config from 'react-native-config';
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

type MainScreenProps = NativeStackScreenProps<LoggedInUserParamList, 'Main'>;
function Main({navigation}: MainScreenProps) {
  // const customerId = useSelector((state: RootState) => state.user.id);
  // const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const customerIdTest = useSelector((state: RootState) => state.userTest.id);
  const customerPoint = useSelector((state: RootState) => state.userTest.point);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAttendance, setIsAttendance] = useState(false);
  const [point, setPoint] = useState(customerPoint);
  const [smallBanner, setSmallBanner] = useState([]);
  const [largeBanner, setLargeBanner] = useState('');
  const [showLargeBanner, setShowLargeBanner] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const getCouponInfo = async () => {
        try {
          const response = await axios.get<Coupon[]>(
            `${Config.API_URL}/coupon/${customerIdTest}/coupon`,
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
            // Alert.alert('알림', 'coupon');
            // console.log(error);
            setLoading(false);
          }
        }
      };
      const getAttandanceCheck = async () => {
        try {
          const response = await axios.get(
            `${Config.API_URL}/customer/${customerIdTest}/attendance`,
          );
          setIsAttendance(response.data);
          console.log('attendance', response.data);
        } catch (error) {
          const errorResponse = (error as AxiosError<any>).response;
          if (errorResponse) {
            // Alert.alert('알림', 'attendance');
            setLoading(false);
          }
        }
      };
      const getPoint = async () => {
        try {
          const response = await axios.get(
            `${Config.API_URL}/customer/${customerIdTest}/point`,
          );
          console.log('point', response.data);
          setPoint(response.data);
          dispatch(userSliceTest.actions.setUserPoint(response.data));
        } catch (error) {
          const errorResponse = (error as AxiosError<any>).response;
          if (errorResponse) {
            // Alert.alert('알림', 'point');
            setLoading(false);
          }
        }
      };
      const bannerInfo = async () => {
        try {
          const response = await axios.get(
            `${Config.API_URL}/customer/find/all-event`,
          );
          setSmallBanner(response.data);
          console.log('banner', response.data);
        } catch (error) {
          const errorResponse = (error as AxiosError<any>).response;
          // Alert.alert('알림', 'banner');
          // console.log('banner', errorResponse);
        }
      };
      getCouponInfo();
      getAttandanceCheck();
      getPoint();
      bannerInfo();
      return () => {
        isActive = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerIdTest, dispatch, showModal]),
  );

  // const customerName = useSelector((state: RootState) => state.user.name);
  const customerNameTest = useSelector(
    (state: RootState) => state.userTest.name,
  );
  const coupons = useSelector((state: RootState) => state.coupon.coupons);
  const toMyPointLog = useCallback(() => {
    navigation.navigate('MyPointLog');
  }, [navigation]);
  const toQna = useCallback(() => {
    navigation.navigate('QnA');
  }, [navigation]);
  const toNotice = useCallback(() => {
    navigation.navigate('Notice');
  }, [navigation]);
  async function onSubmitAttendance() {
    // 모달 창으로 출석체크 완료!
    try {
      const response = await axios.get(
        `${Config.API_URL}/customer/${customerIdTest}/attendance-check`,
      );
      console.log('check-attendance', response.data);
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        console.log(errorResponse);
        console.log('출석체크 오류');
      }
    }
    setShowModal(true);
  }
  async function getLargeBanner(marketId: any) {
    console.log(marketId);
    try {
      console.log('marketId', marketId);
      const response = await axios.get(
        `${Config.API_URL}/customer/find/big-event/${marketId}`,
      );
      console.log('largeBanner', response.data);
      setLargeBanner(response.data);
      setShowLargeBanner(true);
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        console.log(errorResponse);
        console.log('큰 배너 오류');
      }
    }
  }
  // 쿠폰 등록 관련 로직
  const toCouponDetail = useCallback(() => {
    navigation.navigate('CouponDetail');
  }, [navigation]);

  const renderStamp = useCallback(coupon => {
    const arr = [];
    console.log('renderStamp', coupon.stampAmount);
    if (coupon.stampAmount > 0) {
      for (let i = 0; i < coupon.stampAmount; i++) {
        arr.push(
          <Image
            source={
              coupon.stampUrl
                ? {uri: `${coupon.stampUrl}`}
                : require('../../assets/icon/basicStamp.png')
            }
            resizeMode="center"
            style={{
              width: screenHeight / 25,
              // flex: 1 / 3,
              marginVertical: 10,
              marginLeft: 20,
              height: screenHeight / 23,
              // marginVertical: 10,
            }}
          />,
        );
      }
    } else {
      arr.push(
        <View style={styles.scrollStampNone}>
          <Text style={styles.myStampText}>보유한 도장이 없습니다</Text>
        </View>,
      );
    }
    return arr;
  }, []);
  const couponsTest = [
    {
      couponId: 1,
      boardUrl:
        'https://cdn.pixabay.com/photo/2014/04/02/10/23/ticket-303706_1280.png',
    },
    {
      couponId: 2,
      boardUrl:
        'https://cdn.pixabay.com/photo/2015/08/11/08/21/coupon-883643_1280.jpg',
    },
  ];
  const renderCoupon = ({item}) => {
    return (
      <ImageBackground
        source={
          item.boardUrl
            ? {uri: `${item.boardUrl}`}
            : require('../../assets/largeBoard.png')
        }
        key={item.couponId}
        style={styles.viewCouponImage}
        resizeMode="stretch">
        {renderStamp(item)}
      </ImageBackground>
    );
  };
  const renderEmpty = () => {
    return (
      <View style={styles.scrollItemNone}>
        <Text style={styles.myCouponText}>보유한 쿠폰이 없습니다</Text>
      </View>
    );
  };
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          getLargeBanner(item.marketId);
        }}
        activeOpacity={0.7}
        style={styles.eventImageButton}>
        <ImageBackground
          style={styles.eventImage}
          source={{uri: item.eventSmallUrl}}
          imageStyle={{borderRadius: 20}}
        />
      </TouchableOpacity>
    );
  };
  const isCarousel = useRef(null);
  // console.log('isAttendance', isAttendance);
  console.log('slicePoint', customerPoint);
  return (
    <>
      <SafeAreaView style={styles.scrollView}>
        <AttendanceModal
          isVisible={showModal}
          onBackdropPress={() => {
            setShowModal(false);
            // isAttandance === false ? (myPoint += 10) : myPoint;
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
        {showLargeBanner === false ? (
          <ScrollView fadingEdgeLength={10}>
            <StatusBar hidden={true} />
            <View style={[styles.header, {position: 'absolute'}]}>
              <Image
                style={styles.headerLogo}
                source={require('../../assets/blueLogo.png')}
              />
              <View style={styles.headerButtonWrapper}>
                {isAttendance === false ? (
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
                  style={[
                    styles.myInfoText,
                    {fontFamily: 'GmarketSansTTFBold'},
                  ]}>
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
                        marginRight: screenWidth / 100,
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
                  {'\n'}
                  <Text
                    style={{
                      color: '#414FFD',
                      fontSize: 24,
                      // backgroundColor: 'blue',
                    }}>
                    {100} P
                  </Text>
                </Text>
              </View>
            </View>
            <Carousel
              ref={isCarousel}
              layout={'default'}
              data={smallBanner}
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
                  onPress={toCouponDetail}
                  disabled={coupons.length <= 0 ? true : false}>
                  <Text style={styles.myCouponboxButtonText}>전체 +</Text>
                </Pressable>
              </View>
              <View style={styles.ScrollViewWrapper}>
                <FlatList
                  data={coupons}
                  renderItem={renderCoupon}
                  onEndReachedThreshold={0.1}
                  horizontal
                  contentContainerStyle={{flexGrow: 1}}
                  ListEmptyComponent={renderEmpty}
                />
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
        ) : (
          <Modal style={{flex: 1, backgroundColor: 'gray'}}>
            <Image source={{uri: largeBanner}} style={styles.largeBanner} />
            <Pressable
              onPress={() => {
                setShowLargeBanner(false);
              }}
              style={styles.bannerClose}>
              <Text style={styles.modalCloseText}>확인</Text>
            </Pressable>
          </Modal>
        )}
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
    // backgroundColor: 'pink',
    // justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 50,
    marginLeft: screenWidth / 7,
    // alignItems: 'baseline',
    width: screenWidth / 4,
    height: screenHeight / 9,
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
    width: screenWidth / 4.5,
    lineHeight: 25,
    // backgroundColor: 'orange',
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
    // fontSize: 12,
    // marginBottom: 10,
    // backgroundColor: 'green',
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
  myStampText: {
    // marginBottom: 39,
    // marginHorizontal: 30,
    // height: 30,
    fontFamily: 'GmarketSansTTFBold',
    color: '#363636',
    fontSize: 15,
    // backgroundColor: 'pink',
  },
  scrollItem: {
    // marginTop: 8,
    // flexDirection: 'row',
    // backgroundColor: 'white',
    // marginHorizontal: 9,
    // marginBottom: 20,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // alignItems: 'baseline',
    // width: screenWidth / 1.25,
    // height: 139,
    width: '100%',
    height: screenHeight / 4.3,
    borderRadius: 10,
    // elevation: 1,
    // flexWrap: 'wrap',
    // padding: 20,
    // backgroundColor: 'green',
  },
  scrollItemNone: {
    // backgroundColor: 'pink',
    width: screenWidth,
    height: screenHeight / 4.3,
    // height: 139,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollStampNone: {
    // backgroundColor: 'pink',
    width: screenWidth / 1.5,
    height: screenHeight / 6.6,
    // height: 139,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCouponImage: {
    width: screenWidth / 1.25,
    height: screenHeight / 4.75,
    borderRadius: 5,
    elevation: 10,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    marginHorizontal: screenWidth / 10,
  },
  imageStyle: {
    // resizeMode: 'contains',s
    // width: screenWidth,
    // height: screenHeight,
    // backgroundColor: 'black',
    borderRadius: 20,
    // elevation: 2,
    borderWidth: 10,
    borderColor: 'black',
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
    // elevation: 5,
  },
  ScrollViewWrapper: {
    width: screenWidth,
    // flex: 1,
    height: screenHeight / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  scrollViewHorizontal: {
    // top: -10,
    // // backgroundColor: 'black',
    flex: 1,
    width: screenWidth / 1.2,
    // backgroundColor: 'green',
    // backgroundColor: 'pink',
    height: 150,
    // marginHorizontal: 10,
    // width: screenWidth / 1.15,
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
  largeBanner: {
    marginTop: screenHeight / 55,
    marginLeft: screenWidth / 11,
    width: screenWidth / 1.2,
    height: screenHeight / 1.2,
    resizeMode: 'stretch',
    borderRadius: 5,
  },
  bannerClose: {
    position: 'absolute',
    backgroundColor: '#414FFD',
    width: screenWidth / 1.2,
    bottom: 0,
    marginLeft: screenWidth / 12,
    marginBottom: screenWidth / 20,
    height: screenHeight / 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalCloseText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
});
export default Main;
