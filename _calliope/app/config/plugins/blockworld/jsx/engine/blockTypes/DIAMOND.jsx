export default (() => {
  return {
    id: 15,
    spawnable: true,
    transparent: false,
    selflit: false,
    gravity: false,
    fluid: false,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      8 / 16,
      1 / 16,
      9 / 16,
      2 / 16,
    ],
  };
})();
