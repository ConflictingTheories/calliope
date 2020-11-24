/*                                            *\
** ------------------------------------------ **
**      	 Calliope Site Generator          **
** ------------------------------------------ **
**     Copyright (c) 2020 - KDM Solutions     **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

module.exports = {
    // API Config
    API_VERSION: process.env.API_VERSION,
    API_ROUTE_PATH: process.env.API_ROUTE_PATH,
    // Website Config
    WEBSITE_PORT: process.env.WEBSITE_PORT,
    // Admin Config
    ADMIN_PORT: process.env.ADMIN_PORT,
    // Datbase Config
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    // 3rd Party Services
    GOOGLE_APIKEY: process.env.GOOGLE_APIKEY,
    STRIPE_APIKEY: process.env.STRIPE_APIKEY,
    SENDGRID_APIKEY: process.env.SENDGRID_APIKEY,
    // Etherpad Config
    EP_API_KEY: process.env.EP_API_KEY,
    EP_HOST: process.env.EP_HOST,
    EP_PORT: process.env.EP_PORT,
    // Session Management
    SESSION_CONF: {
        secret: 'CP2020S1T3',
        cookie: { maxAge: 7*24*60*60 },
        resave: true,
        saveUninitialized: true
    },
    // Storage Driver Config
    STORAGE_TYPE: process.env.STORAGE_TYPE,
    STORAGE_ROOT: process.env.STORAGE_ROOT,
    // S3 Storage Options
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET: process.env.S3_BUCKET,
    // Feature Flags    
    ENABLE_AUTH: process.env.ENABLE_AUTH,
    ENABLE_CONTENT: process.env.ENABLE_CONTENT,
    // Theme Setting
    CALLIOPE_THEME: process.env.CALLIOPE_THEME,
    THEME_DARK: process.env.THEME_DARK
};