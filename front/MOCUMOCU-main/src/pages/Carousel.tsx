import React, {useRef, useState} from 'react';
import {
  Animated,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({images}: Props) => {
  const animation = useRef(new Animated.Value(0));
  const [currentImage, setCurrentImage] = useState(0);
  const handleAnimation = () => {
    let newCurrentImage = currentImage - 1;
    Animated.spring(animation.current, {
      toValue: -(Dimensions.get('screen').width * newCurrentImage),
      useNativeDriver: true,
    }).start();
    setCurrentImage(newCurrentImage);
    // console.log(image);
  };
  return (
    <>
      <View>
        <Pressable onPress={handleAnimation}>
          {/* <Text>Press</Text> */}
          <Animated.View
            style={[
              styles.container,
              {
                transform: [
                  {
                    translateX: animation.current,
                  },
                ],
              },
            ]}>
            {images.map(image => (
              <Image source={image} style={styles.image} />
            ))}
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    // flexDirection: 'row',
    position: 'absolute',
    resizeMode: 'contain',
    height: 160,
    width: Dimensions.get('screen').width,
    marginTop: 30,
    borderRadius: 70,
    margin: 0,
    // left: -100,
  },
  container: {},
});
export default Carousel;
