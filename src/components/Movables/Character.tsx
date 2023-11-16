import React, { Ref, useRef, useState, useEffect } from "react";
import * as PIXI from "pixi.js";
import { AnimatedSprite, useTick } from "@pixi/react";
import { MAIN_CHARACTER, isMobileDevice } from "../../constant/data";
type Props = {
  characterRef: React.RefObject<PIXI.AnimatedSprite>;
  controlRef:React.MutableRefObject<HTMLDivElement[]>
};

type CharacterTextures = {
  down: PIXI.Texture[];
  left: PIXI.Texture[];
  right: PIXI.Texture[];
  up: PIXI.Texture[];
  dIdle: PIXI.Texture[];
  lIdle: PIXI.Texture[];
  rIdle: PIXI.Texture[];
  tIdle: PIXI.Texture[];
};

function Character({ characterRef,controlRef}: Props) {
  const willMount = useRef(true);
  const [textures, setTextures] = useState<any>([]);
  const [currentSprite, setCurrentSprite] = useState("up");

  const [isPressed, setIsPressed] = useState({
    w: false,
    s: false,
    d: false,
    a: false,
  });
  const [lastKey, setLastKey] = useState("");
  function keyDown(code: string) {
    let temp = {
      w: code == "KeyW" ? true : false,
      s: code == "KeyS" ? true : false,
      d: code == "KeyD" ? true : false,
      a: code == "KeyA" ? true : false,
    };
    setIsPressed(temp);
    setLastKey(code);
  }
  function keyUp(code: string) {
    let temp = {
      w: code == "KeyW" ? false : true,
      s: code == "KeyS" ? false : true,
      d: code == "KeyD" ? false : true,
      a: code == "KeyA" ? false : true,
    };
    setIsPressed(temp);
  }
  useEffect(() => {
    controlRef.current.forEach((el) => {
      el.addEventListener("touchstart", () => {
        if (el.id === "w") {
          keyDown("KeyW");
        }
        if (el.id === "s") {
          keyDown("KeyS");
        }
        if (el.id === "d") {
          keyDown("KeyD");
        }
        if (el.id === "a") {
          keyDown("KeyA");
        }
      });
    });
    controlRef.current.forEach((el) => {
      el.addEventListener("touchend", () => {
        if (el.id === "w") {
          keyUp("KeyW");
        }
        if (el.id === "s") {
          keyUp("KeyS");
        }
        if (el.id === "d") {
          keyUp("KeyD");
        }
        if (el.id === "a") {
          keyUp("KeyA");
        }
      });
    });
  }, []);
  useTick((delta) => {
    if (isPressed.w && lastKey == "KeyW") {
      setCurrentSprite("up");
      if (characterRef.current !== null && currentSprite !== "up") {
        characterRef.current.textures = textures["up"];
        characterRef.current.play();
      }
    } else if (isPressed.s && lastKey == "KeyS") {
      setCurrentSprite("down");
      if (characterRef.current !== null && currentSprite !== "down") {
        characterRef.current.textures = textures["down"];
        characterRef.current.play();
      }
    } else if (isPressed.d && lastKey == "KeyD") {
      setCurrentSprite("right");
      if (characterRef.current !== null && currentSprite !== "right") {
        characterRef.current.textures = textures["right"];
        characterRef.current.play();
      }
    } else if (isPressed.a && lastKey == "KeyA") {
      setCurrentSprite("left");
      if (characterRef.current !== null && currentSprite !== "left") {
        characterRef.current.textures = textures["left"];
        characterRef.current.play();
      }
    } else {
      if (currentSprite === "up") {
        setCurrentSprite("tIdle");
        if (characterRef.current !== null) {
          characterRef.current.textures = textures["tIdle"];
          characterRef.current.play();
        }
      }
      if (currentSprite === "down") {
        setCurrentSprite("dIdle");
        if (characterRef.current !== null) {
          characterRef.current.textures = textures["dIdle"];
          characterRef.current.play();
        }
      }
      if (currentSprite === "right") {
        setCurrentSprite("rIdle");
        if (characterRef.current !== null) {
          characterRef.current.textures = textures["rIdle"];
          characterRef.current.play();
        }
      }
      if (currentSprite === "left") {
        setCurrentSprite("lIdle");
        if (characterRef.current !== null) {
          characterRef.current.textures = textures["lIdle"];
          characterRef.current.play();
        }
      }
    }
  });
  useEffect(() => {
    window.addEventListener("keydown", (e) => keyDown(e.code));
    window.addEventListener("keyup", (e) => {
      keyUp(e.code);
    });
  }, []);

  //fix вынести функцию подсчета текстур в утилсы
  const loadSpritesheet = async () => {
    const baseTexture = PIXI.BaseTexture.from(MAIN_CHARACTER.image);
    const spritesheet = new PIXI.Spritesheet(baseTexture, MAIN_CHARACTER.json);
    const textures = await spritesheet.parse();
    let downTemp: PIXI.Texture[] = [];
    let leftTemp: PIXI.Texture[] = [];
    let rightTemp: PIXI.Texture[] = [];
    let upTemp: PIXI.Texture[] = [];
    let downIdle: PIXI.Texture[] = [];
    let leftIdle: PIXI.Texture[] = [];
    let rightIdle: PIXI.Texture[] = [];
    let topIdle: PIXI.Texture[] = [];
    Object.keys(textures).forEach((t, i) => {
      if (i > 0 && i <= 3) {
        downIdle.push(textures[t]);
      }
    });
    Object.keys(textures).forEach((t, i) => {
      if (i > 4 && i <= 7) {
        leftIdle.push(textures[t]);
      }
    });
    Object.keys(textures).forEach((t, i) => {
      if (i > 7 && i <= 11) {
        rightIdle.push(textures[t]);
      }
    });
    Object.keys(textures).forEach((t, i) => {
      if (i > 11 && i <= 15) {
        topIdle.push(textures[t]);
      }
    });
    Object.keys(textures).forEach((t, i) => {
      if (i > 15 && i <= 21) {
        downTemp.push(textures[t]);
      }
    });
    Object.keys(textures).forEach((t, i) => {
      if (i > 21 && i <= 27) {
        leftTemp.push(textures[t]);
      }
    });
    Object.keys(textures).forEach((t, i) => {
      if (i > 27 && i <= 33) {
        rightTemp.push(textures[t]);
      }
    });
    Object.keys(textures).forEach((t, i) => {
      if (i > 33 && i <= 39) {
        upTemp.push(textures[t]);
      }
    });

    setTextures({
      down: downTemp,
      left: leftTemp,
      right: rightTemp,
      up: upTemp,
      dIdle: downIdle,
      lIdle: leftIdle,
      rIdle: rightIdle,
      tIdle: topIdle,
    });
  };

  if (willMount.current) {
    loadSpritesheet();
    willMount.current = false;
  }
  return (
    <>
      {Object.keys(textures).length != 0 && (
        <AnimatedSprite
          anchor={{x:0.35,y:0.6}}
          scale={isMobileDevice ? 1.6 : 3}
          ref={characterRef}
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          textures={textures["down"]}
          isPlaying={false}
          initialFrame={0}
          animationSpeed={0.07}
        />
      )}
    </>
  );
}

export default Character;
