export default (() => {
  return {
    id: 18,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      0 / 16,
      3 / 16,
      1 / 16,
      4 / 16,
    ],
  };
})();
