import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Customer from './Pages/Customer/Customer';
import NotFound from './Pages/NotFound/NotFound';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact={true} component={Customer} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
