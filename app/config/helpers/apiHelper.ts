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

// Import HTTP Classes
// ...
//
import Authenticator from './authHelper';
import {logout} from '../services/auth';

var location : Location;

// API Helper Class
class ApiHelper {

    static host: string = process.env.ADMIN_HOST || "http://localhost"
    static port: number = parseInt(process.env.ADMIN_PORT || "8088")
    static ver: string = process.env.API_VERSION || "v1"

    static get = async (path: string, queryObj: any = {}) => {
        const requestOptions = {
            method: 'GET',
            headers: Authenticator.authHeader()
        };
        let query = Object.keys(queryObj).map((x) => '' + x + '=' + URLEncode(queryObj[x])).join('&') || '';
        return fetch(`${ApiHelper.host}:${ApiHelper.port}/api/${ApiHelper.ver}${path}?${query}`, requestOptions).then(handleResponse);
    }

    static post = async (path: string, bodyObj: any = {}) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...Authenticator.authHeader() },
            body: JSON.stringify(bodyObj)
        };
        return fetch(`${ApiHelper.host}:${ApiHelper.port}/api/${ApiHelper.ver}${path}`, requestOptions).then(handleResponse);
    }

    // put

    // delete

    // head
}


async function handleResponse(response:Response) {
    return response.text().then(async text => {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            if(location && (location.pathname === "/login" || location.pathname === "/logout")){
                await logout();
            }else{
                await logout();
                location && location.reload(true);
            }
        }else{
            const data = text && JSON.parse(text);
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        }
    });
}

export function previewFile(file:File, callback:any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }

export function URLEncode(str: string) {
    // TODO
    return str;
}

export default ApiHelper