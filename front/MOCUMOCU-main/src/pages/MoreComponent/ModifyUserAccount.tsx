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
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInUserParamList} from '../../../App';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type ModifyUserAccountScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'ModifyUserAccount'
>;

function ModifyUserAccount({navigation}: ModifyUserAccountScreenProps) {
  const customerNameTest = useSelector(
    (state: RootState) => state.userTest.name,
  );
  const customerEmail = useSelector((state: RootState) => state.userTest.email);

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');

  const passwordRef = useRef<TextInput | null>(null);
  const checkPasswordRef = useRef<TextInput | null>(null);
  const telephoneNumberRef = useRef<TextInput | null>(null);
  const askUnregister = () => {
    Alert.alert('정말로 탈퇴할꺼임?');
  };
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const onChangeCheckPassword = useCallback(text => {
    setCheckPassword(text.trim());
  }, []);
  const onChangeTelephoneNumber = useCallback(text => {
    setTelephoneNumber(text.trim());
  }, []);
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  useEffect(() => {
    setTelephoneNumber(telephoneNumber.trim());

    if (telephoneNumber.length === 11) {
      setTelephoneNumber(
        telephoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      );
    }
    if (telephoneNumber.length === 11) {
      setTelephoneNumber(
        telephoneNumber
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
  }, [telephoneNumber]);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!checkPassword || !checkPassword.trim()) {
      return Alert.alert('알림', '비밀번호 확인을 입력해주세요.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    if (password !== checkPassword) {
      return Alert.alert('알림', '비밀번호와 확인 값이 다릅니다.');
    }
    console.log(password, checkPassword);
    // Alert.alert('알림', '회원가입 되었습니다.');
    try {
      setLoading(true);
      // http method : get, put, patch, post, delete, head, options 가 주로 쓰임
      const response = await axios.post(
        'http://54.180.91.167:8080/user/modifyUserAccount',
        {
          customerPassword: password,
          customerCheckPassword: checkPassword,
        },
      ); //비동기 요청이므로 await가 필요
      console.log(response);
      console.log('http://54.180.91.167:8080');
      Alert.alert('알림', '수정 완료');
      navigation.navigate('More');
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
        setLoading(false);
      }
    }
  }, [navigation, loading, password, checkPassword]); // password는 일방향 암호화(hash화) -> 예측 불가능한 값이 되어버림 but, hash 값이 고정되어있기 때문에 해당 값으로 인증 가능
  const canGoNext = password && checkPassword && telephoneNumber;
  return (
    <>
      <DismissKeyboardView>
        <View>
          <StatusBar hidden={true} />
          <View style={[styles.header]}>
            <Pressable style={styles.headerButton} onPress={toBack}>
              <Image
                source={require('../../assets/icon/arrowBack.png')}
                style={styles.headerSetting}
              />
            </Pressable>
          </View>
          <View>
            <Text style={[styles.welcomeText]}>회원정보 수정</Text>
          </View>
          <View style={styles.inputWrapper}>
            {/* <Text style={styles.textDisableInput}>{customerNameTest}</Text> */}
            <Text style={styles.textDisableInput}>김현욱</Text>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.textDisableInput}>
              kimhyunwook@pizza.hamburger
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            {/* <Text style={styles.label}>비밀번호</Text> */}
            <TextInput
              style={styles.textInput}
              placeholder="비밀번호"
              placeholderTextColor="#c4c4c4"
              onChangeText={onChangePassword}
              value={password}
              keyboardType={
                Platform.OS === 'android' ? 'default' : 'ascii-capable'
              }
              textContentType="password"
              secureTextEntry
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={passwordRef}
              onSubmitEditing={() => checkPasswordRef.current?.focus()}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="비밀번호 확인"
              placeholderTextColor="#c4c4c4"
              onChangeText={onChangeCheckPassword}
              value={checkPassword}
              textContentType="password"
              secureTextEntry
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={checkPasswordRef}
              onSubmitEditing={() => telephoneNumberRef.current?.focus()}
              blurOnSubmit={false}
            />
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
          <View style={styles.unregisterWrapper}>
            <Pressable onPress={askUnregister}>
              <Text style={styles.unregisterText}>회원 탈퇴</Text>
            </Pressable>
          </View>
        </View>
      </DismissKeyboardView>
    </>
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
    // marginHorizontal: 15,
    height: 18,
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
  bottomSheetWrapper: {
    borderStyle: 'solid',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    width: 280,
    height: 45,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
  },
  radioWrapper: {
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    // borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 58,
    alignItems: 'center',
    flex: 1,
    // height: 20,
  },
  radioText: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 25,
    // backgroundColor: 'pink',
    color: '#414FFD',
  },
  buttonZone: {
    // position: 'absolute',
    marginTop: screenHeight / 10,
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
    backgroundColor: '#414FFD',
  },
  modifyUserAccountButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  scrollView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  modalButtonWrapper: {
    backgroundColor: 'black',
    width: 100,
    height: 100,
  },
  modalButton: {
    backgroundColor: '#ffffff',
    bottom: '16%',
    marginHorizontal: '10%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    // elevation: 10,
    // position: 'relative',
  },
  modalButtonActive: {backgroundColor: '#414FFD'},
  modalButtonText: {
    color: 'gray',
    justifyContent: 'center',
    fontSize: 16,
    bottom: '1%',
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  modalButtonTextActive: {color: 'white'},
  privacyAgreeTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'GmarketSansTTFBold',
    color: '#414FFD',
  },
  privacyAgreeText: {
    marginHorizontal: 40,
    marginBottom: 100,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: 'NotoSansCJKkr-Bold (TTF)',
    color: '#414FFD',
    height: screenHeight / 8,
    width: screenWidth / 3,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
    marginLeft: screenWidth / 9,
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

export default ModifyUserAccount;
