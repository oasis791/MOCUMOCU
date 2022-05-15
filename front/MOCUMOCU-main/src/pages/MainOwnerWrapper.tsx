import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text, View} from 'react-native';
import More from './More';
import saveUp from './saveUp';
import MainOwner from './MainOwner';

const Tab = createBottomTabNavigator();

function MainOwnerWrapper() {
  return (
    <Tab.Navigator
      initialRouteName="main"
      screenOptions={{
        tabBarActiveTintColor: '#414FFD',
      }}>
      <Tab.Screen
        name="saveUp"
        component={saveUp}
        options={{
          tabBarLabel: '적립',
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
                적립/사용
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="main"
        component={MainOwner}
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
                홈
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
                더보기
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainOwnerWrapper;