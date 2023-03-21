import React, {useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const imageList = [
  require('../../assets/help/CouponUsage1.png'),
  require('../../assets/help/CouponUsage2.png'),
  require('../../assets/help/CouponUsage3.png'),
  require('../../assets/help/CouponUsage4.png'),
  require('../../assets/help/CouponUsage5.png'),
];

function CouponUsageHelp() {
  const [imageActive, setImageActive] = useState(0);
  const onChange = (nativeEvent: NativeScrollEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== imageActive) {
        setImageActive(slide);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView
          onScroll={({nativeEvent}) => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal={true}
          style={styles.wrapper}>
          {imageList.map((image, index) => (
            <Image
              key={image}
              resizeMode="stretch"
              style={styles.wrapper}
              source={image}
            />
          ))}
        </ScrollView>
        <View style={styles.wrapperDot}>
          {imageList.map((image, index) => {
            return (
              <Text
                key={image}
                style={imageActive === index ? styles.dotActive : styles.dot}>
                ●
              </Text>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    width: screenWidth,
    height: screenHeight,
  },
  wrapperDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    margin: 7,
    color: 'white',
    fontSize: 20,
  },
  dotActive: {
    color: '#414FFD',
    margin: 7,
    fontSize: 20,
  },
});

export default CouponUsageHelp;
