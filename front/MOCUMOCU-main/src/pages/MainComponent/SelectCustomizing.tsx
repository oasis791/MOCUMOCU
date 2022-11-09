import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInUserParamList} from '../../../App';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Pressable,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';

type SelectCustomizingScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'SelectCustomizing'
>;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// const customizingBoardImage = [
//   {
//     imageName: 'defaultBoard',
//     point: 0,
//   },
//   {
//     imageName: '첫번째 요소',
//     point: 10,
//   },
//   {
//     imageName: '두번째 요소',
//     point: 30,
//   },
//   {
//     imageName: '세번째 요소',
//     point: 30,
//   },
//   {
//     imageName: '네번째 요소',
//     point: 30,
//   },
//   {
//     imageName: '다섯번째 요소',
//     point: 30,
//   },
//   {
//     imageName: '여섯번째 요소',
//     point: 30,
//   },
//   {
//     imageName: '일곱번째 요소',
//     point: 30,
//   },
//   {
//     imageName: '여덟번째 요소',
//     point: 30,
//   },
// ];

// const customizingStampImage = [
//   {
//     imageName: 'defaultStamp',
//     point: 0,
//   },
//   {
//     imageName: '첫번째 스탬프',
//     point: 10,
//   },
//   {
//     imageName: '두번째 스탬프',
//     point: 30,
//   },
//   {
//     imageName: '세번째 스탬프',
//     point: 30,
//   },
//   {
//     imageName: '네번째 스탬프',
//     point: 30,
//   },
//   {
//     imageName: '다섯번째 스탬프',
//     point: 30,
//   },
//   {
//     imageName: '여섯번째 스탬프',
//     point: 30,
//   },
//   {
//     imageName: '일곱번째 스탬프',
//     point: 30,
//   },
//   {
//     imageName: '여덟번째 스탬프',
//     point: 30,
//   },
// ];

const defaultBoardImage = {
  id: -1,
  bigImageUrl: require('../../assets/largeBoard.png'),
  smallImageUrl: require('../../assets/smallBoard.png'),
  point: 0,
};
const defaultStampImage = {
  id: -1,
  smallImageUrl: require('../../assets/smallBoard.png'),
  point: 0,
};

function SelectCustomizing({navigation, route}: SelectCustomizingScreenProps) {
  const selectedCouponId = route.params.couponId;
  const customerId = useSelector((state: RootState) => state.userTest.id);

  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('board');
  const [customizeId, setCustomizeId] = useState(selectedCouponId);
  const [clickBoardElement, setClickBoardElement] = useState(0);
  const [clickStampElement, setClickStampElement] = useState(0);
  const [boardImage, setBoardImage] = useState([defaultBoardImage]);
  const [stampImage, setStampImage] = useState([defaultStampImage]);

  const [isBoardPress, setIsBoardPress] = useState(
    Array(boardImage.length).fill(false),
  );
  const [isStampPress, setIsStampPress] = useState(
    Array(stampImage.length).fill(false),
  );

  useEffect(() => {
    // let isActive = true;
    const getCustomizeInfo = async () => {
      try {
        const response = await axios.post(
          `${Config.API_URL}/customize-customer/component-list`,
          {
            customerId: customerId,
            type: select,
          },
        );
        console.log('selectCustomizing', select);
        if (select === 'board') {
          setBoardImage([defaultBoardImage, ...response.data]);
          console.log('boardResponse', response.data);
        } else if (select === 'stamp') {
          setStampImage([defaultStampImage, ...response.data]);
          console.log('stampResponse', response.data);
        }
      } catch (error) {
        const errorResponse = (error as AxiosError<any>).response;
        if (errorResponse) {
          Alert.alert('알림', 'Board || Stamp');
          console.log('selectCustomizing', errorResponse);
          setLoading(false);
        }
      }
    };
    // const getStampInfo = async () => {
    //   try {
    //     const response = await axios.get();
    //     console.log('point', response.data);
    //     setPoint(response.data);
    //     setCustomizingStampImage(response.data);
    //   } catch (error) {
    //     const errorResponse = (error as AxiosError<any>).response;
    //     if (errorResponse) {
    //       Alert.alert('알림', 'Stamp');
    //       setLoading(false);
    //     }
    //   }
    // };
    getCustomizeInfo();
    // getStampInfo();
    return () => {};
  }, [customerId, select]);

  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);

  const selectBoard = () => {
    setSelect('board');
    // setIsBoardPress(Array(customizingStampImage.length).fill(false));
    setClickStampElement(clickStampElement);
  };
  const selectStamp = () => {
    setSelect('stamp');
    // setIsStampPress(Array(customizingStampImage.length).fill(false));
    setClickBoardElement(clickBoardElement);
  };
  const changeIsPress = useCallback(
    (props: number) => {
      if (select === 'board') {
        let newArr = Array(isBoardPress.length).fill(false);
        newArr[props] = !newArr[props];
        setIsBoardPress(newArr);
      } else {
        let newArr = Array(isStampPress.length).fill(false);
        newArr[props] = !newArr[props];
        setIsStampPress(newArr);
      }
    },
    [isBoardPress.length, isStampPress.length, select],
  );
  async function getApplyContent() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${Config.API_URL}/coupon/set/customize`,
        {
          couponId: selectedCouponId,
          customizeId: customizeId,
          type: select,
        },
      );
      console.log('apply', response.data);
      Alert.alert('알림', '적용 완료');
      setClickBoardElement(0);
      setClickStampElement(0);
      setIsStampPress(Array(stampImage.length).fill(false));
      setIsBoardPress(Array(stampImage.length).fill(false));
      setLoading(false);
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        console.log(errorResponse);
        console.log('적용 오류');
        setLoading(false);
      }
    }
  }
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <View style={styles.header}>
          <Pressable style={styles.headerButton} onPress={toBack}>
            <Image
              source={require('../../assets/icon/arrowBack.png')}
              style={styles.headerSetting}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.viewCouponImageContainer}>
        <View style={styles.viewCouponImage}>
          {select === 'board' ? (
            <ImageBackground
              source={{
                uri: `${boardImage[clickBoardElement].bigImageUrl}`,
              }}
              resizeMode="contain"
              resizeMethod="auto"
              style={styles.viewCouponImage}
            />
          ) : (
            <ImageBackground
              source={{
                uri: `${boardImage[clickBoardElement].bigImageUrl}`,
              }}
              resizeMode="contain"
              resizeMethod="auto"
              style={styles.viewCouponImage}>
              <View style={styles.stampContainer}>
                {stampImage.map(stamp => {
                  return (
                    <Image
                      source={{
                        uri: `${stampImage[clickStampElement].smallImageUrl}`,
                      }}
                      style={{
                        width: screenHeight / 25,
                        // flex: 1 / 3,
                        // marginHorizontal: 15,
                        height: screenHeight / 23,
                        margin: 5,
                      }}
                      resizeMethod="auto"
                      resizeMode="cover"
                    />
                  );
                })}
              </View>
            </ImageBackground>
          )}
        </View>
      </View>
      <View style={styles.selectCustomizingButton}>
        <Pressable onPress={selectBoard}>
          <Text
            style={
              select === 'board'
                ? [styles.selectText, {color: '#414FFD'}]
                : styles.selectText
            }>
            쿠폰 판
          </Text>
          <View
            style={
              select === 'board'
                ? [styles.selectLine, {backgroundColor: '#414FFD'}]
                : styles.selectLine
            }
          />
        </Pressable>
        <Pressable onPress={selectStamp}>
          <Text
            style={
              select === 'stamp'
                ? [styles.selectText, {color: '#414FFD'}]
                : styles.selectText
            }>
            쿠폰 도장
          </Text>
          <View
            style={
              select === 'stamp'
                ? [styles.selectLine, {backgroundColor: '#414FFD'}]
                : styles.selectLine
            }
          />
        </Pressable>
      </View>
      <ScrollView
        style={styles.imageContainer}
        contentContainerStyle={styles.imageContent}>
        {select === 'stamp'
          ? stampImage.map((stamp, index) => {
              return (
                <Pressable
                  style={
                    index === clickStampElement && isStampPress[index]
                      ? [styles.boardContent, {borderColor: 'red'}]
                      : styles.boardContent
                  }
                  key={index}
                  onPress={() => {
                    if (index === clickStampElement && isStampPress[index]) {
                      changeIsPress(index);
                      setClickStampElement(0);
                      setCustomizeId(-1);
                    } else {
                      changeIsPress(index);
                      setClickStampElement(index);
                      setCustomizeId(stamp.id);
                    }
                  }}>
                  <ImageBackground
                    source={{uri: `${stamp.smallImageUrl}`}}
                    // resizeMode="contain"
                  >
                    <Text
                      style={{
                        width: screenWidth / 7.3,
                        height: screenHeight / 10.5,
                        borderRadius: 10,
                      }}
                      key={`${stamp.id}${index}`}
                    />
                  </ImageBackground>
                </Pressable>
              );
            })
          : boardImage.map((board, index) => {
              return (
                <Pressable
                  style={
                    index === clickBoardElement && isBoardPress[index]
                      ? [styles.boardContent, {borderColor: 'red'}]
                      : styles.boardContent
                  }
                  key={index}
                  onPress={() => {
                    if (index === clickBoardElement && isBoardPress[index]) {
                      changeIsPress(index);
                      setClickBoardElement(0);
                      setCustomizeId(-1);
                    } else {
                      changeIsPress(index);
                      setClickBoardElement(index);
                      setCustomizeId(board.id);
                    }
                  }}>
                  <ImageBackground
                    source={{uri: `${board.smallImageUrl}`}}
                    resizeMode="center">
                    <Text
                      style={{
                        width: screenWidth / 7.3,
                        height: screenHeight / 10.5,
                        borderRadius: 10,
                      }}
                      key={`${board.id}${index}`}
                    />
                  </ImageBackground>
                </Pressable>
              );
            })}
      </ScrollView>
      {/* <View
        style={
          clickElement < 0
            ? styles.applyContainer
            : [styles.applyContainer, {backgroundColor: '#414FFD'}]
        }> */}
      <Pressable
        style={
          customizeId < -1
            ? styles.applyButton
            : [styles.applyButton, {backgroundColor: '#414FFD'}]
        }
        disabled={customizeId < -1 ? true : false}
        onPress={getApplyContent}>
        {loading ? (
          <ActivityIndicator style={styles.indicator} color="white" />
        ) : (
          <Text
            style={{
              fontFamily: 'GmarketSansTTF',
              fontSize: 15,
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
            }}>
            적용
          </Text>
        )}
      </Pressable>
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: screenHeight / 15,
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
    // marginTop: screenHeight / 25,
    // flex: 1,
    width: 18,
    resizeMode: 'contain',
    // flex: 1 / 3,
    // marginHorizontal: 15,
    height: 18,
  },

  // 상단에 쿠폰 커스터마이징된 거 보여주는 부분
  viewCouponImageContainer: {
    height: screenHeight / 3.2,
    width: screenWidth,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCouponImage: {
    width: screenWidth / 1.4,
    height: screenHeight / 4.8,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 12,
  },
  stampContainer: {
    width: screenWidth / 1.65,
    height: screenHeight / 4.8,
    // backgroundColor: 'pink',
    paddingVertical: screenWidth / 15,
    paddingHorizontal: screenHeight / 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    // alignItems: 'center',
  },

  // 쿠폰 커스터마이징 요소 들어갈 부분
  selectCustomizingButton: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cecece',
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
  },
  selectLine: {
    backgroundColor: '#cecece',
    height: screenHeight / 250,
    width: screenWidth / 2,
    // borderLeftColor: 'black',
    // borderWidth: 0.5,
  },
  imageContainer: {
    width: screenWidth / 1.1,
    // height: screenHeight / 2,
    // paddingVertical: 8,
    maxHeight: screenHeight,
    marginHorizontal: screenWidth / 20,
  },
  imageContent: {
    // marginVertical: screenHeight / 30,
    marginHorizontal: screenWidth / 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'cyan',
  },

  // 커마 요소
  boardContent: {
    width: screenWidth / 7,
    height: screenHeight / 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  // 커마 구매 탭
  applyContainer: {
    // marginTop: 10,
    height: screenHeight / 10,
    width: screenWidth,
    // marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#cecece',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applyText: {
    width: screenWidth / 7,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: screenWidth / 17,
  },
  applyButton: {
    // marginRight: screenWidth / 15,
    // alignItems: 'center',
    // backgroundColor: 'pink',
    // textAlign: 'center',
    width: screenWidth / 1.2,
    height: screenHeight / 12,
    marginBottom: screenHeight / 16,
    marginLeft: screenWidth / 12,
    backgroundColor: '#cecece',
    justifyContent: 'center',
    borderRadius: 12,
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

export default SelectCustomizing;
