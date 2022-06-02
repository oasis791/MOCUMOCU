import React, {useCallback, useRef, useState} from 'react';
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
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RadioButton} from 'react-native-paper';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';

import Config from 'react-native-config';
import BottomSheet from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import DatePicker from 'react-native-date-picker';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const window = Dimensions.get('screen');

function SignUp({navigation}: SignUpScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [checkGender, setCheckGender] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isBirthClick, setIsBirthClick] = useState(false);
  const [clickDate, setClickDate] = useState(new Date());
  const [sendDate, setSendDate] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const checkPasswordRef = useRef<TextInput | null>(null);
  const telephoneNumberRef = useRef<TextInput | null>(null);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => [-30, '35%'], []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const toCertification = () => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    Alert.alert('알림', '인증번호를 입력해주세요');
  };
  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);
  const onChangeName = useCallback(text => {
    setName(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const onChangeCheckPassword = useCallback(text => {
    setCheckPassword(text.trim());
  }, []);
  const onChangeTelephoneNumber = useCallback(text => {
    setTelephoneNumber(text.trim());
  }, []);
  const expandButtonPress = () => {
    bottomSheetRef?.current?.expand();
    setIsOpen(true);
  };
  const closeButtonPress = () => {
    bottomSheetRef?.current?.close();
    setIsOpen(false);
  };
  const renderBackDrop = () => {
    return isOpen ? (
      <Animated.View
        style={{
          opacity: 0.5,
          backgroundColor: '#000',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <TouchableOpacity
          style={{
            width: window.width,
            height: window.height,
            backgroundColor: 'transparent',
          }}
          activeOpacity={1}
          onPress={closeButtonPress}
        />
      </Animated.View>
    ) : (
      <></>
    );
  };
  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!checkPassword || !checkPassword.trim()) {
      return Alert.alert('알림', '비밀번호 확인을 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
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
    if (!checkGender) {
      return Alert.alert('알림', '성별을 선택해주세요');
    }
    console.log(
      email,
      name,
      password,
      checkPassword,
      telephoneNumber,
      checkGender,
      sendDate,
    );
    // Alert.alert('알림', '회원가입 되었습니다.');
    try {
      setLoading(true);
      // http method : get, put, patch, post, delete, head, options 가 주로 쓰임
      const response = await axios.post(
        'http://54.180.91.167:8080/user/signup ',
        {
          customerName: name,
          customerPhoneNum: telephoneNumber,
          customerEmail: email,
          customerPassword: password,
          customerCheckPassword: checkPassword,
          customerBirth: sendDate,
          customerGender: checkGender,
        },
      ); //비동기 요청이므로 await가 필요
      console.log(response);
      console.log(Config.API_URL);
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('SignIn');
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
        setLoading(false);
      }
    }
  }, [
    navigation,
    loading,
    email,
    name,
    password,
    checkPassword,
    telephoneNumber,
    checkGender,
    sendDate,
  ]); // password는 일방향 암호화(hash화) -> 예측 불가능한 값이 되어버림 but, hash 값이 고정되어있기 때문에 해당 값으로 인증 가능
  const canGoNext =
    email &&
    name &&
    password &&
    checkPassword &&
    telephoneNumber &&
    checkGender &&
    sendDate;
  const [modalVisible, setModalVisible] = useState<any>(true);
  const [scrollToBottom, setScrollToBottom] = useState<any>(false);
  return (
    <>
      <DismissKeyboardView>
        <View>
          <StatusBar hidden={true} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <SafeAreaView style={{paddingTop: 10}}>
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
                  Voluptatum dolor, perferendis beatae repellendus architecto
                  illo consequuntur amet possimus ullam velit dignissimos
                  obcaecati! Officia, reiciendis? Voluptate sequi ex dolorem
                  doloribus quas? Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Voluptatum dolor, perferendis beatae
                  repellendus architecto illo consequuntur amet possimus ullam
                  velit dignissimos obcaecati! Officia, reiciendis? Voluptate
                  sequi ex dolorem doloribus quas? Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Voluptatum dolor, perferendis
                  beatae repellendus architecto illo consequuntur amet possimus
                  ullam velit dignissimos obcaecati! Officia, reiciendis?
                  Voluptate sequi ex dolorem doloribus quas? Lorem ipsum, dolor
                  sit amet consectetur adipisicing elit. Voluptatum dolor,
                  perferendis beatae repellendus architecto illo consequuntur
                  amet possimus ullam velit dignissimos obcaecati! Officia,
                  reiciendis? Voluptate sequi ex dolorem doloribus quas? Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
                  dolor, perferendis beatae repellendus architecto illo
                  consequuntur amet possimus ullam velit dignissimos obcaecati!
                  Officia, reiciendis? Voluptate sequi ex dolorem doloribus
                  quas? Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Voluptatum dolor, perferendis beatae repellendus
                  architecto illo consequuntur amet possimus ullam velit
                  dignissimos obcaecati! Officia, reiciendis? Voluptate sequi ex
                  dolorem doloribus quas? Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Voluptatum dolor, perferendis
                  beatae repellendus architecto illo Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Voluptatum dolor, perferendis
                  beatae repellendus architecto illo consequuntur amet possimus
                  ullam velit dignissimos obcaecati! Officia, reiciendis?
                  Voluptate sequi ex dolorem doloribus quas? Lorem ipsum, dolor
                  sit amet consectetur adipisicing elit. Voluptatum dolor,
                  perferendis beatae repellendus architecto illo consequuntur
                  amet possimus ullam velit dignissimos obcaecati! Officia,
                  reiciendis? Voluptate sequi ex dolorem doloribus quas? Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
                  dolor, perferendis beatae repellendus architecto illo
                  consequuntur amet possimus ullam velit dignissimos obcaecati!
                  Officia, reiciendis? Voluptate sequi ex dolorem doloribus
                  quas? Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Voluptatum dolor, perferendis beatae repellendus
                  architecto illo consequuntur amet possimus ullam velit
                  dignissimos obcaecati! Officia, reiciendis? Voluptate sequi ex
                  dolorem doloribus quas? Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Voluptatum dolor, perferendis
                  beatae repellendus architecto illo consequuntur amet possimus
                  ullam velit dignissimos obcaecati! Officia, reiciendis?
                  Voluptate sequi ex dolorem doloribus quas? Lorem ipsum, dolor
                  sit amet consectetur adipisicing elit. Voluptatum dolor,
                  perferendis beatae repellendus architecto illo consequuntur
                  amet possimus ullam velit dignissimos obcaecati! Officia,
                  reiciendis? Voluptate sequi ex dolorem doloribus quas? Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
                  dolor, perferendis beatae repellendus architecto illo
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
              회원님, {'\n'}환영합니다!
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="이름"
              placeholderTextColor="#c4c4c4"
              onChangeText={onChangeName}
              value={name}
              textContentType="name"
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={nameRef}
              onSubmitEditing={() => emailRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.emailWrapper}>
              <TextInput
                style={styles.textInputEmail}
                onChangeText={onChangeEmail}
                placeholder="이메일"
                placeholderTextColor="#c4c4c4"
                textContentType="emailAddress"
                value={email}
                returnKeyType="next"
                clearButtonMode="while-editing"
                ref={emailRef}
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={styles.certificationButton}
                onPress={toCertification}>
                <Text style={styles.certificationButtonText}>인증</Text>
              </TouchableOpacity>
            </View>
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
              textContentType="telephoneNumber"
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={telephoneNumberRef}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.bottomSheetWrapper}>
              <Text
                style={{
                  color: '#c4c4c4',
                  fontWeight: 'bold',
                  fontSize: 14,
                  fontFamily: 'normal',
                }}>
                성별
              </Text>
              <Pressable onPress={expandButtonPress}>
                <Image
                  source={require('../assets/icon/bottomArrowIcon.png')}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </Pressable>
              <Portal hostName="customGender">
                <BottomSheet
                  ref={bottomSheetRef}
                  index={-1}
                  snapPoints={snapPoints}
                  onChange={handleSheetChanges}
                  backdropComponent={renderBackDrop}>
                  <View style={styles.radioWrapper}>
                    <Text style={styles.radioText}>남성</Text>
                    <RadioButton
                      value="male"
                      status={checkGender === 'male' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setCheckGender('MALE');
                        closeButtonPress();
                      }}
                      color="#414FFD"
                    />
                  </View>
                  <View style={styles.radioWrapper}>
                    <Text style={styles.radioText}>여성</Text>
                    <RadioButton
                      value="female"
                      status={
                        checkGender === 'female' ? 'checked' : 'unchecked'
                      }
                      onPress={() => {
                        setCheckGender('FEMALE');
                        closeButtonPress();
                      }}
                      color="#414FFD"
                    />
                  </View>
                </BottomSheet>
              </Portal>
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.bottomSheetWrapper}>
              <Text
                style={{
                  color: '#c4c4c4',
                  fontWeight: 'bold',
                  fontSize: 14,
                  fontFamily: 'normal',
                }}>
                생년월일
              </Text>
              <Pressable
                onPress={() => {
                  setIsBirthClick(true);
                  // console.log(isBirthClick);
                }}>
                <Image
                  // source={require('./src/assets/saveButton.png')}
                  source={require('../assets/icon/bottomArrowIcon.png')}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.buttonZone}>
            <TouchableHighlight
              underlayColor={'#c4c4c4'}
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
      <PortalHost name="customGender" />
      {isBirthClick ? (
        <>
          <DatePicker
            modal
            mode="date"
            open={isBirthClick}
            date={clickDate}
            textColor="#414FFD"
            onDateChange={setClickDate}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onConfirm={clickDate => {
              setSendDate(clickDate.toISOString().split('T')[0]);
              console.log(sendDate);
              setIsBirthClick(false);
            }}
            confirmText="확인"
            cancelText="취소"
            onCancel={() => {
              setIsBirthClick(false);
            }}
          />
        </>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    marginTop: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 20,
    width: 280,
    fontWeight: 'bold',
    // fontFamily: 'NotoSansCJKkr-Black (TTF)',
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
    padding: 5,
    alignItems: 'center',
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
    backgroundColor: '#414FFD',
  },
  signUpButtonText: {
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
    fontSize: 24,
    fontFamily: 'GmarketSansTTFBold',
    color: '#414FFD',
    marginTop: '10%',
    marginLeft: '10%',
    lineHeight: 30,
    marginBottom: '3%',
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
  bottomSheet: {
    borderRadius: 20,
  },
});

export default SignUp;
