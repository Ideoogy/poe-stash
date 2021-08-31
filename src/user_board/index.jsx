import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { Stash } from './Stash';
import { Login } from './Login';

function UserBoard({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/stash/:id`} render={({match}) => <Stash id={match.params}/> }/>
        </Switch>
    );
}

export { UserBoard };