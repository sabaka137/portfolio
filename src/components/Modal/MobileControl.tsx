import React from "react";
import styled from "styled-components";
import ArrowC from "../../common/images/control/ControlArrow.png";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  align-items: flex-end;
`;
const Item = styled.div<{ isVisible: boolean }>`
  width: 100%;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
`;
const ControlContainer = styled.div`
  width: 200px;

  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const TopRow = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
`;
const BottomRow = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const Button = styled.div`
  width: 65px;
  height: 65px;
  border: 2px solid black;
  border-radius: 10px;
  z-index: 2;
  position: relative;
`;
const ActionButton = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 2;
`;
const ActionCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid black;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  &:focus {
    border: none;
  }
`;
const Arrow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 25px;
    height: 25px;
  }
`;
const ImageBlocker = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0;
  z-index: 2;
`;
type Props = {
  addControlToRef: (el: HTMLDivElement) => void;
  controlModal: boolean;
};

function MobileControl({ addControlToRef, controlModal }: Props) {
  return (
    <Wrapper>
      <Item isVisible={controlModal}>
        <ControlContainer>
          <TopRow>
            <Button ref={addControlToRef} id="w">
              <Arrow>
                <img style={{ transform: "rotate(-90deg)" }} src={ArrowC} />
              </Arrow>
              <ImageBlocker />
            </Button>
          </TopRow>
          <BottomRow>
            <Button ref={addControlToRef} id="a">
              <Arrow>
                <img src={ArrowC} style={{ transform: "rotate(180deg)" }} />
              </Arrow>
              <ImageBlocker />
            </Button>
            <Button ref={addControlToRef} id="s">
              <Arrow>
                <img src={ArrowC} style={{ transform: "rotate(90deg)" }} />
              </Arrow>{" "}
              <ImageBlocker />
            </Button>
            <Button ref={addControlToRef} id="d">
              <Arrow>
                <img src={ArrowC} />
              </Arrow>{" "}
              <ImageBlocker />
            </Button>
          </BottomRow>
        </ControlContainer>

        <ActionButton ref={addControlToRef} id="action">
          <ActionCircle />
        </ActionButton>
      </Item>
    </Wrapper>
  );
}

export default MobileControl;
