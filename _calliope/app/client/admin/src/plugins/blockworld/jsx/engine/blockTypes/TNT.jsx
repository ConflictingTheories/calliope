import { DIRECTION } from "../enums";
export default (() => {
  return {
    id: 4,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => {
      if (dir === DIRECTION.UP || dir === DIRECTION.DOWN)
        return [10 / 16, 0 / 16, 11 / 16, 1 / 16];
      return [8 / 16, 0 / 16, 9 / 16, 1 / 16];
    },
  };
})();
