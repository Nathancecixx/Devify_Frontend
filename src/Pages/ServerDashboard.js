import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Paper,
    Container,
    AppBar,
    Toolbar,
    IconButton,
    Grid,
    Switch,
    FormControlLabel,
    useMediaQuery,
    useTheme,
    CircularProgress,
    SvgIcon, Link,
} from '@mui/material';
import { motion } from 'framer-motion';
import LogoIcon from '../Resources/Devify_Logo_icon.png';
import DiscordIcon from '../Resources/Icons/DiscordLogo.png';
import { ReactComponent as Checkmark_SVG } from "../Resources/Icons/Checkmark.svg";

function ServerDashboard() {
    const location = useLocation();
    const [server, setServer] = useState(location.state?.server || null);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [autoRoleAssignment, setAutoRoleAssignment] = useState(false); // New state for the toggle
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the templates!', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log("Updated templates state:", templates);
        console.log("server: ", server);
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

    const handleLogout = () => {
        window.location.href = 'http://localhost:5000/logout';
    };

    const handleBack = () => {
        window.location.href = 'http://localhost:3000/server-list';
    };

    const handleAutoRoleToggle = (event) => {
        const isChecked = event.target.checked;
        setAutoRoleAssignment(isChecked);

        // Send the updated setting to the server
        axios.post('http://localhost:5000/api/auto-role-assignment', { guild_id: server.id, enabled: isChecked }, { withCredentials: true })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(error => {
                console.error('There was an error updating auto role assignment!', error);
            });
    };

    return (
        <Box
            sx={{
                backgroundColor: '#36393F',
                color: '#FFFFFF',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* AppBar */}
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        paddingX: isMobile ? '10px' : '40px',
                        paddingY: '10px',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="h6"
                                    onClick={handleBack}
                                    sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                            Back
                        </Button>
                    </Box>

                    {/* Buttons */}
                    <Box>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#5865F2',
                                color: '#FFFFFF',
                                textTransform: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '6px 12px',
                                fontSize: '14px',
                                '&:hover': {
                                    backgroundColor: '#4752C4',
                                },
                            }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth="md" sx={{ flexGrow: 1, marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}>
                {isLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '60vh',
                        }}
                    >
                        <CircularProgress color="secondary" />
                        <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                            Loading dashboard...
                        </Typography>
                    </Box>
                ) : (
                    server && (
                        <Paper
                            elevation={3}
                            sx={{
                                padding: theme.spacing(4),
                                backgroundColor: '#2F3136',
                                color: '#FFFFFF',
                                borderRadius: '10px',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    marginBottom: theme.spacing(4),
                                }}
                            >
                                {server.icon ? (
                                    <img
                                        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                                        alt={`${server.name} icon`}
                                        style={{
                                            width: isMobile ? '80px' : '100px',
                                            height: isMobile ? '80px' : '100px',
                                            borderRadius: '20%',
                                            marginRight: theme.spacing(2),
                                        }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            width: isMobile ? '80px' : '100px',
                                            height: isMobile ? '80px' : '100px',
                                            borderRadius: '20%',
                                            backgroundColor: '#7289DA',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: theme.spacing(2),
                                        }}
                                    >
                                        <Typography variant="h3" color="#FFFFFF">
                                            {server.name.charAt(0)}
                                        </Typography>
                                    </Box>
                                )}
                                <Typography
                                    variant={isMobile ? 'h4' : 'h3'}
                                    sx={{ fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' }}
                                >
                                    {server.name} Dashboard
                                </Typography>
                            </Box>

                            {/* Bot Control Buttons */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: theme.spacing(4),
                                }}
                            >
                                {server.bot_in_server ? (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={removeBotFromServer}
                                        sx={{
                                            backgroundColor: '#E74C3C',
                                            color: '#FFFFFF',
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: '#C0392B',
                                            },
                                        }}
                                    >
                                        Remove Bot from Server
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={addBotToServer}
                                        sx={{
                                            backgroundColor: '#5865F2',
                                            color: '#FFFFFF',
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: '#4752C4',
                                            },
                                        }}
                                    >
                                        Add Bot to Server
                                    </Button>
                                )}
                            </Box>

                            {/* Conditional Content */}
                            {server.bot_in_server && (
                                <>
                                    {/* Auto Role Assignment Toggle */}
                                    <Box sx={{ marginBottom: theme.spacing(4) }}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={autoRoleAssignment}
                                                    onChange={handleAutoRoleToggle}
                                                    color="primary"
                                                />
                                            }
                                            label="Auto Role Assignment"
                                            sx={{
                                                color: '#FFFFFF',
                                                '.MuiFormControlLabel-label': {
                                                    fontSize: '1rem',
                                                },
                                            }}
                                        />
                                    </Box>

                                    {/* Template Selection */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#FFFFFF',
                                            marginBottom: theme.spacing(2),
                                        }}
                                    >
                                        Select a Template
                                    </Typography>
                                    <FormControl
                                        fullWidth
                                        variant="filled"
                                        sx={{
                                            marginBottom: theme.spacing(4),
                                            backgroundColor: '#40444B',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        <InputLabel sx={{ color: '#99AAB5' }}>Choose a template...</InputLabel>
                                        <Select
                                            value={selectedTemplate}
                                            onChange={e => setSelectedTemplate(e.target.value)}
                                            sx={{ color: '#FFFFFF' }}
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        bgcolor: '#2F3136',
                                                        color: '#FFFFFF',
                                                    },
                                                },
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
                                            sx={{
                                                backgroundColor: '#5865F2',
                                                color: '#FFFFFF',
                                                textTransform: 'none',
                                                '&:hover': {
                                                    backgroundColor: '#4752C4',
                                                },
                                            }}
                                        >
                                            Apply Template
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </Paper>
                    )
                )}
            </Container>

            {/* Footer */}
            <Box
                sx={{
                    backgroundColor: '#202225',
                    color: '#B9BBBE',
                    paddingY: theme.spacing(5),
                    textAlign: 'center',
                }}
                component="footer"
            >
                <Container maxWidth="md">
                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                        Designed, Developed, and Deployed by{' '}
                        <Link
                            href="https://www.nathanceci.com"
                            color="#7289DA"
                            underline="hover"
                            sx={{
                                fontWeight: 'bold',
                                marginLeft: '5px',
                                marginRight: '5px',
                            }}
                        >
                            Nathan Ceci
                        </Link>
                        and
                        <Link
                            href="#"
                            color="#7289DA"
                            underline="hover"
                            sx={{ fontWeight: 'bold', marginLeft: '5px' }}
                        >
                            Kyle
                        </Link>
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}

export default ServerDashboard;
