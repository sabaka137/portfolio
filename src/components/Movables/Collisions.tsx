import { Sprite } from "@pixi/react/";
import * as PIXI from "pixi.js";
import { MAP_SETTING } from "../../constant/data";
import { IModifiedSprite } from "../../types/pixi-react";
import ModifiedSprite from "../Modified/ModifiedSprite";
import React from "react";

type Props = {
  collisionArray: any; //fix
  addCollisionToRef: (el: IModifiedSprite) => void;
};

function Collisions({ collisionArray, addCollisionToRef }: Props) {
  return (
    <>
      {collisionArray.map((el: any) => (
        <Sprite
          alpha={el.position.x}
          angle={el.position.y}
          ref={addCollisionToRef}
          image={MAP_SETTING.background.t1.image}
          x={
            el.position.x +
            (-MAP_SETTING.general.spawnPoint.x * MAP_SETTING.general.scale + window.innerWidth / 2)
          }
          y={
            el.position.y +
            (-MAP_SETTING.general.spawnPoint.y * MAP_SETTING.general.scale + window.innerHeight / 2)
          }
          width={MAP_SETTING.general.tileSize * MAP_SETTING.general.scale}
          height={MAP_SETTING.general.tileSize * MAP_SETTING.general.scale}
          visible={false}
        />
      ))}
    </>
  );
}

export default Collisions;
