import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  top: 0;
  left: 0;
  position: absolute;
  align-items: flex-end;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const DialogContainer = styled.div``;
const DialogBox = styled.div`
  width: 1000px;
  min-height: 100px;
  border: 4px solid #d7e0db;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  box-sizing: border-box;
  padding: 20px;
  font-family: Pixel;
  font-size: 19px;
  overflow-y: auto;
  @media (max-width: 1050px) {
    width: 700px;
    max-height: 200px;
  }
  @media (max-width: 730px) {
    width: 100%;
    max-height: 200px;
    padding: 12px;
  }
`;

const DialogText = styled.div`
  color: white;
  font-family: Pixel;
  font-size: 19px;
  @media (max-width: 730px) {
    font-size: 15px;
  }
`;
const DialogBoxName = styled.div`
  min-width: 120px;
  max-width: 180px;

  height: 50px;
  border: 4px solid #d7e0db;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Pixel;
  font-size: 20px;
  margin-bottom: 5px;
`;

type Props = {
  setDialogModal: React.Dispatch<
    React.SetStateAction<{
      speakerName: string;
      text: string;
    } | null>
  >;
  dialog: {
    speakerName: string;
    text: string;
  };
  setControlModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function DialogueModal({ setDialogModal, dialog, setControlModal }: Props) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 15;
  useEffect(() => {
    if (currentIndex < dialog.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + dialog.text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, dialog.text]);
  useEffect(() => {
    function Event(e: any) {
      if (e.code === "Space") {
        setCurrentIndex(dialog.text.length);
        setCurrentText(dialog.text);
      }
    }
    window.addEventListener("keypress", (e) => Event(e));
    return () => window.removeEventListener("keypress", Event);
  }, [currentIndex]);
  function wrapperClick(e: any) {
    e.preventDefault();
    setControlModal(true);
    setDialogModal(null);
  }
  return (
    <Wrapper onClick={(e) => wrapperClick(e)}>
      <Container onClick={(e) => wrapperClick(e)}>
        <DialogContainer>
          <DialogBoxName
            onClick={(e) => (
              e.stopPropagation(), setCurrentIndex(dialog.text.length), setCurrentText(dialog.text)
            )}
          >
            {dialog.speakerName}
          </DialogBoxName>
          <DialogBox
            onClick={(e) => (
              e.stopPropagation(), setCurrentIndex(dialog.text.length), setCurrentText(dialog.text)
            )}
          >
            <DialogText>{currentText}</DialogText>
          </DialogBox>
        </DialogContainer>
      </Container>
    </Wrapper>
  );
}

export default DialogueModal;
