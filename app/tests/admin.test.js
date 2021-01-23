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

const {
    spawn
} = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {
    PORT: 4000
});
const child = spawn('node', ['bin/app.js'], {
    env
});

test('responds to requests', (t) => {
    t.plan(4);
    // Wait until the server is ready
    child.stdout.on('data', () => {
        // Make a request to our app
        request('http://127.0.0.1/', (error, response, body) => {
            // stop the server
            child.kill();
            // No error
            t.false(error);
            // Successful response
            t.equal(response.statusCode, 200);
        });
    });
});