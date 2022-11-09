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
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import Config from 'react-native-config';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type FindIdOwnerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FindIdOwner'
>;

function FindIdOwner({navigation}: FindIdOwnerScreenProps) {
  const [name, setName] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<TextInput | null>(null);
  const telephoneNumberRef = useRef<TextInput | null>(null);

  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  const onChangeName = useCallback(text => {
    setName(text.trim());
  }, []);
  const onChangeTelephoneNumber = useCallback(text => {
    setTelephoneNumber(text);
  }, []);

  const onSubmit = useCallback(async () => {
    // Alert.alert('알림', '회원가입 되었습니다.');
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!telephoneNumber || !telephoneNumber.trim) {
      return Alert.alert('알림', '전화번호를 입력해주세요.');
    }
    try {
      setLoading(true);
      // http method : get, put, patch, post, delete, head, options 가 주로 쓰임
      const response = await axios.post(`${Config.API_URL}/owner/find/email`, {
        ownerName: name,
        phoneNum: telephoneNumber,
      }); //비동기 요청이므로 await가 필요
      Alert.alert('알림', `아이디는 ${response.data} 입니다.`); // -> 본인 ID를 알려줘야 함
      navigation.navigate('SignInOwner');
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
        setLoading(false);
      }
    }
  }, [name, navigation, telephoneNumber]); // password는 일방향 암호화(hash화) -> 예측 불가능한 값이 되어버림 but, hash 값이 고정되어있기 때문에 해당 값으로 인증 가능
  const canGoNext = name && telephoneNumber;

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
  return (
    <>
      <DismissKeyboardView>
        <View>
          <StatusBar hidden={true} />
          <View style={[styles.header]}>
            <Pressable style={styles.headerButton} onPress={toBack}>
              <Image
                source={require('../assets/icon/arrowBack.png')}
                style={styles.headerSetting}
              />
            </Pressable>
          </View>
          <View>
            <Text style={[styles.welcomeText]}>아이디 찾기</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="이름"
              placeholderTextColor="#c4c4c4"
              onChangeText={onChangeName}
              value={name}
              keyboardType={
                Platform.OS === 'android' ? 'default' : 'ascii-capable'
              }
              textContentType="username"
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={nameRef}
              onSubmitEditing={() => telephoneNumberRef.current?.focus()}
            />
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
    color: 'black',
    // fontFamily: 'NotoSansCJKkr-Black (TTF)',
  },
  textDropDown: {
    padding: 5,
    marginTop: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 6,
    paddingHorizontal: 20,
    width: screenWidth / 1.5,
    right: screenWidth / 20,
    fontWeight: 'bold',
    height: screenHeight / 15,
    textAlignVertical: 'center',
  },

  arrowButton: {
    marginTop: screenHeight / 230,
    resizeMode: 'contain',
    height: 20,
    width: 20,
    // backgroundColor: 'pink',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: screenWidth / 1.29,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: screenHeight / 13,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
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
    // flexDirection: 'row',
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
    marginTop: screenHeight / 2.3,
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  modifyUserAccountButton: {
    position: 'absolute',
    bottom: screenHeight / 200,
    left: screenWidth / 8.5,
    // right: 10,
    backgroundColor: '#E6E6E6',
    paddingHorizontal: '34%',
    // paddingVertical: 10,
    borderRadius: 5,
    marginTop: '4%',
    width: screenWidth / 1.29,
    alignItems: 'center',
  },
  modifyUserAccountButtonActive: {
    backgroundColor: '#FA6072',
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
    color: '#FA6072',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // 모달창 css
  modalContainer: {
    height: screenHeight / 2,
    width: screenWidth / 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  buttonClose: {
    flex: 1,
    // backgroundColor: 'tranparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    // height: screenHeight / 5,
    width: screenWidth / 1.2,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    height: screenHeight / 15,
    textAlignVertical: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  // 드랍다운 박스
  dropDownWrapper: {
    paddingHorizontal: 14,
    borderColor: '#e5e5e5',
    width: screenWidth / 1.5,
    fontWeight: 'bold',
  },
  listStyle: {
    width: screenWidth / 1.32,
    height: screenHeight / 8.5,
    borderRadius: 9,
  },
  arrowDown: {
    // width: 15,
    width: screenWidth / 23,
    resizeMode: 'contain',
    height: screenHeight / 40,
  },
});

export default FindIdOwner;
