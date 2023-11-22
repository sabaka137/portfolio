import React from "react";
import styled from "styled-components";
import WarningSign from '../../common/images/WarningSign.png'
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  z-index:3;
  align-items: center;
  justify-content: center;
`;
const Item = styled.div`
  width: 340px;
  background: #F5F7F8;
  background-size: contain;
  border-radius:10px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction:column;
  justify-content: center;
  font-family: Pixel;
  font-size: 22px;
  text-align: center;
  box-sizing: border-box;
  padding: 20px 25px;
  border:1px solid grey;
`;
const ImgContainer = styled.div`
  width:80px;
  height:80px;
img{
  width: 100%;
  height: 100%;
}
`;
const Title = styled.div`

`;
const Description = styled.div` 
font-size:15px;
margin:15px 0px 15px;
`;

const ButtonContainer = styled.div` 
display:flex;
gap:10px;
`;
const Button = styled.button<{isActive:boolean}>` 
outline:none;
border:none;
background:${props=>props.isActive?'#f15e5e' :'#c1c1c1'};
color:white;
font-family:Pixel;
padding:10px 20px;
cursor:pointer;

`;
type Props = {
  setWarningModal: React.Dispatch<React.SetStateAction<string | null>>
  link:string
};

function WarningModal({setWarningModal,link}: Props) {
  function handleAprove(){
    window.open(link, "_blank")!.focus();
    setWarningModal(null)
  }
  function handleCancel(){
    setWarningModal(null)
  }
  return (
    <Wrapper onClick={(e) => handleCancel()}>
      <Item onClick={(e) => e.stopPropagation()}>
        <ImgContainer><img src={WarningSign} alt="warning"/></ImgContainer>
        <Title>Острожно!!</Title>
        <Description>Это мои первые проекты, в которых отсутствует адаптив. Переходите на свой страх и риск. Мои текущие проекты можно посмотреть на острове "Портфолио".</Description>
        <ButtonContainer>
          <Button isActive={true} onClick={()=>handleAprove()}>Перейти</Button>
          <Button isActive={false} onClick={()=>handleCancel()}>Отмена</Button>
        </ButtonContainer>
      </Item>
    </Wrapper>
  );
}

export default WarningModal;
