import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';

import ActivityRings from 'react-native-activity-rings';
import {LoggedInOwnerParamList} from '../../App';
import {RootState} from '../store/reducer';
// import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';
import {useAppDispatch} from '../store';
import marketOwnerSlice from '../slices/marketOwner';
import {useIsFocused} from '@react-navigation/native';
import Config from 'react-native-config';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('window').height;

type MainOwnerScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'MainOwner'
>;

function MainOwner({navigation}: MainOwnerScreenProps) {
  const ownerName = useSelector((state: RootState) => state.userTest.name);
  const ownerId = useSelector((state: RootState) => state.userTest.id);
  const [deleteButtonAcitive, setDeleteButtonActive] = useState(false);

  const dispatch = useAppDispatch();
  const markets = useSelector((state: RootState) => state.marketOwner.markets);

  const activityConfig = {
    width: 150,
    height: 150,
    radius: 45,
    ringSize: 14,
  };

  const toAddMarket = () => {
    navigation.navigate('AddMarket');
  };

  const toMarketInfo = marketIndex => {
    navigation.navigate('MarketInfo', {marketIndex});
  };
  const toDeleteMarket = () => {
    setDeleteButtonActive(!deleteButtonAcitive);
  };

  const toMarektAnalysis = (index: number) => {
    // Alert.alert('알림', '매장 분석으로 이동');
    navigation.navigate('MarketAnalysis', {marketIndex: index});
  };

  const onGetMarkets = useCallback(async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/market/${ownerId}/market-list/?day=0`,
      );
      // console.log('market', response.data[0]);
      dispatch(
        marketOwnerSlice.actions.setMarket({
          markets: response.data,
        }),
      );
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', `${errorResponse.status}`);
      }
    }
  }, [dispatch, ownerId]);

  const onDeleteSubmit = useCallback(
    async storeId => {
      try {
        await axios.delete(`${Config.API_URL}/owner/store/${storeId}`);
        onGetMarkets();
        Alert.alert('알림', '매장이 삭제되었습니다.');
      } catch (error) {
        const errorResponse = (error as AxiosError<any>).response;

        if (errorResponse) {
          Alert.alert('알림', '매장 삭제에 실패하였습니다');
        }
      }
    },
    [onGetMarkets],
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    onGetMarkets();
  }, [isFocused]);

  return (
    <ScrollView style={styles.mainBackground}>
      <StatusBar hidden={true} />
      <View style={styles.mainHeader}>
        <Image
          source={require('../assets/mainLogoOwner.png')}
          style={styles.headerLogo}
        />
      </View>

      <View style={styles.ownerInfoWrapper}>
        <Text style={styles.myInfoText}>
          <Text style={styles.myInfoNameText}>{ownerName}</Text> 점주님,{'\n'}
          오늘도 모쿠하세요!
        </Text>
      </View>

      <View style={styles.storeListWrapper}>
        <Text style={styles.storeListTitle}>매장 리스트</Text>

        {markets.length === 0 ? (
          <View style={[styles.noneMarketWrapper, {height: 60}]}>
            <Text style={{top: 5}}>등록된 매장이 없습니다.</Text>
          </View>
        ) : (
          <ScrollView
            style={[
              styles.storeScrollView,
              markets.length < 3 ? {height: 'auto'} : null,
            ]}
            nestedScrollEnabled={true}>
            {markets.map((market, i) => {
              return (
                <TouchableOpacity
                  key={market.id}
                  onPress={() => {
                    if (deleteButtonAcitive) {
                      Alert.alert(
                        '알림',
                        `${market.name} 매장을 삭제합니다.\n삭제하면 되돌릴 수 없습니다.`,
                        [
                          // The "Yes" button
                          {
                            text: '확인',
                            onPress: () => {
                              onDeleteSubmit(market.id);
                            },
                          },
                          // The "No" button
                          // Does nothing but dismiss the dialog when tapped
                          {
                            text: '취소',
                          },
                        ],
                      );
                    } else {
                      toMarketInfo(i);
                    }
                  }}
                  style={[
                    styles.marketTab,
                    {borderBottomWidth: markets.length - 1 === i ? 0 : 1},
                  ]}>
                  <Text style={styles.marketTabText}>{market.name}</Text>

                  {deleteButtonAcitive ? (
                    <Image
                      source={require('../assets/icon/xIconRed.png')}
                      style={styles.marketTabArrow}
                    />
                  ) : (
                    <Image
                      source={require('../assets/icon/arrow.png')}
                      style={styles.marketTabArrow}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        <View style={styles.marektControlWrapper}>
          <Pressable style={styles.controlMarketButton}>
            <Text style={styles.controlMarketButtonText} onPress={toAddMarket}>
              매장 등록
            </Text>
          </Pressable>
          <Text style={styles.pointButtonBar}>|</Text>
          <Pressable
            style={styles.controlMarketButton}
            onPress={toDeleteMarket}>
            <Text style={styles.controlMarketButtonText}>매장 삭제</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.marketAnalysisWrapper}>
        <Text style={styles.marketAnalysisTitle}>매장 분석</Text>

        {markets.length === 0 ? (
          <View style={[styles.noneMarketWrapper, {height: 200}]}>
            <Text>등록된 매장이 없습니다.</Text>
          </View>
        ) : (
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={true}>
            {markets.map((market, i) => {
              return (
                <TouchableOpacity
                  style={styles.analysisCard}
                  onPress={() => {
                    Alert.alert('알림', `${market.name} 매장 분석으로 이동`);
                    toMarektAnalysis(i);
                  }}
                  key={i}>
                  <Text style={styles.analysisStoreNameText}>
                    {market.name}
                  </Text>
                  <View style={styles.cardChart}>
                    <View style={styles.todayVistorWrapper}>
                      <View style={{left: 15}}>
                        <Text style={[styles.todaysText, {top: 10}]}>
                          오늘 방문자 수
                        </Text>
                        <Text style={[styles.todaysText, {bottom: 10}]}>
                          {market.genderDTO.female + market.genderDTO.male}명
                        </Text>
                      </View>

                      <View>
                        <ActivityRings
                          data={[
                            {
                              label: 'ACTIVITY',
                              value:
                                market.genderDTO.female ===
                                market.genderDTO.male
                                  ? 1
                                  : market.genderDTO.female >
                                    market.genderDTO.male
                                  ? market.genderDTO.female /
                                    (market.genderDTO.female +
                                      market.genderDTO.male)
                                  : market.genderDTO.male /
                                    (market.genderDTO.female +
                                      market.genderDTO.male),
                              color:
                                market.genderDTO.female ===
                                market.genderDTO.male
                                  ? '#c6c6c6'
                                  : market.genderDTO.male >
                                    market.genderDTO.female
                                  ? '#3F83D3'
                                  : '#DD4435',
                            },
                          ]}
                          config={activityConfig}
                        />
                      </View>

                      <View style={{right: 15}}>
                        {market.genderDTO.male > market.genderDTO.female ? (
                          <>
                            <Text style={[styles.todaysText, {top: 10}]}>
                              <Text style={{fontSize: 10}}>🔵 </Text>
                              남자 {market.genderDTO.male}
                            </Text>
                            <Text style={[styles.todaysText, {bottom: 10}]}>
                              &nbsp; &nbsp; &nbsp;여자 {market.genderDTO.female}
                            </Text>
                          </>
                        ) : market.genderDTO.male ===
                          market.genderDTO.female ? (
                          <>
                            <Text style={[styles.todaysText, {top: 10}]}>
                              <Text style={{fontSize: 10}}>🔵 </Text>
                              남자 {market.genderDTO.male}
                            </Text>
                            <Text style={[styles.todaysText, {bottom: 10}]}>
                              <Text style={{fontSize: 10}}>🔴 </Text>
                              여자 {market.genderDTO.female}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text style={[styles.todaysText, {top: 10}]}>
                              <Text style={{fontSize: 10}}>🔴 </Text>
                              여자 {market.genderDTO.female}
                            </Text>
                            <Text style={[styles.todaysText, {bottom: 10}]}>
                              &nbsp; &nbsp; &nbsp;남자 {market.genderDTO.male}
                            </Text>
                          </>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>

      <View style={styles.bottomWrapper}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>자주묻는질문</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>공지사항</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainBackground: {
    backgroundColor: '#EAEAEA',
  },

  mainHeader: {
    width: screenWidth,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  headerLogo: {
    resizeMode: 'contain',
    width: 100,
    height: 25,
    marginLeft: 27,
    marginTop: 5,
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 19,
    marginTop: 5,
  },
  headerSetting: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  headerAlarm: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    marginRight: 15,
  },

  ownerInfoWrapper: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: 'white',
    marginBottom: 9,
  },

  myInfoNameText: {
    fontFamily: 'GmarketSansTTFBold',
  },
  myInfoText: {
    marginLeft: 27,
    fontSize: 18,
    fontFamily: 'GmarketSansTTFMedium',
    color: '#363636',
    marginTop: 10,
    marginBottom: 30,
  },

  storeListWrapper: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 9,
  },

  storeListTitle: {
    fontFamily: 'GmarketSansTTFBold',
    color: '#363636',
    fontSize: 18,
    marginLeft: 27,
    marginTop: 20,
  },

  noneMarketWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeScrollView: {
    backgroundColor: 'white',
    marginHorizontal: 34,
    height: 240,
    borderRadius: 8,
  },

  marketTab: {
    height: 80,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
  },

  marketTabText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    fontSize: 14,
    color: 'black',
    paddingVertical: 22,
  },

  marketTabArrow: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    top: 30,
  },

  analysisStoreNameText: {
    marginTop: 5,
    fontSize: 15,
    top: -3,
    marginHorizontal: 18,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'black',
  },

  cardChart: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  marektControlWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  controlMarketButton: {
    marginLeft: 45,
    flex: 1,
  },
  controlMarketButtonText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: '#727272',
    paddingLeft: 28,
  },
  pointButtonBar: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: '#727272',
  },

  marketAnalysisWrapper: {
    padding: 25,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 9,
  },

  marketAnalysisTitle: {
    marginTop: -10,
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'black',
    fontSize: 18,
  },

  analysisCard: {
    marginTop: 5,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 10,
    marginBottom: 10,
    width: 300,
    borderRadius: 10,
    elevation: 5,
  },

  todayVistorWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },

  todaysText: {
    fontFamily: 'NotoSansCJKkr-Black (TTF)',
    color: 'black',
  },

  bottomWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 9,
  },

  bottomButton: {
    flex: 1,
    alignItems: 'center',
  },

  bottomButtonText: {
    fontSize: 12,
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    color: '#A5A5A5',
  },
});
export default MainOwner;
