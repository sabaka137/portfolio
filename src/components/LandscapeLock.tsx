import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Wrapper = styled.div<{isVisible:boolean}>`
  width: 100%;
  height: 100%;
  position: absolute;
  background: black;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: ${props => props.isVisible ?'flex' : 'none'};
  z-index: 999;
  align-items: center;
  justify-content: center;
`;
const Item = styled.div`
color:white;
font-size:25px;
font-family:Pixel;
`;
type Props = {};

function LandscapeLock({}: Props) {
  const [orientation, setOrientation] = useState<"landscape" | "other">("other");
  useEffect(() => {
    window.addEventListener("orientationchange", () => {
      
      if (window.screen.orientation.type === "landscape-primary" ) {
        setOrientation("landscape");
      }
      else if (window.screen.orientation.type === "landscape-secondary" ) {
        setOrientation("landscape");

      } else  {
        setOrientation("other");
      }
    });
  }, []);
  
  return (
    <Wrapper isVisible={orientation === 'landscape'}>
      <Item>Пожалуйста поверните телефон</Item>
    </Wrapper>
  );
}

export default LandscapeLock;
