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

import ApiHelper from '../helpers/apiHelper';
import AuthHelper from '../helpers/authHelper';

export async function check() {
    return ApiHelper.get(`/auth`)
    .then((user:any) => {
        // login successful if there's a response object in the response
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('user', JSON.stringify(user));
        }
        return {
            isAuth: AuthHelper.isAuthenticated(),
        };
    });
}

export async function login(username: string, password:string) {
    const reqBody = { username, password };
    return ApiHelper.post(`/auth/login`, reqBody)
    .then((user:any) => {
        // login successful if there's a user in the response
        if (user) {
            user.authdata = JSON.stringify(user);
            localStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('user', JSON.stringify(user));
        }
        return user;
    });
}

export async function logout() {
    return ApiHelper.post(`/auth/logout`)
    .then(()=>{
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
    })

}

export async function getAll() {
    return await ApiHelper.get(`/users`);
}

