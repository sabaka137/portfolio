import React, { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import BookRight from "../../common/images/BookRight.png";
import BookLeft from "../../common/images/BookLeft.png";
import UserAvatar from "../../common/images/Photo.png";
import StatsBar from "../../common/images/StatsBar.png";
import BookItemBg from "../../common/images/BookItem.png";
import NextPage from "../../common/images/NextPage.png";
import Telegram from "../../common/images/Logo/TG.png";
import Gmail from "../../common/images/Logo/Gmail.png";
import LinkedIn from "../../common/images/Logo/Linked.png";
import Github from "../../common/images/Logo/Github.png";
import BookItemInfo from "./BookItemInfo";
import { PERSONAL_STACK } from "../../constant/data";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
  padding: 0px 20px;
`;
const Item = styled.div`
  width: 1110px;
  height: 690px;
  display: flex;

  @media (max-width: 1130px) {
    width: 100%;
  }
  @media (max-width: 910px) {
    max-width: 589px;
    height: auto;
  }
`;
const RightSide = styled.div<{ pageFit: number; currentPage: number }>`
  width: 595px;
  height: 740px;
  position: relative;
  display: ${(props) =>
    props.pageFit === 1 ? (props.currentPage === 1 ? "block" : "none") : "block"};
  box-sizing: border-box;
  padding: 30px 30px 30px 110px;

  @media (max-width: 910px) {
    width: 589px;
  }
  @media (max-width: 570px) {
    width: 100%;
    height: 520px;
    padding: 30px 25px 30px 85px;
  }
  @media (max-width: 470px) {
    height: 520px;
    padding: 30px 25px 30px 70px;
  }
  @media (max-width: 370px) {
    height: 440px;
    padding: 30px 25px 30px 55px;
  }
`;
const LeftSide = styled.div<{ pageFit: number; currentPage: number }>`
  width: 595px;
  height: 740px;
  position: relative;
  display: ${(props) =>
    props.pageFit === 1 ? (props.currentPage === 2 ? "block" : "none") : "block"};
  box-sizing: border-box;
  padding: 30px 100px 30px 30px;
  @media (max-width: 910px) {
    width: 589px;
  }
  @media (max-width: 570px) {
    width: 100%;
    height: 520px;
    padding: 30px 65px 30px 30px;
  }
  @media (max-width: 470px) {
    height: 520px;
  }
  @media (max-width: 370px) {
    height: 440px;
    padding: 30px 45px 30px 30px;
  }
`;
const PaperContent = styled.div`
  position: relative;
  z-index: 2;
`;
const Name = styled.div`
  font-family: Pixel;
  font-size: 38px;
  @media (max-width: 570px) {
    font-size: 25px;
  }
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;
const Avatar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 570px) {
    width: 40%;
  }
`;
const StatsContainer = styled.div`
  width: 60%;
`;
const StatsItem = styled.div`
  min-width: 100%;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-family: Pixel;
  font-size: 14px;
  box-sizing: border-box;
  padding: 0px 10px;
  background: url(${StatsBar});
  background-size: 100% 100%;
  margin-bottom: 7px;
  @media (max-width: 570px) {
    min-height: 30px;
    font-size: 12px;
  }
  @media (max-width: 470px) {
    min-height: 25px;
    font-size: 11px;
  }
  @media (max-width: 370px) {
    min-height: 25px;
    font-size: 11px;
  }
`;

const InventoryContainer = styled.div`
  display: flex;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 10px;
`;
const BookItem = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  background: url(${BookItemBg});
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: auto;
    height: 70%;
  }
  @media (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
  @media (max-width: 570px) {
    width: 45px;
    height: 45px;
  }
  @media (max-width: 470px) {
    width: 40px;
    height: 40px;
  }
  @media (max-width: 370px) {
    width: 30px;
    height: 30px;
  }
`;
const SocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  @media (max-width: 600px) {
    flex-wrap: nowrap;
  }
`;
const SocialItem = styled.div<{ isCopied?: boolean }>`
  width: 60px;
  height: 60px;
  position: relative;
  background: url(${BookItemBg});
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:before {
    content: "Copied";
    display: ${(props) => (props.isCopied ? "flex" : "none")};
    transition: 0.3s linear all;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -45px;
    padding: 8px 10px;
    font-size: 12px;
    border-radius: 2px;
    background: #253640;
    border: 1px solid #253640;
    box-shadow: 0 2px 2px 0 rgba(36, 54, 65, 0.1), 0 0 2px 0 rgba(36, 54, 65, 0.1);
    color: white;
  }
  &:after {
    content: "";
    display: ${(props) => (props.isCopied ? "block" : "none")};
    transition: 0.3s linear all;
    position: absolute;
    background: #253640;
    top: -18px;
    left: 20px;
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
  }

  img {
    width: auto;
    height: 70%;
  }
  @media (max-width: 570px) {
    width: 55px;
    height: 55px;
  }
  @media (max-width: 470px) {
    width: 45px;
    height: 45px;
  }
  @media (max-width: 410px) {
    width: 35px;
    height: 35px;
  }
  @media (max-width: 350px) {
    width: 28px;
    height: 28px;
  }
`;
const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const PageButtonContainer = styled.div<{ isNext: boolean }>`
  position: absolute;
  z-index: 3;
  right: ${(props) => (props.isNext ? "35px" : "45px")};
  bottom: 35px;
  cursor: pointer;
  display: none;
  @media (max-width: 910px) {
    display: block;
  }
`;
const PageButton = styled.div<{ isNext: boolean }>`
  width: 40px;
  height: 40px;
  img {
    transform: ${(props) => (props.isNext ? "rotate(0deg) " : "rotate(180deg) ")};
    width: 100%;
    height: 100%;
  }
`;
type Props = {
  setAboutModal: Dispatch<SetStateAction<boolean>>;
  setControlModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function AboutMeModal({ setAboutModal, setControlModal }: Props) {
  const [pageFit, setPageFit] = useState<1 | 2>(window.innerWidth < 910 ? 1 : 2);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCopied, setCopied] = useState(false);
  const [personalStack, setPersonalStack] = useState(PERSONAL_STACK);
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [isCopied]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 910) {
        setPageFit(1);
      } else {
        setPageFit(2);
      }
    });
  }, []);

  const ItemsRef = useRef<HTMLDivElement[]>([]);
  const addItemToRef = (el: HTMLDivElement) => {
    if (el && !ItemsRef.current.includes(el)) {
      ItemsRef.current.push(el);
    }
  };

  function handleClick() {
    setAboutModal(false);
    setControlModal(true);
  }
  function MouseEnter(id: number) {
    setPersonalStack(
      personalStack.map((el) => (el.id === id ? { ...el, active: true } : { ...el, active: false }))
    );
  }
  function MouseLeave() {
    setPersonalStack(personalStack.map((el) => ({ ...el, active: false })));
  }
  function onCopy() {
    setCopied(true);
  }
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Wrapper onClick={() => handleClick()}>
      <Item onClick={(e) => e.stopPropagation()}>
        <RightSide pageFit={pageFit} currentPage={currentPage}>
          <BackgroundImg src={BookLeft} />
          <PaperContent>
            <Name>СТАС</Name>
            <FlexContainer>
              <Avatar>
                <img src={UserAvatar} />
              </Avatar>
              <StatsContainer>
                <StatsItem>
                  <div>Уровень</div>
                  <div>21</div>
                </StatsItem>
                <StatsItem>
                  <div>Вес</div>
                  <div>75</div>
                </StatsItem>
                <StatsItem>
                  <div>Рост</div>
                  <div>195</div>
                </StatsItem>
                <StatsItem>
                  <div>Раса</div>
                  <div>Человек</div>
                </StatsItem>
                <StatsItem>
                  <div>Пол</div>
                  <div>Мужской</div>
                </StatsItem>
              </StatsContainer>
            </FlexContainer>
            <InventoryContainer>
              {personalStack.map((el, index) => (
                <BookItem
                  ref={addItemToRef}
                  onMouseEnter={() => MouseEnter(el.id)}
                  onMouseLeave={() => MouseLeave()}
                >
                  <img src={el.logo} />
                  {el.active && <BookItemInfo itemRef={ItemsRef.current[index]} item={el} />}
                </BookItem>
              ))}
              <BookItem></BookItem>
              <BookItem></BookItem>
              <BookItem></BookItem>
              <BookItem></BookItem>
              <BookItem></BookItem>
            </InventoryContainer>
          </PaperContent>
          <PageButtonContainer isNext={true}>
            <PageButton isNext={true} onClick={() => setCurrentPage(2)}>
              <img src={NextPage} />
            </PageButton>
          </PageButtonContainer>
        </RightSide>
        <LeftSide pageFit={pageFit} currentPage={currentPage}>
          <BackgroundImg src={BookRight} />
          <PaperContent>
            <StatsItem>
              <div>Выносливость</div>
              <div>7</div>
            </StatsItem>
            <StatsItem>
              <div>Харизма</div>
              <div>7</div>
            </StatsItem>
            <StatsItem>
              <div>Удача</div>
              <div>4</div>
            </StatsItem>
            <StatsItem>
              <div>Красноречие</div>
              <div>6</div>
            </StatsItem>
            <StatsItem>
              <div>Сила</div>
              <div>5</div>
            </StatsItem>
            <SocialContainer>
              <SocialItem onClick={() => window.open("https://t.me/sabaka137", "_bland")!.focus()}>
                <img src={Telegram} />
              </SocialItem>

              <SocialItem
                onClick={() =>
                  window.open("https://www.linkedin.com/in/stanislav-popov/", "_bland")!.focus()
                }
              >
                <img src={LinkedIn} />
              </SocialItem>
              <CopyToClipboard onCopy={onCopy} text="staspopov.work@gmail.com">
                <SocialItem isCopied={isCopied}>
                  <img src={Gmail} />
                </SocialItem>
              </CopyToClipboard>
              <SocialItem
                onClick={() => window.open("https://github.com/sabaka137", "_bland")!.focus()}
              >
                <img src={Github} />
              </SocialItem>
            </SocialContainer>
          </PaperContent>
          <PageButtonContainer isNext={false}>
            <PageButton isNext={false} onClick={() => setCurrentPage(1)}>
              <img src={NextPage} />
            </PageButton>
          </PageButtonContainer>
        </LeftSide>
      </Item>
    </Wrapper>
  );
}

export default AboutMeModal;
