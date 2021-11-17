import { DIRECTION } from "../../utils/enums";
export default (() => {
  return {
    id: 3,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => {
      if (dir === DIRECTION.UP || dir === DIRECTION.DOWN)
        return [5 / 16, 1 / 16, 6 / 16, 2 / 16];
      return [4 / 16, 1 / 16, 5 / 16, 2 / 16];
    },
  };
})();
