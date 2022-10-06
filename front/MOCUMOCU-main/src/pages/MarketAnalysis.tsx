import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {LoggedInOwnerParamList} from '../../App';
import {RootState} from '../store/reducer';
import {BarChart, PieChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';

type MarketAnalysislScreenProps = NativeStackScreenProps<
  LoggedInOwnerParamList,
  'EventControl'
>;

function MarketAnalysis(
  this: any,
  {navigation, route}: MarketAnalysislScreenProps,
) {
  const marketIndex = route.params.marketIndex;
  const marketName = useSelector(
    (state: RootState) => state.marketOwner.markets[marketIndex].name,
  );
  const isAlarm = false;

  const onSubmitSetting = () => {
    // Alert.alert('알림', '설정');
    navigation.navigate('SettingsOwner');
  };
  const onSubmitAlarm = () => {
    Alert.alert('알림', '알람');
  };

  const tempTimeData = [
    10, 20, 50, 30, 40, 15, 20, 10, 20, 60, 30, 40, 15, 20, 10, 20, 50, 30, 40,
    15, 20, 50, 30, 40,
  ];
  const tempTimeDataMax = Math.max(...tempTimeData);
  const timeChartData = {
    labels: tempTimeData.reduce((arr, value, i) => {
      arr.push(i + 1 + '');
      return arr;
    }, []),
    datasets: [
      {
        data: tempTimeData,
        colors: tempTimeData.reduce((arr, value: number) => {
          if (tempTimeDataMax === value) {
            arr.push(() => '#FA6072');
          } else {
            arr.push(() => '#bbbbbb');
          }
          return arr;
        }, []),
      },
    ],
  };

  const tempDayData = [10, 20, 50, 30, 40, 15, 20];
  const tempDayDataMax = Math.max(...tempDayData);
  const dayChartData = {
    labels: ['일', '월', '화', '수', '목', '금', '토'],
    datasets: [
      {
        data: tempDayData,
        colors: tempDayData.reduce((arr, value: number) => {
          if (tempDayDataMax === value) {
            arr.push(() => '#FA6072');
          } else {
            arr.push(() => '#bbbbbb');
          }
          return arr;
        }, []),
      },
    ],
  };

  const tempMonthData = [99, 45, 28, 80, 20, 43, 20, 45, 28, 80, 70, 43];
  const tempMonthDataMax = Math.max(...tempMonthData);
  const monthChartData = {
    labels: tempMonthData.reduce((arr, value, i) => {
      arr.push(i + 1 + '월');
      return arr;
    }, []),
    datasets: [
      {
        data: tempMonthData,
        colors: tempMonthData.reduce((arr, value: number) => {
          if (tempMonthDataMax === value) {
            arr.push(() => '#FA6072');
          } else {
            arr.push(() => '#bbbbbb');
          }
          return arr;
        }, []),
      },
    ],
  };

  const genderChartData = [
    {
      name: '남자',
      population: 60,
      color: '#505050',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '여자',
      population: 40,
      color: '#888888',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const timeChartConfig = {
    backgroundGradientFrom: '#F7F7F7',
    backgroundGradientTo: '#F7F7F7',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 글자색
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.15,
    useShadowColorFromDataset: false, // optional
    barRadius: 7,
    decimalPlaces: 0,
    propsForVerticalLabels: {fontSize: 10},
  };

  const monthChartConfig = {
    backgroundGradientFrom: '#F7F7F7',
    backgroundGradientTo: '#F7F7F7',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 글자색
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.3,
    useShadowColorFromDataset: false, // optional
    barRadius: 7,
    decimalPlaces: 0,
    propsForVerticalLabels: {fontSize: 10},
  };

  const dayChartConfig = {
    backgroundGradientFrom: '#F7F7F7',
    backgroundGradientTo: '#F7F7F7',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 글자색
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.38,
    useShadowColorFromDataset: false, // optional
    barRadius: 7,
    decimalPlaces: 0,
  };

  const genderChartConfig = {
    backgroundGradientFrom: '#F7F7F7',
    backgroundGradientTo: '#F7F7F7',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 글자색
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: false, // optional
    barRadius: 7,
    propsForLabels: {color: '#123456'},
  };

  return (
    <ScrollView>
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
          <Text style={styles.marketTitleText}>매장 분석</Text>
          <Text style={[styles.marketTitleText, {fontSize: 12}]}>
            {marketName}
          </Text>
        </View>

        <View>
          <View style={styles.chartTitleWrapper}>
            <Text style={styles.innerChartTitleText}>시간대 별 방문자 수</Text>
            <BarChart
              style={styles.graphStyle}
              data={timeChartData}
              width={screenWidth * 0.8}
              height={screenHeight * 0.35}
              fromZero={true}
              yAxisSuffix="명"
              chartConfig={timeChartConfig}
              withInnerLines={false}
              showBarTops={false}
              showValuesOnTopOfBars={true}
              withCustomBarColorFromData={true}
              flatColor={true}
              // withHorizontalLabels={false}
            />
          </View>
          <View style={styles.chartTitleWrapper}>
            <Text style={styles.innerChartTitleText}>요일 별 방문자 수</Text>
            <BarChart
              style={styles.graphStyle}
              data={dayChartData}
              width={screenWidth * 0.8}
              height={screenHeight * 0.35}
              fromZero={true}
              yAxisSuffix="명"
              chartConfig={dayChartConfig}
              withInnerLines={false}
              showBarTops={false}
              showValuesOnTopOfBars={true}
              withCustomBarColorFromData={true}
              flatColor={true}
              // withHorizontalLabels={false}
            />
          </View>

          <View style={styles.chartTitleWrapper}>
            <Text style={styles.innerChartTitleText}>월 별 방문자 수</Text>
            <BarChart
              style={styles.graphStyle}
              data={monthChartData}
              width={screenWidth * 0.8}
              height={screenHeight * 0.35}
              fromZero={true}
              yAxisSuffix="명"
              chartConfig={monthChartConfig}
              withInnerLines={false}
              showBarTops={false}
              showValuesOnTopOfBars={true}
              // withHorizontalLabels={false}
              withCustomBarColorFromData={true}
              flatColor={true}
            />
          </View>

          <View style={styles.chartTitleWrapper}>
            <Text style={styles.innerChartTitleText}>고객 성비</Text>
            <PieChart
              style={styles.graphStyle}
              data={genderChartData}
              width={screenWidth * 0.85}
              height={screenHeight * 0.3}
              chartConfig={genderChartConfig}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'50'}
              center={[0, -20]}
              absolute
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainBackground: {
    width: screenWidth,
    // height: screenHeight,
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

  chartTitleWrapper: {
    // marginLeft: 20,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  innerChartTitleText: {
    color: 'black',
    marginBottom: 10,
  },
  graphStyle: {
    // width: screenWidth,
    // height: 300,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    paddingTop: 15,
  },
});

export default MarketAnalysis;
