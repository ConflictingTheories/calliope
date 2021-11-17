export default (() => {
  return {
    id: 9,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      1 / 16,
      0 / 16,
      2 / 16,
      1 / 16,
    ],
  };
})();
