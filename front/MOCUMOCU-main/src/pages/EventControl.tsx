import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AWS from 'aws-sdk';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
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
import Config from 'react-native-config';
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
  const marketId = useSelector(
    (state: RootState) => state.marketOwner.markets[marketIndex].id,
  );

  const [checkDeleteModalState, setCheckDeleteModalState] = useState(false);
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);

  const [bannerImage, setBannerImage] = useState(null);
  const [bannerDetailImage, setBannerDetailImage] = useState(null);

  const toAddEvent = () => {
    // Alert.alert('알림', 'Addevent로 이동');
    navigation.navigate('AddEvent', {
      marketIndex,
      bannerImage,
      bannerDetailImage,
    });
  };

  const checkDelete = async () => {
    const S3_BUCKET = 'mocumocu-bucket';
    const REGION = 'ap-northeast-2';
    const ACCESS_KEY = `${Config.ACCESS_KEY}`;
    const SECRET_ACCESS_KEY = `${Config.SECRET_ACCESS_KEY}`;

    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    const myBucket = new AWS.S3({
      params: {Bucket: S3_BUCKET},
      region: REGION,
    });
    const bannerImageFile = {
      Bucket: S3_BUCKET,
      Key: `${marketId}/banner.png`,
    };

    myBucket.deleteObject(bannerImageFile, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log('s3 배너 삭제완료', data);
      }
    });

    const bannerDetailImageFile = {
      Bucket: S3_BUCKET,
      Key: `${marketId}/detail.png`,
    };

    myBucket.deleteObject(bannerDetailImageFile, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log('s3 디테일 삭제 완료', data);
      }
    });
    try {
      await axios.delete(`${Config.API_URL}/market/${marketId}/event/remove`);
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', '이벤트 삭제에 실패하였습니다');
        console.log(errorResponse.status);
      }
    }
    getImage();
    setCheckDeleteModalState(!checkDeleteModalState);
  };

  const getImage = useCallback(async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/market/${marketId}/event/show`,
      );
      let bannerURL = response.data.bigImage;
      let detailURL = response.data.smallImage;
      console.log(response.data);

      // const bannerURL =
      //   'https://mocumocu-bucket.s3.ap-northeast-2.amazonaws.com/1/banner.png';
      // const detailURL =
      //   'https://mocumocu-bucket.s3.ap-northeast-2.amazonaws.com/1/detail.png';
      // console.log(response.data);
      setBannerImage({uri: bannerURL});
      setBannerDetailImage({uri: detailURL});
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        // Alert.alert('알림', errorResponse.data.message);
        Alert.alert('알림', '이벤트 불러오기에 실패하였습니다.');
      }
    }
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    getImage();
  }, [isFocused]);

  return (
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

        {bannerImage?.uri || bannerDetailImage?.uri ? (
          <TouchableOpacity
            onPress={() => setCheckDeleteModalState(!checkDeleteModalState)}
            style={[styles.eventControlButton, {backgroundColor: 'white'}]}
            disabled={!bannerImage?.uri || !bannerDetailImage?.uri}>
            <Text style={[styles.buttonText, {color: '#FA6072'}]}>
              이벤트 삭제
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {checkDeleteModalState ? (
        <View style={styles.modalWrapper}>
          <TouchableOpacity
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
