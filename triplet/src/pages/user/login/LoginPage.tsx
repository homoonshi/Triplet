import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../../features/auth/authSlice';
import styled from 'styled-components';

import useAxios from '../../../hooks/useAxios';
import useInput from '../../../hooks/useInput';

import ErrorModal from '../../../components/modal/ErrorModal';
import CompleteModal from '../../../components/modal/CompleteModal';

import { ReactComponent as NaverLogo } from '../../../assets/login/naver.svg';

const TitleP = styled.p`
    font-size : 32px;
    font-weight : 800;
    color : #008DE7;
    margin : 0px;
`;

const TitleDiv = styled.div`
    margin-top : 125px;
    margin-bottom : 61px;
`;

const BigDiv = styled.div`
    padding : 0 16px;
    display:flex;
    justify-content : center;
    align-items : center;
    flex-direction: column;
`;

const StyledLink = styled(Link)`
    display : flex;
    justify-content : center;
    align-items : center;
    color: #888888; /* 링크 텍스트 색상 */
    &:hover {
        color: darkblue;
    }
    font-size : 14px;
`;

const LoginForm = styled.form`
    width: 100%;
`

const LoginInput = styled.input`
    width:100%;
    height:44px;
    border-radius : 10px;
    background-color : #F9FAFC;
    border : 1px solid #F0F0F0;
    box-sizing: border-box;
    margin-bottom : 20px;
    padding : 14px;
`;

const LoginBtn = styled.button`
    width:100%;
    height:44px;
    color : white;
    background-color : #008DE7;
    border-radius : 10px;
    border : none;
    box-sizing: border-box;
    margin-bottom : 20px;
    padding : 14px;
`;

const KakaoLoginBtn = styled.button`
    width:100%;
    height:44px;
    color : black;
    background-color : #FBE44E;
    border-radius : 10px;
    border : 1px solid #E6E6EA;
    box-sizing: border-box;
    margin-bottom : 20px;
    padding : 14px;
    display : flex;
    justify-content : center;
    align-items : center;
    font-size : 14px;
    font-weight : 600;
`;

const SignupDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const SignupP = styled.p`
    font-size : 14px;
    margin : 0px 4px;
`;

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validId = (value: string): boolean => {
        const regex = /^[a-zA-Z0-9]*$/;
        return value.length <= 16 && regex.test(value);
    };

    const validPw = (value: string): boolean => {
        const regex = /^[a-zA-Z0-9!@#$%^&*()]*$/;
        return value.length <= 15 && regex.test(value);
    };

    const id = useInput(validId);
    const pw = useInput(validPw);

    const formData = new FormData();
    formData.append('memberId', id.value);
    formData.append('password', pw.value);

    const { data: loginData, error: loginError, loading: loginLoading, status: loginStatus, refetch: loginRefetch } = useAxios('/login', 'POST', formData);

    // 로그인 핸들러
    const handleLogin = (e : any) => {
        e.preventDefault(); // 폼 기본 동작 방지
        loginRefetch(); // 클릭 시 요청 재시도
    };
    
    useEffect(() => {
        if (loginData !== null) {
            console.log(loginData);
            setCompleteMsg("로그인이 완료되었습니다.");
            isCompleteOpen();
        }

        if (loginError !== null) {
            console.log(loginError);
            const message = loginError.response?.data?.message || "로그인이 불가능합니다.";
            setErrorMsg(message);
            isErrorOpen();
        }
    }, [loginData, loginError]);

    // 카카오 로그인 버튼 핸들러
    const handleNaverLogin = () => {
        window.location.href = 'https://j11b202.p.ssafy.io/api/v1/oauth2/authorization/kakao';
    };

    // 로그인 상태 변경 시 처리
    useEffect(() => {
        if (loginStatus === 200) {
            dispatch(loginSuccess());
            navigate('/');
        }
    }, [loginStatus, dispatch, navigate]);

    // 에러 모달
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const isErrorOpen = () => {
        setIsError(true);
    };

    const closeError = () => {
        setIsError(false);
    };

    const [isComplete, setIsComplete] = useState(false);
    const [completeMsg, setCompleteMsg] = useState('');

    const isCompleteOpen = () => {
        setIsComplete(true);
    };

    const closeComplete = () => {
        setIsComplete(false);
    };

    return (
        <BigDiv>
            <TitleDiv>
                <TitleP>Triplet</TitleP>
            </TitleDiv>
            <LoginForm onSubmit={handleLogin}>
                <LoginInput type="text" placeholder='아이디' {...id} />
                <LoginInput type="password" placeholder='비밀번호' {...pw} />
                <LoginBtn type="submit">로그인</LoginBtn>
            </LoginForm>
            <KakaoLoginBtn onClick={handleNaverLogin}>
                카카오 로그인
            </KakaoLoginBtn>
            <SignupDiv>
                <SignupP>아직 회원이 아니신가요?</SignupP>
                <StyledLink to="/signup">
                    <SignupP>회원가입</SignupP>
                </StyledLink>
            </SignupDiv>
            <ErrorModal isOpen={isError} onClose={closeError} msg={errorMsg}></ErrorModal>
            <CompleteModal isOpen={isComplete} onClose={closeComplete} msg={completeMsg}></CompleteModal>
        </BigDiv>
    );
};

export default LoginPage;
