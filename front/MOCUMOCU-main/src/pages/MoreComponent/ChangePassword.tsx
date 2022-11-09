import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {LoggedInUserParamList} from '../../../App';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import {RootState} from '../../store/reducer';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type ChangePasswordScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'ChangePassword'
>;

function ChangePassword({navigation}: ChangePasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const customerId = useSelector((state: RootState) => state.userTest.id);

  const passwordRef = useRef<TextInput | null>(null);
  const checkPasswordRef = useRef<TextInput | null>(null);

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
    console.log(password, checkPassword);
    try {
      setLoading(true);
      // http method : get, put, patch, post, delete, head, options 가 주로 쓰임
      const response = await axios.put(
        `${Config.API_URL}/customer/update/password`,
        {
          id: customerId,
          password: password,
        },
      ); //비동기 요청이므로 await가 필요
      console.log(response);
      Alert.alert('알림', '수정 완료');
      navigation.navigate('ModifyUserAccount');
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
        console.log(errorResponse);
        setLoading(false);
      }
    }
  }, [checkPassword, customerId, loading, navigation, password]);
  const canGoNext = password && checkPassword;
  return (
    <DismissKeyboardView>
      <View style={styles.header}>
        <Pressable style={styles.headerButton} onPress={toBack}>
          <Image
            source={require('../../assets/icon/arrowBack.png')}
            style={styles.headerSetting}
          />
        </Pressable>
      </View>
      <View style={{justifyContent: 'flex-start'}}>
        <View>
          <Text style={[styles.welcomeText]}>비밀번호 변경</Text>
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
            blurOnSubmit={false}
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
    </DismissKeyboardView>
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
  inputWrapper: {
    // backgroundColor: 'pink',
    padding: 5,
    alignItems: 'center',
    // height: screenHeight / 12,
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
  buttonZone: {
    // position: 'absolute',
    marginTop: screenHeight / 2.5,
    alignItems: 'center',
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
});

export default ChangePassword;
