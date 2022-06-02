// import axios, {AxiosError} from 'axios';
import React, {useMemo, useRef, useState} from 'react';
import {LoggedInUserParamList} from '../../App';
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
import {RootState} from '../store/reducer';

type UseCouponScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'UseCoupon'
>;
export type Select = {
  selectCouponId: number;
  selectMarket: String;
};

const screenWidth = Dimensions.get('screen').width;
function UseCoupon({navigation}: UseCouponScreenProps) {
  const coupons = useSelector((state: RootState) => state.user.coupons); // 사용자 쿠폰 리스트 가져오기
  const couponList = useMemo(() => {
    return [
      {couponId: 0, marketName: 'market 1'},
      {couponId: 1, marketName: 'market 2'},
    ];
  }, []);

  const toRewardList = (idx: number) => {
    const selectCouponId = couponList[idx].couponId;
    const selectMarket = couponList[idx].marketName;
    console.log(
      `선택 coupon id: ${selectCouponId} / 마켓이름: ${selectMarket}`,
    );
    navigation.navigate('RewardList', {
      selectCouponId: selectCouponId,
      selectMarket: selectMarket,
    });
  };
  const toRewardListTest = (idx: number) => {
    const selectCouponId = couponList[idx].couponId;
    const selectMarket = couponList[idx].marketName;
    console.log(
      `선택 coupon id: ${selectCouponId} / 마켓이름: ${selectMarket}`,
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
  const renderMarketTest = couponList.map((coupon, idx) => {
    return (
      <Pressable
        style={styles.marketContainer}
        key={coupon.couponId}
        onPress={() => {
          toRewardListTest(idx);
        }}>
        <Text style={styles.marketText}>{coupon.marketName}</Text>
        <Image
          style={styles.arrowButton}
          source={require('../assets/icon/arrowNormal.png')}
        />
      </Pressable>
    );
  });
  const renderMarket = coupons.map(coupon => {
    return (
      <Pressable key={coupon.couponId}>
        style={styles.marketContainer}
        onPress=
        {() => {
          const identify = coupon.couponId;
          toRewardListTest(identify);
        }}
        <Text style={styles.marketText}>{coupon.marketName}</Text>
        <Image
          style={styles.arrowButton}
          source={require('../assets/icon/arrowNormal.png')}
        />
      </Pressable>
    );
  });
  return (
    <View>
      <View style={styles.titleContiner}>
        <Text style={styles.titleText}>
          {/* {params.customerId} */}
          쿠폰을 사용할 매장을
        </Text>
        <Text style={styles.titleText}>선택해 주세요</Text>
      </View>
      <>{renderMarketTest}</>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContiner: {alignItems: 'center'},
  titleText: {
    top: 78,
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
});

export default UseCoupon;
