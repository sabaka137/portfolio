import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Paper from "../../common/images/textPaper.png";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Item = styled.div`
  width: 350px;
  height: 430px;
  background: url(${Paper});
  background-size: contain;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Pixel;
  font-size: 22px;
  text-align: center;
  box-sizing: border-box;
  padding: 0px 25px;
`;
type Props = {
  setTextModal: Dispatch<SetStateAction<string | null>>;
  text: string;
  setControlModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function TextModal({ text, setTextModal, setControlModal }: Props) {
  function handleClick() {
    setTextModal(null);
    setControlModal(true);
  }
  return (
    <Wrapper onClick={() => handleClick()}>
      <Item>{text}</Item>
    </Wrapper>
  );
}

export default TextModal;
