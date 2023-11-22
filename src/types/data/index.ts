export type MapSetting = {
  general: {
    width: number;
    height: number;
    scale: number;
    tileSize: number;
    spawnPoint: { x: number; y: number };
  };
  background: {
    t1: { offset: { x: number; y: number }; image: string };
    t2: { offset: { x: number; y: number }; image: string };
    b1: { offset: { x: number; y: number }; image: string };
    b2: { offset: { x: number; y: number }; image: string };
  };
  foreground: {
    t1: { offset: { x: number; y: number }; image: string };
    t2: { offset: { x: number; y: number }; image: string };
    b1: { offset: { x: number; y: number }; image: string };
    b2: { offset: { x: number; y: number }; image: string };
  };
};

export type PortfolioData = {
  speakerName:string,
  text:string,
  description?:string,
  stack?:{id:number,image:string}[]
} | null