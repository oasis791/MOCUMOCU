// import axios, {AxiosError} from 'axios';
import React, {useCallback, useMemo} from 'react';
import {LoggedInUserParamList} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';

export type Customizing = {
  couponId: number;
  customerId: number;
};

type CouponDetailScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'CouponDetail'
>;
export type Select = {
  selectCouponId: number;
  selectMarket: string;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
function CouponDetail({navigation}: CouponDetailScreenProps) {
  const coupons = useSelector((state: RootState) => state.coupon.coupons); // 사용자 쿠폰 리스트 가져오기

  const customerId = useSelector((state: RootState) => state.userTest.id);

  const couponList = useMemo(() => {
    return [
      {couponId: 0, marketName: 'market 1'},
      {couponId: 1, marketName: 'market 2'},
    ];
  }, []);
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);

  // const toRewardList = (idx: number) => {
  //   const selectCouponId = couponList[idx].couponId;
  //   const selectMarket = couponList[idx].marketName;
  //   console.log(
  //     `선택 coupon id: ${selectCouponId} / 마켓이름: ${selectMarket}`,
  //   );
  //   navigation.navigate('RewardList', {
  //     selectCouponId: selectCouponId,
  //     selectMarket: selectMarket,
  //   });
  // };
  const toSelectCustomizing = (couponId: number, customerId: number) => {
    console.log(`선택 coupon id: ${couponId} / 고객 ID: ${customerId}`);
    navigation.navigate('SelectCustomizing', {
      couponId: couponId,
      customerId: customerId,
    });
  };

  // const toRewardList = useCallback(async () => {
  //   try {
  //     if (loading) {
  //       return;
  //     }
  //     setLoading(true);
  //     const response = await axios.post(
  //       'http://54.180.91.167:8080/user/use-coupon',
  //       {
  //         userCouponId: couponId,
  //       },
  //     );
  //     console.log(response.data);
  //     setLoading(false);
  //     navigation.navigate('RewardList', {
  //       couponId: response.data.couponId,
  //       reward: response.data.rewardList,
  //       marketName: selectMarket,
  //     });
  //     // 쿠폰 id, 리워드 리스트
  //   } catch (error) {
  //     setLoading(false);
  //     const errorResponse = (error as AxiosError<any>).response;
  //     if (errorResponse) {
  //       Alert.alert('알림', errorResponse.data.message);
  //     }
  //   }
  // }, [loading, navigation, selectMarket]);
  // useEffect(() => {
  //   async function getCoupon() {
  //     const response = await axios.post(
  //       'http://54.180.91.167:8080/customer/main',
  //       {
  //         couponId: coupons.couponId,
  //       },
  //     );
  //   }
  //   getCoupon();
  //   return () => {};
  // }, [customerId, dispatch]);

  const renderMarket = coupons.map(coupon => {
    return (
      <View style={styles.continer}>
        <Pressable
          key={coupon.couponId}
          style={styles.marketContainer}
          onPress={() => {
            toSelectCustomizing(coupon.couponId, customerId);
          }}>
          <Text style={styles.marketText}>{coupon.marketName}</Text>
          <Image
            style={styles.arrowButton}
            source={require('../../assets/icon/arrowNormal.png')}
          />
        </Pressable>
      </View>
    );
  });
  return (
    <View>
      <View style={styles.header}>
        <Pressable style={styles.headerButton} onPress={toBack}>
          <Image
            source={require('../../assets/icon/arrowBack.png')}
            style={styles.headerSetting}
          />
        </Pressable>
      </View>
      <View style={styles.titleContiner}>
        <Text style={styles.titleText}>쿠폰 리스트</Text>
        {/* <Text style={styles.titleText}>선택해 주세요</Text> */}
      </View>
      {renderMarket}
    </View>
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
  titleContiner: {
    marginLeft: screenWidth / 15,
    marginTop: screenHeight / 50,
    marginBottom: screenHeight / 20,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'GmarketSansTTFMedium',
    color: '#414FFD',
    // marginLeft: screenWidth / 25,
    // backgroundColor: 'pink',
  },
  continer: {
    justifyContent: 'center',
    marginTop: screenHeight / 40,
  },
  marketContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: screenWidth,
    justifyContent: 'space-between',
    // height: 77,
    height: screenHeight / 9,
    // top: 120,
    borderRadius: 20,
    // marginBottom: 7,
    // padding: 10,
  },
  marketText: {
    paddingHorizontal: 36,
    // backgroundColor: 'cyan',
    // width: 200,
    paddingTop: 12,
    color: '#363636',
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 14,
    // backgroundColor: 'blue',
    // paddingVertical: 10,
    // top: -10,
  },
  arrowButton: {
    resizeMode: 'contain',
    marginTop: 23,
    height: 20,
    width: 40,
    paddingHorizontal: 36,
  },
  scrollItemNone: {
    // backgroundColor: 'pink',
    top: screenHeight / 3,
    width: screenWidth,
    height: 139,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default CouponDetail;
