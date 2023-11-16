import { Dispatch, SetStateAction } from "react";
import { IModifiedAnimatedSprite, IModifiedSprite } from "../types/pixi-react";
import * as PIXI from "pixi.js";
import { MAP_SETTING } from "../constant/data";
type Args = {
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  collisionsRefs: React.MutableRefObject<IModifiedSprite[]>;
  foreground1: React.RefObject<PIXI.Sprite>;
  foreground2: React.RefObject<PIXI.Sprite>;
  foreground3: React.RefObject<PIXI.Sprite>;
  foreground4: React.RefObject<PIXI.Sprite>;
  NPCRef: React.MutableRefObject<IModifiedAnimatedSprite[]>;
  actionsRef: React.MutableRefObject<PIXI.Sprite[]>;
  entryRef: React.MutableRefObject<PIXI.Sprite[]>;
  teleportPointPosition: { x: number; y: number };
  setControlModal:React.Dispatch<React.SetStateAction<boolean>>
  signRef:React.MutableRefObject<PIXI.Sprite[]>
};
//teleport user and all movables object to specific position
export function Teleport({
  teleportPointPosition,
  setPosition,
  collisionsRefs,
  foreground1,
  foreground2,
  foreground3,
  foreground4,
  NPCRef,
  actionsRef,
  entryRef,
  setControlModal,
  signRef
}: Args) {
  setControlModal(false)
  setPosition({
    x: -teleportPointPosition.x * MAP_SETTING.general.scale + window.innerWidth / 2,
    y: -teleportPointPosition.y * MAP_SETTING.general.scale + window.innerHeight / 2,
  });

  collisionsRefs.current.forEach((el) => {
    el.y =
      el.angle + (-teleportPointPosition.y * MAP_SETTING.general.scale + window.innerHeight / 2);
    el.x =
      el.alpha + (-teleportPointPosition.x * MAP_SETTING.general.scale + window.innerWidth / 2);
  });

  NPCRef.current.forEach((el) => {
    let position;
    if (el.name !== null) {
      position = JSON.parse(el.name);
    }
    el.y =
      position.y * MAP_SETTING.general.scale +
      (-teleportPointPosition.y * MAP_SETTING.general.scale + window.innerHeight / 2);
    el.x =
      position.x * MAP_SETTING.general.scale +
      (-teleportPointPosition.x * MAP_SETTING.general.scale + window.innerWidth / 2);
  });
  
  signRef.current.forEach((el) => {
    let position;
    if (el.name !== null) {
      position = JSON.parse(el.name);
    }
    el.y =
      position.y * MAP_SETTING.general.scale +
      (-teleportPointPosition.y * MAP_SETTING.general.scale + window.innerHeight / 2);
    el.x =
      position.x * MAP_SETTING.general.scale +
      (-teleportPointPosition.x * MAP_SETTING.general.scale + window.innerWidth / 2);
  });

  actionsRef.current.forEach((el) => {
    el.y =
      el.angle * MAP_SETTING.general.scale +
      (-teleportPointPosition.y * MAP_SETTING.general.scale + window.innerHeight / 2);
    el.x =
      el.alpha * MAP_SETTING.general.scale +
      (-teleportPointPosition.x * MAP_SETTING.general.scale + window.innerWidth / 2);
  });

  entryRef.current.forEach((el) => {
    el.y =
      el.angle * MAP_SETTING.general.scale +
      (-teleportPointPosition.y * MAP_SETTING.general.scale + window.innerHeight / 2);
    el.x =
      el.alpha * MAP_SETTING.general.scale +
      (-teleportPointPosition.x * MAP_SETTING.general.scale + window.innerWidth / 2);
      
  });
  if(foreground1.current !== null){
    foreground1.current.x = (-teleportPointPosition.x * MAP_SETTING.general.scale + window.innerWidth / 2) + MAP_SETTING.foreground.t1.offset.x
    foreground1.current.y = (-teleportPointPosition.y * MAP_SETTING.general.scale + window.innerHeight / 2) + MAP_SETTING.foreground.t1.offset.y
  }
  if(foreground2.current !== null){
    foreground2.current.x = (-teleportPointPosition.x * MAP_SETTING.general.scale + window.innerWidth / 2) + MAP_SETTING.foreground.t2.offset.x
    foreground2.current.y = (-teleportPointPosition.y * MAP_SETTING.general.scale + window.innerHeight / 2) + MAP_SETTING.foreground.t2.offset.y
  }
  if(foreground3.current !== null){
    foreground3.current.x = (-teleportPointPosition.x * MAP_SETTING.general.scale + window.innerWidth / 2) + MAP_SETTING.foreground.b1.offset.x
    foreground3.current.y = (-teleportPointPosition.y * MAP_SETTING.general.scale + window.innerHeight / 2) + MAP_SETTING.foreground.b1.offset.y
  }
  if(foreground4.current !== null){
    foreground4.current.x = (-teleportPointPosition.x * MAP_SETTING.general.scale + window.innerWidth / 2) + MAP_SETTING.foreground.b2.offset.x
    foreground4.current.y = (-teleportPointPosition.y * MAP_SETTING.general.scale + window.innerHeight / 2) + MAP_SETTING.foreground.b2.offset.y
  }

}
