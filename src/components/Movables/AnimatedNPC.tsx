import React, { useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { AnimatedSprite, Sprite } from "@pixi/react";
import { MAP_SETTING, isMobileDevice } from "../../constant/data";

import { IModifiedAnimatedSprite } from "../../types/pixi-react";
type Props = {
  npcData: any;
  addNPCToRef: (el: IModifiedAnimatedSprite) => void;
};

export default function AnimatedNPC({ npcData, addNPCToRef }: Props) {
 
  const willMount = useRef(true);
  const [textures, setTextures] = useState([]);
  const loadSpritesheet = async () => {
    const baseTexture = PIXI.BaseTexture.from(npcData.sprite.image);
    const spritesheet = new PIXI.Spritesheet(baseTexture, npcData.sprite.json);
    const textures = await spritesheet.parse();
    let temp: any = [];
    Object.keys(textures).forEach((t, i) => {
      temp.push(textures[t]);
    });
    setTextures(temp);
  };
  if (willMount.current) {
    loadSpritesheet();
    willMount.current = false;
  }
  return (
    <>
      {Object.keys(textures).length !== 0 && (
        <>
          <AnimatedSprite
            name={JSON.stringify({ x: npcData.position.x, y: npcData.position.y })}
            anchor={0.5}
            ref={addNPCToRef}
            scale={isMobileDevice ? 0.93 : 1.8}
            x={
              npcData.position.x * MAP_SETTING.general.scale +
              (-MAP_SETTING.general.spawnPoint.x * MAP_SETTING.general.scale +
                window.innerWidth / 2)
            }
            y={
              npcData.position.y * MAP_SETTING.general.scale +
              (-MAP_SETTING.general.spawnPoint.y * MAP_SETTING.general.scale +
                window.innerHeight / 2)
            }
            textures={textures}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.07}
          />
        
        </>
      )}
    </>
  );
}
