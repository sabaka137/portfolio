import { AnimatedSprite, Sprite, useTick } from "@pixi/react";
import React, { useState, useRef } from "react";
import AnimatedSign from "../../common/images/AnimatedSign.png";
import AnimatedSignJson from "../../common/images/AnimatedSign.json";
import { ACTION_SIGN, MAP_SETTING, isMobileDevice } from "../../constant/data";
import * as PIXI from "pixi.js";
type Props = {
  addSignToRef: (el: PIXI.AnimatedSprite) => void;

};

function ActionSign({ addSignToRef }: Props) {
  const willMount = useRef(true);
  const [textures, setTextures] = useState([]);
  const loadSpritesheet = async () => {
    const baseTexture = PIXI.BaseTexture.from(AnimatedSign);
    const spritesheet = new PIXI.Spritesheet(baseTexture, AnimatedSignJson);
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
          {ACTION_SIGN.map((el) => (
            <AnimatedSprite
              renderId={el.id}
              scale={isMobileDevice ? 0.55 : 1}
              name={JSON.stringify({ x: el.x, y: el.y })}
              ref={addSignToRef}
              x={
                el.x * MAP_SETTING.general.scale +
                (-MAP_SETTING.general.spawnPoint.x * MAP_SETTING.general.scale +
                  window.innerWidth / 2)
              }
              y={
                el.y * MAP_SETTING.general.scale +
                (-MAP_SETTING.general.spawnPoint.y * MAP_SETTING.general.scale +
                  window.innerHeight / 2)
              }
              interactive={true}
              image={el.img}
              visible={true}
              textures={textures}
              isPlaying={true}
              initialFrame={0}
              animationSpeed={0.11}
            />
          ))}
        </>
      )}
    </>
  );
}

export default ActionSign;
