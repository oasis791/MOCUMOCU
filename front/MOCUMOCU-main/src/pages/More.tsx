import React, {useCallback} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import EncryptedStorage from 'react-native-encrypted-storage';

const screenWidth = Dimensions.get('screen').width;

function More() {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();
  const onLogout = useCallback(async () => {
    try {
      await axios.post(
        `${Config.API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      Alert.alert('알림', '로그아웃 되었습니다.');
      dispatch(
        userSlice.actions.setUserInfo({
          name: '',
          email: '',
          id: null,
          accessToken: '',
        }),
      );
      await EncryptedStorage.removeItem('refreshToken');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
    }
  }, [accessToken, dispatch]);
  const toPointUseInfo = () => {
    Alert.alert('알림', '포인트 사용 상세 내역으로 이동');
  };
  const toPointShop = () => {
    Alert.alert('알림', '포인트 상점으로 이동');
  };
  return (
    <>
      <SafeAreaView style={styles.scrollView}>
        <ScrollView fadingEdgeLength={1}>
          <StatusBar hidden={true} />
          <View>
            <View style={styles.myPointZone}>
              <View style={styles.myPointBox}>
                <Text style={styles.myPointBoxText}>내 포인트</Text>
                <Text
                  style={[
                    styles.myPointBoxText,
                    {color: '#414FFD', fontSize: 20},
                  ]}>
                  1000 P
                </Text>
              </View>
              <View style={styles.pointButtonZone}>
                <Pressable
                  style={styles.pointUseInfoButton}
                  onPress={toPointUseInfo}>
                  <Text>포인트 사용 내역</Text>
                </Pressable>
                <Pressable style={styles.pointShopButton} onPress={toPointShop}>
                  <Text>포인트 상점</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.buttonZone}>
            <Pressable style={styles.buttonContainer}>
              <Text style={styles.buttonText}>회원정보 수정</Text>
              <Image
                style={styles.arrowButton}
                source={require('../assets/icon/arrowNormal.png')}
              />
            </Pressable>
            <Pressable style={styles.buttonContainer}>
              <Text style={styles.buttonText}>쿠폰 적립 및 사용 내역</Text>
              <Image
                style={styles.arrowButton}
                source={require('../assets/icon/arrowNormal.png')}
              />
            </Pressable>
            <Pressable style={styles.buttonContainer}>
              <Text style={styles.buttonText}>개인정보 수집 및 이용 약관</Text>
              <Image
                style={styles.arrowButton}
                source={require('../assets/icon/arrowNormal.png')}
              />
            </Pressable>
            <Pressable style={styles.buttonContainer}>
              <Text style={styles.buttonText}>개발자 소개</Text>
              <Image
                style={styles.arrowButton}
                source={require('../assets/icon/arrowNormal.png')}
              />
            </Pressable>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>앱 버전</Text>
              <Text style={styles.buttonText}>1.00</Text>
            </View>
            <Pressable style={styles.buttonContainer} onPress={onLogout}>
              <Text style={styles.logOutButtonText}>로그아웃</Text>
              <Image
                style={styles.arrowButton}
                source={require('../assets/icon/arrowNormal.png')}
              />
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: 'pink',
    // backgroundColor: 'white',
    width: '100%',
    height: '100%',
    // height: '120%',
  },
  myPointZone: {
    top: 40,
    // backgroundColor: 'pink',
    width: screenWidth - 40,
    marginLeft: 20,
    marginRight: 20,
  },
  myPointBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#414FFD',
    height: 60,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  myPointBoxText: {fontFamily: 'GmarketSansTTFBold', color: '#363636'},
  pointButtonZone: {
    marginTop: 30,
    flexDirection: 'row',
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  pointUseInfoButton: {
    marginRight: 30,
    fontFamily: 'GmarketSansTTFMedium',
    color: '#cecece',
    fontSize: 15,
    // backgroundColor: 'gray',
  },
  pointShopButton: {
    marginLeft: 20,
    fontFamily: 'GmarketSansTTFMedium',
    color: '#cecece',
    fontSize: 15,
  },
  buttonZone: {
    // backgroundColor: 'blue',
    marginTop: 60,
    paddingTop: 20,
    fontSize: 18,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  logOutButtonText: {
    paddingHorizontal: 36,
    // backgroundColor: 'cyan',
    // width: 200,
    // paddingTop: 20,
    color: '#363636',
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 14,
    // backgroundColor: 'blue',
    paddingVertical: 10,
    // top: -10,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: screenWidth,
    justifyContent: 'space-between',
    height: 60,
    borderRadius: 20,
    marginBottom: 7,
  },
  buttonText: {
    paddingHorizontal: 36,
    // backgroundColor: 'cyan',
    // width: 200,
    // paddingTop: 20,
    color: '#363636',
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 14,
    // backgroundColor: 'blue',
    paddingVertical: 10,
    // top: -10,
  },
  arrowButton: {
    resizeMode: 'contain',
    marginTop: 20,
    height: 20,
    width: 40,
    paddingHorizontal: 36,
  },
});

export default More;
