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

//
const WebGLView = ({ width, height, SceneProvider, class:string }) => {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const engine = new glEngine(canvas, width, height);
    engine.init(SceneProvider);
    return () => {
      engine.close();
    };
  }, [SceneProvider]);

  return <canvas ref={ref} width={width} height={height} className={string}/>;
};

WebGLView.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  SceneProvider: PropTypes.object.isRequired,
  class: PropTypes.string.isRequired,
};

export default WebGLView;
