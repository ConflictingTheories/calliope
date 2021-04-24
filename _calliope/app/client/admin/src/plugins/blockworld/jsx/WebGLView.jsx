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

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import glEngine from './engine/core';
import { MOUSE } from "./engine/enums"
//
const WebGLView = ({ width, height, SceneProvider, class: string }) => {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const engine = new glEngine(canvas, width, height);
    engine.init(SceneProvider);
    return () => {
      engine.close();
    };
  }, [SceneProvider]);

  return <canvas
    ref={ref}
    width={width}
    height={height}
    className={string}
    onKeyDownCapture={(e)=> SceneProvider.onKeyEvent(e.nativeEvent.key, true)}
    onKeyUpCapture={(e) => SceneProvider.onKeyEvent(e.nativeEvent.key, false)}
    onMouseUp={(e) => SceneProvider.onMouseEvent(e.nativeEvent.clientX, e.nativeEvent.clientY, MOUSE.UP, e.nativeEvent.button == 3)}
    onMouseDown={(e) => SceneProvider.onMouseEvent(e.nativeEvent.clientX, e.nativeEvent.clientY, MOUSE.DOWN, e.nativeEvent.button == 3)}
    onMouseMove={(e) => SceneProvider.onMouseEvent(e.nativeEvent.clientX, e.nativeEvent.clientY, MOUSE.MOVE, e.nativeEvent.button == 3)} />;
};

WebGLView.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  SceneProvider: PropTypes.object.isRequired,
  class: PropTypes.string.isRequired,
};

export default WebGLView;
