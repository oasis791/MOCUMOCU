import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  StatusBar,
  TouchableHighlight,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {SafeAreaView} from 'react-native-safe-area-context';

import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
// import DismissKeyboardView from '../components/DismissKeyboardView';
import Config from 'react-native-config';
type SignUpOwnerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUpOwner'
>;

function SignUpOwner({navigation}: SignUpOwnerScreenProps) {
  const [loading, setLoading] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [ownerCheckPassword, setOwnerCheckPassword] = useState('');
  const [ownerPhoneNum, setOwnerPhoneNumber] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const checkPasswordRef = useRef<TextInput | null>(null);
  const telephoneNumberRef = useRef<TextInput | null>(null);
  const onChangeEmail = useCallback(text => {
    setOwnerEmail(text.trim());
  }, []);
  const onChangeName = useCallback(text => {
    setOwnerName(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setOwnerPassword(text.trim());
  }, []);
  const onChangeCheckPassword = useCallback(text => {
    setOwnerCheckPassword(text.trim());
  }, []);
  const onChangeTelephoneNumber = useCallback(text => {
    setOwnerPhoneNumber(text.trim());
  }, []);

  useEffect(() => {
    setOwnerPhoneNumber(ownerPhoneNum.trim());
    // setPhoneNumber(phoneNumber.replace('-', ''));

    if (ownerPhoneNum.length === 11) {
      setOwnerPhoneNumber(
        ownerPhoneNum
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
  }, [ownerPhoneNum]);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!ownerEmail || !ownerEmail.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!ownerName || !ownerName.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!ownerPassword || !ownerPassword.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!ownerCheckPassword || !ownerCheckPassword.trim()) {
      return Alert.alert('알림', '비밀번호 확인을 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        ownerEmail,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (
      !/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(ownerPassword)
    ) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    console.log(
      ownerEmail,
      ownerName,
      ownerPassword,
      ownerCheckPassword,
      ownerPhoneNum,
    );
    // Alert.alert('알림', '회원가입 되었습니다.');
    try {
      setLoading(true);
      // http method : get, put, patch, post, delete, head, options 가 주로 쓰임 ${Config.API_URL}/owner/signup
      const response = await axios.post(`${Config.API_URL}/owner/signup`, {
        ownerEmail,
        ownerName,
        ownerPassword,
        ownerCheckPassword,
        ownerPhoneNum,
      }); //비동기 요청이므로 await가 필요
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('SignInOwner');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
        setLoading(false);
      }
    }
  }, [
    navigation,
    loading,
    ownerEmail,
    ownerName,
    ownerPassword,
    ownerCheckPassword,
    ownerPhoneNum,
  ]); // password는 일방향 암호화(hash화) -> 예측 불가능한 값이 되어버림 but, hash 값이 고정되어있기 때문에 해당 값으로 인증 가능
  const canGoNext =
    ownerEmail &&
    ownerName &&
    ownerPassword &&
    ownerCheckPassword &&
    ownerPhoneNum;
  const [modalVisible, setModalVisible] = useState<any>(true);
  const [scrollToBottom, setScrollToBottom] = useState<any>(false);

  //   useEffect(() => {
  //     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => modalVisible)
  //       return () => backHandler.remove()
  //   }, []);

  return (
    <DismissKeyboardView>
      <View>
        <StatusBar hidden={true} />
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <SafeAreaView style={{paddingTop: 0}}>
            <ScrollView
              style={styles.scrollView}
              fadingEdgeLength={10}
              endFillColor="black"
              onScroll={e => {
                let paddingToBottom = 1;
                paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                // console.log(Math.floor(paddingToBottom) + "-" + Math.floor(e.nativeEvent.contentOffset.y) + "-" + Math.floor(e.nativeEvent.contentSize.height));
                if (
                  e.nativeEvent.contentOffset.y + paddingToBottom >=
                  e.nativeEvent.contentSize.height
                ) {
                  setScrollToBottom(true);
                }
              }}>
              <Text style={styles.privacyAgreeTitle}>
                개인정보 수집 및 이용 동의
              </Text>
              <Text style={styles.privacyAgreeText}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
                consequuntur amet possimus ullam velit dignissimos obcaecati!
                Officia, reiciendis? Voluptate sequi ex dolorem doloribus quas?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum dolor, perferendis beatae repellendus architecto illo
              </Text>
            </ScrollView>
          </SafeAreaView>
          <Pressable
            style={
              !scrollToBottom
                ? styles.modalButton
                : StyleSheet.compose(
                    styles.modalButton,
                    styles.modalButtonActive,
                  )
            }
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            disabled={!scrollToBottom}>
            <Text
              style={
                !scrollToBottom
                  ? styles.modalButtonText
                  : StyleSheet.compose(
                      styles.modalButtonText,
                      styles.modalButtonTextActive,
                    )
              }>
              모두 동의하고 다음으로
            </Text>
          </Pressable>
        </Modal>
        <View>
          <Text style={[styles.welcomeText, {marginBottom: 18}]}>
            점주님, {'\n'}환영합니다!
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="이름"
            placeholderTextColor="#c4c4c4"
            onChangeText={onChangeName}
            value={ownerName}
            textContentType="name"
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={nameRef}
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
          />
          {/* <Text style={styles.label}>이름</Text> */}
        </View>
        <View style={styles.inputWrapper}>
          {/* <Text style={styles.label}>이메일</Text> */}
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeEmail}
            placeholder="이메일"
            placeholderTextColor="#c4c4c4"
            textContentType="emailAddress"
            value={ownerEmail}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          {/* <Text style={styles.label}>비밀번호</Text> */}
          <TextInput
            style={styles.textInput}
            placeholder="비밀번호"
            placeholderTextColor="#c4c4c4"
            onChangeText={onChangePassword}
            value={ownerPassword}
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
            value={ownerCheckPassword}
            textContentType="password"
            secureTextEntry
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={checkPasswordRef}
            onSubmitEditing={() => telephoneNumberRef.current?.focus()}
            blurOnSubmit={false}
          />
          {/* <Text style={styles.label}>이름</Text> */}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="전화번호"
            placeholderTextColor="#c4c4c4"
            onChangeText={onChangeTelephoneNumber}
            keyboardType="decimal-pad"
            value={ownerPhoneNum}
            textContentType="telephoneNumber"
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={telephoneNumberRef}
            onSubmitEditing={onSubmit}
            blurOnSubmit={false}
            maxLength={13}
          />
          {/* <Text style={styles.label}>이름</Text> */}
        </View>
        {/* <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="성별"
            placeholderTextColor="#c4c4c4"
            onChangeText={onChangeName}
            value={name}
            textContentType="name"
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={nameRef}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View> */}
        {/* <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="생년월일"
            placeholderTextColor="#c4c4c4"
            onChangeText={onChangeBirth}
            value={name}
            textContentType="name"
            returnKeyType="send"
            clearButtonMode="while-editing"
            ref={nameRef}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />

        </View> */}
        <View style={styles.buttonZone}>
          <TouchableHighlight
            underlayColor={'#C76857'}
            style={
              canGoNext
                ? StyleSheet.compose(
                    styles.signUpButton,
                    styles.signUpButtonActive,
                  )
                : styles.signUpButton
            }
            disabled={!canGoNext || loading}
            onPress={onSubmit}>
            {loading ? (
              <ActivityIndicator style={styles.indicator} color="white" />
            ) : (
              <Text style={styles.signUpButtonText}>다음</Text>
            )}
          </TouchableHighlight>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    // borderBottomWidth: StyleSheet.hairlicheckidth,
    marginTop: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    elevation: 10,
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 20,
    width: 280,
    fontWeight: 'bold',
    // fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  inputWrapper: {
    padding: 5,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    // position: 'absolute',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'gray',
    paddingHorizontal: '34%',
    // paddingVertical: 10,
    borderRadius: 5,
    marginTop: '4%',
  },
  signUpButtonActive: {
    backgroundColor: '#FA6072',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  scrollView: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    paddingTop: 10,
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
    elevation: 10,
    // position: 'relative',
  },
  modalButtonActive: {backgroundColor: '#FA6072'},
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
    color: '#FA6072',
  },
  privacyAgreeText: {
    marginHorizontal: 40,
    marginBottom: 120,
    lineHeight: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'GmarketSansTTFBold',
    color: '#FA6072',
    marginTop: '10%',
    marginLeft: '10%',
    lineHeight: 30,
    marginBottom: '3%',
  },
  indicator: {
    backgroundColor: 'gray',
    paddingHorizontal: '11%',
    // paddingVertical: 10,
    borderRadius: 5,
    // marginTop: '4%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUpOwner;
