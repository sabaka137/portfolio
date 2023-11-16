import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import RightPaperImage from "../../common/images/RightPaper.png";
import LeftPaperImage from "../../common/images/LeftPaper.png";
import EmptyPaper from "../../common/images/EmptyPaper.png";
import { Logos } from "../../common/images/Logo";
import LeftBracket from "../../common/images/BracketsLeft.png";
import RightBracket from "../../common/images/BracketsRight.png";
import Avatar from "../../common/images/Photo.png";
import Banner from "../../common/images/Banner.png";
import Telegram from "../../common/images/Logo/TG.png";
import Gmail from "../../common/images/Logo/Gmail.png";
import Git from "../../common/images/Logo/Github.png";
import StackIcon from "../../common/images/StackIcon.jpg";
import Portal from "../../common/images/Portal.gif";
import PrevButton from "../../common/images/PrevPage.png";
import NextPage from "../../common/images/NextPage.png";
import { copyContent } from "../../utils/CopyToClipboard";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 30px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1130px) {
    width: 100%;
  }
  @media (max-width: 680px) {
    top: 0;
  }
`;
const Item = styled.div`
  width: 1110px;
  height: 690px;
  display: flex;
  box-sizing: border-box;
  @media (max-width: 1130px) {
    box-sizing: border-box;
    padding: 0px 15px;
    width: 100%;
  }
  @media (max-width: 910px) {
    max-width: 589px;
    height: auto;
  }
`;
const PageButtonContainer = styled.div`
  position: absolute;
  z-index: 3;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  display: none;
  @media (max-width: 910px) {
    display: block;
  }
`;
const PageButton = styled.div`
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const CloseButton = styled.div`
  position: absolute;
  z-index: 3;
  right: 15px;
  top: 10px;
  font-size: 25px;
  cursor: pointer;
  font-family: Pixel;
  display: none;
  @media (max-width: 910px) {
    display: flex;
  }
`;
const LeftPaper = styled.div<{ pageFit: number; currentPage: number }>`
  width: 555px;
  height: 690px;
  position: relative;
  margin-left: -1px;
  display: ${(props) =>
    props.pageFit === 1 ? (props.currentPage === 2 ? "block" : "none") : "block"};

  background-size: contain;
  background-repeat: no-repeat;
  box-sizing: border-box;
  padding: 30px 50px;
  @media (max-width: 1130px) {
    width: 100%;
    height: 100%;
    padding: 20px 30px;
  }
  @media (max-width: 910px) {
    width: 589px;
  }
  @media (max-width: 570px) {
    width: 100%;
    height: 90%;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 80%;
  }
  @media (max-width: 380px) {
    padding: 0px;
  }
`;
const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const PaperContent = styled.div`
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  padding-bottom: 80px;
`;
const RightPaper = styled.div<{ pageFit: number; currentPage: number }>`
  width: 555px;
  position: relative;
  display: ${(props) =>
    props.pageFit === 1 ? (props.currentPage === 1 ? "block" : "none") : "block"};

  height: 690px;
  box-sizing: border-box;
  padding: 50px;

  @media (max-width: 1130px) {
    width: 100%;
    height: 100%;
    padding: 20px 30px;
  }
  @media (max-width: 910px) {
    width: 589px;
  }
  @media (max-width: 570px) {
    width: 100%;
    height: 90%;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 80%;
  }
  @media (max-width: 380px) {
    padding: 0px;
  }
`;
const Chapter = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  img {
    width: 100px;
    height: 4px;
  }
  @media (max-width: 570px) {
    img {
      width: 100px;
      height: 4px;
    }
  }
  @media (max-width: 500px) {
    img {
      width: 80px;
      height: 4px;
    }
  }
  @media (max-width: 450px) {
    img {
      width: 60px;
      height: 4px;
    }
  }
`;
const ChapterText = styled.div`
  font-family: Pixel;
  font-size: 25px;
  @media (max-width: 1030px) {
    font-size: 18px;
  }
  @media (max-width: 910px) {
    font-size: 25px;
  }
  @media (max-width: 570px) {
    font-size: 20px;
  }
  @media (max-width: 450px) {
    font-size: 15px;
  }
`;
const Nickname = styled.div`
  font-family: Pixel2;
  font-size: 25px;
  text-align: center;
  margin: 25px 0px 15px 0px;
  @media (max-width: 1030px) {
    font-size: 20px;
  }
  @media (max-width: 910px) {
    font-size: 25px;
  }
  @media (max-width: 570px) {
    font-size: 20px;
  }
  @media (max-width: 430px) {
    margin: 5px 0px 15px 0px;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 1030px) {
    img {
      width: 140px;
      height: 140px;
    }
  }
  @media (max-width: 910px) {
    img {
      width: auto;
      height: auto;
    }
  }
  @media (max-width: 570px) {
    img {
      width: 160px;
      height: 160px;
    }
  }

  @media (max-width: 430px) {
    img {
      width: 140px;
      height: 140px;
    }
  }
`;

const BannerItem = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  @media (max-width: 1030px) {
    img {
      width: 250px;
    }
  }
  @media (max-width: 910px) {
    img {
      width: auto;
      height: auto;
    }
  }
  @media (max-width: 570px) {
    img {
      width: 250px;
    }
  }
  @media (max-width: 430px) {
    img {
      width: 240px;
    }
  }
`;

const Social = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 55px;
  margin-top: 30px;
  @media (max-width: 910px) {
    margin-left: 75px;
  }
  @media (max-width: 910px) {
    margin-left: 55px;
  }
  @media (max-width: 490px) {
    margin-top: 10px;
  }
  @media (max-width: 430px) {
    margin-left: 25px;
  }
`;

const SocialItem = styled.div<{ isCopied?: boolean }>`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-family: Pixel;
  position: relative;
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
    left: 25px;
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 1030px) {
    img {
      width: 30px;
      height: 30px;
    }
  }
  @media (max-width: 1030px) {
    img {
      width: auto;
    }
  }
  @media (max-width: 570px) {
    img {
      width: 35px;
      height: 35px;
    }
    font-size: 15px;
  }
  @media (max-width: 490px) {
    img {
      width: 30px;
      height: 30px;
    }
    font-size: 13px;
  }
  @media (max-width: 430px) {
    img {
      width: 30px;
    }
    font-size: 12px;
  }
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: Rubik Vinyl;
  color: #030f24;
  font-size: 45px;
  @media (max-width: 1030px) {
    font-size: 35px;
  }
  @media (max-width: 910px) {
    font-size: 45px;
  }
  @media (max-width: 570px) {
    font-size: 30px;
  }
`;

const Description = styled.div`
  font-family: Pixel;
  font-size: 17px;
  margin: 10px 0px 10px 0px;
  text-align: center;

  @media (max-width: 910px) {
    font-size: 17px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    margin-top: 10px;
  }
  @media (max-width: 400px) {
    font-size: 13px;
  }
`;

const StackContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin: 20px;
  justify-content: center;
  @media (max-width: 1130px) {
    margin: 10px;
  }
  @media (max-width: 910px) {
    margin: 20px;
  }
  @media (max-width: 570px) {
    margin: 10px;
  }
`;

const StackItem = styled.div`
  width: 50px;
  height: 50px;
  background: url(${StackIcon});
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: auto;
    height: 65%;
  }

  @media (max-width: 910px) {
    width: 50px;
    height: 50px;
  }
  @media (max-width: 570px) {
    width: 50px;
    height: 50px;
  }
  @media (max-width: 500px) {
    width: 40px;
    height: 40px;
  }
  @media (max-width: 400px) {
    width: 35px;
    height: 35px;
  }
`;
const PortalContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  img {
    width: 120px;
    height: 140px;
    cursor: pointer;
  }
  @media (max-width: 1130px) {
    img {
      width: 90px;
      height: 110px;
    }
  }

  @media (max-width: 910px) {
    img {
      width: 120px;
      height: 140px;
    }
  }
  @media (max-width: 570px) {
    img {
      width: 80px;
      height: 100px;
    }
    margin-top: 0px;
  }
  @media (max-width: 450px) {
    img {
      width: 70px;
      height: 90px;
    }
  }
`;

type Props = {
  setPortfolioModal: Dispatch<SetStateAction<boolean>>;
  setControlModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Portfolio({ setPortfolioModal, setControlModal }: Props) {
  const [pageFit, setPageFit] = useState<1 | 2>(window.innerWidth < 910 ? 1 : 2);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCopied, setCopied] = useState(false);
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
  function handleClick() {
    setPortfolioModal(false);
    setControlModal(true);
  }
  function onCopy() {
    setCopied(true);
  }
  return (
    <Wrapper onClick={() => handleClick()}>
      <Item onClick={(e) => e.stopPropagation()}>
        <RightPaper pageFit={pageFit} currentPage={currentPage}>
          <CloseButton onClick={() => handleClick()}>
            <div>X</div>
          </CloseButton>
          <BackgroundImg src={pageFit === 1 ? EmptyPaper : RightPaperImage} />

          <PaperContent>
            <Chapter>
              <img src={LeftBracket} />
              <ChapterText>AUTHOR</ChapterText>
              <img src={RightBracket} />
            </Chapter>
            <Nickname>Sabaka137</Nickname>
            <AvatarContainer>
              <img src={Avatar} />
            </AvatarContainer>
            <BannerItem>
              <img src={Banner} />
            </BannerItem>
            <Social>
              <SocialItem onClick={() => window.open("https://t.me/sabaka137", "_bland")!.focus()}>
                <img src={Telegram} />
                <div>https://t.me/sabaka137</div>
              </SocialItem>
              <CopyToClipboard onCopy={onCopy} text="staspopov.work@gmail.com">
                <SocialItem
                  isCopied={isCopied}
                  onClick={() => copyContent("staspopov.work@gmail.com")}
                >
                  <img src={Gmail} />
                  <div>staspopov.work@gmail.com</div>
                </SocialItem>
              </CopyToClipboard>
              <SocialItem
                onClick={() => window.open("https://github.com/sabaka137", "_bland")!.focus()}
              >
                <img src={Git} />
                <div>https://github.com/sabaka137</div>
              </SocialItem>
            </Social>
          </PaperContent>
          <PageButtonContainer>
            <PageButton onClick={() => setCurrentPage(2)}>
              <img src={NextPage} />
            </PageButton>
          </PageButtonContainer>
        </RightPaper>
        <LeftPaper pageFit={pageFit} currentPage={currentPage}>
          <CloseButton onClick={() => handleClick()}>X</CloseButton>
          <BackgroundImg src={pageFit === 1 ? EmptyPaper : LeftPaperImage} />

          <PaperContent>
            <Title>О проекте</Title>
            <Description>
              Проект для изучения японского языка как в одиночку, так и с репетиторами. В нем я
              реализовал возможность общаться в одном чате с преподавателем, а также использовать
              камеру для поддержания контакта с преподавателями. С другими функциями вы можете
              ознакомиться самостоятельно.
            </Description>
            <Chapter>
              <img src={LeftBracket} />
              <ChapterText>Технологии</ChapterText>
              <img src={RightBracket} />
            </Chapter>
            <StackContainer>
              <StackItem>
                <img src={Logos.htmlLogo} />
              </StackItem>
              <StackItem>
                <img src={Logos.cssLogo} />
              </StackItem>
              <StackItem>
                <img src={Logos.styled} />
              </StackItem>
              <StackItem>
                <img src={Logos.typescriptLogo} />
              </StackItem>
              <StackItem>
                <img src={Logos.reactLogo} />
              </StackItem>
              <StackItem>
                <img src={Logos.reduxLogo} />
              </StackItem>
              <StackItem>
                <img src={Logos.mongoDBLogo} />
              </StackItem>
              <StackItem>
                <img src={Logos.expressLogo} />
              </StackItem>
              <StackItem>
                <img src={Logos.socketIoLogo} />
              </StackItem>
            </StackContainer>
            <Chapter>
              <img src={LeftBracket} />
              <ChapterText>Исследовать</ChapterText>
              <img src={RightBracket} />
            </Chapter>
            <PortalContainer>
              <a href="https://github.com/sabaka137/Japl" target="_blank">
                <img src={Portal} />
              </a>
            </PortalContainer>
          </PaperContent>
          <PageButtonContainer>
            {" "}
            <PageButton onClick={() => setCurrentPage(1)}>
              <img src={PrevButton} />
            </PageButton>
          </PageButtonContainer>
        </LeftPaper>
      </Item>
    </Wrapper>
  );
}

export default Portfolio;
