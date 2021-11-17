export default (() => {
  return {
    id: 13,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      6 / 16,
      1 / 16,
      7 / 16,
      2 / 16,
    ],
  };
})();
