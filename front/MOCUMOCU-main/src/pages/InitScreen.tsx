import React, {useCallback} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
const image = require('../assets/initScreen.png');
const logo_kor = require('../assets/logo_kor.png');
const logo_eng = require('../assets/logo_eng.png');
type InitScreenProps = NativeStackScreenProps<RootStackParamList, 'InitScreen'>;

function InitScreen({navigation}: InitScreenProps) {
  const toSignInUser = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);
  const toSignInOwner = useCallback(() => {
    navigation.navigate('SignInOwner');
  }, [navigation]);
  return (
    <View>
      <ImageBackground style={styles.background} source={image}>
        <View style={styles.logoWrapper}>
          <Image style={styles.logoImage} source={logo_kor} />
          <Image style={styles.logoImageEng} source={logo_eng} />
        </View>
        <View style={styles.startZone}>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e6e6e6' : 'white',
              },
              styles.startButton,
              {marginBottom: '2%'},
            ]}
            onPress={toSignInUser}>
            <Text style={[styles.startButtonText, {color: '#414FFD'}]}>
              회원으로 시작하기
            </Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e6e6e6' : 'white',
              },
              styles.startButton,
              {marginBottom: '2%'},
            ]}
            onPress={toSignInOwner}>
            <Text style={[styles.startButtonText, {color: '#363636'}]}>
              점주로 시작하기
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {resizeMode: 'stretch', width: '100%', height: '100%'},
  initText: {
    // backgroundColor: 'black',
    // backgroundColor: 'trasparent',
    fontSize: 32,
    fontFamily: 'GmarketSansTTFBold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowRadius: 20,
  },
  logoWrapper: {
    marginTop: 50,
    marginLeft: 30,
  },
  logoImage: {
    // position: 'relative',
    // transform: [{scale: 0.3}],
    // marginRight: 100,
    width: 175,
    height: 82.18,
    resizeMode: 'stretch',
  },
  logoImageEng: {
    width: 100,
    height: 50,
    resizeMode: 'stretch',
  },
  startZone: {
    marginTop: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
    width: '77%',
    height: '22%',
    borderRadius: 8,
    elevation: 5,
    opacity: 0.9,
  },
  startButtonText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    height: '100%',
    textAlignVertical: 'center',
    // marginBottom: '1%',
  },
});
export default InitScreen;
