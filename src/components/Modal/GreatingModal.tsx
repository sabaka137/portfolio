import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Paper from "../../common/images/WelcomePaper.jpg";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;

  justify-content: center;
`;
const Item = styled.div`
  width: 659px;
  height: 793px;

  display: flex;
  box-sizing: border-box;
  font-family: Pixel;
  font-size: 22px;
  padding: 50px;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 570px) {
    width: 100%;
    height: auto;
    padding: 10px;
  }
`;
type Props = {
  setGreatingsModal: Dispatch<SetStateAction<boolean>>;
  setControlModal: React.Dispatch<React.SetStateAction<boolean>>
};

function GreatingModal({ setGreatingsModal, setControlModal }: Props) {
  function handleClick() {
  
    setControlModal(true)
    setGreatingsModal(false);
  }
  return (
    <Wrapper onClick={() => handleClick()}>
      <Item>
        <img src={Paper} />
      </Item>
    </Wrapper>
  );
}

export default GreatingModal;
