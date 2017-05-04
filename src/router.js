/**
 * Created by juanleyba on 5/3/17.
 */
import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import LogoutComponent from './components/Logout';

export default (
    <div>
        <Route path="/" component={App}/>
        <Route path="/logout" component={LogoutComponent}/>
    </div>
);