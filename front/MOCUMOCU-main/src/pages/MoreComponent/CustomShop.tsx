import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {LoggedInUserParamList} from '../../../App';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

type CustomShopScreenProps = NativeStackScreenProps<
  LoggedInUserParamList,
  'MyPointLog'
>;

const customizingBoardImage = [
  {
    imageName: 'default',
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
    imageName: 'default',
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

const renderCustomizingBoardImage = customizingBoardImage.map(boardImage => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
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
      }}>
      <Text
        style={{
          width: screenWidth / 7.3,
          height: screenHeight / 15,
          textAlign: 'center',
          textAlignVertical: 'center',
          fontSize: 13,
        }}>
        {boardImage.imageName}
      </Text>
    </TouchableOpacity>
  );
});

const renderCustomizingStampImage = customizingStampImage.map(stampImage => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      // onPress={}
      style={{
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
      }}>
      <Text
        style={{
          width: screenWidth / 7.3,
          height: screenHeight / 15,
          textAlign: 'center',
          textAlignVertical: 'center',
          // backgroundColor: 'blue',
          fontSize: 13,
        }}>
        {stampImage.imageName}
      </Text>
    </TouchableOpacity>
  );
});

function CustomShop({navigation}: CustomShopScreenProps) {
  const [select, setSelect] = useState('board');
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  const toSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  const selectBoard = () => {
    setSelect('board');
    console.log(select);
  };
  const selectStamp = () => {
    setSelect('stamp');
    console.log(select);
  };
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <View style={styles.header}>
          <Pressable style={styles.headerButton} onPress={toBack}>
            <Text>뒤</Text>
          </Pressable>
          <Pressable onPress={toSettings} style={styles.headerButton}>
            <Image
              source={require('../../assets/icon/mainSetting.png')}
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
              // backgroundColor: 'yellow',
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
        {select === 'board'
          ? renderCustomizingBoardImage
          : renderCustomizingStampImage}
      </ScrollView>
      <View style={styles.purchaseContainer}>
        <View style={styles.purchaseText}>
          <Image
            source={require('../../assets/icon/shoppingCart.png')}
            style={styles.cartImage}
          />
          <Text
            style={{
              fontFamily: 'GmarketSansTTF',
              // fontSize: 15,
              // textAlign: 'center',
              // textAlignVertical: 'center',
              // backgroundColor: 'white',
              height: screenHeight / 30,
              color: 'white',
              fontWeight: '700',
            }}>
            총{'\r\r'}
            {0}P
          </Text>
        </View>

        <Pressable style={styles.purchaseButton}>
          <Text
            style={{
              fontFamily: 'GmarketSansTTF',
              fontSize: 15,
              color: 'white',
              fontWeight: '700',
            }}>
            구매하기
          </Text>
        </Pressable>
      </View>
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
    marginHorizontal: 18,
  },
  headerSetting: {
    // flex: 1,
    width: 20,
    resizeMode: 'contain',
    // flex: 1 / 3,
    // marginHorizontal: 15,
    height: 20,
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
  // 커마 구매 탭
  purchaseContainer: {
    // marginTop: 10,
    height: screenHeight / 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#cecece',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartImage: {
    // flex: 1,
    width: 20,
    resizeMode: 'contain',
    // flex: 1 / 3,
    // marginHorizontal: 15,
    height: 20,
  },
  purchaseText: {
    width: screenWidth / 5,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: screenWidth / 17,
  },
  purchaseButton: {
    marginRight: screenWidth / 15,
  },
});
export default CustomShop;
