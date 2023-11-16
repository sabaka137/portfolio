import React from "react";
import styled from "styled-components";
import LoaderGif from "../common/images/preloaderGIf.gif";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: white;
`;
const Item = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
 
`;
const Title = styled.div`
    font-weight:bold;
    font-size:15px;
`;
const Text = styled.div`

font-size:14px;
color:#B4B4B3;
font-weight:500;
`;
type Props = {};

function PreloaderScreen({}: Props) {
  return (
    <Wrapper>
      <Item>
        <img src={LoaderGif} />
        <Title>Just a few moments</Title>
        <Text>Don't go anywhere....</Text>
      </Item>
    </Wrapper>
  );
}

export default PreloaderScreen;
