import { DIRECTION } from "../../utils/enums";
export default (() => {
  return {
    id: 2,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => {
      if (dir == DIRECTION.UP && lit) return [14 / 16, 0 / 16, 15 / 16, 1 / 16];
      else if (dir == DIRECTION.DOWN || !lit)
        return [2 / 16, 0 / 16, 3 / 16, 1 / 16];
      else return [3 / 16, 0 / 16, 4 / 16, 1 / 16];
    },
  };
})();
