import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
    ListItemIcon, SvgIcon, Button,
} from '@mui/material';

import { ReactComponent as Checkmark_SVG } from "../Resources/Icons/Checkmark.svg"

function ServerList() {
    const [servers, setServers] = useState([]);

    const navigate = useNavigate();

    const handleServerClick = (server) => {
        navigate(`/server/${server.id}`, { state: { server } });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/servers', { withCredentials: true })
            .then(response => {
                setServers(response.data.owned_guilds || []);
            })
            .catch(error => {
                console.error('There was an error fetching the servers!', error);
            });
    }, []);

    const handleLogout = () => {
        window.location.href = 'http://localhost:5000/logout';
    }

    return (
        <Box sx={{ backgroundColor: '#36393f', color: '#ffffff', minHeight: '100vh', padding: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#7289da', marginBottom: '40px' }}>
                Your Servers
            </Typography>
            <Button onClick={handleLogout}> Logout </Button>
            <Paper sx={{ backgroundColor: '#2f3136', padding: '20px', borderRadius: '10px' }}>
                <List>
                    {servers.map((server) => (
                        <ListItem
                            key={server.id}
                            onClick={() => handleServerClick(server)} // Add your onClick function here
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#23272a',
                                },
                                padding: '10px 20px',
                                borderRadius: '5px',
                                marginBottom: '10px',
                                color: '#ffffff'
                            }}
                        >
                            <ListItemText
                                primary={server.name}
                                primaryTypographyProps={{
                                    variant: 'h6',
                                    color: '#99aab5',
                                }}
                            />

                            {server.bot_in_server && (
                                <ListItemIcon>
                                    <SvgIcon component={Checkmark_SVG} inheritViewBox/>
                                </ListItemIcon>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}

export default ServerList;
