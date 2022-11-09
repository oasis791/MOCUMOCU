import React, {useCallback, useRef, useState} from 'react';
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
import Config from 'react-native-config';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type FindPasswordOwnerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FindPassword'
>;

function FindPasswordOwner({navigation}: FindPasswordOwnerScreenProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<TextInput | null>(null);
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);

  const onSubmit = useCallback(async () => {
    // Alert.alert('알림', '회원가입 되었습니다.');
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${Config.API_URL}/owner/find/password`,
        {
          email,
        },
      );
      setLoading(false);
      toBack();
      Alert.alert('알림', `비밀번호는 ${response.data} 입니다.`);
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
        setLoading(false);
      }
    }
  }, [email, loading]); // password는 일방향 암호화(hash화) -> 예측 불가능한 값이 되어버림 but, hash 값이 고정되어있기 때문에 해당 값으로 인증 가능
  const canGoNext = email;
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
            <Text style={[styles.welcomeText]}>비밀번호 찾기</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="이메일"
              placeholderTextColor="#c4c4c4"
              onChangeText={onChangeEmail}
              value={email}
              keyboardType={
                Platform.OS === 'android' ? 'default' : 'ascii-capable'
              }
              textContentType="username"
              returnKeyType="send"
              clearButtonMode="while-editing"
              ref={emailRef}
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
    marginTop: screenHeight / 1.8,
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
});

export default FindPasswordOwner;
