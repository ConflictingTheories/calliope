export default function vs() {
  return `
  uniform mat4 uModelMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uProjMatrix;

  attribute vec3 aPos;
  attribute vec4 aColor;
  attribute vec2 aTexCoord;

  varying vec4 vColor;
  varying vec2 vTexCoord;

  void main(void) {
    gl_Position = uProjMatrix * uViewMatrix * ( uModelMatrix * vec4( aPos, 1.0 ) );
    vColor = aColor;
    vTexCoord = aTexCoord;
  }
`;
}
