import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActivityData {
  label: string;
  value: number;
  color: string;
}

export interface Market {
  id: number;
  phoneNum: String;
  name: string;
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
  name: 'storeOwner',
  initialState,
  reducers: {
    setName(state, action) {
      state.markets[action.payload.index].name = action.payload.name;
    },
    setPhoneNum(state, action) {
      state.markets[action.payload.index].phoneNum = action.payload.phoneNum;
    },
  },
  extraReducers: builder => { }, // 비동기 action 만들 때 사용
});

export default userSlice;
