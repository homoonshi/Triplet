import React, {useEffect, useState} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./firebaseNotification/firebase.tsx"
import './App.css';

// router import
import AppRoutes from './routes/AppRoutes';
import SplashScreen from './components/loading/SplashScreen';
import Navbar from './components/navigation/Navbar';
import type { RootState } from './store';

// 글로벌 css
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/PretendardVariable.woff2') format('woff2');
    font-weight: 1 1000;
    font-style: normal;
  }

  button, input {
    font-family: 'Pretendard';
    src: url('/fonts/PretendardVariable.woff2') format('woff2');
    font-weight: 1 1000;
    font-style: normal;
  }

  body {
    font-family : 'Pretendard', sans-serif;
  }
`;

const Div = styled.div`
  display : flex;
  flex-direction : column;
`;

const App: React.FC = () => {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const offPages = ["/login", "/signup", "/simple-password/set","/simple-password/setConfirm" ,"/simple-password/confirm", "/pay/qr",
      "/mypage/info-set"
    ];

    const loginSuccessPages = ["/login", "/signup"];

    if (offPages.includes(location.pathname)) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }

    if(!isAuthenticated){
      if(location.pathname !== "/signup"){
        navigate('/login');
      }
    }else{
      if(loginSuccessPages.includes(location.pathname)){
        navigate('/');
      }
    }

  }, [location.pathname, isAuthenticated]);  // location.pathname이 변경될 때마다 실행

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', () => {
  //       navigator.serviceWorker.register('/service-worker.js')
  //         .then((registration) => {
  //           console.log('서비스 워커 등록 성공 : ', registration.scope);
  //           setIsLoading(false); // 서비스 워커가 등록되면 로딩 완료
  //         }, (error) => {
  //           console.log('ServiceWorker registration failed: ', error);
  //           setIsLoading(false); // 서비스 워커 등록 실패 시에도 로딩 완료
  //         });
  //     });
  //   } else {
  //     setIsLoading(false); // 서비스 워커가 지원되지 않으면 바로 로딩 완료
  //   }
  // }, []);

  return (
    <Div>
      <GlobalStyle />
      {/* {isLoading && <SplashScreen />} */}
      <AppRoutes/>
      {isActive && <Navbar />}
    </Div>
  );
};

export default App;
