import React from 'react';

import { accountService } from '@/_services';

function Home() {
    const user = accountService.userValue;
    
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {user.userName}!</h1>
                <p>You're logged on!</p>
            </div>
        </div>
    );
}

export { Home };