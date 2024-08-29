import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useLocation, useParams} from 'react-router-dom';
import { Box, Button, Typography, MenuItem, Select, FormControl, InputLabel, Paper, Container } from '@mui/material';

function ServerDashboard() {
    const location = useLocation()
    const [server, setServer] = useState(location.state?.server || null);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/templates', { withCredentials: true })
            .then(response => {
                console.log("Templates data received:", response.data);

                // Convert the object into an array of { key, name } objects
                const templatesData = Object.keys(response.data).map(key => ({
                    key: key,
                    ...response.data[key]  // Spread the rest of the template data
                }));

                setTemplates(templatesData); // Now setTemplates will receive an array
            })
            .catch(error => {
                console.error('There was an error fetching the templates!', error);
            });
    }, []);

    useEffect(() => {
        console.log("Updated templates state:", templates);
        console.log("server: ", server)
    }, [templates, server]);

    const addBotToServer = () => {
        axios.post('http://localhost:5000/api/add-bot', { guild_id: server.id }, { withCredentials: true })
            .then(response => {
                window.location.href = response.data.invite_url;
            })
            .catch(error => {
                console.error('There was an error adding the bot to the server!', error);
            });
    };

    const removeBotFromServer = () => {
        axios.post('http://localhost:5000/api/remove-bot', { guild_id: server.id }, { withCredentials: true })
            .then(response => {
                alert(response.data.message);
                setServer({ ...server, bot_in_server: false });
            })
            .catch(error => {
                console.error('There was an error removing the bot from the server!', error);
            });
    };

    const applyTemplate = () => {
        axios.post('http://localhost:5000/api/apply-template', { guild_id: server.id, template_key: selectedTemplate }, { withCredentials: true })
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.error('There was an error applying the template!', error);
            });
    };

    return (
        <Box sx={{ backgroundColor: '#36393f', color: '#ffffff', minHeight: '100vh', padding: '20px' }}>
            <Container maxWidth="md">
                {server && (
                    <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#2f3136', color: '#ffffff', borderRadius: '10px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            {server.icon && (
                                <img
                                    src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                                    alt={`${server.name} icon`}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
                                />
                            )}
                            <Typography variant="h4" gutterBottom sx={{ color: '#7289da' }}>
                                {server.name} Dashboard
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center', marginBottom: '30px' }}>
                            {server.bot_in_server ? (
                                <Button variant="contained" color="secondary" onClick={removeBotFromServer}>
                                    Remove Bot from Server
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={addBotToServer}>
                                    Add Bot to Server
                                </Button>
                            )}
                        </Box>

                        {/* Conditionally render the "Select a Template" section */}
                        {server.bot_in_server && (
                            <>
                                <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                                    Select a Template
                                </Typography>
                                <FormControl fullWidth variant="filled" sx={{ marginBottom: '20px', backgroundColor: '#40444b', borderRadius: '5px' }}>
                                    <InputLabel sx={{ color: '#99aab5' }}>Choose a template...</InputLabel>
                                    <Select
                                        value={selectedTemplate}
                                        onChange={e => setSelectedTemplate(e.target.value)}
                                        sx={{ color: '#ffffff' }}
                                        inputProps={{
                                            MenuProps: {
                                                PaperProps: {
                                                    sx: {
                                                        bgcolor: '#2f3136',
                                                        color: '#ffffff'
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Choose a template...</em>
                                        </MenuItem>
                                        {templates.map((template, index) => (
                                            <MenuItem key={index} value={template.key}>
                                                {template.key}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={applyTemplate}
                                        disabled={!selectedTemplate}
                                    >
                                        Apply Template
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Paper>
                )}
            </Container>
        </Box>
    );
}

export default ServerDashboard;
