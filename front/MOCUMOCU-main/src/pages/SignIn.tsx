import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import {useAppDispatch} from '../store';
// import userSlice, { UserInfo } from '../slices/user';
import userSliceTest, {UserInfoTest} from '../slices/userTest';
import EncryptedStorage from 'react-native-encrypted-storage';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  let test = useSelector((state: RootState) => state.userTest);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const canGoNext = email && password;
  const emailRef = useRef<TextInput | null>(null); //< > => generic
  const passwordRef = useRef<TextInput | null>(null);
  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      //trim은 좌우 공백 없애는 함수
      return Alert.alert('알림', '이메일을 입력해주세요');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요');
    }
    try {
      setLoading(true);
      const response = await axios.post(
        'http://54.180.91.167:8080/user/login',
        {
          customerEmail: email,
          customerPassword: password,
        },
      );
      console.log('response data: ', response.data.customerEmail);
      Alert.alert('알림', '로그인 되었습니다.');
      setLoading(false);
      // dispatch(userSliceTest.actions.setUserInfoTest(response.data.data));
      dispatch(
        // userSlice.actions.setUserInfo({
        //   // redux userSlice 값을 바꾸는 작업 = action => action이 dispatch되면 실행 즉, reducer가 진행됨
        //   name: response.data.data.name,
        //   id: response.data.data.id,
        //   email: response.data.data.email,
        //   accessToken: response.data.data.accessToken,
        // }),
        userSliceTest.actions.setUserInfoTest({
          // redux userSlice 값을 바꾸는 작업 = action => action이 dispatch되면 실행 즉, reducer가 진행됨
          name: response.data.customerName,
          id: response.data.customerId,
          email: response.data.customerEmail,
          userType: response.data.userType,
          isLogIn: response.data.logIn,
        }),
      );
      // console.log('알림', 'userInfoTest dispatch완료');
      // console.log('test', test);

      // await EncryptedStorage.setItem(
      //   'refreshToken',
      //   response.data.data.refreshToken,
      // );
      // console.log(EncryptedStorage.getItem('refreshToken'));
    } catch (error) {
      setLoading(false);
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    }
  }, [loading, email, password, dispatch, test]);
  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, []);
  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);
  const toFindId = useCallback(() => {
    navigation.navigate('FindId');
  }, [navigation]);
  const toFindPassword = useCallback(() => {
    navigation.navigate('FindPassword');
  }, [navigation]);
  const loginButton = () => {
    return (
      <Pressable
        onPress={onSubmit}
        style={styles.loginButton}
        disabled={!canGoNext}>
        {loading ? (
          <ActivityIndicator style={styles.indicator} color="white" />
        ) : (
          <Text style={styles.loginButtonText}>로그인</Text>
        )}
      </Pressable>
    );
  };
  const linearGradientButton = () => {
    return (
      <Pressable
        style={{
          height: '33%',
        }}
        onPress={onSubmit}>
        <LinearGradient
          colors={['#FA6072', '#414FFD']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          locations={[0, 1]}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 5,
            marginBottom: 1,
            paddingHorizontal: 115,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          {loading ? (
            <ActivityIndicator style={styles.indicator} color="white" />
          ) : (
            <Text style={styles.loginButtonText}>로그인</Text>
          )}
        </LinearGradient>
      </Pressable>
    );
  };
  const canGoNext = email && password;
  return (
    <View>
      <DismissKeyboardView>
        <View style={styles.inputWrapper}>
          <Image
            style={{
              marginTop: 30,
              resizeMode: 'contain',
              width: 150,
              height: 20,
              marginBottom: 15,
            }}
            source={require('../assets/gradLogo.png')}
          />
        </View>
        <View style={styles.inputBoxWrapper}>
          {/* <Text style={styles.label}>이메일</Text> */}
          <TextInput
            style={styles.textInput}
            placeholder="이메일"
            value={email}
            onChangeText={onChangeEmail}
            importantForAutofill="yes"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            blurOnSubmit={false}
            ref={emailRef}
          />
        </View>
        <View style={[styles.inputBoxWrapper, {marginBottom: 10}]}>
          {/* <Text style={styles.label}>비밀번호</Text> */}
          <TextInput
            style={styles.textInput}
            placeholder="비밀번호"
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry
            importantForAutofill="yes"
            autoComplete="password"
            textContentType="password"
            keyboardType="default"
            ref={passwordRef}
            onSubmitEditing={onSubmit}
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.buttonZone}>
          {!canGoNext ? <>{loginButton()}</> : <>{linearGradientButton()}</>}
          <View style={styles.zZone}>
            <Pressable onPress={toFindId}>
              <Text style={styles.zZoneText}>아이디 찾기</Text>
            </Pressable>
            <Text style={{marginLeft: 5}}>ㅣ</Text>
            <Pressable onPress={toFindPassword}>
              <Text style={styles.zZoneText}>비밀번호 찾기</Text>
            </Pressable>
            <Text style={{marginLeft: 5}}>ㅣ</Text>
            <Pressable onPress={toSignUp}>
              <Text style={styles.zZoneText}>회원가입</Text>
            </Pressable>
          </View>
        </View>
      </DismissKeyboardView>
      <View style={styles.socialDivider}>
        <View style={styles.socialDividerLineLeft} />
        <Text style={{color: '#cecece', fontSize: 12}}>SNS 간편 로그인</Text>
        <View style={styles.socialDividerLineRight} />
      </View>
      <View style={styles.socialButtonWrapper}>
        <Pressable style={styles.socialButton}>
          <Image
            style={{
              resizeMode: 'stretch',
              width: 20,
              height: 20,
            }}
            source={require('../assets/kakaotalk.png')}
          />
        </Pressable>
        <Pressable style={styles.socialButton}>
          <Image
            style={{
              resizeMode: 'stretch',
              width: 15,
              height: 15,
            }}
            source={require('../assets/naver.png')}
          />
        </Pressable>
        <Pressable style={styles.socialButton}>
          <Image
            style={{
              resizeMode: 'stretch',
              width: 20,
              height: 20,
            }}
            source={require('../assets/facebook.png')}
          />
        </Pressable>
        <Pressable style={styles.socialButton}>
          <Image
            style={{
              resizeMode: 'stretch',
              width: 18,
              height: 18,
            }}
            source={require('../assets/google.png')}
          />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderRadius: 8,
    // elevation: 10,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: 270,
    // fontFamily: 'NotoSansCJKkr-Black (TTF)',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  inputWrapper: {padding: 20, alignItems: 'center'},
  inputBoxWrapper: {padding: 3, alignItems: 'center'},
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    // marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
    // marginBottom: '10%',
  },
  loginButton: {
    // textAlign: 'center',
    marginTop: 5,
    marginBottom: 1,
    backgroundColor: '#e6e6e6',
    paddingHorizontal: 115,
    height: '30%',
    borderRadius: 8,
    // marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  loginButtonActive: {backgroundColor: '#414FFD'},
  loginButtonText: {
    // textAlign: 'center',
    color: 'white',
    fontSize: 14,
    bottom: '5%',
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  loginButtonTextActive: {color: '#ffffff'},
  signUpButtonText: {
    // backgroundColor: 'black',
    color: '#414FFD',
    fontSize: 14,
    bottom: '15%',
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  socialButtonWrapper: {
    marginTop: 23,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    backgroundColor: 'white',
    width: 37,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    // elevation: 5,
  },
  zZone: {
    flexDirection: 'row',
    marginTop: 15,
  },
  zZoneText: {
    marginLeft: 5,
    fontSize: 12,
  },
  indicator: {
    // backgroundColor: 'gray',
    // paddingHorizontal: '7%',
    // paddingVertical: 10,
    borderRadius: 5,
    // marginTop: '4%',
    height: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialDivider: {
    marginTop: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialDividerLineLeft: {
    width: 65,
    height: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#cecece',
    marginRight: 5,
  },
  socialDividerLineRight: {
    width: 65,
    height: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#cecece',
    marginLeft: 5,
  },
});

export default SignIn;
