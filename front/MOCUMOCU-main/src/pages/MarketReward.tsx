/* eslint-disable prettier/prettier */
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Button,
    Dimensions,
    Image,
    Modal,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Config from 'react-native-config';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { LoggedInOwnerParamList } from '../../App';
import marketOwnerSlice from '../slices/marketOwner';
import { useAppDispatch } from '../store';
import { RootState } from '../store/reducer';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

type MarketRewardScreenProps = NativeStackScreenProps<
    LoggedInOwnerParamList,
    'MarketReward'
>;


function MarketReward({ navigation, route }: MarketRewardScreenProps) {
    const marketIndex = route.params.marketIndex;

    const dispatch = useAppDispatch();
    const marketId = useSelector(
        (state: RootState) => state.marketOwner.markets[marketIndex].id
    );

    const rewardList = useSelector(
        (state: RootState) => state.marketOwner.markets[marketIndex].rewardList
    );
    // const ownerId = useSelector(
    //     (state: RootState) => state.user.userId
    // );
    const ownerId = 111;

    const [addButtonActive, setAddButtonActive] = useState(false);
    const [deleteButtonActive, setDeleteButtonActive] = useState(false);
    const [rewardName, setRewardName] = useState('');
    const [couponRequire, setCouponRequire] = useState(1);


    const isAlarm = false;

    const onSubmitSetting = () => {
        // Alert.alert('알림', '설정');
        navigation.navigate('SettingsOwner');
    };
    const onSubmitAlarm = () => {
        Alert.alert('알림', '알람');
    };

    const onGetRewardSubmit = useCallback(async () => {
        try {
            const response = await axios.get(`${Config.API_URL}/owner/${ownerId}/store/${marketId}/reward-list/`);
            dispatch(
                marketOwnerSlice.actions.setReward({
                    index: response.data.index,
                    rewardList: response.data.rewardList,
                })
            );
        } catch (error) {
            const errorResponse = (error as AxiosError<any>).response;
            if (errorResponse) {
                Alert.alert('알림', '리워드 목록을 불러오는데 실패했습니다.');
            }
        }
    }, [dispatch, marketId]);

    const onAddRewardSubmit = useCallback(async () => {
        try {
            const response = await axios.post(`${Config.API_URL}/owner/store/reward`, {
                ownerId,
                marketId,
                rewardName,
                couponRequire,
            });
            onGetRewardSubmit;
            Alert.alert('알림', '리워드가 등록되었습니다.');
        } catch (error) {
            const errorResponse = (error as AxiosError<any>).response;

            if (errorResponse) {
                Alert.alert('알림', '리워드 등록에 실패하였습니다.');
            }
        } finally {
            onGetRewardSubmit();
        }
    }, [couponRequire, marketId, onGetRewardSubmit, rewardName]);


    const onDeleteRewardSubmit = useCallback((rewardId) => {
        Alert.alert('알림', '리워드를 정말 삭제하시겠습니까?', [{
            text: '확인',
            onPress: async () => {
                try {
                    const response = await axios.delete(`${Config.API_URL}/owner/${ownerId}/store/${marketId}/reward/${rewardId}`);
                    Alert.alert('알림', '리워드가 삭제되었습니다.');
                } catch (error) {
                    const errorResponse = (error as AxiosError<any>).response;

                    if (errorResponse) {
                        Alert.alert('알림', '리워드 삭제에 실패하였습니다');
                    }
                } finally {
                    onGetRewardSubmit();
                }
            },
        },
        {
            text: '취소',
        },
        ]);


    }, [marketId, onGetRewardSubmit]);

    useEffect(() => {
        onGetRewardSubmit();
    }, [onGetRewardSubmit]);


    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);




    return (
        <BottomSheetModalProvider>
            <View style={styles.mainBackground}>
                <StatusBar hidden={true} />

                <View style={styles.mainHeader}>
                    <View style={styles.headerButtonWrapper}>
                        <Pressable onPress={onSubmitAlarm}>
                            <Image
                                source={
                                    isAlarm
                                        ? require('../assets/icon/mainAlarmActive.png')
                                        : require('../assets/icon/mainAlarm.png')
                                }
                                style={styles.headerAlarm}
                            />
                        </Pressable>

                        <Pressable onPress={onSubmitSetting}>
                            <Image
                                source={require('../assets/icon/mainSetting.png')}
                                style={styles.headerSetting}
                            />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.marketTitleWrapper}>
                    <Text style={styles.marketTitleText}>리워드 관리</Text>
                </View>

                <View style={styles.marketRewardListWrapper}>
                    <ScrollView >
                        {rewardList.map(reward => {
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
                </View>

                <View style={styles.rewardControlWrapper}>
                    <TouchableOpacity style={[styles.rewardWrapper, styles.plusButton]} onPress={() => { handlePresentModalPress; setAddButtonActive(true); }}>
                        <Text style={[styles.rewardText, { fontSize: 25, marginLeft: 0 }]}>
                            +
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setDeleteButtonActive(!deleteButtonActive); }}>
                        <Text>삭제하기</Text>
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
                            <BottomSheetModal
                                ref={bottomSheetModalRef}
                                index={1}
                                snapPoints={snapPoints}
                                onChange={handleSheetChanges}
                            >
                                <View style={styles.contentContainer}>
                                    <Text>Awesome 🎉</Text>
                                    <Text>Awesome 🎉</Text>
                                    <Text>Awesome 🎉</Text>
                                    <Text>Awesome 🎉</Text>
                                    <Text>Awesome 🎉</Text>
                                </View>
                            </BottomSheetModal>
                        </View>
                    )
                    : null
                }




            </View >
        </BottomSheetModalProvider >
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        padding: 24,
        justifyContent: 'center',
        // backgroundColor: 'pink',
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
        justifyContent: 'flex-end',
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
    headerAlarm: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        marginRight: 15,
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


    plusButton: { backgroundColor: '#E5E5E5', alignItems: 'center', justifyContent: 'center', width: '95%', marginBottom: 15 },
});

export default MarketReward;
