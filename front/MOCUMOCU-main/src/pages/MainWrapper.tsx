import BottomSheet from '@gorhom/bottom-sheet';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Main from './Main';
import More from './More';
import SaveUp from './SaveUp';
import {Portal, PortalHost} from '@gorhom/portal';

const Tab = createBottomTabNavigator();

function MainWrapper() {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => [-30, '52%'], []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const expandButtonPress = () => {
    bottomSheetRef?.current?.expand();
  };
  const closeButtonPress = () => {
    bottomSheetRef?.current?.close();
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
        component={SaveUp}
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
                  onChange={handleSheetChanges}>
                  <View style={styles.contentContainer}>
                    <Pressable onPress={closeButtonPress}>
                      <Text style={styles.bottomSheetTitle}>Add Customer</Text>
                    </Pressable>
                  </View>
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
    width: '100%',
    paddingLeft: 50,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
});

export default MainWrapper;
