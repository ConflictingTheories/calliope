import { Vector, Vector4 } from './vector';

// Color w/ Opacity
export function colorRGBA(r, g, b, a) {
  return new Vector4(r, g, b, a);
}

// Color
export function colorRGB(r, g, b) {
  return new Vector(r, g, b);
}

// Map to Points from Coordinates
export function textureCoordinates(a, b, c, d) {
  return [...a.toArray(), ...b.toArray(), ...c.toArray(), ...d.toArray()];
}

// Square
export function square(a, b, c, d, color) {
  const positions = [...a.toArray(), ...b.toArray(), ...c.toArray(), ...d.toArray()];
  const indices = [0, 1, 2, 0, 2, 3];
  let colors = [];
  colors = colors.concat(color.toArray(), color.toArray(), color.toArray(), color.toArray());
  return {
    positions,
    colors,
    indices,
  };
}

// Textured Square ([x,y],[x,y],[x,y])
export function texSquare(a, b, c, d, texPos) {
  const positions = [...a.toArray(), ...b.toArray(), ...c.toArray(), ...d.toArray()];
  const indices = [0, 1, 2, 0, 2, 3];
  return {
    positions,
    textureCoordinates: texPos.toArray(),
    indices,
  };
}
// Param Merge
export function paramMerge(models, key, offset = false, n = null) {
  let offsetCnt = 0;
  if (n) {
    offsetCnt = n;
  }
  return models.map(x => x[key]).reduce((res, j, i) => [...res, ...j.map(y => (offset ? y + offsetCnt * i : y))]);
}

// Merge Model Param
export function modelMerge(models) {
  const model = {
    positions: paramMerge(models, 'positions'),
    colors: paramMerge(models, 'colors'),
    indices: paramMerge(models, 'indices', true, 24),
  };
  return model;
}

// Cube at pos (x,y,z)
export function cube(pos, color = null) {
  const { x, y, z } = pos;

  const front = square(
    new Vector(x - 1, y - 1, z + 1),
    new Vector(x + 1, y - 1, z + 1),
    new Vector(x + 1, y + 1, z + 1),
    new Vector(x - 1, y + 1, z + 1),
    color || colorRGBA(0.1, 1.0, 1.0, 1.0),
  );

  const back = square(
    new Vector(x - 1, y - 1, z - 1),
    new Vector(x - 1, y + 1, z - 1),
    new Vector(x + 1, y + 1, z - 1),
    new Vector(x + 1, y - 1, z - 1),
    color || colorRGBA(1.0, 0.1, 1.0, 1.0),
  );

  const top = square(
    new Vector(x - 1, y + 1, z - 1),
    new Vector(x - 1, y + 1, z + 1),
    new Vector(x + 1, y + 1, z + 1),
    new Vector(x + 1, y + 1, z - 1),
    color || colorRGBA(1.0, 1.0, 1.0, 1.0),
  );

  const bottom = square(
    new Vector(x - 1, y - 1, z - 1),
    new Vector(x + 1, y - 1, z - 1),
    new Vector(x + 1, y - 1, z + 1),
    new Vector(x - 1, y - 1, z + 1),
    color || colorRGBA(0.5, 1.0, 0.1, 1.0),
  );

  const right = square(
    new Vector(x + 1, y - 1, z - 1),
    new Vector(x + 1, y + 1, z - 1),
    new Vector(x + 1, y + 1, z + 1),
    new Vector(x + 1, y - 1, z + 1),
    color || colorRGBA(1.0, 0.5, 0.1, 1.0),
  );

  const left = square(
    new Vector(x - 1, y - 1, z - 1),
    new Vector(x - 1, y - 1, z + 1),
    new Vector(x - 1, y + 1, z + 1),
    new Vector(x - 1, y + 1, z - 1),
   color || colorRGBA(0.5, 1.0, 1.0, 1.0),
  );
  const sides = [front, back, top, bottom, right, left];
  return {
    positions: paramMerge(sides, 'positions'),
    colors: paramMerge(sides, 'colors'),
    indices: paramMerge(sides, 'indices', true, 4),
  };
}

// Textured Cube at pos (x,y,z) with textureCoorArray([x,y,x,y,x,y,x,y],...)
export function texCube(pos, texPos) {
  const { x, y, z } = pos;

  const front = texSquare(
    new Vector(x - 1, y - 1, z + 1),
    new Vector(x + 1, y - 1, z + 1),
    new Vector(x + 1, y + 1, z + 1),
    new Vector(x - 1, y + 1, z + 1),
    textureCoordinates(...texPos[0]),
  );

  const back = texSquare(
    new Vector(x - 1, y - 1, z - 1),
    new Vector(x - 1, y + 1, z - 1),
    new Vector(x + 1, y + 1, z - 1),
    new Vector(x + 1, y - 1, z - 1),
    textureCoordinates(...texPos[1]),
  );

  const top = texSquare(
    new Vector(x - 1, y + 1, z - 1),
    new Vector(x - 1, y + 1, z + 1),
    new Vector(x + 1, y + 1, z + 1),
    new Vector(x + 1, y + 1, z - 1),
    textureCoordinates(...texPos[2]),
  );

  const bottom = texSquare(
    new Vector(x - 1, y - 1, z - 1),
    new Vector(x + 1, y - 1, z - 1),
    new Vector(x + 1, y - 1, z + 1),
    new Vector(x + 1, y - 1, z + 1),
    textureCoordinates(...texPos[3]),
  );

  const right = texSquare(
    new Vector(x + 1, y - 1, z - 1),
    new Vector(x + 1, y + 1, z - 1),
    new Vector(x + 1, y + 1, z + 1),
    new Vector(x + 1, y - 1, z + 1),
    textureCoordinates(...texPos[4]),
  );

  const left = texSquare(
    new Vector(x - 1, y - 1, z - 1),
    new Vector(x - 1, y - 1, z + 1),
    new Vector(x - 1, y + 1, z + 1),
    new Vector(x - 1, y + 1, z - 1),
    textureCoordinates(...texPos[5]),
  );

  return {
    positions: [
      ...front.positions,
      ...back.positions,
      ...top.positions,
      ...bottom.positions,
      ...right.positions,
      ...left.positions,
    ],
    textureCoordinates: [
      ...front.colors,
      ...back.colors,
      ...top.colors,
      ...bottom.colors,
      ...right.colors,
      ...left.colors,
    ],
    indices: [
      ...front.indices,
      ...back.indices.map(i => i + 4),
      ...top.indices.map(i => i + 8),
      ...bottom.indices.map(i => i + 12),
      ...right.indices.map(i => i + 16),
      ...left.indices.map(i => i + 20),
    ],
  };
}
