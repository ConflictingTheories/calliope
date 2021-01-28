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

module.exports = {
  /* Site Name */
  name: "Calliope",

  /* Reference (Entry point) */
  index: "XXAA",

  /* Site Map */
  sitemap: {
    menus: [],
    pages: [],
    posts: [],
  },

  /* Metadata tags */
  metadata: [
    {
      // Site Description (max 2000 chars)
      name: "description",
      value: "",
    },
    {
      // Keyword
      name: "keywords",
      value: ["static-site", "calliope"].join(","),
    },
    {
      // Viewport
      name: "viewport",
      value: "width=device-width, initial-scale=1.0",
    },
  ],

  /* Source / Content References */
  references: [
    {
      id: "XXAA",
      type: "page",
      links: [
        {
          protocol: "http",
          src: "/index.html",
        },
      ],
    },
  ],
};
