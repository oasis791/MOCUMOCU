import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useAppDispatch} from '../../store';
import userSliceTest from '../../slices/userTest';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import EncryptedStorage from 'react-native-encrypted-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInUserParamList} from '../../../App';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type MoreScreenProps = NativeStackScreenProps<LoggedInUserParamList, 'More'>;

function More({navigation}: MoreScreenProps) {
  // const accessToken = useSelector((state: RootState) => state.user.accessToken);
  // const isLoggedIn = useSelector((state: RootState) => state.userTest.isLogIn);
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef<TextInput | null>(null);
  const customerId = useSelector((state: RootState) => state.userTest.id);
  const onLogout = useCallback(async () => {
    try {
      Alert.alert('알림', '로그아웃 되었습니다.');
      dispatch(
        userSliceTest.actions.setUserInfoTest({
          name: '',
          email: '',
          id: null,
          isLoggedIn: false,
        }),
      );
      await EncryptedStorage.removeItem('refreshToken');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
    }
  }, [dispatch]);
  const toCustomShop = useCallback(() => {
    navigation.navigate('CustomShop');
  }, [navigation]);
  const toMyPointLog = useCallback(() => {
    navigation.navigate('MyPointLog');
  }, [navigation]);
  const toModifyUserAccount = useCallback(() => {
    setModalVisible(!modalVisible);
    // navigation.navigate('ModifyUserAccount');
  }, [modalVisible]);
  const toCouponUsageHistory = useCallback(() => {
    navigation.navigate('CouponUsageHistory');
  }, [navigation]);
  const toTermsOfUse = useCallback(() => {
    navigation.navigate('TermsOfUse');
  }, [navigation]);
  const toHelp = useCallback(() => {
    navigation.navigate('Help');
  }, [navigation]);

  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const onSubmit = useCallback(async () => {
    // if (loading) {
    //   return;
    // }
    try {
      if (!password || !password.trim()) {
        return Alert.alert('알림', '비밀번호를 입력해주세요.');
      }
      if (
        !/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)
      ) {
        return Alert.alert(
          '알림',
          '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
        );
      }
      setLoading(true);
      // http method : get, put, patch, post, delete, head, options 가 주로 쓰임
      const response = await axios.post(`${Config.API_URL}/customer/auth`, {
        id: customerId,
        password: password,
      });
      // ); //비동기 요청이므로 await가 필요
      console.log(response);
      // console.log('http://54.180.91.167:8080');
      setModalVisible(!modalVisible);
      setPassword('');
      setLoading(false);
      navigation.navigate('ModifyUserAccount');
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
        setLoading(false);
      }
    }
  }, [modalVisible, navigation, password]);
  // const requestPassword = () => {
  //   const canGoNext = password;
  //   return (
  //   );
  // };
  const canGoNext = password;
  const customerPoint = useSelector((state: RootState) => state.userTest.point);
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
                  {customerPoint} P
                </Text>
              </View>
              <View style={styles.pointButtonZone}>
                <Pressable
                  style={styles.pointUseInfoButton}
                  onPress={toMyPointLog}>
                  <Text>포인트 사용 내역</Text>
                </Pressable>
                <Pressable
                  style={styles.pointShopButton}
                  onPress={toCustomShop}>
                  <Text>포인트 상점</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.buttonZone}>
            <Pressable
              style={styles.buttonContainer}
              onPress={toModifyUserAccount}>
              <Text style={styles.buttonText}>회원정보 수정</Text>
              <Image
                style={styles.arrowButton}
                source={require('../../assets/icon/arrowNormal.png')}
              />
            </Pressable>
            <Pressable
              style={styles.buttonContainer}
              onPress={toCouponUsageHistory}>
              <Text style={styles.buttonText}>쿠폰 적립 및 사용 내역</Text>
              <Image
                style={styles.arrowButton}
                source={require('../../assets/icon/arrowNormal.png')}
              />
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={toTermsOfUse}>
              <Text style={styles.buttonText}>개인정보 수집 및 이용 약관</Text>
              <Image
                style={styles.arrowButton}
                source={require('../../assets/icon/arrowNormal.png')}
              />
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={toHelp}>
              <Text style={styles.buttonText}>도움말</Text>
              <Image
                style={styles.arrowButton}
                source={require('../../assets/icon/arrowNormal.png')}
              />
            </Pressable>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>앱 버전</Text>
              <Text style={styles.buttonText}>1.00</Text>
            </View>
            <Pressable style={styles.buttonContainer} onPress={onLogout}>
              <Text style={styles.logOutButtonText}>로그아웃</Text>
            </Pressable>
          </View>
        </ScrollView>
        {modalVisible ? (
          <View>
            <Modal
              isVisible={modalVisible}
              backdropOpacity={0.5}
              onBackdropPress={() => setModalVisible(false)}>
              <View style={styles.inputModalWrapper}>
                {/* <Text style={styles.label}>비밀번호</Text> */}
                <TextInput
                  style={styles.textInput}
                  placeholder="비밀번호"
                  placeholderTextColor="#c4c4c4"
                  onChangeText={onChangePassword}
                  value={password}
                  autoFocus
                  keyboardType={
                    Platform.OS === 'android' ? 'default' : 'ascii-capable'
                  }
                  textContentType="password"
                  secureTextEntry
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  ref={passwordRef}
                />
                <View style={styles.modalButtonZone}>
                  <TouchableHighlight
                    underlayColor={'#c4c4c4'}
                    style={
                      canGoNext
                        ? StyleSheet.compose(
                            styles.modifyUserAccountButton,
                            styles.modifyUserAccountButtonActive,
                          )
                        : styles.modifyUserAccountButton
                    }
                    disabled={!canGoNext || loading}
                    onPress={onSubmit}>
                    {loading ? (
                      <ActivityIndicator
                        style={styles.indicator}
                        color="white"
                      />
                    ) : (
                      <Text style={styles.modifyUserAccountButtonText}>
                        확인
                      </Text>
                    )}
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <></>
        )}
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
    marginTop: screenHeight / 10,
    paddingTop: screenHeight / 40,
    fontSize: 18,
    borderRadius: 10,
  },
  modalButtonZone: {
    // backgroundColor: 'blue',
    paddingTop: screenHeight / 20,
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
    color: '#414ffd',
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
  textInput: {
    padding: 5,
    marginTop: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 20,
    width: screenWidth / 1.29,
    fontWeight: 'bold',
    // fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  inputWrapper: {
    // backgroundColor: 'pink',
    padding: 5,
    alignItems: 'center',
    // height: screenHeight / 12,
  },
  inputModalWrapper: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    // height: screenHeight / 12,
  },
  indicator: {
    backgroundColor: 'transpaent',
    paddingHorizontal: '11%',
    // paddingVertical: 10,
    borderRadius: 5,
    // marginTop: '4%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modifyUserAccountButton: {
    backgroundColor: '#E6E6E6',
    paddingHorizontal: '34%',
    // paddingVertical: 10,
    borderRadius: 5,
    marginTop: '4%',
    width: screenWidth / 1.29,
  },
  modifyUserAccountButtonActive: {
    backgroundColor: '#414FFD',
  },
  modifyUserAccountButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    textAlign: 'center',
  },
  modal: {
    // height: screenHeight / 100,
    // width: screenWidth / 1.1,
    // backgroundColor: 'rgba(0, 0, 0, 0.65)',
    // borderWidth: 1,
    // borderColor: 'black',
    // backgroundColor: 'black',
  },
});

export default More;
