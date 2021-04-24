/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WebGL from './engine/WebGL';

const GLView = ({ width, height, Scene }) => {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const webGL = new WebGL(canvas, width, height);
    webGL.init(Scene);
    return () => {
      webGL.close();
    };
  }, [Scene]);

  return <canvas ref={ref} width={width} height={height} />;
};

GLView.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  Scene: PropTypes.object.isRequired,
};

export default GLView;
