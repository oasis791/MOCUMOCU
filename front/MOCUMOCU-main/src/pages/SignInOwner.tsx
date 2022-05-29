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
  StatusBar,
} from 'react-native';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import LinearGradient from 'react-native-linear-gradient';
type SignInOwnerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignInOwner'
>;

function SignInOwner({navigation}: SignInOwnerScreenProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState('');
  const [age, setAge] = useState(9999);
  const [username, setusername] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  // const canGoNext = email && password;
  const emailRef = useRef<TextInput | null>(null); //< > => generic
  const passwordRef = useRef<TextInput | null>(null);
  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!ownerEmail || !ownerEmail.trim()) {
      //trim은 좌우 공백 없애는 함수
      return Alert.alert('알림', '이메일을 입력해주세요');
    }
    if (!ownerPassword || !ownerPassword.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요');
    }
    try {
      // setLoading(true); `${Config.API_URL}/login`
      const response = await axios.post(
        'http://54.180.91.167:8080/owner/login',
        {
          ownerEmail,
          ownerPassword,
        },
      );
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
  }, [loading, dispatch, ownerEmail, ownerPassword]);
  const onChangeEmail = useCallback(text => {
    setOwnerEmail(text);
  }, []);
  const onChangePassword = useCallback(text => {
    setOwnerPassword(text);
  }, []);
  const toSignUpOwner = useCallback(() => {
    navigation.navigate('SignUpOwner');
  }, [navigation]);
  const toFindIdOwner = useCallback(() => {
    navigation.navigate('findIdOwner');
  }, [navigation]);
  const toFindPasswordOwner = useCallback(() => {
    navigation.navigate('findPasswordOwner');
  }, [navigation]);
<<<<<<< HEAD

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
        }}>
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
          <Text style={styles.loginButtonText}>로그인</Text>
        </LinearGradient>
      </Pressable>
    );
  };

=======
>>>>>>> 3c285f8e7b1b08447e087dce46b5b9072ec6b0c7
  const canGoNext = ownerEmail && ownerPassword;
  return (
    <View>
      <StatusBar hidden={true} />
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
            value={ownerEmail}
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
            value={ownerPassword}
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
            <Pressable onPress={toFindIdOwner}>
              <Text style={styles.zZoneText}>아이디 찾기</Text>
            </Pressable>
            <Text style={{marginLeft: 5}}>ㅣ</Text>
            <Pressable onPress={toFindPasswordOwner}>
              <Text style={styles.zZoneText}>비밀번호 찾기</Text>
            </Pressable>
            <Text style={{marginLeft: 5}}>ㅣ</Text>
            <Pressable onPress={toSignUpOwner}>
              <Text style={styles.zZoneText}>회원가입</Text>
            </Pressable>
          </View>
        </View>
      </DismissKeyboardView>
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
    bottom: '5%',
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  loginButtonTextActive: {color: '#ffffff'},
  signUpButtonText: {
    // backgroundColor: 'black',
    color: '#363636',
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

export default SignInOwner;
