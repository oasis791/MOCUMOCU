import axios, {AxiosError} from 'axios';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInUserParamList} from '../../App';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {useFocusEffect} from '@react-navigation/native';
import Config from 'react-native-config';

const screenWidth = Dimensions.get('screen').width;
type RewardListScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'RewardList'
>;
export type Reward = {
  rewardContent: string;
  needAmount: number;
};

function RewardList({navigation, route}: RewardListScreenProps) {
  const [loading, setLoading] = useState(false);
  const selectedCouponId = route.params.selectCouponId;
  const selectedMarket = route.params.selectMarket;
  // const accessToken = useSelector((state: RootState) => state.user.accessToken);
  // const [selectReward, setSelectReward] = useState('');
  // const [loading, setLoading] = useState(false);
  const [rewardList, setRewardList] = useState<Reward[]>([
    {
      rewardContent: '',
      needAmount: 0,
    },
  ]);
  // const rewardListTest = useMemo(() => {
  //   return [
  //     [
  //       {
  //         reward: '츄러스',
  //         couponRequireTest: 5,
  //       },
  //       {
  //         reward: '아메리카노',
  //         couponRequireTest: 10,
  //       },
  //     ],
  //     [
  //       {reward: '복숭아 숭숭', couponRequireTest: 5},
  //       {reward: '광주 보내주기 패키지', couponRequireTest: 10},
  //     ],
  //   ];
  // }, []);
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const getRewardList = async () => {
        try {
          const response = await axios.get(
            `${Config.API_URL}/user/reward-list`,
            {
              headers: {
                // authorization: `Bearer ${accessToken}`,
              },
              params: {couponId: selectedCouponId},
            },
          );
          if (isActive) {
            setRewardList(response.data);
          }
        } catch (error) {
          const errorResponse = (error as AxiosError<any>).response;
          if (errorResponse) {
            Alert.alert('알림', errorResponse.data.message);
            setLoading(false);
          }
        }
      };
      getRewardList();
      return () => {
        isActive = false;
      };
    }, [selectedCouponId]),
  );

  const toUseQRTest = (idx: number) => {
    // const couponRequireTest =
    //   rewardListTest[selectedCouponId][idx].couponRequireTest; //Test
    const couponRequire = rewardList[idx].needAmount;
    console.log(
      `쿠폰 번호: ${selectedCouponId} / 선택한 리워드의 쿠폰 차감 개수: ${couponRequire}`,
    );
    navigation.navigate('UseQR', {
      couponId: selectedCouponId,
      // couponRequire: couponRequireTest,
      couponRequire: couponRequire,
    });
  };

  // const toUseQR = useCallback(async () => {
  //   try {
  //     if (loading) {
  //       return;
  //     }
  //     setLoading(true);
  //     const response = await axios.post(
  //       'http://15.164.100.68:8080/customer/reward-list',
  //       {
  //         userCouponId: couponId,
  //       },
  //     );
  //     console.log(response.data);
  //     setLoading(false);
  //     navigation.navigate('UseQR', {
  //       customerId: customerId,
  //       couponRequire: response.data.couponRequire,
  //     });
  //   } catch (error) {
  //     setLoading(false);
  //     const errorResponse = (error as AxiosError<any>).response;
  //     if (errorResponse) {
  //       Alert.alert('알림', errorResponse.data.message);
  //     }
  //   }
  // }, [loading, navigation]);
  const renderReward = rewardList.map((reward, idx: number) => {
    return (
      <Pressable
        style={styles.rewardContainer}
        onPress={() => {
          toUseQRTest(idx);
        }}
        key={reward.rewardContent}>
        <Text style={styles.rewardText}>
          {/* {idx} */}
          {reward.needAmount}개 리워드 - {'\t'}
          {reward.rewardContent}
        </Text>
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
        <Text style={styles.titleText}>{selectedMarket}</Text>
      </View>
      <>{renderReward}</>
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
  rewardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: screenWidth,
    justifyContent: 'space-between',
    height: 77,
    top: 120,
    borderRadius: 20,
    marginBottom: 7,
  },
  rewardText: {
    paddingHorizontal: 36,
    paddingTop: 20,
    color: '#363636',
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 14,

    paddingVertical: 10,
  },
  arrowButton: {
    resizeMode: 'contain',
    marginTop: 29,
    height: 20,
    width: 40,
    paddingHorizontal: 36,
  },
});
export default RewardList;
