import axios from 'axios';
import React, {useEffect, useMemo} from 'react';
import {
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

const screenWidth = Dimensions.get('screen').width;
type RewardListScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'RewardList'
>;
export type Customer = {
  customerId: number;
  couponRequire: number;
};
export type Reward = {
  rewardName: String;
  requireCoupon: number;
};
function RewardList({navigation, route}: RewardListScreenProps) {
  const selectedCouponId = route.params.selectCouponId;
  const selectedMarket = route.params.selectMarket;
  const customerIdTest = 1;
  const customerId = useSelector((state: RootState) => state.user.id);
  // const [selectReward, setSelectReward] = useState('');
  // const [loading, setLoading] = useState(false);
  const rewardListTest = useMemo(() => {
    return [
      [
        {
          reward: '츄러스',
          couponRequire: 5,
        },
        {
          reward: '아메리카노',
          couponRequire: 10,
        },
      ],
      [
        {reward: '복숭아 숭숭', couponRequire: 5},
        {reward: '광주 보내주기 패키지', couponRequire: 10},
      ],
    ];
  }, []);
  useEffect(() => {
    async function getCustomerId() {
      const response = await axios.post<{data: Reward}>(
        'http://54.180.91.167:8080/customer/reward-list',
        {
          couponId: selectedCouponId,
        },
      );
      const rewardList = response.data.data;
      return rewardList;
    }
    getCustomerId();
  }, [selectedCouponId]);
  const toUseQRTest = (idx: number) => {
    const couponRequire = rewardListTest[selectedCouponId][idx].couponRequire;
    console.log(
      `고객 번호: ${customerIdTest} / 선택한 리워드의 쿠폰 차감 개수: ${couponRequire}`,
    );
    navigation.navigate('UseQR', {
      customerId: customerIdTest,
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
  //       'http://54.180.91.167:8080/customer/reward-list',
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
  const renderRewardTest = rewardListTest[selectedCouponId].map(
    (reward, idx) => {
      return (
        <Pressable
          style={styles.rewardContainer}
          onPress={() => {
            toUseQRTest(idx);
          }}
          key={reward.reward}>
          <Text style={styles.rewardText}>
            {/* {idx} */}
            {reward.couponRequire}개 리워드 - {'\t'}
            {reward.reward}
          </Text>
          <Image
            style={styles.arrowButton}
            source={require('../assets/icon/arrowNormal.png')}
          />
        </Pressable>
      );
    },
  );

  return (
    <View>
      <View style={styles.titleContiner}>
        <Text style={styles.titleText}>{selectedMarket}</Text>
      </View>
      <>{renderRewardTest}</>
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
