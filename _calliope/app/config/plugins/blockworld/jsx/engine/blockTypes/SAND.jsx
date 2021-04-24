export default (() => {
  return {
    id: 11,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: true,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      2 / 16,
      1 / 16,
      3 / 16,
      2 / 16,
    ],
  };
})();
