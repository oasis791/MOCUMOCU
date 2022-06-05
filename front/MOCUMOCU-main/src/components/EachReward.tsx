import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Pressable,
  Text,
  Image,
} from 'react-native';
const screenWidth = Dimensions.get('screen').width;

function EachReward({reward}: {reward: any}, {params}: {params: any}) {
  const navigation = useNavigation();
  const toUseQRTest = () => {
    navigation.navigate('UseQR', {
      customerId: params.customerId,
      couponRequire: reward.couponRequire,
    });
  };
  return (
    <View key={reward.reward}>
      <Pressable style={styles.rewardContainer} onPress={toUseQRTest}>
        <Text style={styles.rewardText}>
          {reward.couponRequire}개 리워드 - {'\t'}
          {reward.reward}
        </Text>
        <Image
          style={styles.arrowButton}
          source={require('../assets/icon/arrowNormal.png')}
        />
      </Pressable>
    </View>
  );
}
// 반복 대상이 되는 것들은 컴포넌트를 분리!

const styles = StyleSheet.create({
  rewardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: screenWidth,
    justifyContent: 'space-between',
    height: 77,
    top: 120,
    borderRadius: 20,
    marginBottom: 7,
  },
  rewardText: {
    paddingHorizontal: 36,
    // backgroundColor: 'cyan',
    // width: 200,
    paddingTop: 20,
    color: '#363636',
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 14,
    // backgroundColor: 'blue',
    paddingVertical: 10,
    // top: -10,
  },
  arrowButton: {
    resizeMode: 'contain',
    marginTop: 29,
    height: 20,
    width: 40,
    paddingHorizontal: 36,
  },
});

export default EachReward;
