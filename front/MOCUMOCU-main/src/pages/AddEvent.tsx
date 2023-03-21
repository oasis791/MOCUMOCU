import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
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
  TouchableOpacity,
  View,
} from 'react-native';
import {LoggedInOwnerParamList} from '../../App';
import {launchImageLibrary} from 'react-native-image-picker';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';
import axios, {AxiosError} from 'axios';
import AWS from 'aws-sdk';
import {Buffer} from 'buffer';
import Config from 'react-native-config';

type AddEventScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'AddEvent'
>;

function AddEvent({navigation, route}: AddEventScreenProps) {
  const marketIndex = route.params.marketIndex;
  const marketName = useSelector(
    (state: RootState) => state.marketOwner.markets[marketIndex].name,
  );
  const marketId = useSelector(
    (state: RootState) => state.marketOwner.markets[marketIndex].id,
  );

  const [bannerImage, setBannerImage] = useState(route.params.bannerImage);
  const [bannerDetailImage, setBannerDetailImage] = useState(
    route.params.bannerDetailImage,
  );

  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);

  const selectImage = useCallback(async (type: string) => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // image.uri = response.assets[0].uri.replace('file://', '');
        if (type === '배너 이미지') {
          setBannerImage(response.assets[0]);
        } else {
          setBannerDetailImage(response.assets[0]);
        }
      }
    });
  }, []);

  const uploadImages = useCallback(async () => {
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
      Body: Buffer.from(bannerImage?.base64, 'base64'),
      Bucket: S3_BUCKET,
      Key: `${marketId}/banner.png`,
    };

    myBucket
      .putObject(bannerImageFile)
      .on('httpUploadProgress', evt => {
        console.log(Math.round((evt.loaded / evt.total) * 100));
      })
      .send(err => {
        if (err) {
          console.log('err: ', JSON.stringify(err));
        }
      });

    const bannerDetailImageFile = {
      Body: Buffer.from(bannerDetailImage?.base64, 'base64'),
      Bucket: S3_BUCKET,
      Key: `${marketId}/detail.png`,
    };

    myBucket
      .putObject(bannerDetailImageFile)
      .on('httpUploadProgress', evt => {
        console.log(Math.round((evt.loaded / evt.total) * 100));
      })
      .send(err => {
        if (err) {
          console.log('err: ', JSON.stringify(err));
        }
      });

    try {
      await axios.post(`${Config.API_URL}/market/event/add`, {
        id: marketId,
        smallImage: `https://mocumocu-bucket.s3.ap-northeast-2.amazonaws.com/${marketId}/banner.png`,
        bigImage: `https://mocumocu-bucket.s3.ap-northeast-2.amazonaws.com/${marketId}/detail.png`,
      });
      Alert.alert('알림', '이벤트 등록에 성공했습니다.');
      toBack();
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        // Alert.alert('알림', errorResponse.data.message);
        Alert.alert('알림', '이벤트 등록에 실패하였습니다.');
      }
    }
  }, [bannerImage?.base64, marketId, bannerDetailImage?.base64]);

  return (
    <ScrollView style={styles.mainBackground}>
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
          <TouchableWithoutFeedback onPress={() => selectImage('배너 이미지')}>
            <Image
              source={
                bannerImage.uri
                  ? {uri: bannerImage.uri}
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
              onPress={() => selectImage('배너 상세 이미지')}>
              <Image
                source={
                  bannerDetailImage.uri
                    ? {uri: bannerDetailImage.uri}
                    : require('../assets/bannerDetailImage_default.png')
                }
                style={{width: screenWidth, height: 300}}
              />
            </TouchableWithoutFeedback>
          </View>
          {/* <Image
            source={require('')}
            style={{width: screenWidth, height: 300}}
          /> */}
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={uploadImages}
            disabled={false}>
            <Text style={styles.buttonText}>등록</Text>
          </TouchableOpacity>
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
    // justifyContent: 'flex-end',
    marginBottom: 10,
  },
  headerSetting: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 19,
    marginTop: 5,
    // justifyContent: 'space-around',
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

  buttonWrapper: {
    marginVertical: 20,
    alignItems: 'center',
  },
  addButton: {
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
    color: 'white',
  },
});
export default AddEvent;
