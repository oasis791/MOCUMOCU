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
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import EncryptedStorage from 'react-native-encrypted-storage';
type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
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
      const response = await axios.post(`${Config.API_URL}/login`, {
        email,
        password,
      });
      console.log(response.data);
      Alert.alert('알림', '로그인 되었습니다.');
      setLoading(false);
      dispatch(
        userSlice.actions.setUser({
          // redux userSlice 값을 바꾸는 작업 = action => action이 dispatch되면 실행 즉, reducer가 진행됨
          name: response.data.data.name,
          email: response.data.data.email,
          accessToken: response.data.data.accessToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.data.refreshToken,
      );
      console.log(EncryptedStorage.getItem('refreshToken'));
    } catch (error) {
      setLoading(false);
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    }
  }, [loading, dispatch, email, password]);
  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, []);
  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);
  const canGoNext = email && password;
  return (
    <View>
      <DismissKeyboardView>
        <View style={styles.inputWrapper}>
          <Image
            style={{
              marginTop: 30,
              resizeMode: 'stretch',
              width: 100,
              height: 50,
              marginBottom: 10,
            }}
            source={require('../assets/logo_blue.png')}
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
          <Pressable
            onPress={onSubmit}
            style={
              !canGoNext
                ? styles.loginButton
                : StyleSheet.compose(
                    styles.loginButton,
                    styles.loginButtonActive,
                  )
            }
            disabled={!canGoNext}>
            {loading ? (
              <ActivityIndicator style={styles.indicator} color="white" />
            ) : (
              <Text
                style={
                  !canGoNext
                    ? styles.loginButtonText
                    : StyleSheet.compose(
                        styles.loginButtonText,
                        styles.loginButtonTextActive,
                      )
                }>
                로그인
              </Text>
            )}
          </Pressable>
          <TouchableHighlight
            underlayColor={'#e6e6e6'}
            onPress={toSignUp}
            style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>회원가입</Text>
          </TouchableHighlight>
          <View style={styles.zZone}>
            <Pressable onPress={toSignUp}>
              <Text style={styles.zZoneText}>아이디 찾기</Text>
            </Pressable>
            <Text style={{marginLeft: 5}}>/</Text>
            <Pressable onPress={toSignUp}>
              <Text style={styles.zZoneText}>비밀번호 찾기</Text>
            </Pressable>
          </View>
        </View>
      </DismissKeyboardView>
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
    marginTop: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    elevation: 10,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: 270,
  },
  inputWrapper: {padding: 20, alignItems: 'center'},
  inputBoxWrapper: {padding: 5, alignItems: 'center'},
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
    // marginBottom: '10%',
  },
  loginButton: {
    backgroundColor: '#e6e6e6',
    paddingHorizontal: 115,
    height: '18%',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 10,
  },
  signUpButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 108,
    height: '18%',
    borderRadius: 8,
    elevation: 10,
  },
  loginButtonActive: {backgroundColor: '#414FFD'},
  loginButtonText: {
    color: 'white',
    fontSize: 14,
    bottom: '15%',
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
    marginTop: 90,
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
    elevation: 5,
  },
  zZone: {
    flexDirection: 'row',
    marginTop: '5%',
  },
  zZoneText: {
    marginLeft: 5,
    fontSize: 12,
  },
  indicator: {
    // backgroundColor: 'gray',
    paddingHorizontal: '7%',
    // paddingVertical: 10,
    borderRadius: 5,
    // marginTop: '4%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignIn;
