import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {LogBox} from 'react-native';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {LoggedInOwnerParamList} from '../../App';
import {RootState} from '../store/reducer';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryAxis,
} from 'victory-native';
import {range} from 'lodash';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

LogBox.ignoreLogs(['Require cycle: node_modules/victory-vendor']);

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
  const marketId = useSelector(
    (state: RootState) => state.marketOwner.markets[marketIndex].id,
  );
  const [timeData, setTimeData] = useState([]);
  const [maxTimeCount, setMaxTimeData] = useState(0);
  const [dayData, setDayData] = useState([]);
  const [maxDayCount, setMaxDayCount] = useState(0);
  const [monthData, setMonthData] = useState([]);
  const [maxMonthCount, setMaxMonthCount] = useState(0);
  const [genderData, setGenderData] = useState([
    {x: 1, y: 0, placement: '남자'},
    {x: 2, y: 0, placement: '여자'},
  ]);

  //임시데이터;
  // const timeData = [
  //   {time: '1', count: 13},
  //   {time: '2', count: 23},
  //   {time: '3', count: 1},
  //   {time: '4', count: 15},
  //   {time: '5', count: 40},
  //   {time: '6', count: 30},
  //   {time: '7', count: 23},
  //   {time: '8', count: 54},
  //   {time: '9', count: 45},
  //   {time: '10', count: 23},
  //   {time: '11', count: 45},
  //   {time: '12', count: 13},
  //   {time: '13', count: 34},
  //   {time: '14', count: 56},
  //   {time: '15', count: 80},
  //   {time: '16', count: 21},
  //   {time: '17', count: 56},
  //   {time: '18', count: 28},
  //   {time: '19', count: 30},
  //   {time: '20', count: 23},
  //   {time: '21', count: 54},
  //   {time: '22', count: 45},
  //   {time: '23', count: 23},
  //   {time: '24', count: 45},
  // ];
  // const maxTimeCount = 80;

  // const dayData = [
  //   {day: '월', count: 13},
  //   {day: '화', count: 23},
  //   {day: '수', count: 12},
  //   {day: '목', count: 11},
  //   {day: '금', count: 8},
  //   {day: '토', count: 6},
  //   {day: '일', count: 2},
  // ];

  // const maxDayCount = 23;

  // const monthData = [
  //   {month: '1월', count: 100},
  //   {month: '2월', count: 123},
  //   {month: '3월', count: 132},
  //   {month: '4월', count: 111},
  //   {month: '5월', count: 68},
  //   {month: '6월', count: 56},
  //   {month: '7월', count: 42},
  //   {month: '8월', count: 113},
  //   {month: '9월', count: 123},
  //   {month: '10월', count: 112},
  //   {month: '11월', count: 111},
  //   {month: '12월', count: 18},
  // ];

  // const maxMonthCount = 132;

  // const genderData = [
  //   {x: 1, y: 5, placement: '남자'},
  //   {x: 2, y: 6, placement: '여자'},
  // ];
  // 임시데이터 끝

  function getMaxCount(data) {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (count < data[i].count) {
        count = data[i].count;
      }
    }
    return count;
  }

  const getChartData = async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/couponlog/market/analysis/?marketId=${marketId}&day=1`,
      );
      setTimeData(response.data.timeAnalysisDTOS);
      setMaxTimeData(getMaxCount(response.data.timeAnalysisDTOS));

      setDayData(response.data.dayOfWeekAnalysisDTOS);
      setMaxDayCount(getMaxCount(response.data.dayOfWeekAnalysisDTOS));

      setMonthData(response.data.monthAnalysisDTOS);
      setMaxMonthCount(getMaxCount(response.data.monthAnalysisDTOS));

      setGenderData(response.data.genderAnalysisDTOS);
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      if (errorResponse) {
        Alert.alert('알림', '리워드 목록을 불러오는데 실패했습니다.');
      }
    }
  };
  useEffect(() => {
    getChartData();
  }, []);
  const toBack = useCallback(() => {
    navigation.pop(); // 뒤로 가기
  }, [navigation]);

  return (
    <ScrollView>
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
          <Text style={styles.marketTitleText}>매장 분석</Text>
          <Text style={[styles.marketTitleText, {fontSize: 12}]}>
            {marketName}
          </Text>
        </View>

        <View>
          <View style={styles.chartTitleWrapper}>
            <Text style={styles.innerChartTitleText}>시간대 별 방문자 수</Text>
            <VictoryChart
              width={screenWidth}
              theme={VictoryTheme.material}
              domainPadding={{x: 10}}
              padding={{top: 50, bottom: 50, left: 35, right: 50}}>
              <VictoryAxis
                dependentAxis
                style={{
                  // axis: {stroke: 'transparent'},
                  ticks: {stroke: 'transparent'},
                  tickLabels: {fontSize: 12, padding: 5},
                }}
              />

              <VictoryAxis
                crossAxis
                style={{
                  // axis: {stroke: 'transparent'},
                  // ticks: {stroke: 'transparent'},
                  tickLabels: {fontSize: 10, padding: 5},
                }}
                tickValues={range(0, 24)}
                tickFormat={value => `${value}시`}
                tickCount={12}
              />

              <VictoryBar
                style={{
                  data: {
                    fill: ({datum}) =>
                      datum.count === maxTimeCount ? '#FA6072' : 'lightgray',
                  },
                }}
                data={timeData}
                x="time"
                y="count"
                // animate={{
                //   duration: 2000,
                //   onLoad: {duration: 1500},
                // }}
                barRatio={0.4}
                labels={({datum}) => `${datum.count}명`}
                cornerRadius={3}
              />
            </VictoryChart>
          </View>

          <View style={styles.chartTitleWrapper}>
            <Text style={styles.innerChartTitleText}>요일 별 방문자 수</Text>
            <VictoryChart
              width={screenWidth}
              theme={VictoryTheme.material}
              domainPadding={{x: 20}}
              padding={{top: 50, bottom: 50, left: 35, right: 50}}>
              <VictoryBar
                style={{
                  data: {
                    fill: ({datum}) =>
                      datum.count === maxDayCount ? '#FA6072' : 'lightgray',
                  },
                }}
                data={dayData}
                x="day"
                y="count"
                // animate={{
                //   duration: 2000,
                //   onLoad: {duration: 1500},
                // }}
                barRatio={0.2}
                labels={({datum}) => `${datum.count}명`}
                cornerRadius={6}
              />
            </VictoryChart>
          </View>

          <View style={styles.chartTitleWrapper}>
            <Text style={styles.innerChartTitleText}>월 별 방문자 수</Text>
            <VictoryChart
              width={screenWidth}
              theme={VictoryTheme.material}
              domainPadding={{x: 30}}
              padding={{top: 50, bottom: 50, left: 35, right: 50}}>
              <VictoryBar
                style={{
                  data: {
                    fill: ({datum}) =>
                      datum.count === maxMonthCount ? '#FA6072' : 'lightgray',
                  },
                }}
                data={monthData}
                x="month"
                y="count"
                // animate={{
                //   duration: 2000,
                //   onLoad: {duration: 1500},
                // }}
                barRatio={0.3}
                labels={({datum}) => `${datum.count}명`}
                cornerRadius={4}
              />
            </VictoryChart>
          </View>
          <View style={styles.chartTitleWrapper}>
            <Text style={styles.innerChartTitleText}>고객 성비</Text>
          </View>
          <View>
            <VictoryPie
              colorScale={
                genderData[0].y > genderData[1].y
                  ? ['#FA6072', 'lightgray']
                  : ['lightgray', '#FA6072']
              }
              radius={125}
              innerRadius={105}
              style={{labels: {padding: 13, fontSize: 12}}}
              data={genderData}
              labels={
                genderData[0].y === 0 && genderData[1].y === 0
                  ? () => ''
                  : ({datum}) => `${datum.placement} ${datum.y}명 `
              }
              // labelPlacement={({datum}) => datum.placement}
              labelPosition="centroid"
              padAngle={({datum}) => datum.y}
              padding={{top: 0, bottom: 100}}
            />

            {!genderData[0].y && !genderData[1].y ? (
              <Text style={styles.pieChartNoDataText}>방문자가 없습니다.</Text>
            ) : (
              <Text style={styles.pieChartPersent}>
                {genderData[0].y > genderData[1].y
                  ? Math.floor(
                      (genderData[0].y / (genderData[0].y + genderData[1].y)) *
                        100,
                    )
                  : Math.floor(
                      (genderData[1].y / (genderData[0].y + genderData[1].y)) *
                        100,
                    )}{' '}
                %
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  loadingModal: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBackground: {
    width: screenWidth,
    // height: screenHeight,
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

  chartTitleWrapper: {
    // marginLeft: 20,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  innerChartTitleText: {
    color: 'black',
    marginBottom: -30,
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
  },
  graphStyle: {
    borderColor: '#c8c8c8',
    borderWidth: 2,
    borderRadius: 10,
    paddingTop: 15,
  },
  pieChartPersent: {
    position: 'absolute',
    top: 85,
    left: 145,
    color: '#FA6072',
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 50,
  },

  pieChartNoDataText: {
    position: 'absolute',
    top: 155,
    left: 155,
    color: '#c6c6c6',
    fontFamily: 'NotoSansCJKkr-Medium (TTF)',
    fontSize: 15,
  },
});

export default MarketAnalysis;
