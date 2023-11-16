import { useEffect, useState } from "react";
import * as PIXI from "pixi.js";

import BookRight from "../common/images/BookRight.png";
import BookLeft from "../common/images/BookLeft.png";
import Avatar from "../common/images/Photo.png";
import RightPaperImage from "../common/images/RightPaper.png";
import LeftPaperImage from "../common/images/LeftPaper.png";
import TestAvatar from "../common/images/TestAvatar.jpg";
import Portal from "../common/images/Portal.gif";
import EmptyPaper from '../common/images/EmptyPaper.png'
import Warning from '../common/images/WarningSign.png'
import Working from '../common/images/Working.png'

import BG1 from "../common/images/background/Top1.jpg";
import BG2 from "../common/images/background/Top2.jpg";
import BG3 from "../common/images/background/Bottom1.jpg";
import BG4 from "../common/images/background/Bottom2.jpg";

import Font from "../common/fonts/Pixel.ttf";

const preload = [Working,Warning,EmptyPaper,Portal,BookRight, BookLeft, Avatar, RightPaperImage, LeftPaperImage, Avatar,TestAvatar];
declare global {
  interface Window {
    usePreloadImagesData?: Record<symbol, unknown[]>;
  }
}

export const usePreloadImages = (): any => {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);
  const [assetsPreloaded, setAssetsPreloaded] = useState<boolean>(false);

  useEffect(() => {
    const key = Symbol();
    window.usePreloadImagesData = window.usePreloadImagesData ?? {};
    window.usePreloadImagesData[key] = [];
    for (const src of preload) {
      const img = new Image();
      img.src = src;
      window.usePreloadImagesData[key].push(img);
    }
    PIXI.Assets.load([BG1, BG2, BG3, BG4, Font]).then(() => {
      setAssetsPreloaded(prev=>!prev);
    });
    setImagesPreloaded(prev=>!prev);
    return () => {
      delete window.usePreloadImagesData?.[key];
    };
  }, []);
  return imagesPreloaded && assetsPreloaded ? true : false;
};
