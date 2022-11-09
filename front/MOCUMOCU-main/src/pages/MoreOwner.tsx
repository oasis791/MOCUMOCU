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
  TouchableOpacity,
  View,
} from 'react-native';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import userSliceTest from '../slices/userTest';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInOwnerParamList} from '../../App';
import marketOwnerSlice from '../slices/marketOwner';
import Modal from 'react-native-modal';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('window').height;

type MoreOwnerScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'MoreOwner'
>;

function MoreOwner({navigation, route}: MoreOwnerScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = useSelector((state: RootState) => state.userTest.id);
  const [password, setPassword] = useState('');
  const passwordRef = useRef<TextInput | null>(null);
  const canGoNext = password;
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const toModifyOwnerAccount = () => {
    // Alert.alert('알림', '설정');
    navigation.navigate('ModifyOwnerAccount');
  };

  const toPrivacyPolicyOwner = () => {
    // Alert.alert('알림', '설정');
    navigation.navigate('PrivacyPolicyOwner');
  };

  // const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();
  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/owner/auth`, {
        id,
        password,
      });
      setModalVisible(!modalVisible);
      setPassword('');
      toModifyOwnerAccount();
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
        setLoading(false);
      }
    }
  }, [loading, modalVisible, password]);

  const onLogout = useCallback(async () => {
    Alert.alert('알림', '로그아웃 되었습니다.');
    dispatch(
      userSliceTest.actions.setUserInfoTest({
        name: '',
        email: '',
        id: null,
        isLoggedIn: false,
      }),
    );
    dispatch(marketOwnerSlice.actions.setMarket({markets: []}));
  }, [dispatch]);

  const [logoutButtonActive, setLogoutButtonActive] = useState(false);
  return (
    <>
      <StatusBar hidden={true} />

      <View style={styles.mainHeader}>
        <View style={styles.headerButtonWrapper} />
      </View>
      <SafeAreaView style={styles.scrollView}>
        <ScrollView fadingEdgeLength={1}>
          <StatusBar hidden={true} />
          <View style={styles.buttonZone}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>회원정보 수정</Text>
              <Image
                style={styles.arrowButton}
                source={require('../assets/icon/arrowNormal.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={toPrivacyPolicyOwner}>
              <Text style={styles.buttonText}>개인정보 수집 및 이용 약관</Text>
              <Image
                style={styles.arrowButton}
                source={require('../assets/icon/arrowNormal.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>도움말</Text>
              <Image
                style={styles.arrowButton}
                source={require('../assets/icon/arrowNormal.png')}
              />
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>앱 버전</Text>
              <Text style={styles.buttonText}>1.00</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                setLogoutButtonActive(true);
              }}>
              <Text style={styles.logOutButtonText}>로그아웃</Text>
              {/* <Image
                style={styles.arrowButton}
                source={require('../assets/icon/arrowNormal.png')}
              /> */}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {logoutButtonActive ? (
        <View style={styles.container}>
          <View style={styles.addRewardInputWrapper}>
            <Text style={styles.comfirmLogoutText}>로그아웃 하시겠습니까?</Text>
            <TouchableOpacity
              onPress={() => {
                setLogoutButtonActive(false);
              }}>
              <TouchableOpacity onPress={onLogout}>
                <Text style={styles.comfirmLogoutText}>확인</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.addRewardBackground}
            onPress={() => {
              setLogoutButtonActive(false);
            }}
          />
        </View>
      ) : null}
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
                    <ActivityIndicator style={styles.indicator} color="white" />
                  ) : (
                    <Text style={styles.modifyUserAccountButtonText}>확인</Text>
                  )}
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#F7F7F7',
  },

  mainHeader: {
    width: screenWidth,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 19,
    marginTop: 5,
    justifyContent: 'space-around',
  },
  headerSetting: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  headerAlarm: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    marginRight: 15,
  },

  scrollView: {
    // backgroundColor: 'pink',
    // backgroundColor: 'white',
    width: '100%',
    height: '100%',
    // height: '120%',
  },

  buttonZone: {
    // backgroundColor: 'blue',

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
    color: '#FA6072',
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

  container: {
    width: screenWidth,
    // height: '85%',
    height: screenHeight * 0.93,
    position: 'absolute',
    // padding: 24,
    // justifyContent: 'center',
    // backgroundColor: 'pink',
    flexDirection: 'column-reverse',
  },
  addRewardBackground: {
    flex: 1,
  },
  addRewardInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 7,
    backgroundColor: '#FA6072',
  },
  comfirmLogoutText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
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
    backgroundColor: '#FA6072',
  },
  modifyUserAccountButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    textAlign: 'center',
  },
  modalButtonZone: {
    // backgroundColor: 'blue',
    paddingTop: screenHeight / 20,
    fontSize: 18,
    borderRadius: 10,
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
    color: 'black',
    // fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
});

export default MoreOwner;
