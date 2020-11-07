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

// Auth Helper Class
class Authenticator {

    // Return Auth Header with Token
    static authHeader() {
        let user = JSON.parse(localStorage.getItem('user')||'{}');
        if (user && user.authdata) {
            return { 'Authorization': 'Basic ' + user.authdata };
        } else {
            return {'Authorization':''};
        }
    }

    // Checkf for Auth Status (TODO :: No Authentication Required)
    static isAuthenticated() {
        return true;
    };

    // Set Auth Data (local / session)
    static setAuthData(authdata:any){
        let user = JSON.parse(localStorage.getItem('user')||'{}');
        user.authdata = authdata;
        localStorage.setItem('user',user);
        sessionStorage.setItem('user', user);
    }

    // Clear Auth Data (local / session)
    static clearAuthData(){
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
    }
}

export default Authenticator