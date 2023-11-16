import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
const Wrapper = styled.div<{isOpen:boolean}>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 10px;
  left: ${props=>props.isOpen ? '0px':'-20px'};
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  @media (max-width: 780px) {
    justify-content: flex-end;
    top: ${props=>props.isOpen ? '0px':'10px'};
  }
`;
const Item = styled.div`
  width: 890px;
  height: 60px;
  background: #3b201a;
  border: 3px solid white;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 780px) {
    display: none;
  }
  div {
    font-family: Pixel;
    cursor: pointer;
    color: white;
    font-height: 20px;
    @media (max-width: 780px) {
      font-size: 13px;
    }
  }
`;
const MobileItem = styled.div<{ isVisible: boolean }>`
  width: 50px;
  height: 50px;
  border: 2px solid #212122;
  border-radius: 10px;
  display: none;


  @media (max-width: 780px) {
    display: ${(props) => (props.isVisible ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    flex-direction:column;
    gap:5px;
    span{
      min-width:60%;
      min-height:3px;
      background:#212122;
    };
  }
`;
const MobileItemContent = styled.div<{ isVisible: boolean }>`
  width: 220px;
  height:210px;
  background:rgba(0,0,0,.5);
  border-radius: 0px 0px 10px 10px;
  display: none;
  box-sizing:border-box;
  padding:15px;
  position:relative;
  @media (max-width: 780px) {
    display: ${(props) => (props.isVisible ? "flex" : "none")};
    flex-direction:column;
    align-items:center;
    gap:15px;
  }
  div {
  
    font-family: Pixel;
    cursor: pointer;
    color: white;
    font-height: 20px;
    
`;
const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 20px;
`;
type Props = {
  setAboutModal: Dispatch<SetStateAction<boolean>>;
  addNavToRef: (el: HTMLDivElement) => void;
  setControlModal:React.Dispatch<React.SetStateAction<boolean>>
};

function NavBar({ setAboutModal, addNavToRef,setControlModal }: Props) {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  return (
    <Wrapper isOpen={isNavBarOpen}>
      <Item>
        <div ref={addNavToRef} id="main">
          Центр
        </div>
        <div ref={addNavToRef} id="portfolio">
          Портфолио
        </div>
        <div ref={addNavToRef} id="cemetery">
          Кладбище
        </div>
        <div ref={addNavToRef} id="history">
          Остров Истории
        </div>
        <div onClick={() => setAboutModal(true)} id="personal">
          Обо мне / контакты
        </div>
      </Item>
      <MobileItem isVisible={!isNavBarOpen} onClick={() => setIsNavBarOpen(true)}>
       <span></span>
       <span></span>
       <span></span>
      </MobileItem>

      <MobileItemContent isVisible={isNavBarOpen}>
        <div onClick={() => setIsNavBarOpen(false)} ref={addNavToRef} id="main">
          Центр
        </div>
        <div onClick={() => setIsNavBarOpen(false)} ref={addNavToRef} id="portfolio">
          Портфолио
        </div>
        <div onClick={() => setIsNavBarOpen(false)} ref={addNavToRef} id="cemetery">
          Кладбище
        </div>
        <div onClick={() => setIsNavBarOpen(false)} ref={addNavToRef} id="history">
          Остров Истории
        </div>
        <div  onClick={() => (setAboutModal(true),setControlModal(false),setIsNavBarOpen(false))} id="personal">
          Обо мне / контакты
        </div>
        <CloseButton onClick={() => setIsNavBarOpen(false)}>X</CloseButton>
      </MobileItemContent>
    </Wrapper>
  );
}

export default NavBar;
