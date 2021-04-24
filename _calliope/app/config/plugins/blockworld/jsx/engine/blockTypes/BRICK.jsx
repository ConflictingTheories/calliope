export default (() => {
  return {
    id: 10,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      7 / 16,
      0 / 16,
      8 / 16,
      1 / 16,
    ],
  };
})();
