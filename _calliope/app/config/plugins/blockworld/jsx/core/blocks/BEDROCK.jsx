export default {
  id: 1,
  spawnable: false,
  transparent: false,
  texture: function (world, lightmap, lit, x, y, z, dir) {
    return [1 / 16, 1 / 16, 2 / 16, 2 / 16];
  },
};
