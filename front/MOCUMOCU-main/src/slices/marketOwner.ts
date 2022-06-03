import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Reward {
  reward: string;
  couponRequire: number;
}

export interface ActivityData {
  label: string;
  value: number;
  color: string;
}

export interface Market {
  id: number;
  phoneNum: string;
  name: string;
  rewardList: Array<Reward>;
  todays: number;
  male: number;
  female: number;
  activityData: Array<ActivityData>;
}

export interface InitialState {
  markets: Market[];
}

const initialState: InitialState = {
  markets: [
    {
      id: 0,
      phoneNum: '010-1111-2222',
      name: '카페현욱',
      rewardList: [
        {
          reward: '츄러스',
          couponRequire: 5,
        },
        {
          reward: '아메리카노',
          couponRequire: 10,
        },
      ],
      todays: 54,
      male: 42,
      female: 12,
      activityData: [
        {
          label: 'ACTIVITY',
          value: 0.5,
          color: '#FA6072',
        },
      ],
    },
    {
      id: 1,
      phoneNum: '010-1111-2222',
      name: '커피맛을 조금 아는 승민',
      rewardList: [
        {
          reward: '리워드1',
          couponRequire: 5,
        },
        {
          reward: '리워드2',
          couponRequire: 3,
        },
      ],
      todays: 30,
      male: 12,
      female: 18,
      activityData: [
        {
          label: 'ACTIVITY',
          value: 0.5,
          color: '#FA6072',
        },
      ],
    },
    {
      id: 2,
      phoneNum: '010-1111-2222',
      name: 'INYEONGCAFE',
      rewardList: [
        {
          reward: '리워드A',
          couponRequire: 5,
        },
        {
          reward: '리워드B',
          couponRequire: 7,
        },
      ],
      todays: 0,
      male: 0,
      female: 0,
      activityData: [
        {
          label: 'ACTIVITY',
          value: 0.5,
          color: '#FA6072',
        },
      ],
    },
    {
      id: 3,
      phoneNum: '010-1111-2222',
      name: '민수와 아이들',
      rewardList: [
        {
          reward: '초코마카롱',
          couponRequire: 10,
        },
        {
          reward: '딸기마카롱',
          couponRequire: 10,
        },
      ],
      todays: 10,
      male: 5,
      female: 5,
      activityData: [
        {
          label: 'ACTIVITY',
          value: 0.5,
          color: '#FA6072',
        },
      ],
    },
  ],
};

const userSlice = createSlice({
  name: 'marketOwner',
  initialState,
  reducers: {
    setName(state, action) {
      state.markets[action.payload.index].name = action.payload.name;
    },
    setPhoneNum(state, action) {
      state.markets[action.payload.index].phoneNum = action.payload.phoneNum;
    },
    setMarket(state, action) {
      state.markets = action.payload.markets;
    },
  },
  extraReducers: builder => { }, // 비동기 action 만들 때 사용
});

export default userSlice;
