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

// Main Patterns Object
const Error = function() {
    
    let errorStack = [];
    
    // Add Error To Stack
    function pushError(err) {
        errorStack.push(err);
        return errorStack.length;
    }
    
    // Return Error Stack
    function getErrorStack() {
        return errorStack;
    }
    
    // Format Error Object
    function formatError(msg, status, data) {
        return {
            msg: msg,
            status: status,
            err: data
        };
    }
    
    // Global Function
    function setError(msg, status, data) {
        return pushError(formatError(msg, status, data));
    }
    
    // Clear and Return Error Stack
    function clrError() {
        let ret = getErrorStack();
        errorStack = [];
        return ret;
    }
    
    // Boolean has errors
    function isErrored() {
        if (errorStack.length > 0) {
            return true
        } else {
            return false
        }
    }
    
    // Send Error to Front
    function sendError(res) {
        let errArr = clrError();
        let msg = ["<h3>Error:</h3>"];
        let status = 500;
        msg.push("<ul>")
        for (i of errArr) {
            status = i.status;
            msg.push("<li>" + JSON.stringify(i) + "</li>");
        }
        msg.push("</ul>");
        // Return Error
        res.status(status).send(msg.join(""));
    }
    
    // Return Object
    return {
        setError: setError,
        getErrorStack: getErrorStack,
        isErrored: isErrored,
        clrError: clrError,
        formatError: formatError,
        sendError: sendError
    };
};

module.exports = Error();