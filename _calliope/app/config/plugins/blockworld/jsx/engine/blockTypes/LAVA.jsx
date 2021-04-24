export default (() => {
  return {
    id: 6,
    spawnable: false,
    transparent: true,
    selflit: true,
    gravity: true,
    fluid: true,
    texture: (world, lightmap, lit, x, y, z, dir) => [
      13 / 16,
      14 / 16,
      14 / 16,
      15 / 16,
    ],
  };
})();
