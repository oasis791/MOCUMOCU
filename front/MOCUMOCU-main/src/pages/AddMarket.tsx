import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  Pressable,
} from 'react-native';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {LoggedInOwnerParamList} from '../../App';
import marketOwnerSlice from '../slices/marketOwner';
import {RootState} from '../store/reducer';

type AddStoreProps = NativeStackScreenProps<LoggedInOwnerParamList, 'AddStore'>;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('window').height;

function AddMarket({navigation, route}: AddStoreProps) {
  const [loading, setLoading] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [businessNum, setBusinessNum] = useState('');
  const [marketPhoneNum, setMarketPhoneNum] = useState('');
  const [marketName, setMarketName] = useState('');
  const ownerId = useSelector((state: RootState) => state.userTest.id);
  useEffect(() => {
    return setButtonActive(!!businessNum && !!marketPhoneNum && !!marketName);
  }, [businessNum, marketPhoneNum, marketName]);

  const changeCorporationNumber = useCallback(text => {
    setBusinessNum(text);
  }, []);

  const changeStorePhoneNumber = useCallback(text => {
    setMarketPhoneNum(text);
  }, []);

  const changeStoreName = useCallback(text => {
    setMarketName(text);
  }, []);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);

      const response = await axios.post(
        'http://15.164.100.68:8080/owner/store',
        {
          businessNum,
          marketPhoneNum,
          marketName,
          ownerId,
        },
      );
      Alert.alert('알림', '매장 등록에 성공했습니다.');
      setLoading(false);

      navigation.navigate('MainOwner');
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        switch (errorResponse.status) {
          case 404: // 404
            Alert.alert('알림', '매장 등록에 실패하였습니다');
        }
        setLoading(false);
      }
    }
  }, [loading, businessNum, marketPhoneNum, marketName, ownerId, navigation]);
  return (
    <View style={styles.background}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>점주님,</Text>
        <Text style={styles.titleText}>입점을 축하드립니다!</Text>
      </View>

      <View style={styles.inputsWrapper}>
        <TextInput
          style={styles.inputBox}
          placeholder="사업자등록번호"
          value={businessNum}
          onChangeText={changeCorporationNumber}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="가게번호"
          value={marketPhoneNum}
          onChangeText={changeStorePhoneNumber}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="가게이름"
          value={marketName}
          onChangeText={changeStoreName}
        />
      </View>

      <View style={styles.okButtonWrapper}>
        <TouchableOpacity
          style={buttonActive ? styles.okButtonActive : styles.okButton}
          disabled={!buttonActive}
          onPress={onSubmit}>
          {loading ? (
            <ActivityIndicator style={styles.indicator} color="white" />
          ) : (
            <Text style={styles.okButtonText}>다음</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F7F7F7',
    width: screenWidth,
    height: screenHeight,
    padding: 55,
  },
  titleWrapper: {
    marginBottom: 30,
  },
  titleText: {
    fontFamily: 'GmarketSansTTFBold',
    color: '#FA6072',
    fontSize: 28,
  },

  inputsWrapper: {},

  inputBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 9,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  okButtonWrapper: {
    marginTop: 240,
  },

  okButtonActive: {
    backgroundColor: '#FA6072',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  okButton: {
    backgroundColor: '#A5A5A5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 300,
  },

  okButtonText: {
    color: 'white',
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

export default AddMarket;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
