import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LoggedInOwnerParamList} from '../../App';

type PrivacyPolicyOwnerScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'PrivacyPolicyOwner'
>;

function PrivacyPolicyOwner({
  navigation,
  route,
}: PrivacyPolicyOwnerScreenProps) {
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);
  return (
    <View style={styles.mainBackground}>
      <StatusBar hidden={true} />

      <View style={styles.mainHeader}>
        <View style={styles.headerButtonWrapper}>
          <Pressable style={styles.headerButton} onPress={toBack}>
            <Image
              source={require('../assets/icon/arrowBack.png')}
              style={styles.headerSetting}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.marketTitleWrapper}>
        <Text style={styles.marketTitleText}>개인정보 수집 및 약관</Text>
      </View>
      <ScrollView style={styles.scrollView} fadingEdgeLength={10}>
        <Text style={styles.privacyAgreeText}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
          dolor, perferendis beatae repellendus architecto illo consequuntur
          amet possimus ullam velit dignissimos obcaecati! Officia, reiciendis?
          Voluptate sequi ex dolorem doloribus quas? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Voluptatum dolor, perferendis beatae
          repellendus architecto illo consequuntur amet possimus ullam velit
          dignissimos obcaecati! Officia, reiciendis? Voluptate sequi ex dolorem
          doloribus quas? Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Voluptatum dolor, perferendis beatae repellendus architecto illo
          consequuntur amet possimus ullam velit dignissimos obcaecati! Officia,
          reiciendis? Voluptate sequi ex dolorem doloribus quas? Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Voluptatum dolor,
          perferendis beatae repellendus architecto illo consequuntur amet
          possimus ullam velit dignissimos obcaecati! Officia, reiciendis?
          Voluptate sequi ex dolorem doloribus quas? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Voluptatum dolor, perferendis beatae
          repellendus architecto illo consequuntur amet possimus ullam velit
          dignissimos obcaecati! Officia, reiciendis? Voluptate sequi ex dolorem
          doloribus quas? Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Voluptatum dolor, perferendis beatae repellendus architecto illo
          consequuntur amet possimus ullam velit dignissimos obcaecati! Officia,
          reiciendis? Voluptate sequi ex dolorem doloribus quas? Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Voluptatum dolor,
          perferendis beatae repellendus architecto illo Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Voluptatum dolor, perferendis
          beatae repellendus architecto illo consequuntur amet possimus ullam
          velit dignissimos obcaecati! Officia, reiciendis? Voluptate sequi ex
          dolorem doloribus quas? Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Voluptatum dolor, perferendis beatae repellendus
          architecto illo consequuntur amet possimus ullam velit dignissimos
          obcaecati! Officia, reiciendis? Voluptate sequi ex dolorem doloribus
          quas? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Voluptatum dolor, perferendis beatae repellendus architecto illo
          consequuntur amet possimus ullam velit dignissimos obcaecati! Officia,
          reiciendis? Voluptate sequi ex dolorem doloribus quas? Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Voluptatum dolor,
          perferendis beatae repellendus architecto illo consequuntur amet
          possimus ullam velit dignissimos obcaecati! Officia, reiciendis?
          Voluptate sequi ex dolorem doloribus quas? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Voluptatum dolor, perferendis beatae
          repellendus architecto illo consequuntur amet possimus ullam velit
          dignissimos obcaecati! Officia, reiciendis? Voluptate sequi ex dolorem
          doloribus quas? Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Voluptatum dolor, perferendis beatae repellendus architecto illo
          consequuntur amet possimus ullam velit dignissimos obcaecati! Officia,
          reiciendis? Voluptate sequi ex dolorem doloribus quas? Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Voluptatum dolor,
          perferendis beatae repellendus architecto illo
        </Text>
      </ScrollView>
    </View>
  );
}
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainBackground: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#F7F7F7',
  },

  mainHeader: {
    width: screenWidth,
    paddingVertical: 15,
    flexDirection: 'row',

    marginBottom: 10,
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 19,
    marginTop: 5,
    // justifyContent: 'space-around',
  },
  headerSetting: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  headerButton: {
    marginHorizontal: screenHeight / 60,
  },
  marketTitleWrapper: {
    marginLeft: 30,
    marginBottom: 40,
    width: screenWidth * 0.85,
    alignItems: 'center',
  },

  marketTitleText: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 24,
    color: 'black',
  },
  privacyAgreeTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'GmarketSansTTFBold',
    color: '#414FFD',
  },
  privacyAgreeText: {
    marginHorizontal: 40,
    marginBottom: 100,
  },
  scrollView: {
    width: '100%',
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
export default PrivacyPolicyOwner;
