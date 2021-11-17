/*                                                 *\
** ----------------------------------------------- **
**             Calliope - Site Generator   	       **
** ----------------------------------------------- **
**  Copyright (c) 2020-2021 - Kyle Derby MacInnis  **
**                                                 **
**    Any unauthorized distribution or transfer    **
**       of this work is strictly prohibited.      **
**                                                 **
**               All Rights Reserved.              **
** ----------------------------------------------- **
\*                                                 */

export class Coord {
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  add(vec) {
    return new Coord(this.x + vec.x, this.y + vec.y);
  }

  sub(vec) {
    return new Coord(this.x - vec.x, this.y - vec.y);
  }

  mul(n) {
    return new Coord(this.x * n, this.y * n);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  distance(vec) {
    return this.sub(vec).length();
  }

  normal() {
    if (this.x === 0 && this.y === 0) return new Coord(0, 0);
    const l = this.length();
    return new Coord(this.x / l, this.y / l);
  }

  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  toArray() {
    return [this.x, this.y];
  }

  toString() {
    return `( ${this.x}, ${this.y} )`;
  }

  negate() {
    return new Vector(this.x * -1, this.y * -1);
  }
}

export class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y, this.z + vec.z);
  }

  sub(vec) {
    return new Vector(this.x - vec.x, this.y - vec.y, this.z - vec.z);
  }

  mul(n) {
    return new Vector(this.x * n, this.y * n, this.z * n);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  distance(vec) {
    return this.sub(vec).length();
  }

  normal() {
    if (this.x === 0 && this.y === 0 && this.z === 0) return new Vector(0, 0, 0);
    const l = this.length();
    return new Vector(this.x / l, this.y / l, this.z / l);
  }

  dot(vec) {
    return this.x * vec.x + this.y * vec.y + this.z * vec.z;
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  toString() {
    return `( ${this.x}, ${this.y}, ${this.z} )`;
  }
  negate() {
    return new Vector(this.x * -1, this.y * -1, this.z * -1);
  }
}

export class Vector4 {
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  add(vec) {
    return new Vector4(this.x + vec.x, this.y + vec.y, this.z + vec.z, this.w + vec.w);
  }

  sub(vec) {
    return new Vector4(this.x - vec.x, this.y - vec.y, this.z - vec.z, this.w - vec.w);
  }

  mul(n) {
    return new Vector4(this.x * n, this.y * n, this.z * n, this.w * n);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }

  distance(vec) {
    return this.sub(vec).length();
  }

  normal() {
    if (this.x === 0 && this.y === 0 && this.z === 0 && this.w === 0) return new Vector4(0, 0, 0, 0);
    const l = this.length();
    return new Vector4(this.x / l, this.y / l, this.z / l, this.w / l);
  }

  dot(vec) {
    return this.x * vec.x + this.y * vec.y + this.z * vec.z + this.w * vec.w;
  }

  toArray() {
    return [this.x, this.y, this.z, this.w];
  }

  toString() {
    return `( ${this.x}, ${this.y}, ${this.z}, ${this.w} )`;
  }

  negate() {
    return new Vector(this.x * -1, this.y * -1, this.z * -1, this.w * -1);
  }
}

// lineRectCollide( line, rect )
//
// Checks if an axis-aligned line and a bounding box overlap.
// line = { y, x1, x2 } or line = { x, y1, y2 }
// rect = { x, y, size }

export function lineRectCollide(line, rect) {
  return (
    rect.y > line.y - rect.size / 2 &&
    rect.y < line.y + rect.size / 2 &&
    rect.x > line.x1 - rect.size / 2 &&
    rect.x < line.x2 + rect.size / 2
  );
}

// rectRectCollide( r1, r2 )
//
// Checks if two rectangles (x1, y1, x2, y2) overlap.

export function rectRectCollide(r1, r2) {
  if (r2.x1 > r1.x1 && r2.x1 < r1.x2 && r2.y1 > r1.y1 && r2.y1 < r1.y2) return true;
  if (r2.x2 > r1.x1 && r2.x2 < r1.x2 && r2.y1 > r1.y1 && r2.y1 < r1.y2) return true;
  if (r2.x2 > r1.x1 && r2.x2 < r1.x2 && r2.y2 > r1.y1 && r2.y2 < r1.y2) return true;
  if (r2.x1 > r1.x1 && r2.x1 < r1.x2 && r2.y2 > r1.y1 && r2.y2 < r1.y2) return true;
  return false;
}

// Push a Qua
export function pushQuad(v, p1, p2, p3, p4) {
  v.push(p1[0], p1[1], p1[2], p1[3], p1[4], p1[5], p1[6], p1[7], p1[8]);
  v.push(p2[0], p2[1], p2[2], p2[3], p2[4], p2[5], p2[6], p2[7], p2[8]);
  v.push(p3[0], p3[1], p3[2], p3[3], p3[4], p3[5], p3[6], p3[7], p3[8]);

  v.push(p3[0], p3[1], p3[2], p3[3], p3[4], p3[5], p3[6], p3[7], p3[8]);
  v.push(p4[0], p4[1], p4[2], p4[3], p4[4], p4[5], p4[6], p4[7], p4[8]);
  v.push(p1[0], p1[1], p1[2], p1[3], p1[4], p1[5], p1[6], p1[7], p1[8]);
}

// apply values from one vector to another
export function set(w, v) {
  v.x = w.x;
  v.y = w.y;
  v.z = w.z;
}

export function negate(vec, dest) {
  if(!dest) dest = new Vector(-vec.x,-vec.y,-vec.z);
  dest.x = -vec.x
  dest.y = -vec.y
  dest.z = -vec.z;
  return dest;
}

export function lerp(vec, vec2, lerp, dest) {
  if (!dest) {
    dest = vec;
  }

  dest.x = vec.x + lerp * (vec2.x - vec.x);
  dest.y = vec.y + lerp * (vec2.y - vec.y);
  dest.z = vec.z + lerp * (vec2.z - vec.z);

  return dest;
}
