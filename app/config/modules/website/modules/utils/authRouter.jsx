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

import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';

// Authenticator
import Authenticator from '../../helpers/authHelper'

// Wrapper for Router
export const AuthenticatedRoute = ({component,...rest}) =>{
    let MyComp = component || React.Component;
    return (
    <Route {...rest} render={(props)=>
        Authenticator.isAuthenticated()
            ? <MyComp {...props} />
            : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />} />
    )
};