import { DIRECTION } from "../../utils/enums";
export default (() => {
  return {
    id: 5,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => {
      if (dir === DIRECTION.FORWARD || dir === DIRECTION.BACK)
        return [3 / 16, 2 / 16, 4 / 16, 3 / 16];
      return [4 / 16, 0 / 16, 5 / 16, 1 / 16];
    },
  };
})();
