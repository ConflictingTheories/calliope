export default (() => {
  return {
    id: 12,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: true,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      3 / 16,
      1 / 16,
      4 / 16,
      2 / 16,
    ],
  };
})();
