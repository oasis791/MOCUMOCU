import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';

import {LoggedInOwnerParamList} from '../../App';
import {RootState} from '../store/reducer';

type EventControlScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'EventControl'
>;

function EventControl({navigation, route}: EventControlScreenProps) {
  const marketIndex = route.params.marketIndex;
  const marketName = useSelector(
    (state: RootState) => state.marketOwner.markets[marketIndex].name,
  );
  const isAlarm = false;
  const [checkDeleteModalState, setCheckDeleteModalState] = useState(false);
  const onSubmitSetting = () => {
    // Alert.alert('알림', '설정');
    navigation.navigate('SettingsOwner');
  };
  const onSubmitAlarm = () => {
    Alert.alert('알림', '알람');
  };

  const toAddEvent = () => {
    // Alert.alert('알림', 'Addevent로 이동');
    navigation.navigate('AddEvent', {marketIndex});
  };

  const checkDelete = () => {
    Alert.alert('미구현', '이벤트 삭제 확인');
  };
  return (
    <View style={styles.mainBackground}>
      <StatusBar hidden={true} />

      <View style={styles.mainHeader}>
        <View style={styles.headerButtonWrapper}>
          <Pressable onPress={onSubmitAlarm}>
            <Image
              source={
                isAlarm
                  ? require('../assets/icon/mainAlarmActive.png')
                  : require('../assets/icon/mainAlarm.png')
              }
              style={styles.headerAlarm}
            />
          </Pressable>

          <Pressable onPress={onSubmitSetting}>
            <Image
              source={require('../assets/icon/mainSetting.png')}
              style={styles.headerSetting}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.marketTitleWrapper}>
        <Text style={styles.marketTitleText}>이벤트 관리</Text>
        <Text style={[styles.marketTitleText, {fontSize: 12}]}>
          {marketName}
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.eventControlButton}
          onPress={toAddEvent}>
          <Text style={[styles.buttonText, {color: 'white'}]}>이벤트 등록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCheckDeleteModalState(!checkDeleteModalState)}
          style={[styles.eventControlButton, {backgroundColor: 'white'}]}>
          <Text style={[styles.buttonText, {color: '#FA6072'}]}>
            이벤트 삭제
          </Text>
        </TouchableOpacity>
      </View>

      {checkDeleteModalState ? (
        <View style={styles.modalWrapper}>
          <Pressable
            style={styles.modalBackground}
            onPress={() => setCheckDeleteModalState(!checkDeleteModalState)}
          />
          <View style={styles.modalMain}>
            <Text style={styles.modalText}>정말 삭제하시겠습니까?</Text>
            <TouchableOpacity onPress={checkDelete}>
              <Text style={[styles.modalText, {fontSize: 14}]}>삭제</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
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
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 19,
    marginTop: 5,
    justifyContent: 'space-around',
  },
  headerSetting: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  headerAlarm: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    marginRight: 15,
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
  buttonWrapper: {
    width: screenWidth,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventControlButton: {
    backgroundColor: '#FA6072',
    borderColor: '#FA6072',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    width: screenWidth * 0.8,
    height: screenHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 16,
  },
  modalWrapper: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
  },
  modalBackground: {
    height: screenHeight * 0.89,
  },
  modalMain: {
    // padding: ,
    height: screenHeight * 0.11,
    backgroundColor: '#FA6072',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
  },
});

export default EventControl;
