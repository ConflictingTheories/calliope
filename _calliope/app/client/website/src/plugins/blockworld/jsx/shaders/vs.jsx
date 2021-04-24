export default function vs() {
  return `
  attribute vec4 aVertexPosition;
  attribute vec2 aTextureCoord;
  attribute vec4 aVertexColor;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying highp vec2 vTexCoord;
  varying lowp vec4 vColor;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
    vTexCoord = aTextureCoord;
  }
`;
}
