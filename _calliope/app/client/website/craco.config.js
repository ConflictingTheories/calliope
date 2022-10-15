/*                                            *\
** ------------------------------------------ **
**         Calliope - Site Generator   	      **
** ------------------------------------------ **
**  Copyright (c) 2020 - Kyle Derby MacInnis  **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

const CracoLessPlugin = require('craco-less');

const Env = require('../../config/env');
const themeSettings = require(`../../config/themes/${Env.CALLIOPE_THEME || 'default'}`);
const theme = Env.THEME_DARK ? themeSettings.dark : themeSettings.light;

module.exports = {
  plugins: [
    // LESS Support
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: theme,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};