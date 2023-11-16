import React from "react";
import styled from "styled-components";
import Working from "../../common/images/Working.png";
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
  width: 340px;
  background: rgba(0, 0, 0, 0.7);
  background-size: contain;
  border-radius: 10px;
  margin-top: 50px;
  color:white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-family: Pixel;
  font-size: 22px;
  text-align: center;
  box-sizing: border-box;
  padding: 20px 25px;

`;
const ImgContainer = styled.div`
  width: auto;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Title = styled.div``;
const Description = styled.div`
  font-size: 15px;
  margin: 15px 0px 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const Button = styled.button<{ isActive: boolean }>`
  outline: none;
  border: none;
  background: ${(props) => (props.isActive ? "#f15e5e" : "#c1c1c1")};
  color: white;
  font-family: Pixel;
  padding: 10px 20px;
  cursor: pointer;
`;
type Props = {
    setWorkingModal: React.Dispatch<React.SetStateAction<boolean>>
    setControlModal: React.Dispatch<React.SetStateAction<boolean>>
};

function ProjectInDevelopment({setWorkingModal,setControlModal}: Props) {
    function handleCancel(){
        setWorkingModal(false)
        setControlModal(true)
      }
  return (
    <Wrapper onClick={(e) => handleCancel()}>
      <Item onClick={(e) => e.stopPropagation()}>
        <ImgContainer>
          <img src={Working} alt="in-development" />
        </ImgContainer>
        <Title>Проект в разработке</Title>
        <Description>
         В данный момент проект находится в разработке
        </Description>
        <ButtonContainer>
          <Button isActive={true} onClick={(e) => handleCancel()}>Отлично, удачи</Button>
        </ButtonContainer>
      </Item>
    </Wrapper>
  );
}

export default ProjectInDevelopment;
