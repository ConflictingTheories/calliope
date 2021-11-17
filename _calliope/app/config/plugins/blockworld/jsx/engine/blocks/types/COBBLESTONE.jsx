export default (() => {
  return {
    id: 8,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      0 / 16,
      1 / 16,
      1 / 16,
      2 / 16,
    ],
  };
})();
