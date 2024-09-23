import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../../features/auth/authSlice';
import styled from 'styled-components';

import useAxios from '../../../hooks/useAxios';

const BigDiv = styled.div`
    display:flex;
    justify-content : center;
    align-items : center;
    flex-direction: column;
`;

const StyledLink = styled(Link)`
    display : flex;
    justify-content : center;
    align-items : center;
    color: black; /* 링크 텍스트 색상 */
    &:hover {
        color: darkblue;
    }
    font-size : 14px;
`;

const LoginInput = styled.input`
    width:328px;
    height:44px;
    border-radius : 10px;
    border : 1px solid #F0F0F0;
    box-sizing: border-box;
    margin : 10px;
    padding : 10px;
`;

const LoginBtn = styled.button`
    width:328px;
    height:44px;
    color : white;
    background-color : #008DE7;
    border-radius : 10px;
    border : none;
    box-sizing: border-box;
    margin : 10px;
    padding : 10px;
`;

const NaverLoginBtn = styled.button`
    width:328px;
    height:44px;
    color : white;
    background-color : green;
    border-radius : 10px;
    border : none;
    box-sizing: border-box;
    margin : 10px;
    padding : 10px;
`;

const SignupDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const SignupP = styled.p`
    margin-left: 4px;
    margin-right: 4px;
    font-size : 14px;
`;

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const useInput = (validator:Function) => {

        const [ value, setValue ] = useState('');
        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const {
                target : { value }
            } = event;
            let willUpdate = true;
            // validator 실행
            if (typeof validator === "function") {
                willUpdate = validator(value);
            }

            // validator가 true일 때만 값 업데이트
            if (willUpdate) {
                setValue(value);
            }
        }

        return { value, onChange };
    }

    
    const validId = (value:string): boolean => {
        const regex = /^[a-zA-z0-9]*$/;
        return value.length <= 16 && regex.test(value);
    };

    const validPw = (value:string): boolean => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()]*$/;
    return value.length <= 15 && regex.test(value);
    }

    const id = useInput(validId);
    const pw = useInput(validPw);

    const formData = new FormData();
    formData.append('memberId', id.value);
    formData.append('password', pw.value);

    const { data: loginData, error: loginError, loading: loginLoading
        , status: loginStatus, refetch: loginRefetch } 
        = useAxios('/login', 'POST', formData);

        const { data: naverData, error: naverError, loading: naverLoading,
            status: naverStatus, refetch: naverRefetch }
            = useAxios('/oauth2/authorization/naver', 'POST');


    const handleLogin = () => {
        loginRefetch();
        if( loginStatus === 200){
            dispatch(loginSuccess());
            navigate('/home');
        }else if( loginStatus === 400 ){
            console.log("로그인 정보가 잘못되었습니다.");
        }
    }

    const handleNaverLogin = () => {
        naverRefetch();
        if( naverStatus === 200){
            dispatch(loginSuccess());
            navigate('/home');
        }else if( naverStatus === 400 ){
            console.log("로그인 정보가 잘못되었습니다.");
        }

    }

    return (
        <>
        <BigDiv>
            <div>
                <p>Triplet</p>
            </div>
            <LoginInput type="text" placeholder='아이디' {...id} />
            <LoginInput type="password" placeholder='비밀번호' {...pw} />
            <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
            <NaverLoginBtn onClick={handleNaverLogin}>네이버 계정 로그인</NaverLoginBtn>
            <SignupDiv>
                <SignupP>아직 회원이 아니신가요?</SignupP>
                <StyledLink to="/signup">
                    회원가입
                </StyledLink>
            </SignupDiv>
        </BigDiv>
        </>
    );
};

export default LoginPage;