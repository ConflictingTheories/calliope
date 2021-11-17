export default (() => {
  return {
    id: 16,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      5 / 16,
      2 / 16,
      6 / 16,
      3 / 16,
    ],
  };
})();
