import React, {useMemo} from 'react';
import {
  Dimensions,
  FlatList,
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  Alert,
} from 'react-native';

function Carousel() {
  const data = useMemo(
    () => [
      {
        image: require('../assets/eventBannerTest.jpeg'),
      },
      {
        image2: require('../assets/eventBanner2.png'),
      },
    ],
    [],
  );
  const toEventPage = () => {
    Alert.alert('알림', '이벤트 페이지');
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        // pagingEnabled={true}
        // contentContainerStyle={}
        renderItem={({item}) => (
          <Pressable onPress={toEventPage}>
            <ImageBackground source={item.image} />
          </Pressable>
        )}
        keyExtractor={(_, index) => String(index)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
    // height: 100,
  },
});
export default Carousel;
