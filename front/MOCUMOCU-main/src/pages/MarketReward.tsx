/* eslint-disable prettier/prettier */
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Config from 'react-native-config';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { LoggedInOwnerParamList } from '../../App';
import marketOwnerSlice from '../slices/marketOwner';
import { useAppDispatch } from '../store';
import { RootState } from '../store/reducer';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('window').height;

type MarketRewardScreenProps = NativeStackScreenProps<
    LoggedInOwnerParamList,
    'MarketReward'
>;


function MarketReward({ navigation, route }: MarketRewardScreenProps) {
    const marketIndex = route.params.marketIndex;
      const marketName = useSelector(
    (state: RootState) => state.marketOwner.markets[marketIndex].name,
  );
    const dispatch = useAppDispatch();
    const marketId = useSelector(
        (state: RootState) => state.marketOwner.markets[marketIndex].id
    );

    const rewardList = useSelector(
        (state: RootState) => state.marketOwner.markets[marketIndex].rewardList
    );

    const ownerId = useSelector((state: RootState) => state.userTest.id);

    const [addButtonActive, setAddButtonActive] = useState(false);
    const [deleteButtonActive, setDeleteButtonActive] = useState(false);
    const [rewardName, setRewardName] = useState('');
    const [couponRequire, setCouponRequire] = useState('');

  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);

    const changeRewardName = useCallback(text => {
        setRewardName(text);
    }, []);
    const changeCouponRequire = useCallback(text => {
        setCouponRequire(text);
    }, []);

    const onGetRewardSubmit = useCallback(async () => {
        try {
            const response = await axios.get(`${Config.API_URL}/reward/${marketId}/reward-list/`);
            // console.log('get rewardList:', response.data, '\nrewardList :', typeof (response.data.rewardList));
            console.log(response.data);
            dispatch(
                marketOwnerSlice.actions.setReward({
                    index: marketIndex,
                    rewardList: response.data,
                })
            );
        } catch (error) {
            const errorResponse = (error as AxiosError<any>).response;
            if (errorResponse) {
                Alert.alert('알림', '리워드 목록을 불러오는데 실패했습니다.');
            }
        }
    }, []);

    const onAddRewardSubmit = useCallback(async () => {
        try {
            const response = await axios.post(`${Config.API_URL}/reward/store`, {
                marketId,
                rewardName,
                couponRequire: Number(couponRequire),
            });

            onGetRewardSubmit();
            setAddButtonActive(false);


            Alert.alert('알림', '리워드가 등록되었습니다.');
        } catch (error) {
            const errorResponse = (error as AxiosError<any>).response;

            if (errorResponse) {
                Alert.alert('알림asdf', `${errorResponse.status}`);
            }
        }
    }, [couponRequire, marketId, onGetRewardSubmit, rewardName]);


    const onDeleteRewardSubmit = useCallback((rewardId) => {
        Alert.alert('알림', '리워드를 정말 삭제하시겠습니까?', [{
            text: '확인',
            onPress: async () => {
                try {
                    const response = await axios.delete(`${Config.API_URL}/reward/remove/${rewardId}`);
                    onGetRewardSubmit();
                    Alert.alert('알림', '리워드가 삭제되었습니다.');
                } catch (error) {
                    const errorResponse = (error as AxiosError<any>).response;

                    if (errorResponse) {
                        Alert.alert('알림', '리워드 삭제에 실패하였습니다');
                    }
                }
            },
        },
        {
            text: '취소',
        },
        ]);


    }, [marketId, onGetRewardSubmit, ownerId]);

      const isFocused = useIsFocused();
    useEffect(() => {
        onGetRewardSubmit();
    },[isFocused]);

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
                    <Text style={styles.marketTitleText}>리워드 관리</Text>
                    <Text style={[styles.marketTitleText, {fontSize: 12}]}> {marketName}</Text>
                </View>

                <View style={styles.marketRewardListWrapper}>
                    {rewardList?.length === 0
                        ?
                        (
                            <View style={[styles.scrollRewardWrapper, { alignItems: 'center', justifyContent: 'center' }]}>
                                <Text>등록된 리워드가 없습니다</Text>
                            </View>
                        )
                        : (
                            <ScrollView style={styles.scrollRewardWrapper}>
                                {rewardList?.map(reward => {
                                    return (
                                        <View key={reward.id} style={styles.rewardWrapper}>
                                            <Text style={styles.rewardText}>
                                                {reward.couponRequire}개 리워드 - {reward.reward}
                                            </Text>

                                            {deleteButtonActive ? (
                                                <TouchableOpacity onPress={() => { onDeleteRewardSubmit(reward.id); }}>
                                                    <Image
                                                        source={require('../assets/icon/xIconRed.png')}
                                                        style={styles.deleteIcon}
                                                    />
                                                </TouchableOpacity>
                                            ) : null

                                            }
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        )
                    }

                </View>

                <View style={styles.rewardControlWrapper}>
                    <TouchableOpacity style={[styles.rewardWrapper, styles.plusButton]} onPress={() => {setAddButtonActive(true); }}>
                        <Text style={[styles.rewardText, { fontSize: 25, marginLeft: 0 }]}>
                            +
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setDeleteButtonActive(!deleteButtonActive); }}>
                        { !deleteButtonActive
                        ? <Text>삭제하기</Text>
                        : <Text>취소</Text>
                        }
                    </TouchableOpacity>
                    {/*
                    <Button
                        onPress={handlePresentModalPress}
                        title="삭제하기"
                    // color="none"
                    /> */}
                </View>

                {addButtonActive
                    ? (
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.addRewardBackground} onPress={()=>{setAddButtonActive(false);}} />
                            <View style={styles.addRewardInputWrapper} >
                                <TextInput placeholder="소모 개수"
                                    keyboardType="numeric"
                                    value={couponRequire}
                                    onChangeText={changeCouponRequire}
                                   />
                                <TextInput
                                placeholder="물품"
                                placeholderTextColor={'#c4c4c4'}
                                    value={rewardName}
                                    onChangeText={changeRewardName} />

                                <View style={styles.addRewardButtonWrapper}>
                                    <TouchableOpacity style={styles.addRewardButton}
                                        onPress={onAddRewardSubmit}>
                                        <Text style={styles.addRewardButtonText}>확인</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.addRewardButton, {backgroundColor:'#A5A5A5'}]} onPress={()=>{setAddButtonActive(false);}}>
                                        <Text style={styles.addRewardButtonText}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    )
                    : null
                }
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: '85%',
        height: screenHeight,
        position: 'absolute',
        // padding: 24,
        // justifyContent: 'center',
    },
    contentContainer: {
        alignItems: 'center',
    },
    //


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
    },

    marketTitleText: {
        fontFamily: 'GmarketSansTTFMedium',
        fontSize: 24,
        color: 'black',
    },

    marketRewardListWrapper: {

    },

    scrollRewardWrapper: {
        height: 350,
    },

    rewardWrapper: {
        backgroundColor: 'white',
        margin: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        height: 75,
        marginBottom: 10,
        flexDirection: 'row',
        paddingHorizontal: 30,
    },

    rewardText: {
        fontFamily: 'NotoSansCJKkr-Medium (TTF)',
        color: 'black',

    },

    deleteIcon: {
        width: 15,
        height: 15,
    },

    rewardControlWrapper: {
        alignItems: 'center',
    },


    plusButton: {
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        marginBottom: 15,
    },

    addRewardBackground:{
        flex: 3,
        // backgroundColor: 'pink',
    },



    addRewardInputWrapper: {
        flex: 1,
        padding: 40,
        borderTopLeftRadius: 30,
        borderTopEndRadius: 30,

        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
        elevation: 7,
        backgroundColor: 'white',
    },

    addRewardInput: {
    },

    addRewardButtonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,

    },

    addRewardButton: {
        backgroundColor: '#FA6072',
        borderRadius: 7,
        marginHorizontal: 10,
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addRewardButtonText: {
        color: 'white',
        fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    },
});

export default MarketReward;
