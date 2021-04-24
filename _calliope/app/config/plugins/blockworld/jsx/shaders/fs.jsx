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
export default function fs() {
  return `
  precision highp float;
  uniform sampler2D uSampler;
  varying vec4 vColor;
  varying vec2 vTexCoord;
  void main(void) {
    vec4 color = texture2D( uSampler, vec2( vTexCoord.s, vTexCoord.t ) ) * vec4( vColor.rgb, 1.0 );
  	if ( color.a < 0.1 ) discard;
  	gl_FragColor = vec4( color.rgb, vColor.a );
  }
`;
}
