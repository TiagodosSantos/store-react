import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Customer from './Pages/Customer/Customer';
import Invoice from './Pages/Invoice/Invoice';
import Login from './Pages/Login/Login';
import Logout from './Pages/Logout/Logout';
import NotFound from './Pages/NotFound/NotFound';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact={true} component={Customer} />
            <Route path='/invoices' exact={true} component={Invoice} />
            <Route exact path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
