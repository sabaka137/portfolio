import { Sprite } from "@pixi/react";
import React from "react";
import { IModifiedSprite } from "../../types/pixi-react";

type Props = {
    props: {
        x: number;
        y: number;
        width: number;
        height: number;
        newOne: boolean;
        image: any;
        visible: boolean;
        startingPosition:{x:number,y:number}
        ref: (el: IModifiedSprite) => void;
      };
};

function ModifiedSprite({props}: Props) {
  return <Sprite {...props} />;
}

export default React.memo(ModifiedSprite);
