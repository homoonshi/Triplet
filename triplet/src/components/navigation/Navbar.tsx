import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// 이미지 import
import HomeImg from '../../assets/navigation/home.png';
import PayImg from '../../assets/navigation/pay.png';
import TravelImg from '../../assets/navigation/travel.png';
import FeedImg from '../../assets/navigation/feed.png';
import MyPageImg from '../../assets/navigation/mypage.png';

// 색깔 변경된 이미지 import
import HomeImgActive from '../../assets/navigation/homeActive.png';
import PayImgActive from '../../assets/navigation/payActive.png';
import TravelImgActive from '../../assets/navigation/travelActive.png';
import FeedImgActive from '../../assets/navigation/feedActive.png';
import MyPageImgActive from '../../assets/navigation/mypageActive.png';

// CSS styled
const NavbarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 56px;
  background-color: #00000;
  color: white;
  text-align: center;
  z-index: 1000;
`;

const StyledP = styled.p<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? '#008DE7' : '#888888')};  /* 활성화 상태에 따라 색상 변경 */
  display : flex;
  justify-content : center;
  align-items: center;
  height : 12px;
  margin : 0;
`;

const StyledUl = styled.ul`
  list-style-type: none; /* li 태그의 점 제거 */
  padding-left : 30px;
  padding-right : 30px;
  margin: 0;
  display: flex;
  align-items : center;
  justify-content : space-between;
`;

const StyledLi = styled.li`
  margin-bottom: 10px; /* 각 리스트 항목 간의 간격 설정 */
  display : flex;
  align-items : center;
`;

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <NavbarContainer>
      <StyledUl>
        <StyledLi>
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <img src={isActive("/home") ? HomeImgActive : HomeImg} alt="home"/>
            <StyledP isActive={isActive("/home")}>홈</StyledP>
          </Link>
        </StyledLi>
        <StyledLi>
          <Link to="/pay" style={{ textDecoration: 'none' }}>
            <img src={isActive("/pay") ? PayImgActive : PayImg} alt="pay"/>
            <StyledP isActive={isActive("/pay")}>페이</StyledP>
          </Link>
        </StyledLi>
        <StyledLi>
          <Link to="/travels" style={{ textDecoration: 'none' }}>
            <img src={isActive("/travels") ? TravelImgActive : TravelImg} alt="travel"/>
            <StyledP isActive={isActive("/travels")}>여행</StyledP>
          </Link>
        </StyledLi>
        <StyledLi>
          <Link to="/feed" style={{ textDecoration: 'none' }}>
            <img src={isActive("/feed") ? FeedImgActive : FeedImg} alt="feed"/>
            <StyledP isActive={isActive("/feed")}>피드</StyledP>
          </Link>
        </StyledLi>
        <StyledLi>
          <Link to="/mypage" style={{ textDecoration: 'none' }}>
            <img src={isActive("/mypage") ? MyPageImgActive : MyPageImg} alt="mypage"/>
            <StyledP isActive={isActive("/mypage")}>마이</StyledP>
          </Link>
        </StyledLi>
      </StyledUl>
    </NavbarContainer>
  );
};

export default Navbar;