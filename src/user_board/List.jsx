import React, { useState, useEffect } from 'react';
import { accountService } from '@/_services';
import { Link } from 'react-router-dom';

function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);
    useEffect(() => {
        accountService.getUserList().then(x => setUsers(x));
    }, []);
    return (
        <div>
            <h1>Users</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.userName}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/stash/${user.id}`} className="btn btn-sm btn-primary mr-1">View Stash</Link>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };