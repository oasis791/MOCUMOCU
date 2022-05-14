import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './src/pages/Settings';
import saveUp from './src/pages/saveUp';
import Main from './src/pages/Main';
import SignIn from './src/pages/SignIn';
import SignInOwner from './src/pages/SignInOwner';
import SignUp from './src/pages/SignUp';
import SignUpOwner from './src/pages/SignUpOwner';
import InitScreen from './src/pages/InitScreen';
import {Image, View, Text, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import {useAppDispatch} from './src/store';
import {useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';
import axios, {AxiosError} from 'axios';
import userSlice from './src/slices/user';
import Config from 'react-native-config';
// export type LoggedInParamList = {
//   Orders: undefined;
//   Settings: undefined;
//   Delivery: undefined;
//   Complete: {orderId: string};
// };

// export type RootStackParamList = {
//   SignIn: undefined;
//   SignUp: undefined;
// };

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const isOwner = false;
  const dispatch = useAppDispatch();
  // const isLoggedIn = false;

  // 앱 실행 시 토큰 있으면 로그인하는 코드
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      // SplashScreen.hide();
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          console.log('!token');
          SplashScreen.hide();
          return;
        }
        const response = await axios.post(
          `${Config.API_URL}/refreshToken`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(
          userSlice.actions.setUser({
            name: response.data.data.name,
            email: response.data.data.email,
            accessToken: response.data.data.accessToken,
          }),
        );
      } catch (error) {
        console.error(error);
        if ((error as AxiosError).response?.data.code === 'expired') {
          Alert.alert('알림', '다시 로그인 해주세요.');
        }
      } finally {
        // console.log('asdf');
        SplashScreen.hide();
      }
    };
    getTokenAndRefresh();
  }, [dispatch]);

  return !isLoggedIn ? (
    isOwner ? (
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
                  source={require('./src/assets/saveButton.png')}
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
                  source={require('./src/assets/homeButton.png')}
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
          name="Settings"
          component={Settings}
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
                  source={require('./src/assets/moreButton.png')}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused ? '#414FFD' : 'A5A5A5',
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
    ) : (
      // 여기서 부터 회원
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
                  source={require('./src/assets/saveButton.png')}
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
                  source={require('./src/assets/homeButton.png')}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused ? '#414FFD' : 'A5A5A5',
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
          name="Settings"
          component={Settings}
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
                  source={require('./src/assets/moreButton.png')}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused ? '#414FFD' : 'A5A5A5',
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
    )
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="InitScreen"
        component={InitScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignInOwner"
        component={SignInOwner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpOwner"
        component={SignUpOwner}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default AppInner;
