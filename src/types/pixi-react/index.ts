import * as PIXI from "pixi.js";

export type IModifiedSprite = PIXI.Sprite & {
  isTouched: boolean;
  startingPosition: { x: number; y: number };
};

export type IModifiedAnimatedSprite = PIXI.AnimatedSprite & {
  startingPosition: { x: number; y: number };
};

