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

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');   
const path = require('path');
const Env = require("../config/env");

let mainWindow;
 
function createWindow() {
    // Windows
    adminWindow = new BrowserWindow({
        width:800,
        height:600,
        show: false
    });

    // Load Admin Panel 
    const adminUrl = isDev ? `http://localhost:8899` : `file://${path.join(__dirname, '../admin/build/index.html')}`;
    adminWindow.loadURL(adminUrl);
    adminWindow.once('ready-to-show', () => adminWindow.show());
    adminWindow.on('closed', () => {
        adminWindow = null;
    });

      // Website Window
      mainWindow = new BrowserWindow({
        width:800,
        height:600,
        show: false
    });

    // Load Website Preview Panel 
    const startURL = isDev ? `http://localhost:8888` : `file://${path.join(__dirname, '../website/build/index.html')}`;
    mainWindow.loadURL(startURL);
    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    
}

app.on('ready', createWindow);
