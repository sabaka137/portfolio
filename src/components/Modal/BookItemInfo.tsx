import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ position: { x: number; y: number } }>`
  width: 250px;
  max-height: 300px;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  border: 1.8px solid white;
  top: -${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
  z-index: 3;
  box-sizing: border-box;
  padding: 10px 20px 25px;
  font-family: Pixel;
`;
const ItemGeneral = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  align-items: center;
  color: white;
`;
const ImgContainer = styled.div`
  min-width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  border: 2px solid rgba(255,255,255,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: auto;
    height: 80%;
  }
`;
const StatsContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const StatsItem = styled.div`
  display: flex;
  gap: 10px;
`;
const StatsName = styled.div`
  color: white;
`;
const StatsCount = styled.div`
  color: yellow;
`;

type Props = {
  item: any;
  itemRef: HTMLDivElement;
};

function BookItemInfo({ item, itemRef }: Props) {
  const [position, setPosition] = useState({ x: itemRef.getBoundingClientRect().width + 20, y: 0 });
  const [calculatedEnd, setCalculatedEnd] = useState(false);

  useEffect(() => {
    let left = itemRef.getBoundingClientRect().left;
    let top = itemRef.getBoundingClientRect().top;

    let width = window.innerWidth;
    let height = window.innerHeight;

    //Let's assume that the modal max-height is 300px
    if (top + 300 > height) {
      //add an extra 20 pixels to prevent the modal from sticking to the corner
      setPosition((prev) => ({ x: prev.x, y: top + 320 - height }));
    }

    //Let's assume that the modal width is 250px
    if (left + 250 + itemRef.getBoundingClientRect().width + 20 > width) {
      //add an extra 20 pixels to prevent the modal from sticking to the corner
      setPosition((prev) => ({ x: -(250 + (left - width) + 20), y: prev.y }));
    }
    setCalculatedEnd(true);
  }, [window.innerWidth, window.innerHeight]);

  return (
    <>
      {calculatedEnd && (
        <Wrapper position={position}>
          <ItemGeneral>
            <ImgContainer>
              <img src={item.logo} alt="logo" />
            </ImgContainer>
            <div>
              <div>{item.name}</div>
              <div>{item.type}</div>
            </div>
          </ItemGeneral>
          <StatsContainer>
            <StatsItem>
              <StatsName>Создан:</StatsName>
              <StatsCount>{item.stats.developed}</StatsCount>
            </StatsItem>
            <StatsItem>
              <StatsName>Вес :</StatsName>
              <StatsCount>{item.stats.size}</StatsCount>
            </StatsItem>
            <StatsItem>
              <StatsName>Владение :</StatsName>
              <StatsCount>{item.stats.skill}</StatsCount>
            </StatsItem>
            <StatsItem>
              <StatsName>Урон :</StatsName>
              <StatsCount>{item.stats.damage}</StatsCount>
            </StatsItem>
            <StatsItem>
              <StatsName>Защита :</StatsName>
              <StatsCount>{item.stats.defense}</StatsCount>
            </StatsItem>
            <StatsItem>
              <StatsName>Удача :</StatsName>
              <StatsCount>{item.stats.luck}</StatsCount>
            </StatsItem>
            <StatsItem>
              <StatsName>Маг.Урон :</StatsName>
              <StatsCount>{item.stats.magic_damage}</StatsCount>
            </StatsItem>
          </StatsContainer>
        </Wrapper>
      )}
    </>
  );
}

export default BookItemInfo;
