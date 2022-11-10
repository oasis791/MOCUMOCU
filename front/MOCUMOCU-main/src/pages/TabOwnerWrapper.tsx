import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, Text, View} from 'react-native';
<<<<<<<< HEAD:front/MOCUMOCU-main/src/pages/TabWrapper.tsx
import Main from './MainComponent/Main';
import More from './MoreComponent/More';
import SaveUseCoupon from './SaveUseComponent/SaveUseCoupon';

const Tab = createBottomTabNavigator();

function TabWrapper() {
========
import SaveUpOwner from './SaveUpOwner';
import MainOwner from './MainOwner';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInOwnerParamList} from '../../App';
import MoreOwner from './MoreOwner';

const Tab = createBottomTabNavigator();

function TapOwnerWrapper() {
>>>>>>>> 583f05bbfaa40f1f6743d98bce87c9657114aaab:front/MOCUMOCU-main/src/pages/TabOwnerWrapper.tsx
  return (
    // 여기서 부터 회원
    <Tab.Navigator
<<<<<<<< HEAD:front/MOCUMOCU-main/src/pages/TabWrapper.tsx
========
      initialRouteName="TabMainOwner"
      backBehavior="initialRoute"
>>>>>>>> 583f05bbfaa40f1f6743d98bce87c9657114aaab:front/MOCUMOCU-main/src/pages/TabOwnerWrapper.tsx
      screenOptions={{
        tabBarActiveTintColor: '#414FFD',
      }}>
      <Tab.Screen
<<<<<<<< HEAD:front/MOCUMOCU-main/src/pages/TabWrapper.tsx
        name="Main"
        component={Main}
========
        name="TabMainOwner"
        component={MainOwner}
>>>>>>>> 583f05bbfaa40f1f6743d98bce87c9657114aaab:front/MOCUMOCU-main/src/pages/TabOwnerWrapper.tsx
        options={{
          // tabBarLabel: '메인',
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
                홈
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SaveUseCoupon"
<<<<<<<< HEAD:front/MOCUMOCU-main/src/pages/TabWrapper.tsx
        component={SaveUseCoupon}
        options={{
          // tabBarLabel: '적립',
========
        component={SaveUpOwner}
        options={{
          tabBarLabel: '적립',
>>>>>>>> 583f05bbfaa40f1f6743d98bce87c9657114aaab:front/MOCUMOCU-main/src/pages/TabOwnerWrapper.tsx
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 7,
<<<<<<<< HEAD:front/MOCUMOCU-main/src/pages/TabWrapper.tsx
                flex: 1,
              }}>
              <Image
                // source={require('./src/assets/saveButton.png')}
========
              }}>
              <Image
>>>>>>>> 583f05bbfaa40f1f6743d98bce87c9657114aaab:front/MOCUMOCU-main/src/pages/TabOwnerWrapper.tsx
                source={require('../assets/saveButton.png')}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
<<<<<<<< HEAD:front/MOCUMOCU-main/src/pages/TabWrapper.tsx
                  tintColor: focused ? '#414FFD' : '#A5A5A5',
========
                  tintColor: focused ? '#FA6072' : '#A5A5A5',
>>>>>>>> 583f05bbfaa40f1f6743d98bce87c9657114aaab:front/MOCUMOCU-main/src/pages/TabOwnerWrapper.tsx
                }}
              />
              <Text
                style={{
                  fontSize: 11,
                  top: -3,
                  fontFamily: 'NotoSansCJKkr-Black (TTF)',
<<<<<<<< HEAD:front/MOCUMOCU-main/src/pages/TabWrapper.tsx
                  color: focused ? '#414FFD' : '#A5A5A5',
========
                  color: focused ? '#FA6072' : '#A5A5A5',
>>>>>>>> 583f05bbfaa40f1f6743d98bce87c9657114aaab:front/MOCUMOCU-main/src/pages/TabOwnerWrapper.tsx
                }}>
                적립/사용
              </Text>
            </View>
          ),
        }}
      />
<<<<<<<< HEAD:front/MOCUMOCU-main/src/pages/TabWrapper.tsx
      <Tab.Screen
        name="More"
        component={More}
========

      <Tab.Screen
        name="MoreOwner"
        component={MoreOwner}
>>>>>>>> 583f05bbfaa40f1f6743d98bce87c9657114aaab:front/MOCUMOCU-main/src/pages/TabOwnerWrapper.tsx
        options={{
          // tabBarLabel: '더보기',
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
                더보기
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
    // 회원 끝
  );
}

<<<<<<<< HEAD:front/MOCUMOCU-main/src/pages/TabWrapper.tsx
export default TabWrapper;
========
export default TapOwnerWrapper;
>>>>>>>> 583f05bbfaa40f1f6743d98bce87c9657114aaab:front/MOCUMOCU-main/src/pages/TabOwnerWrapper.tsx
