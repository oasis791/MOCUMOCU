import React, {useCallback, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SaveUpQR from './SaveUpQR';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInUserParamList} from '../../App';
import BottomSheet from '@gorhom/bottom-sheet';
// import {SaveUseParamList} from './SaveUseWrapper';
const window = Dimensions.get('screen');

type SaveUseCouponScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'SaveUseCoupon'
>;
function SaveUseCoupon({navigation}: SaveUseCouponScreenProps) {
  // const navigation = useNavigation();
  const customerId = useSelector((state: RootState) => state.userTest.id);
  const couponExist = useSelector((state: RootState) => state.coupon.coupons);
  // const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [clickSaveUpCoupon, setClickSaveUpCoupon] = useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => [0, '40%'], []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const closeButtonPress = () => {
    bottomSheetRef?.current?.close();
    setModalOpen(false);
    setClickSaveUpCoupon(false);
  };
  const renderBackDrop = () => {
    return modalOpen ? (
      <Animated.View style={styles.animatedView}>
        <TouchableOpacity
          style={styles.animatedBackground}
          activeOpacity={1}
          onPress={closeButtonPress}
        />
      </Animated.View>
    ) : (
      <></>
    );
  };
  const toSaveCoupon = () => {
    console.log(`고객 번호: ${customerId}`);
    bottomSheetRef?.current?.expand();
    setModalOpen(true);
    setClickSaveUpCoupon(true);
  };
  // const toUseCoupon = useCallback(async () => {
  //   try {
  //     if (loading) {
  //       return;
  //     }
  //     setLoading(true);
  //     const response = await axios.post(
  //       'http://15.164.100.68:8080/user/useCoupon',
  //       {
  //         customerId: customerId,
  //       },
  //     );
  //     console.log(response.data);
  //     setLoading(false);
  //     navigation.navigate('UseCoupon', {
  //       customerId: response.data.customerId,
  //       couponInfo: response.data.couponInfo,
  //     }); // 고객한테 있는 쿠폰 리스트에 대한 데이터 다 넘어와야 함
  //     // 네비게이션으로 넘길 꺼(고객 번호, 쿠폰 정보(id, marketName))
  //   } catch (error) {
  //     setLoading(false);
  //     const errorResponse = (error as AxiosError<any>).response;
  //     if (errorResponse) {
  //       Alert.alert('알림', errorResponse.data.message);
  //     }
  //   }
  // }, [customerId, loading, navigation]);
  const toUseCouponTest = useCallback(async () => {
    navigation.navigate('UseCoupon');
  }, [navigation]);
  return (
    <>
      {!clickSaveUpCoupon ? (
        <View style={styles.contentContainer}>
          <View style={styles.buttonWrapper}>
            <Pressable onPress={toSaveCoupon} style={styles.button}>
              <Image
                source={require('../assets/icon/couponSaveIcon.png')}
                style={styles.couponIcon}
              />
              <Text style={styles.buttonText}>쿠폰 적립</Text>
            </Pressable>
            <Pressable
              onPress={toUseCouponTest}
              disabled={!couponExist}
              style={styles.button}>
              {couponExist ? (
                <Image
                  source={require('../assets/icon/couponUseIcon.png')}
                  style={styles.couponIcon}
                />
              ) : (
                <Image
                  source={require('../assets/icon/couponUseIconDisabled.png')}
                  style={styles.couponIcon}
                />
              )}
              <Text
                style={
                  !couponExist
                    ? StyleSheet.compose(
                        styles.buttonText,
                        styles.buttonTextActive,
                      )
                    : styles.buttonText
                }>
                쿠폰 사용
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackDrop}>
          <SaveUpQR qrValue={{customerId: customerId}} />
        </BottomSheet>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  couponIcon: {
    resizeMode: 'contain',
    height: 42,
    width: 37,
    marginBottom: 15,
  },
  buttonWrapper: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    marginTop: 30,
    marginBottom: 48,
    marginHorizontal: 69,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 16,
    fontWeight: '500',
    color: '#414ffd',
  },
  buttonTextActive: {
    color: '#5d5d5d',
  },
  animatedView: {
    opacity: 0.5,
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 10,
  },
  animatedBackground: {
    width: window.width,
    height: window.height,
    backgroundColor: 'transparent',
  },
});
export default SaveUseCoupon;
