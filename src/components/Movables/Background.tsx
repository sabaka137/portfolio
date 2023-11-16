import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Sprite, useTick } from "@pixi/react";
import {
  ACTION_HITBOX,
  ISLAND_INFO,
  MAP_SETTING,
  TELEPORT_POINT,
  charSpeed,
} from "../../constant/data";
import * as PIXI from "pixi.js";
import { IModifiedAnimatedSprite, IModifiedSprite } from "../../types/pixi-react";
import { Teleport } from "../../utils/TeleportUser";

type Props = {
  collisionsRefs: React.MutableRefObject<IModifiedSprite[]>;
  characterRef: React.RefObject<PIXI.AnimatedSprite>;
  foreground1: React.RefObject<PIXI.Sprite>;
  foreground2: React.RefObject<PIXI.Sprite>;
  foreground3: React.RefObject<PIXI.Sprite>;
  foreground4: React.RefObject<PIXI.Sprite>;
  NPCRef: React.MutableRefObject<IModifiedAnimatedSprite[]>;
  actionsRef: React.MutableRefObject<PIXI.Sprite[]>;
  entryRef: React.MutableRefObject<PIXI.Sprite[]>;
  signRef: React.MutableRefObject<PIXI.Sprite[]>;
  setDialogModal: React.Dispatch<
    React.SetStateAction<{
      speakerName: string;
      text: string;
    } | null>
  >;
  navigationRef: React.MutableRefObject<HTMLDivElement[]>;
  setPortfolioModal: Dispatch<SetStateAction<boolean>>;
  setTextModal: Dispatch<SetStateAction<string | null>>;
  setControlModal: React.Dispatch<React.SetStateAction<boolean>>;
  controlRef: React.MutableRefObject<HTMLDivElement[]>;
  setWarningModal: React.Dispatch<React.SetStateAction<string | null>>
  moveAccess: boolean;
  setWorkingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Background({
  collisionsRefs,
  characterRef,
  foreground1,
  foreground2,
  foreground3,
  foreground4,
  NPCRef,
  actionsRef,
  setDialogModal,
  setPortfolioModal,
  navigationRef,
  setTextModal,
  entryRef,
  controlRef,
  setControlModal,
  setWarningModal,
  moveAccess,
  signRef,
  setWorkingModal,
}: Props) {
  const [position, setPosition] = useState({
    x: -MAP_SETTING.general.spawnPoint.x * MAP_SETTING.general.scale + window.innerWidth / 2,
    y: -(MAP_SETTING.general.spawnPoint.y * MAP_SETTING.general.scale) + window.innerHeight / 2,
  });
  const [isPressed, setIsPressed] = useState({
    w: false,
    s: false,
    d: false,
    a: false,
  });
  const [lastKey, setLastKey] = useState("");

  function keyDown(code: string) {
    let temp = {
      w: code === "KeyW" ? true : false,
      s: code === "KeyS" ? true : false,
      d: code === "KeyD" ? true : false,
      a: code === "KeyA" ? true : false,
    };
    setIsPressed(temp);
    setLastKey(code);
  }
  function keyUp(code: string) {
    let temp = {
      w: code === "KeyW" ? false : true,
      s: code === "KeyS" ? false : true,
      d: code === "KeyD" ? false : true,
      a: code === "KeyA" ? false : true,
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
    controlRef.current.forEach((el) => {
      if (el.id === "action") {
        el.addEventListener("click", () => {
          actionsRef.current.forEach((action) => {
            if (action.roundPixels) {
              ACTION_HITBOX.forEach((item) => {
                if (item.id === action.renderId) {
                  if (item.type === "dialogue") {
                    setDialogModal({
                      speakerName: item.content.speakerName,
                      text: item.content.text,
                    });
                    setControlModal(false);
                    signRef.current.forEach((sign) => {
                      if (sign.renderId === item.id) {
                        sign.visible = false;
                      }
                    });
                  }
                  if (item.type === "textWindow") {
                    setTextModal(item.content.text);
                    setControlModal(false);
                    signRef.current.forEach((sign) => {
                      if (sign.renderId === item.id) {
                        sign.visible = false;
                      }
                    });
                  }
                  if (item.type === "link") {
                    
                    setWarningModal(item.content.text);
                    signRef.current.forEach((sign) => {
                      if (sign.renderId === item.id) {
                        sign.visible = false;
                      }
                    });
                  }
                  if (item.type === "portfolio") {
                    setPortfolioModal(true);
                    setControlModal(false);
                    signRef.current.forEach((sign) => {
                      if (sign.renderId === item.id) {
                        sign.visible = false;
                      }
                    });
                  }
                  if (item.type === "inDeveloping") {
                    setWorkingModal(true);
                    setControlModal(false);
                  }
                }
              });
            }
          });
        });
      }
    });
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", (e) => keyDown(e.code));
    window.addEventListener("keyup", (e) => {
      keyUp(e.code);
    });
    navigationRef.current.forEach((item) => {
      item.addEventListener("click", () => {
        if (item.id === "history") {
          Teleport({
            collisionsRefs,
            foreground1,
            foreground2,
            foreground3,
            foreground4,
            NPCRef,
            actionsRef,
            setPosition,
            teleportPointPosition: TELEPORT_POINT.history,
            entryRef,
            setControlModal,
            signRef,
          });
          entryRef.current[0].roundPixels = true;
          setDialogModal({
            speakerName: ISLAND_INFO[0].content.speakerName,
            text: ISLAND_INFO[0].content.text,
          });
        }
        if (item.id === "portfolio") {
          Teleport({
            collisionsRefs,
            foreground1,
            foreground2,
            foreground3,
            foreground4,
            NPCRef,
            actionsRef,
            setPosition,
            teleportPointPosition: TELEPORT_POINT.portfolio,
            entryRef,
            setControlModal,
            signRef,
          });
          entryRef.current[1].roundPixels = true;
          setDialogModal({
            speakerName: ISLAND_INFO[1].content.speakerName,
            text: ISLAND_INFO[1].content.text,
          });
        }
        if (item.id === "cemetery") {
          Teleport({
            collisionsRefs,
            foreground1,
            foreground2,
            foreground3,
            foreground4,
            NPCRef,
            actionsRef,
            setPosition,
            teleportPointPosition: TELEPORT_POINT.cemetry,
            entryRef,
            setControlModal,
            signRef,
          });
          entryRef.current[2].roundPixels = true;
          setDialogModal({
            speakerName: ISLAND_INFO[2].content.speakerName,
            text: ISLAND_INFO[2].content.text,
          });
        }
        if (item.id === "main") {
          Teleport({
            collisionsRefs,
            foreground1,
            foreground2,
            foreground3,
            foreground4,
            NPCRef,
            actionsRef,
            setPosition,
            teleportPointPosition: TELEPORT_POINT.main,
            entryRef,
            setControlModal,
            signRef,
          });
          entryRef.current[3].roundPixels = true;
          setDialogModal({
            speakerName: ISLAND_INFO[3].content.speakerName,
            text: ISLAND_INFO[3].content.text,
          });
        }
      });
    });
    window.addEventListener("keypress", (e) => {
      if (e.code == "Space") {
        actionsRef.current.forEach((action) => {
          if (action.roundPixels) {
            ACTION_HITBOX.forEach((item) => {
              if (item.id === action.renderId) {
                if (item.type === "dialogue") {
                  setControlModal(false);
                  setDialogModal({
                    speakerName: item.content.speakerName,
                    text: item.content.text,
                  });
                  signRef.current.forEach((sign) => {
                    if (sign.renderId === item.id) {
                      sign.visible = false;
                    }
                  });
                }
                if (item.type === "textWindow") {
                  setTextModal(item.content.text);
                  signRef.current.forEach((sign) => {
                    if (sign.renderId === item.id) {
                      sign.visible = false;
                    }
                  });
                }
                if (item.type === "link") {
                  setWarningModal(item.content.text);
                  signRef.current.forEach((sign) => {
                    if (sign.renderId === item.id) {
                      sign.visible = false;
                    }
                  });
                }
                if (item.type === "portfolio") {
                  setPortfolioModal(true);
                  signRef.current.forEach((sign) => {
                    if (sign.renderId === item.id) {
                      sign.visible = false;
                    }
                  });
                }
                if (item.type === "inDeveloping") {
                  setWorkingModal(true);
                }
              }
            });
          }
        });
      }
    });
  }, []);
  function rectangularCollision({ rectangle1, rectangle2 }: any) {
    return (
      rectangle1.x + rectangle1.width / 2 >= rectangle2.x &&
      rectangle1.y <= rectangle2.y + rectangle2.height &&
      rectangle1.x <= rectangle2.x + rectangle2.width &&
      rectangle1.y + rectangle1.height / 2 >= rectangle2.y
    );
  }

  useTick((delta) => {
    let moving = true;
    if (isPressed.w && lastKey == "KeyW") {
      collisionsRefs.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x,
              y: el.y + delta * charSpeed,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          moving = false;
        }
      });
      actionsRef.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x,
              y: el.y + delta * charSpeed,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          el.roundPixels = true;
        } else {
          el.roundPixels = false;
        }
      });
      entryRef.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x,
              y: el.y + delta * charSpeed,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          if (!el.roundPixels) {
            el.roundPixels = true;
            ISLAND_INFO.forEach((item) => {
              if (item.id === el.renderId) {
                setDialogModal({ speakerName: item.content.speakerName, text: item.content.text });
                setControlModal(false);
                keyUp(lastKey);
              }
            });
          }
        } else {
          //вышел
        }
      });

      if (moving && moveAccess) {
        collisionsRefs.current.forEach((el) => (el.y += delta * charSpeed));
        NPCRef.current.forEach((el) => (el.y += delta * charSpeed));
        actionsRef.current.forEach((el) => (el.y += delta * charSpeed));
        entryRef.current.forEach((el) => (el.y += delta * charSpeed));
        signRef.current.forEach((el) => (el.y += delta * charSpeed));
        if (
          foreground1.current &&
          foreground2.current &&
          foreground3.current &&
          foreground4.current !== null
        ) {
          foreground1.current.y += delta * charSpeed;
          foreground2.current.y += delta * charSpeed;
          foreground3.current.y += delta * charSpeed;
          foreground4.current.y += delta * charSpeed;
        }
        setPosition({ x: position.x, y: position.y + delta * charSpeed });
      }
    }
    if (isPressed.s && lastKey == "KeyS") {
      collisionsRefs.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x,
              y: el.y - delta * charSpeed,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          moving = false;
        }
      });
      actionsRef.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x,
              y: el.y - delta * charSpeed,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          el.roundPixels = true;
        } else {
          el.roundPixels = false;
        }
      });
      entryRef.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x,
              y: el.y - delta * charSpeed,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          //зашел на остров
          if (!el.roundPixels) {
            el.roundPixels = true;
            ISLAND_INFO.forEach((item) => {
              if (item.id === el.renderId) {
                setDialogModal({ speakerName: item.content.speakerName, text: item.content.text });
                setControlModal(false);
                keyUp(lastKey);
              }
            });
          }
        } else {
        }
      });
      if (moving && moveAccess) {
        collisionsRefs.current.forEach((el) => (el.y -= delta * charSpeed));
        NPCRef.current.forEach((el) => (el.y -= delta * charSpeed));
        actionsRef.current.forEach((el) => (el.y -= delta * charSpeed));
        entryRef.current.forEach((el) => (el.y -= delta * charSpeed));
        signRef.current.forEach((el) => (el.y -= delta * charSpeed));
        if (
          foreground1.current &&
          foreground2.current &&
          foreground3.current &&
          foreground4.current !== null
        ) {
          foreground1.current.y -= delta * charSpeed;
          foreground2.current.y -= delta * charSpeed;
          foreground3.current.y -= delta * charSpeed;
          foreground4.current.y -= delta * charSpeed;
        }
        setPosition({ x: position.x, y: position.y - delta * charSpeed });
      }
    }
    if (isPressed.d && lastKey == "KeyD") {
      collisionsRefs.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x - delta * charSpeed,
              y: el.y,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          moving = false;
        }
      });
      actionsRef.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x - delta * charSpeed,
              y: el.y,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          el.roundPixels = true;
        } else {
          el.roundPixels = false;
        }
      });
      entryRef.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x - delta * charSpeed,
              y: el.y,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          //зашел на остров
          if (!el.roundPixels) {
            el.roundPixels = true;
            ISLAND_INFO.forEach((item) => {
              if (item.id === el.renderId) {
                moving = false;
                setDialogModal({ speakerName: item.content.speakerName, text: item.content.text });
                setControlModal(false);
                keyUp(lastKey);
              }
            });
          }
        } else {
          //вышел
        }
      });
      if (moving && moveAccess) {
        collisionsRefs.current.forEach((el) => (el.x -= delta * charSpeed));
        NPCRef.current.forEach((el) => (el.x -= delta * charSpeed));
        actionsRef.current.forEach((el) => (el.x -= delta * charSpeed));
        entryRef.current.forEach((el) => (el.x -= delta * charSpeed));
        signRef.current.forEach((el) => (el.x -= delta * charSpeed));
        if (
          foreground1.current &&
          foreground2.current &&
          foreground3.current &&
          foreground4.current !== null
        ) {
          foreground1.current.x -= delta * charSpeed;
          foreground2.current.x -= delta * charSpeed;
          foreground3.current.x -= delta * charSpeed;
          foreground4.current.x -= delta * charSpeed;
        }
        setPosition({ x: position.x - delta * charSpeed, y: position.y });
      }
    }
    if (isPressed.a && lastKey == "KeyA") {
      collisionsRefs.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x + delta * charSpeed,
              y: el.y,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          moving = false;
        }
      });
      actionsRef.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x + delta * charSpeed,
              y: el.y,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          el.roundPixels = true;
        } else {
          el.roundPixels = false;
        }
      });
      entryRef.current.forEach((el) => {
        if (
          rectangularCollision({
            rectangle1: characterRef.current,
            rectangle2: {
              x: el.x + delta * charSpeed,
              y: el.y,
              width: el.width,
              height: el.height,
            },
          })
        ) {
          //зашел на остров
          if (!el.roundPixels) {
            el.roundPixels = true;
            ISLAND_INFO.forEach((item) => {
              if (item.id === el.renderId) {
                setDialogModal({ speakerName: item.content.speakerName, text: item.content.text });
                setControlModal(false);
                keyUp(lastKey);
              }
            });
          }
        } else {
          //вышел
        }
      });
      if (moving && moveAccess) {
        collisionsRefs.current.forEach((el) => (el.x += delta * charSpeed));
        NPCRef.current.forEach((el) => (el.x += delta * charSpeed));
        actionsRef.current.forEach((el) => (el.x += delta * charSpeed));
        entryRef.current.forEach((el) => (el.x += delta * charSpeed));
        signRef.current.forEach((el) => (el.x += delta * charSpeed));
        if (
          foreground1.current &&
          foreground2.current &&
          foreground3.current &&
          foreground4.current !== null
        ) {
          foreground1.current.x += delta * charSpeed;
          foreground2.current.x += delta * charSpeed;
          foreground3.current.x += delta * charSpeed;
          foreground4.current.x += delta * charSpeed;
        }
        setPosition({ x: position.x + delta * charSpeed, y: position.y });
      }
    }
  });
  return (
    <>
      <Sprite image={MAP_SETTING.background.t1.image} x={position.x} y={position.y} />
      <Sprite
        image={MAP_SETTING.background.t2.image}
        x={position.x + MAP_SETTING.background.t2.offset.x}
        y={position.y + 0}
      />
      <Sprite
        image={MAP_SETTING.background.b1.image}
        x={position.x + 0}
        y={position.y + MAP_SETTING.background.b1.offset.y}
      />
      <Sprite
        image={MAP_SETTING.background.b2.image}
        x={position.x + MAP_SETTING.background.b2.offset.x}
        y={position.y + MAP_SETTING.background.b2.offset.y}
      />
    </>
  );
}

export default Background;
