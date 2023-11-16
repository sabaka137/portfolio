import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Movables from "./components/Movables/Movables";
import { Stage } from "@pixi/react";
import GreatingModal from "./components/Modal/GreatingModal";
import DialogueModal from "./components/Modal/DialogueModal";
import AboutMeModal from "./components/Modal/AboutMeModal";
import NavBar from "./components/Modal/NavBar";
import Portfolio from "./components/Modal/Portfolio";
import TextModal from "./components/Modal/TextModal";
import MobileControl from "./components/Modal/MobileControl";
import LandscapeLock from "./components/LandscapeLock";
import { isMobileDevice } from "./constant/data";
import WarningModal from "./components/Modal/WarningModal";
import PreloaderScreen from "./components/PreloaderScreen";
import { usePreloadImages } from "./components/useImagePreloader";
import ProjectInDevelopment from "./components/Modal/ProjectInDevelopment";

function App() {
  const imagesPreloaded = usePreloadImages();
  const [greatingsModal, setGreatingsModal] = useState(true);
  const [moveAccess, setMoveAccess] = useState(true);
  const [dialogModal, setDialogModal] = useState<null | { speakerName: string; text: string }>(
    null
  );
  const [aboutModal, setAboutModal] = useState(false);
  const [portfolioModal, setPortfolioModal] = useState(false);
  const [WorkingModal, setWorkingModal] = useState(false);
  const [textModal, setTextModal] = useState<string | null>(null);
  const [controlModal, setControlModal] = useState<boolean>(false);
  const [warningModal, setWarningModal] = useState<null | string>(null);

  const navigationRef = useRef<HTMLDivElement[]>([]);
  const addNavToRef = (el: HTMLDivElement) => {
    if (el && !navigationRef.current.includes(el)) {
      navigationRef.current.push(el);
    }
  };

  const controlRef = useRef<HTMLDivElement[]>([]);
  const addControlToRef = (el: HTMLDivElement) => {
    if (el && !controlRef.current.includes(el)) {
      controlRef.current.push(el);
    }
  };

  useEffect(() => {
    if (
      dialogModal !== null ||
      portfolioModal === true ||
      WorkingModal === true ||
      textModal !== null
    ) {
      setMoveAccess(false);
    } else {
      setMoveAccess(true);
    }
  }, [dialogModal, portfolioModal, textModal, WorkingModal]);

  return (
    <>
      {imagesPreloaded ? (
        <>
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            options={{ autoDensity: true }}
          >
            <Movables
              navigationRef={navigationRef}
              setPortfolioModal={setPortfolioModal}
              setDialogModal={setDialogModal}
              setTextModal={setTextModal}
              controlRef={controlRef}
              setControlModal={setControlModal}
              setWarningModal={setWarningModal}
              moveAccess={moveAccess}
              setWorkingModal={setWorkingModal}
            />
          </Stage>

          <LandscapeLock />
          {warningModal !== null &&
            createPortal(<WarningModal setWarningModal={setWarningModal} link={warningModal} />, document.body)}

          {isMobileDevice && (
            <MobileControl controlModal={controlModal} addControlToRef={addControlToRef} />
          )}

          <NavBar
            addNavToRef={addNavToRef}
            setControlModal={setControlModal}
            setAboutModal={setAboutModal}
          />
          {dialogModal !== null && (
            <DialogueModal
              dialog={dialogModal}
              setControlModal={setControlModal}
              setDialogModal={setDialogModal}
            />
          )}
          {textModal !== null && (
            <TextModal
              text={textModal}
              setControlModal={setControlModal}
              setTextModal={setTextModal}
            />
          )}
          {aboutModal && (
            <AboutMeModal setControlModal={setControlModal} setAboutModal={setAboutModal} />
          )}
          {portfolioModal && (
            <Portfolio setControlModal={setControlModal} setPortfolioModal={setPortfolioModal} />
          )}
          {WorkingModal && <ProjectInDevelopment setControlModal={setControlModal} setWorkingModal={setWorkingModal} />}
          {greatingsModal && (
            <GreatingModal
              setControlModal={setControlModal}
              setGreatingsModal={setGreatingsModal}
            />
          )}
        </>
      ) : (
        <PreloaderScreen />
      )}
    </>
  );
}

export default App;
