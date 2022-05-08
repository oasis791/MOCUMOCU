import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import {NavigationContainer} from '@react-navigation/native';
export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Main: undefined;
  Complete: {orderId: string};
  // orderId : parameter 칸 => 주문에 고유한 ID가 부여되어 있음 이걸 변수처럼 사용하기 위해서 넣어줌
}; // -> 로그인 했을 때 보이는 페이지들

// 타입을 나눠 놓은 이유 -> 합쳐도 큰 문제는 되지 않지만 화면에 나타내는 조건이 달라서 나눠놓음
//export -> 다른 파일에서 import 가능 => 타입도 다른 파일로 export, import 가능
export type RootStackParamList = {
  SignIn: undefined;
  SignInOwner: undefined;
  SignUp: undefined;
  InitScreen: undefined;
}; // -> 이 타입은 로그인 안 했을 때 보이는 페이지들

function App() {
  // const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
