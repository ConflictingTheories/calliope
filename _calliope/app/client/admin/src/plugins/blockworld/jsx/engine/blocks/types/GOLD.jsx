export default (() => {
  return {
    id: 14,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      7 / 16,
      1 / 16,
      8 / 16,
      2 / 16,
    ],
  };
})();
