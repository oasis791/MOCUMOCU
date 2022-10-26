import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInUserParamList} from '../../../App';
import React, {useCallback, useState} from 'react';
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
} from 'react-native';

type SelectCustomizingScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'SelectCustomizing'
>;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const customizingBoardImage = [
  {
    imageName: 'defaultBoard',
    point: 0,
  },
  {
    imageName: '첫번째 요소',
    point: 10,
  },
  {
    imageName: '두번째 요소',
    point: 30,
  },
  {
    imageName: '세번째 요소',
    point: 30,
  },
  {
    imageName: '네번째 요소',
    point: 30,
  },
  {
    imageName: '다섯번째 요소',
    point: 30,
  },
  {
    imageName: '여섯번째 요소',
    point: 30,
  },
  {
    imageName: '일곱번째 요소',
    point: 30,
  },
  {
    imageName: '여덟번째 요소',
    point: 30,
  },
];

const customizingStampImage = [
  {
    imageName: 'defaultStamp',
    point: 0,
  },
  {
    imageName: '첫번째 스탬프',
    point: 10,
  },
  {
    imageName: '두번째 스탬프',
    point: 30,
  },
  {
    imageName: '세번째 스탬프',
    point: 30,
  },
  {
    imageName: '네번째 스탬프',
    point: 30,
  },
  {
    imageName: '다섯번째 스탬프',
    point: 30,
  },
  {
    imageName: '여섯번째 스탬프',
    point: 30,
  },
  {
    imageName: '일곱번째 스탬프',
    point: 30,
  },
  {
    imageName: '여덟번째 스탬프',
    point: 30,
  },
];

function SelectCustomizing({navigation, route}: SelectCustomizingScreenProps) {
  const selectedCouponId = route.params.couponId;
  const selectCustomerId = route.params.customerId;
  const [select, setSelect] = useState('board');
  const [point, setPoint] = useState(0);
  const [clickElement, setClickElement] = useState(-1);
  const [isPress, setIsPress] = useState(
    Array(customizingStampImage.length).fill(false),
  );
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const customizing = (props: number) => {
    setClickElement(props);
  };
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
    setPoint(0);
  }, [navigation]);
  const toSettings = useCallback(() => {
    navigation.navigate('Settings');
    setIsPress(Array(customizingStampImage.length).fill(false));
    setPoint(0);
    setClickElement(-1);
  }, [navigation]);

  const selectBoard = () => {
    setSelect('board');
    setIsPress(Array(customizingStampImage.length).fill(false));
    setClickElement(-1);
    setPoint(0);
  };
  const selectStamp = () => {
    setSelect('stamp');
    setIsPress(Array(customizingStampImage.length).fill(false));
    setClickElement(-1);
    setPoint(0);
  };
  const changeIsPress = (props: number) => {
    let newArr = [...isPress];
    newArr[props] = !newArr[props];
    // console.log(newArr);
    setIsPress(newArr);
  };
  const getApplyContent = useCallback(() => {
    Alert.alert('적용 완료');
    setClickElement(-1);
    setPoint(0);
    setIsPress(Array(customizingStampImage.length).fill(false));
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
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
          <Text
            style={{
              fontFamily: 'NotoSansCJKkr-Medium (TTF)',
              fontSize: 15,
              textAlign: 'center',
              textAlignVertical: 'center',
              height: screenHeight / 4.8,
            }}>
            Coupon
          </Text>
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
          ? customizingStampImage.map((stampImage, index) => {
              return (
                <Pressable
                  style={
                    index === clickElement && isPress[index]
                      ? [styles.boardContent, {borderColor: 'red'}]
                      : styles.boardContent
                  }
                  key={index}
                  onPress={() => {
                    // console.log('최초', index, clickElement);
                    // console.log('customizing 실행 후', index, clickElement);
                    if (isPress[index]) {
                      if (index === clickElement) {
                        setPoint(0);
                        console.log(point, clickElement);
                      } else {
                        changeIsPress(index);
                        setPoint(stampImage.point);
                      }
                    } else {
                      setPoint(stampImage.point);
                    }
                    changeIsPress(index);
                    // console.log('changeIsPress 실행 후', index, clickElement);
                    customizing(index);
                    // console.log('최종', index, clickElement);
                  }}>
                  <Text
                    style={{
                      width: screenWidth / 7.3,
                      height: screenHeight / 15,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontSize: 13,
                    }}
                    key={`${stampImage.imageName}${index}`}>
                    {stampImage.imageName}
                  </Text>
                </Pressable>
              );
            })
          : customizingBoardImage.map((boardImage, index) => {
              return (
                <Pressable
                  style={
                    index === clickElement && isPress[index]
                      ? [styles.boardContent, {borderColor: 'red'}]
                      : styles.boardContent
                  }
                  key={index}
                  onPress={() => {
                    isPress[index]
                      ? index === clickElement
                        ? setPoint(0)
                        : setPoint(boardImage.point)
                      : setPoint(boardImage.point);
                    changeIsPress(index);
                    customizing(index);
                  }}>
                  <Text
                    style={{
                      width: screenWidth / 7.3,
                      height: screenHeight / 15,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontSize: 13,
                    }}
                    key={`${boardImage.imageName}${index}`}>
                    {boardImage.imageName}
                  </Text>
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
          point <= 0
            ? styles.applyButton
            : [styles.applyButton, {backgroundColor: '#414FFD'}]
        }
        disabled={point <= 0 ? true : false}
        onPress={getApplyContent}>
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
});

export default SelectCustomizing;
