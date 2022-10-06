import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {LoggedInOwnerParamList} from '../../App';
import {launchImageLibrary} from 'react-native-image-picker';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';
type AddEventScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'AddEvent'
>;

function AddEvent({navigation, route}: AddEventScreenProps) {
  useEffect(() => {
    Alert.alert('미구현', '등록된 이미지 불러오기');
  }, []);

  const marketIndex = route.params.marketIndex;
  const marketName = useSelector(
    (state: RootState) => state.marketOwner.markets[marketIndex].name,
  );
  const isAlarm = false;

  const [bannerImage, setBannerImage] = useState(null);
  const [bannerDetailImage, setBannerDetailImage] = useState(null);

  const onSubmitSetting = () => {
    // Alert.alert('알림', '설정');
    navigation.navigate('SettingsOwner');
  };
  const onSubmitAlarm = () => {
    Alert.alert('알림', '알람');
  };

  const uploadImage = async (type: string) => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (type === '배너 이미지') {
          setBannerImage(response.assets[0].base64);
        } else {
          setBannerDetailImage(response.assets[0].base64);
        }
      }
    });
  };

  return (
    <ScrollView style={styles.mainBackground}>
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
        <Text style={styles.marketTitleText}>이벤트 등록</Text>
        <Text style={[styles.marketTitleText, {fontSize: 12}]}>
          {marketName}
        </Text>
      </View>

      <View>
        <View style={styles.imageTitleWrapper}>
          <Text style={styles.innerImageTitleText}>배너 이미지</Text>
        </View>

        <View style={styles.bannerImageWrapper}>
          <TouchableWithoutFeedback onPress={() => uploadImage('배너 이미지')}>
            <Image
              source={
                bannerImage
                  ? {uri: 'data:image/jpeg;base64,' + bannerImage}
                  : require('../assets/bannerImage_default.png')
              }
              style={{width: screenWidth, height: 300}}
            />
          </TouchableWithoutFeedback>
        </View>

        <View>
          <View style={styles.imageTitleWrapper}>
            <Text style={styles.innerImageTitleText}>상세보기 이미지</Text>
          </View>

          <View style={[styles.bannerImageWrapper, {marginBottom: 0}]}>
            <TouchableWithoutFeedback
              onPress={() => uploadImage('배너 상세 이미지')}>
              <Image
                source={
                  bannerDetailImage
                    ? {uri: 'data:image/jpeg;base64,' + bannerDetailImage}
                    : require('../assets/bannerDetailImage_default.png')
                }
                style={{width: screenWidth, height: 300}}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </ScrollView>
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
    // justifyContent: 'space-around',
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

  bannerImageWrapper: {
    marginBottom: 20,
  },

  imageTitleWrapper: {
    // marginLeft: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  innerImageTitleText: {
    color: 'black',
  },
});
export default AddEvent;
