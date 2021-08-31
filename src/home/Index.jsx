import React from 'react';

import { accountService } from '@/_services';

function Home() {
    
    return (
        <div className="p-4">
            <div className="welcome">
                <p>Welcome!</p>
                <p>This site is under constant development</p>
                <p>Currently working on an interface to view other users</p>
            </div>
        </div>
    );
}

export { Home };