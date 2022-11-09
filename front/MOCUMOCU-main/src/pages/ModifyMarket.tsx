import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Config from 'react-native-config';

import {useSelector} from 'react-redux';
import {LoggedInOwnerParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';
import {RootState} from '../store/reducer';

type ModifyMarketScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'ModifyMarket'
>;

function ModifyMarket({navigation, route}: ModifyMarketScreenProps) {
  const marketIndex = route.params.marketIndex;
  const marketName = useSelector(
    (state: RootState) => state.marketOwner.markets[marketIndex].name,
  );
  const ownerName = useSelector((state: RootState) => state.userTest.name);
  const [marketPhoneNum, setMarketPhoneNum] = useState('000-0000-0000');

  const [newMarketPhoneNum, setNewOwnerPhoneNum] = useState('');

  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  const onChangeTelephoneNumber = useCallback(text => {
    setNewOwnerPhoneNum(text);
  }, []);
  const telephoneNumberRef = useRef<TextInput | null>(null);

  const [buttonActive, setButtonActive] = useState(false);

  const getMarketPhoneNum = useCallback(async () => {
    try {
      // const response = await axios.get(`${Config.API_URL}/`);
      // setMarketPhoneNum(response.data);
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', '매장 전화번호를 불러오는데 실패하였습니다.');
      }
    }
  }, []);

  const onSubmit = useCallback(async () => {
    // Alert.alert('미구현', '매장정보 수정 api 송신');
    try {
      await axios.put(`${Config.API_URL}/market/update/market-num`);
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        // Alert.alert('알림', errorResponse.data.message);
        Alert.alert('알림', '매장 전화번호를 변경하였습니다.');
      }
    }
  }, []);

  useEffect(() => {
    setButtonActive(newMarketPhoneNum.length > 11);

    if (newMarketPhoneNum.length === 11) {
      setNewOwnerPhoneNum(
        newMarketPhoneNum
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
  }, [newMarketPhoneNum]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getMarketPhoneNum();
  }, [isFocused]);

  return (
    <DismissKeyboardView>
      <View style={styles.mainBackground}>
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
          <Text style={styles.marketTitleText}>매장정보 수정</Text>
          <Text style={[styles.marketTitleText, {fontSize: 12}]}>
            {marketName}
          </Text>
        </View>

        <View style={styles.marketInfoWrapper}>
          <View style={styles.textBox}>
            <Text style={styles.infoText}>{marketName}</Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.infoText}>{ownerName}</Text>
          </View>
          <TextInput
            style={styles.inputBox}
            placeholder={marketPhoneNum}
            placeholderTextColor="#c4c4c4"
            onChangeText={onChangeTelephoneNumber}
            keyboardType="decimal-pad"
            value={newMarketPhoneNum}
            textContentType="telephoneNumber"
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={telephoneNumberRef}
            // onSubmitEditing={onSubmit}
            blurOnSubmit={false}
            maxLength={13}
            caretHidden={true}
          />
          <TouchableOpacity
            style={
              buttonActive
                ? styles.submitButton
                : [styles.submitButton, {backgroundColor: '#A5A5A5'}]
            }
            disabled={!buttonActive}
            onPress={onSubmit}>
            <Text style={styles.submitButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboardView>
  );
}
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainBackground: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#F7F7F7',
  },

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

  marketInfoWrapper: {
    margin: 40,
    marginTop: 0,
    alignItems: 'center',
  },
  textBox: {
    width: screenWidth * 0.78,
    height: screenHeight * 0.08,
    backgroundColor: '#e6e6e6',
    borderColor: '#c1c1c1',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    padding: 4,
    paddingLeft: 20,
  },
  inputBox: {
    // backgroundColor: 'white',
    width: screenWidth * 0.78,
    height: screenHeight * 0.08,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#c1c1c1',
    color: 'black',
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    color: '#a0a0a0',
  },
  textInput: {
    height: screenHeight * 0.07,
    padding: 0,
    backgroundColor: 'white',
  },
  submitButton: {
    width: screenWidth * 0.78,
    height: screenHeight * 0.08,
    backgroundColor: '#FA6072',
    borderRadius: 10,
    marginTop: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 16,
  },
});

export default ModifyMarket;
