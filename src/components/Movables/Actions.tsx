import React from "react";
import { ACTION_HITBOX, MAP_SETTING } from "../../constant/data";
import { Sprite} from "@pixi/react";
import * as PIXI from "pixi.js";
type Props = {
  addActionToRef: (el: PIXI.Sprite) => void;
};

function Actions({ addActionToRef }: Props) {

  return (
    
    <>
      {ACTION_HITBOX.map((hitbox) => (
        <Sprite
          
          ref={addActionToRef}
          key={hitbox.id}
          renderId={hitbox.id}
          angle={hitbox.position.y}
          alpha={hitbox.position.x}
          x={
            hitbox.position.x * MAP_SETTING.general.scale +
            (-MAP_SETTING.general.spawnPoint.x * MAP_SETTING.general.scale + window.innerWidth / 2)
          }
          y={
            hitbox.position.y * MAP_SETTING.general.scale +
            (-MAP_SETTING.general.spawnPoint.y * MAP_SETTING.general.scale + window.innerHeight / 2)
          }
          width={hitbox.size.width * MAP_SETTING.general.scale}
          height={hitbox.size.height * MAP_SETTING.general.scale}
          interactive={true}
          image={MAP_SETTING.background.t1.image}
          visible={false}
        />
      ))}
    </>
  );
}

export default Actions;
