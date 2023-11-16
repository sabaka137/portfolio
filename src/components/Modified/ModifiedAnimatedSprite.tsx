import { AnimatedSprite } from '@pixi/react'
import React from 'react'
import { IModifiedAnimatedSprite } from '../../types/pixi-react';

type Props = {
    props:{
        x: number;
        y: number;
        scale:number;
        anchor:number;
        textures:any;
        isPlaying:boolean;
        initialFrame:number;
        animationSpeed:number;
        startingPosition:{x:number,y:number}
        ref: (el: IModifiedAnimatedSprite) => void;
    }
}

function ModifiedAnimatedSprite({props}: Props) {
  return (
    <AnimatedSprite {...props}/>
  )
}

export default ModifiedAnimatedSprite