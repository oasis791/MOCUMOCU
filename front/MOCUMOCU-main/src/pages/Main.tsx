import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import InsetShadow from 'react-native-inset-shadow';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Ing from './Ing';
// import Complete from './Complete';
// const Stack = createNativeStackNavigator();

const screenHeight = Dimensions.get('screen').height;
function Main() {
  const isAlarm = false;
  const userName = '현욱병수';
  const myPoint = 1000;
  const onSubmitSetting = () => {
    Alert.alert('알림', '설정');
  };
  const onSubmitAlarm = () => {
    Alert.alert('알림', '알람');
  };
  const onSubmitEvent = () => {
    Alert.alert('알림', '이벤트');
  };
  const toUsePoint = () => {
    Alert.alert('알림', '포인트 사용내역 이동');
  };
  const toUsePointShop = () => {
    Alert.alert('알림', '포인트 상점으로 이동');
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.event}>
        <TouchableOpacity
          onPress={onSubmitEvent}
          style={styles.eventBanner}
          activeOpacity={1}>
          <View style={styles.header}>
            <Image
              style={styles.headerLogo}
              source={require('../assets/mainLogo.png')}
            />
            <View style={styles.headerButtonWrapper}>
              <Pressable onPress={onSubmitSetting}>
                <Image
                  source={require('../assets/icon/mainSetting.png')}
                  style={styles.headerSetting}
                />
              </Pressable>
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
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.myInfo}>
          <Text style={styles.myInfoText}>
            {userName} 님,{'\n'}오늘도 모쿠하세요!
          </Text>
          <View style={styles.myInfoPoint}>
            <Text style={styles.myInfoPointText}>내 포인트</Text>
            <Text style={[styles.myInfoPointText, {color: '#ec6478'}]}>
              {myPoint} P
            </Text>
          </View>
          <View style={styles.pointButtonWrapper}>
            <Pressable style={styles.pointButton}>
              <Text style={styles.pointButtonText} onPress={toUsePoint}>
                포인트 사용내역
              </Text>
            </Pressable>
            <Text style={styles.pointButtonBar}>|</Text>
            <Pressable style={styles.pointButton}>
              <Text style={styles.pointButtonText} onPress={toUsePointShop}>
                포인트 상점
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.myCoupon}>
        <View style={styles.myCouponTextWrapper}>
          <Text style={styles.myCouponText}>내 쿠폰함</Text>
          <Pressable style={styles.myCouponboxButton}>
            <Text style={styles.myCouponboxButtonText}>전체 +</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          style={styles.scrollView}>
          <View style={styles.scrollItem}>
            <Text style={styles.myInfoPointText}>쿠폰 1</Text>
            <Text style={[styles.myInfoPointText, {color: '#ec6478'}]}>
              A 가게
            </Text>
          </View>
          <View style={styles.scrollItem}>
            <Text style={styles.myInfoPointText}>쿠폰 2</Text>
            <Text style={[styles.myInfoPointText, {color: '#ec6478'}]}>
              B 가게
            </Text>
          </View>
          <View style={styles.scrollItem}>
            <Text style={styles.myInfoPointText}>쿠폰 3</Text>
            <Text style={[styles.myInfoPointText, {color: '#ec6478'}]}>
              C 가게
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  event: {flex: 1, backgroundColor: 'lightgray', elevation: 20},
  header: {
    backgroundColor: 'trasparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    marginTop: 10,
    resizeMode: 'contain',
    width: 50,
    height: 25,
    marginHorizontal: 10,
    marginBottom: 10,
    // justifyContent: 'flex-start',
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSetting: {
    width: 20,
    // marginLeft: 10,
    // backgroundColor: 'black',
    resizeMode: 'contain',
    height: 18,
  },
  headerAlarm: {
    // marginTop: ,
    // marginLeft: 10,
    width: 50,
    resizeMode: 'contain',
    height: 20,
    // backgroundColor: 'black',
  },
  eventBanner: {
    backgroundColor: 'purple',
    height: screenHeight - 467,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // zIndex: 10,
    elevation: 15,
  },
  myInfo: {
    backgroundColor: 'pink',
    height: 200,
    // elevation:
  },
  myInfoText: {
    fontSize: 18,
    top: -3,
    marginLeft: 25,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'white',
  },
  myInfoPoint: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 28,
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignItems: 'baseline',
    width: 300,
    height: 80,
    borderRadius: 10,
    elevation: 10,
  },
  myInfoPointText: {
    marginTop: 5,
    fontSize: 15,
    top: -3,
    marginHorizontal: 25,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'black',
  },
  pointButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pointButton: {
    marginLeft: 45,
    flex: 1,
  },
  pointButtonText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'white',
  },
  pointButtonBar: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'white',
    // marginLeft: 0,
    // paddingLeft: 1,
  },
  myCoupon: {
    // flex: 1,
    backgroundColor: 'white',
    height: 135,
    // elevation: 30,
  },
  myCouponboxButton: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  myCouponboxButtonText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'gray',
    fontSize: 12,
    marginRight: 20,
  },
  myCouponTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  myCouponText: {
    marginHorizontal: 20,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: '#414FFD',
    fontSize: 18,
  },
  scrollView: {
    // marginVertical: ,
    // backgroundColor: 'green',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  scrollItem: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    // marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignItems: 'baseline',
    width: 300,
    height: 80,
    borderRadius: 10,
    elevation: 20,
  },
});
export default Main;
