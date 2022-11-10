// import axios, {AxiosError} from 'axios';
import React, {useCallback} from 'react';
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
import {Coupon} from '../../slices/coupon';

type UseCouponScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'UseCoupon'
>;
export type Select = {
  selectCouponId: number;
  selectMarket: string;
};

<<<<<<< HEAD:front/MOCUMOCU-main/src/pages/SaveUseComponent/UseCoupon.tsx
const screenWidth = Dimensions.get('window').width;
=======
const screenWidth = Dimensions.get('screen').width;
>>>>>>> 583f05bbfaa40f1f6743d98bce87c9657114aaab:front/MOCUMOCU-main/src/pages/UseCoupon.tsx
const screenHeight = Dimensions.get('window').height;
function UseCoupon({navigation}: UseCouponScreenProps) {
  const coupons = useSelector((state: RootState) => state.coupon.coupons); // 사용자 쿠폰 리스트 가져오기
  // const couponList = useMemo(() => {
  //   return [
  //     {couponId: 0, marketName: 'market 1'},
  //     {couponId: 1, marketName: 'market 2'},
  //   ];
  // }, []);

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
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  const toRewardList = ({couponId, marketName, stampAmount}: Coupon) => {
    let selectCouponId: number = couponId;
    let selectMarket: string = marketName;
    let selectStampAmount: number = stampAmount;
    console.log(
      `선택 coupon id: ${selectCouponId} / 마켓이름: ${selectMarket}
        / 도장 보유 개수: ${selectStampAmount}`,
    );
    navigation.navigate('RewardList', {
      selectCouponId: selectCouponId,
      selectMarket: selectMarket,
    });
  };

  // const toRewardList = useCallback(async () => {
  //   try {
  //     if (loading) {
  //       return;
  //     }
  //     setLoading(true);
  //     const response = await axios.post(
  //       'http://15.164.100.68:8080/user/use-coupon',
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
  //       'http://15.164.100.68:8080/customer/main',
  //       {
  //         couponId: coupons.couponId,
  //       },
  //     );
  //   }
  //   getCoupon();
  //   return () => {};
  // }, [customerId, dispatch]);

  const renderMarket = coupons.map((coupon: Coupon) => {
    return (
      <View>
        <Pressable
          key={coupon.couponId}
          style={styles.marketContainer}
          onPress={() => {
            toRewardList(coupon);
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
    <>
      <Pressable style={styles.headerButton} onPress={toBack}>
        <Image
          source={require('../../assets/icon/arrowBack.png')}
          style={styles.headerSetting}
        />
      </Pressable>
      <View>
        <View style={styles.titleContiner}>
          <Text style={styles.titleText}>쿠폰을 사용할 매장을</Text>
          <Text style={styles.titleText}>선택해 주세요</Text>
        </View>
        {renderMarket}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 10,
    marginTop: screenHeight / 50,
    // backgroundColor: 'pink',
  },
  headerSetting: {
    // marginTop: screenHeight / 25,
    // flex: 1,
    width: 18,
    resizeMode: 'contain',
    // flex: 1 / 3,
    // marginHorizontal: 15,
    height: 18,
  },
  titleContiner: {
    alignItems: 'center',
    height: screenHeight / 10,
    marginTop: screenHeight / 20,
    // backgroundColor: 'blue',
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'GmarketSansTTFMedium',
  },
  continer: {
    justifyContent: 'center',
  },
  marketContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: screenWidth,
    justifyContent: 'space-between',
    height: 77,
    top: 120,
    borderRadius: 20,
    marginBottom: 7,
  },
  marketText: {
    paddingHorizontal: 36,
    // backgroundColor: 'cyan',
    // width: 200,
    paddingTop: 20,
    color: '#363636',
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 14,
    // backgroundColor: 'blue',
    paddingVertical: 10,
    // top: -10,
  },
  arrowButton: {
    resizeMode: 'contain',
    marginTop: 29,
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

export default UseCoupon;
