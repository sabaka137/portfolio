import React from "react";
import { MAP_SETTING } from "../../constant/data";
import { Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";
type Props = {
  foreground1: React.RefObject<PIXI.Sprite>;
  foreground2: React.RefObject<PIXI.Sprite>;
  foreground3: React.RefObject<PIXI.Sprite>;
  foreground4: React.RefObject<PIXI.Sprite>;
};

function Foreground({ foreground1, foreground2, foreground3, foreground4 }: Props) {

  return (
    <>
      <Sprite
      scale={1}
        image={MAP_SETTING.foreground.t1.image}
        ref={foreground1}
        x={
          -MAP_SETTING.general.spawnPoint.x * MAP_SETTING.general.scale +
          window.innerWidth / 2 +
          MAP_SETTING.foreground.t1.offset.x
        }
        y={
          -MAP_SETTING.general.spawnPoint.y * MAP_SETTING.general.scale +
          window.innerHeight / 2 +
          MAP_SETTING.foreground.t1.offset.y
        }
      />
      <Sprite
        image={MAP_SETTING.foreground.t2.image}
        ref={foreground2}
        x={
          -MAP_SETTING.general.spawnPoint.x * MAP_SETTING.general.scale +
          window.innerWidth / 2 +
          MAP_SETTING.foreground.t2.offset.x
        }
        y={
          -MAP_SETTING.general.spawnPoint.y * MAP_SETTING.general.scale +
          window.innerHeight / 2 +
          MAP_SETTING.foreground.t2.offset.y
        }
      />
      <Sprite
        image={MAP_SETTING.foreground.b1.image}
        ref={foreground3}
        x={
          -MAP_SETTING.general.spawnPoint.x * MAP_SETTING.general.scale +
          window.innerWidth / 2 +
          MAP_SETTING.foreground.b1.offset.x
        }
        y={
          -MAP_SETTING.general.spawnPoint.y * MAP_SETTING.general.scale +
          window.innerHeight / 2 +
          MAP_SETTING.foreground.b1.offset.y
        }
      />
      <Sprite
        image={MAP_SETTING.foreground.b2.image}
        ref={foreground4}
        x={
          -MAP_SETTING.general.spawnPoint.x * MAP_SETTING.general.scale +
          window.innerWidth / 2 +
          MAP_SETTING.foreground.b2.offset.x
        }
        y={
          -MAP_SETTING.general.spawnPoint.y * MAP_SETTING.general.scale +
          window.innerHeight / 2 +
          MAP_SETTING.foreground.b2.offset.y
        }
      />
    </>
  );
}

export default Foreground;
