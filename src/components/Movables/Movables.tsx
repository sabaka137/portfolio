import React, { Ref, useRef, Dispatch, SetStateAction } from "react";
import Background from "./Background";
import Character from "./Character";
import * as PIXI from "pixi.js";
import Collisions from "./Collisions";
import { CalculateCollisions } from "../../utils/CalculateCollisions";
import Foreground from "./Foreground";
import { MAP_SETTING, NPC } from "../../constant/data";
import AnimatedNPC from "./AnimatedNPC";
import Actions from "./Actions";
import { IModifiedAnimatedSprite, IModifiedSprite } from "../../types/pixi-react";
import IslandEntry from "./IslandEntry";
import ActionSign from "./ActionSign";

type Props = {
  setDialogModal: React.Dispatch<React.SetStateAction<{
    speakerName: string;
    text: string;
} | null>>
  navigationRef: React.MutableRefObject<HTMLDivElement[]>;
  setPortfolioModal: Dispatch<SetStateAction<boolean>>;
  setTextModal: Dispatch<SetStateAction<string | null>>;
  controlRef:React.MutableRefObject<HTMLDivElement[]>
  setControlModal:React.Dispatch<React.SetStateAction<boolean>>;
  setWarningModal: React.Dispatch<React.SetStateAction<string | null>>
  moveAccess: boolean
  setWorkingModal: React.Dispatch<React.SetStateAction<boolean>>
};

function Movables({ setWorkingModal,moveAccess,setControlModal,setPortfolioModal, setDialogModal, navigationRef, setTextModal,controlRef,setWarningModal}: Props) {
  const collisionArray = CalculateCollisions();

  const revealCollisionsRef = useRef<IModifiedSprite[]>([]);
  const addCollisionToRef = (el: IModifiedSprite) => {
    if (el && !revealCollisionsRef.current.includes(el)) {
      revealCollisionsRef.current.push(el);
    }
  };

  const revealNPCRef = useRef<IModifiedAnimatedSprite[]>([]);
  const addNPCToRef = (el: IModifiedAnimatedSprite) => {
    if (el && !revealNPCRef.current.includes(el)) {
      revealNPCRef.current.push(el);
    }
  };

  const revealActionsRef = useRef<PIXI.Sprite[]>([]);
  const addActionToRef = (el: PIXI.Sprite) => {
    if (el && !revealActionsRef.current.includes(el)) {
      revealActionsRef.current.push(el);
    }
  };

  const revealSignRef = useRef<PIXI.AnimatedSprite[]>([]);
  const addSignToRef = (el: PIXI.AnimatedSprite) => {
    if (el && !revealSignRef.current.includes(el)) {
      revealSignRef.current.push(el);
    }
  };

  const revealEntryRef = useRef<PIXI.Sprite[]>([]);
  const addEntryToRef = (el: PIXI.Sprite) => {
    if (el && !revealEntryRef.current.includes(el)) {
      revealEntryRef.current.push(el);
    }
  };

  const characterRef = useRef<PIXI.AnimatedSprite>(null);
  const foreground1 = useRef<PIXI.Sprite>(null);
  const foreground2 = useRef<PIXI.Sprite>(null);
  const foreground3 = useRef<PIXI.Sprite>(null);
  const foreground4 = useRef<PIXI.Sprite>(null);
  return (
    <>
      <Background
        collisionsRefs={revealCollisionsRef}
        setDialogModal={setDialogModal}
        foreground1={foreground1}
        foreground2={foreground2}
        setWorkingModal={setWorkingModal}
        foreground3={foreground3}
        foreground4={foreground4}
        characterRef={characterRef}
        NPCRef={revealNPCRef}
        controlRef={controlRef}
        actionsRef={revealActionsRef}
        entryRef={revealEntryRef}
        signRef={revealSignRef}
        setPortfolioModal={setPortfolioModal}
        setControlModal={setControlModal}
        navigationRef={navigationRef}
        setTextModal={setTextModal}
        setWarningModal={setWarningModal}
        moveAccess={moveAccess}
      />

      {NPC.map((npc) => (
        <AnimatedNPC npcData={npc} addNPCToRef={addNPCToRef} />
      ))}
      <Character characterRef={characterRef}  controlRef={controlRef} />
        
      <Foreground
        foreground1={foreground1}
        foreground2={foreground2}
        foreground3={foreground3}
        foreground4={foreground4}
      />
      <Actions addActionToRef={addActionToRef} />
      <ActionSign addSignToRef={addSignToRef}   />
      <IslandEntry addEntryToRef={addEntryToRef} />
      <Collisions addCollisionToRef={addCollisionToRef} collisionArray={collisionArray} />
    </>
  );
}

export default Movables;
