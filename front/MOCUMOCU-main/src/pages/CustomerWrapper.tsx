import BottomSheet from '@gorhom/bottom-sheet';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
  Alert,
} from 'react-native';
import Main from './Main';
import More from './More';
import {Portal, PortalHost} from '@gorhom/portal';
import SaveUp from './SaveUp';
const window = Dimensions.get('screen');
const Tab = createBottomTabNavigator();
function MainWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClickSave, setIsClickSave] = useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => [-30, '35%'], []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const expandButtonPress = () => {
    bottomSheetRef?.current?.expand();
    setIsOpen(true);
  };
  const closeButtonPress = () => {
    bottomSheetRef?.current?.close();
    setIsOpen(false);
  };
  const toSaveCoupon = () => {
    setIsClickSave(true);
  };
  const toUseCoupon = () => {
    Alert.alert('알림', '쿠폰 사용 창');
  };
  const renderBackDrop = () => {
    return isOpen ? (
      <Animated.View
        style={{
          opacity: 0.5,
          backgroundColor: '#000',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <TouchableOpacity
          style={{
            width: window.width,
            height: window.height,
            backgroundColor: 'transparent',
          }}
          activeOpacity={1}
          onPress={closeButtonPress}
        />
      </Animated.View>
    ) : (
      <></>
    );
  };
  return (
    // 여기서 부터 회원
    <Tab.Navigator
      initialRouteName="main"
      screenOptions={{
        tabBarActiveTintColor: '#414FFD',
      }}>
      <Tab.Screen
        name="SaveUp"
        component={Main}
        options={{
          tabBarLabel: '적립',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <>
              <TouchableWithoutFeedback onPress={expandButtonPress}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 7,
                    flex: 1,
                  }}>
                  <Image
                    // source={require('./src/assets/saveButton.png')}
                    source={require('../assets/saveButton.png')}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: focused ? '#414FFD' : '#A5A5A5',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      top: -3,
                      fontFamily: 'NotoSansCJKkr-Black (TTF)',
                      color: focused ? '#414FFD' : '#A5A5A5',
                    }}>
                    적립/사용(회원)
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <Portal>
                <BottomSheet
                  ref={bottomSheetRef}
                  index={-1}
                  snapPoints={snapPoints}
                  onChange={handleSheetChanges}
                  backdropComponent={renderBackDrop}>
                  {!isClickSave ? (
                    <Pressable
                      onPress={closeButtonPress}
                      style={styles.contentContainer}>
                      <View style={styles.buttonWrapper}>
                        <Pressable onPress={toSaveCoupon} style={styles.button}>
                          <Image
                            source={require('../assets/icon/couponSaveIcon.png')}
                            style={styles.couponIcon}
                          />
                          <Text style={styles.buttonText}>쿠폰 적립</Text>
                        </Pressable>
                        <Pressable onPress={toUseCoupon} style={styles.button}>
                          <Image
                            source={require('../assets/icon/couponUseIcon.png')}
                            style={styles.couponIcon}
                          />
                          <Text style={styles.buttonText}>쿠폰 사용</Text>
                        </Pressable>
                      </View>
                    </Pressable>
                  ) : (
                    <SaveUp qrValue={{id: 1, count: 1, marketId: 1}} />
                  )}
                  {/* </BottomSheetScrollView> */}
                </BottomSheet>
              </Portal>

              <PortalHost name="custom_host" />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="main"
        component={Main}
        options={{
          tabBarLabel: '메인',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 7,
              }}>
              <Image
                source={require('../assets/homeButton.png')}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#414FFD' : '#A5A5A5',
                }}
              />
              <Text
                style={{
                  fontSize: 11,
                  top: -3,
                  fontFamily: 'NotoSansCJKkr-Black (TTF)',
                  color: focused ? '#414FFD' : '#A5A5A5',
                }}>
                홈(회원)
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: '더보기',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 7,
              }}>
              <Image
                source={require('../assets/moreButton.png')}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#414FFD' : '#A5A5A5',
                }}
              />
              <Text
                style={{
                  fontSize: 11,
                  top: -3,
                  fontFamily: 'NotoSansCJKkr-Black (TTF)',
                  color: focused ? '#414FFD' : '#A5A5A5',
                }}>
                더보기(회원)
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
    // 회원 끝
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // backgroundColor: 'pink',
    // paddingLeft: 50,
  },
  couponIcon: {
    // justifyContent: 'center',
    resizeMode: 'contain',
    height: 42,
    width: 37,
    marginBottom: 15,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    // marginHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'green',
    height: '50%',
    width: '100%',
  },
  button: {
    marginTop: 30,
    marginBottom: 48,
    marginHorizontal: 69,
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 16,
    fontWeight: '500',
    color: '#5d5d5d',
  },
});

export default MainWrapper;
