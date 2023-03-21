import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const imageList = [
  require('../../assets/help/CouponReserve1.png'),
  require('../../assets/help/CouponReserve2.png'),
  require('../../assets/help/CouponReserve3.png'),
];

function CouponReserveHelp() {
  const [imageActive, setImageActive] = useState(0);
  const onChange = nativeEvent => {
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
                style={imageActive == index ? styles.dotActive : styles.dot}>
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
    // backgroundColor: 'pink',
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

export default CouponReserveHelp;
