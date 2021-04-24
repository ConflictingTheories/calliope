export default function vs() {
  return `
  attribute vec3 aVertexPosition;
  attribute vec4 aVertexColor;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying vec2 vTexCoord;
  varying vec4 vColor;

  void main(void) {
    gl_Position = uProjectionMatrix * uViewMatrix * ( uModelViewMatrix * vec4( aVertexPosition, 1.0 ) );
    vColor = aVertexColor;
    vTexCoord = aTextureCoord;
  }
`;
}
