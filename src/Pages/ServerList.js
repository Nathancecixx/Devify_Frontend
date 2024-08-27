import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ServerList() {
    const [servers, setServers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/servers', { withCredentials: true })
            .then(response => {
                setServers(response.data.owned_guilds || []);
            })
            .catch(error => {
                console.error('There was an error fetching the servers!', error);
            });
    }, []);

    return (
        <div>
            <h1>Your Servers</h1>
            <ul>
                {servers.map((server) => (
                    <li key={server.id}>
                        <Link to={`/server/${server.id}`}>
                            {server.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ServerList;
