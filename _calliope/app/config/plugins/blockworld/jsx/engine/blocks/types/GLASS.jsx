export default (() => {
  return {
    id: 17,
    spawnable: true,
    transparent: true,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      1 / 16,
      3 / 16,
      2 / 16,
      4 / 16,
    ],
  };
})();

