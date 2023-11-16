import { COLLISIONS } from "../constant/data"
import { MAP_SETTING } from "../constant/data"
export function CalculateCollisions() {
    const width = MAP_SETTING.general.width
    const collisions = COLLISIONS.data
    const tileSize = MAP_SETTING.general.tileSize * MAP_SETTING.general.scale

    let collisionsArray = []
    let boundaries:any = []

    for (let i = 0; i < collisions.length; i += width) {
        collisionsArray.push(collisions.slice(i, i + width))
      }
  
    collisionsArray.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === COLLISIONS.tileId) {
          boundaries.push({ position: { x: j * tileSize , y: i * tileSize } })
        }
      })  
    })
  return boundaries
}