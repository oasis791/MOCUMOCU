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
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import {LoggedInOwnerParamList} from '../../App';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type ModifyOwnerPasswordScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'ModifyOwnerPassword'
>;

function ModifyOwnerAccount({navigation}: ModifyOwnerPasswordScreenProps) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const id = useSelector((state: RootState) => state.userTest.id);
  const passwordRef = useRef<TextInput | null>(null);
  const checkPasswordRef = useRef<TextInput | null>(null);
  const telephoneNumberRef = useRef<TextInput | null>(null);
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);

  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const onChangeCheckPassword = useCallback(text => {
    setCheckPassword(text.trim());
  }, []);

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

    try {
      setLoading(true);
      const response = await axios.put(
        `${Config.API_URL}/owner/update/password`,
        {
          id: id,
          password: password,
        },
      );
      Alert.alert('알림', '비밀번호가 변경되었습니다.');
      navigation.navigate('MoreOwner');
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', `${errorResponse.status}`);
        setLoading(false);
      }
    }
  }, [loading, password, checkPassword, id, navigation]); // password는 일방향 암호화(hash화) -> 예측 불가능한 값이 되어버림 but, hash 값이 고정되어있기 때문에 해당 값으로 인증 가능
  const canGoNext = password && checkPassword;
  //   const canGoNext = telephoneNumber;
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
            <Text style={styles.marketTitleText}>비밀번호 변경</Text>
          </View>
          <View style={styles.inputWrapper}>
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
    marginTop: screenHeight * 0.5,
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
});

export default ModifyOwnerAccount;
