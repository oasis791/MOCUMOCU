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
} from 'react-native';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';

type SignInOwnerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignInOwner'
>;

function SignInOwner({navigation}: SignInOwnerScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canGoNext = email && password;
  const emailRef = useRef<TextInput | null>(null); //< > => generic
  const passwordRef = useRef<TextInput | null>(null);
  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      //trim은 좌우 공백 없애는 함수
      return Alert.alert('알림', '이메일을 입력해주세요');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요');
    }
    Alert.alert('알림', '로그인 되었습니다');
  }, [email, password]);
  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, []);
  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);
  return (
    <View>
      <DismissKeyboardView>
        <View style={styles.inputWrapper}>
          <Image
            style={{
              marginTop: 30,
              resizeMode: 'stretch',
              width: 150,
              height: 20,
              marginBottom: 20,
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
            keyboardType="decimal-pad"
            ref={passwordRef}
            onSubmitEditing={onSubmit}
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
            <Text style={styles.loginButtonText}>로그인</Text>
          </Pressable>
          <Pressable onPress={toSignUp} style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>회원가입</Text>
          </Pressable>
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
  loginButtonActive: {backgroundColor: '#59A0DD'},
  signUpButtonText: {
    // backgroundColor: 'black',
    color: '#59A0DD',
    fontSize: 14,
    bottom: '15%',
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 14,
    bottom: '15%',
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  socialButtonWrapper: {
    marginTop: 20,
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
  },
});

export default SignInOwner;
