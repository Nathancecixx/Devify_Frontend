import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";

function ServerDashboard({ match }) {
    const { guildId } = useParams();
    const [server, setServer] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/servers/${guildId}`, { withCredentials: true })
            .then(response => {
                setServer(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the server info!', error);
            });

        axios.get('http://localhost:5000/api/templates', { withCredentials: true })
            .then(response => {
                setTemplates(response.data);
                console.log(templates)
            })
            .catch(error => {
                console.error('There was an error fetching the templates!', error);
            });
    }, [guildId]);

    const addBotToServer = () => {
        axios.post('http://localhost:5000/api/add-bot', { guild_id: guildId }, { withCredentials: true })
            .then(response => {
                window.location.href = response.data.invite_url;
            })
            .catch(error => {
                console.error('There was an error adding the bot to the server!', error);
            });
    };

    const removeBotFromServer = () => {
        axios.post('http://localhost:5000/api/remove-bot', { guild_id: guildId }, { withCredentials: true })
            .then(response => {
                alert(response.data.message);
                setServer({ ...server, bot_in_server: false });
            })
            .catch(error => {
                console.error('There was an error removing the bot from the server!', error);
            });
    };

    const applyTemplate = () => {
        axios.post('http://localhost:5000/api/apply-template', { guild_id: guildId, template_key: selectedTemplate }, { withCredentials: true })
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.error('There was an error applying the template!', error);
            });
    };

    return (
        <div>
            {server && (
                <>
                    <h1>{server.name} Dashboard</h1>
                    {server.bot_in_server ? (
                        <button onClick={removeBotFromServer}>Remove Bot from Server</button>
                    ) : (
                        <button onClick={addBotToServer}>Add Bot to Server</button>
                    )}
                    <h2>Select a Template</h2>
                    <select value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)}>
                        <option value="">Choose a template...</option>
                        {templates.length > 0 && templates.map((template, index) => (
                            <option key={index} value={template.key}>{template.name}</option>
                        ))}
                    </select>
                    <button onClick={applyTemplate} disabled={!selectedTemplate}>Apply Template</button>
                </>
            )}
        </div>
    );
}

export default ServerDashboard;
