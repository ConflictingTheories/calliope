export default (() => {
  return {
    id: 7,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      4 / 16,
      0 / 16,
      5 / 16,
      1 / 16,
    ],
  };
})();
