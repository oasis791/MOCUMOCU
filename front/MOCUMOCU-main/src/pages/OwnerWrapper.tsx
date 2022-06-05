import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text, View} from 'react-native';
import More from './More';
import SaveUpOwner from './SaveUpOwner';
import MainOwner from './MainOwner';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInOwnerParamList} from '../../App';
import MainOwnerWrapper from './MainOwnerWrapper';
import SaveUpOwnerWrapper from './SaveUpOwnerWrapper';

const Tab = createBottomTabNavigator();

function OwnerWrapper() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      backBehavior="initialRoute"
      screenOptions={{
        tabBarActiveTintColor: '#414FFD',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="SaveUpOwnerWrapper"
        component={SaveUpOwnerWrapper}
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
                  tintColor: focused ? '#FA6072' : '#A5A5A5',
                }}
              />
              <Text
                style={{
                  fontSize: 11,
                  top: -3,
                  fontFamily: 'NotoSansCJKkr-Black (TTF)',
                  color: focused ? '#FA6072' : '#A5A5A5',
                }}>
                적립/사용
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={MainOwnerWrapper}
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
                  tintColor: focused ? '#FA6072' : '#A5A5A5',
                }}
              />
              <Text
                style={{
                  fontSize: 11,
                  top: -3,
                  fontFamily: 'NotoSansCJKkr-Black (TTF)',
                  color: focused ? '#FA6072' : '#A5A5A5',
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
                  tintColor: focused ? '#FA6072' : '#A5A5A5',
                }}
              />
              <Text
                style={{
                  fontSize: 11,
                  top: -3,
                  fontFamily: 'NotoSansCJKkr-Black (TTF)',
                  color: focused ? '#FA6072' : '#A5A5A5',
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

export default OwnerWrapper;
