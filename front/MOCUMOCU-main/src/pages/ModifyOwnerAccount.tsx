import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {LoggedInOwnerParamList} from '../../App';
import Config from 'react-native-config';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type ModifyOwnerAccountScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'ModifyOwnerAccount'
>;

function ModifyOwnerAccount({navigation}: ModifyOwnerAccountScreenProps) {
  const ownerName = useSelector((state: RootState) => state.userTest.name);
  const ownerEmail = useSelector((state: RootState) => state.userTest.email);
  const ownerId = useSelector((state: RootState) => state.userTest.id);
  const [loading, setLoading] = useState(false);
  const [telephoneNumber, setTelephoneNumber] = useState('');

  const telephoneNumberRef = useRef<TextInput | null>(null);
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  const askUnregister = () => {
    Alert.alert('정말로 탈퇴할꺼임?');
  };
  // const onChangePassword = useCallback(text => {
  //   setPassword(text.trim());
  // }, []);
  // const onChangeCheckPassword = useCallback(text => {
  //   setCheckPassword(text.trim());
  // }, []);
  const onChangeTelephoneNumber = useCallback(text => {
    setTelephoneNumber(text);
  }, []);

  const toModifyOwnerPassword = () => {
    // Alert.alert('알림', '설정');
    navigation.navigate('ModifyOwnerPassword');
  };

  useEffect(() => {
    setTelephoneNumber(telephoneNumber.trim());

    if (telephoneNumber.length === 11) {
      setTelephoneNumber(
        telephoneNumber
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
  }, [telephoneNumber]);

  // const onSubmit = useCallback(async () => {
  //   if (loading) {
  //     return;
  //   }
  //   if (!password || !password.trim()) {
  //     return Alert.alert('알림', '비밀번호를 입력해주세요.');
  //   }
  //   if (!checkPassword || !checkPassword.trim()) {
  //     return Alert.alert('알림', '비밀번호 확인을 입력해주세요.');
  //   }
  //   if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
  //     return Alert.alert(
  //       '알림',
  //       '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
  //     );
  //   }
  //   if (password !== checkPassword) {
  //     return Alert.alert('알림', '비밀번호와 확인 값이 다릅니다.');
  //   }
  //   console.log(password, checkPassword);

  //   try {
  //     setLoading(true);
  //     // http method : get, put, patch, post, delete, head, options 가 주로 쓰임
  //     const response = await axios.post(
  //       'http://54.180.91.167:8080/user/modifyUserAccount',
  //       {
  //         customerPassword: password,
  //         customerCheckPassword: checkPassword,
  //       },
  //     ); //비동기 요청이므로 await가 필요
  //     console.log(response);
  //     console.log('http://54.180.91.167:8080');
  //     Alert.alert('알림', '수정 완료');
  //     navigation.navigate('MoreOwner');
  //   } catch (error) {
  //     const errorResponse = (error as AxiosError<any>).response;
  //     if (errorResponse) {
  //       Alert.alert('알림', errorResponse.data.message);
  //       setLoading(false);
  //     }
  //   }
  // }, [navigation, loading, password, checkPassword]); // password는 일방향 암호화(hash화) -> 예측 불가능한 값이 되어버림 but, hash 값이 고정되어있기 때문에 해당 값으로 인증 가능
  // const canGoNext = password && checkPassword && telephoneNumber;

  const onSubmit = useCallback(async () => {
    try {
      await axios.put(`${Config.API_URL}/owner/update/phoneNum`, {
        id: ownerId,
        phoneNum: telephoneNumber,
      });
      Alert.alert('알림', '전화번호를 변경하였습니다.');
      console.log(`${telephoneNumber}`);
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        // Alert.alert('알림', errorResponse.data.message);
        Alert.alert('알림', '점주 전화번호에 실패하였습니다.');
      }
    }
  }, []);

  const canGoNext = telephoneNumber;
  return (
    <>
      <DismissKeyboardView>
        <View>
          <StatusBar hidden={true} />
          <View style={styles.mainHeader}>
            <View style={styles.headerButtonWrapper}>
              <Pressable style={styles.headerButton} onPress={toBack}>
                <Image
                  source={require('../assets/icon/arrowBack.png')}
                  style={styles.headerSetting}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.marketTitleWrapper}>
            <Text style={styles.marketTitleText}>회원정보 수정</Text>
          </View>
          <View style={styles.inputWrapper}>
            {/* <Text style={styles.textDisableInput}>{customerNameTest}</Text> */}
            <Text style={styles.textDisableInput}>{ownerName}</Text>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.textDisableInput}>{ownerEmail}</Text>
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="전화번호"
              placeholderTextColor="#c4c4c4"
              onChangeText={onChangeTelephoneNumber}
              value={telephoneNumber}
              keyboardType="number-pad"
              textContentType="telephoneNumber"
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={telephoneNumberRef}
              blurOnSubmit={false}
              maxLength={13}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TouchableOpacity
              style={styles.passwordChangeButton}
              onPress={toModifyOwnerPassword}>
              <Text style={styles.passwordChangeText}>비밀번호 변경</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.unregisterWrapper}>
            <Pressable onPress={askUnregister}>
              <Text style={styles.unregisterText}>회원 탈퇴</Text>
            </Pressable>
          </View>

          <View style={styles.buttonZone}>
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
      </DismissKeyboardView>
    </>
  );
}

const styles = StyleSheet.create({
  mainHeader: {
    width: screenWidth,
    paddingVertical: 15,
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 19,
    marginTop: 5,
    // justifyContent: 'space-around',
  },
  headerSetting: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  headerButton: {
    marginHorizontal: screenHeight / 60,
  },

  marketTitleWrapper: {
    marginLeft: 30,
    marginBottom: 40,
  },

  marketTitleText: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 24,
    color: 'black',
  },
  textInput: {
    padding: 5,
    marginTop: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: screenWidth / 1.29,
    fontWeight: 'bold',
    // fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  textDisableInput: {
    padding: 5,
    marginTop: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 6,
    paddingHorizontal: 20,
    width: screenWidth / 1.29,
    height: screenHeight / 14,
    textAlignVertical: 'center',
    backgroundColor: '#E6E6E6',
  },
  emailWrapper: {
    borderStyle: 'solid',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    width: 280,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputEmail: {
    fontWeight: 'bold',
    height: 40,
  },
  certificationButton: {
    // backgroundColor: 'black',
    justifyContent: 'center',
  },
  certificationButtonText: {
    color: '#c4c4c4',
    fontWeight: 'bold',
    fontSize: 14,
    // fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  inputWrapper: {
    // backgroundColor: 'pink',
    padding: 5,
    alignItems: 'center',
    // height: screenHeight / 12,
  },

  passwordChangeButton: {
    backgroundColor: 'white',
    borderColor: '#FA6072',
    borderWidth: 1,
    borderRadius: 8,
    width: screenWidth / 1.29,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },

  passwordChangeText: {
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    color: '#FA6072',
  },

  buttonZone: {
    // position: 'absolute',
    // flexDirection: 'column-reverse',
    marginTop: screenHeight * 0.25,
    alignItems: 'center',
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
  unregisterWrapper: {
    // backgroundColor: 'pink',
    width: screenWidth,
    // padding: 10,
    marginTop: screenHeight / 100,
    height: screenHeight / 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unregisterText: {
    color: '#b9b8b8',
    fontSize: 13,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 8,
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
  },
});

export default ModifyOwnerAccount;
