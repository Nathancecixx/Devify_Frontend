import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
    ListItemIcon,
    SvgIcon,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Container,
    CircularProgress,
    useMediaQuery,
    useTheme,
    Grid,
    Card,
    CardContent, Link,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ReactComponent as Checkmark_SVG } from "../Resources/Icons/Checkmark.svg";
import LogoIcon from '../Resources/Devify_Logo_icon.png';
import DiscordIcon from '../Resources/Icons/DiscordLogo.png';

function ServerList() {
    const [servers, setServers] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleServerClick = (server) => {
        navigate(`/server/${server.id}`, { state: { server } });
    };

    // Function to fetch servers from API
    const fetchServers = () => {
        setLoading(true);
        axios
            .get('http://localhost:5000/api/servers', { withCredentials: true })
            .then((response) => {
                console.log('Response data:', response.data);
                const serversData = response.data.owned_guilds || [];
                setServers(serversData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was an error fetching the servers!', error);
                setError(error);
                setLoading(false);
            });
    };

    // Handle reload button click
    const handleReload = () => {
        fetchServers(); // Fetch fresh data from API
    };

    useEffect(() => {
        fetchServers();
    }, []);

    const handleLogout = () => {
        window.location.href = 'http://localhost:5000/logout';
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
                        backgroundColor: '#2F3136',
                        paddingY: '10px',
                    }}
                >

                    <Box sx={{ ml: 5, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h1">
                            Devify
                        </Typography>
                    </Box>

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
            <Container sx={{ flexGrow: 1, marginTop: theme.spacing(10), marginBottom: theme.spacing(4) }}>
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
                            Loading your servers...
                        </Typography>
                    </Box>
                ) : error ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '60vh',
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: theme.spacing(2) }}>
                            There was an error fetching the servers.
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleReload}
                            sx={{
                                backgroundColor: '#5865F2',
                                color: '#FFFFFF',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#4752C4',
                                },
                            }}
                        >
                            Retry
                        </Button>
                    </Box>
                ) : servers.length === 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '60vh',
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: theme.spacing(2) }}>
                            No servers found.
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleReload}
                            sx={{
                                backgroundColor: '#5865F2',
                                color: '#FFFFFF',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#4752C4',
                                },
                            }}
                        >
                            Reload
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Typography
                            variant="h4"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginBottom: theme.spacing(5),
                                color: '#7289DA',
                            }}
                        >
                            Your Servers
                        </Typography>
                        <Grid container spacing={4}>
                            {servers.map((server, index) => (
                                <Grid item xs={12} sm={6} md={4} key={server.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card
                                            sx={{
                                                backgroundColor: '#2F3136',
                                                color: '#FFFFFF',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                transition: 'transform 0.3s ease',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: '#202225',
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                            onClick={() => handleServerClick(server)}
                                        >
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between', // This pushes items to the edges
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        {/* Server Icon or Placeholder */}
                                                        {server.icon ? (
                                                            <img
                                                                src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                                                                alt={`${server.name} Icon`}
                                                                style={{
                                                                    width: '50px',
                                                                    height: '50px',
                                                                    borderRadius: '8px',
                                                                    marginRight: theme.spacing(2),
                                                                }}
                                                            />
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    width: '50px',
                                                                    height: '50px',
                                                                    borderRadius: '8px',
                                                                    backgroundColor: '#7289DA',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    marginRight: theme.spacing(2),
                                                                }}
                                                            >
                                                                <Typography variant="h5" color="#FFFFFF">
                                                                    {server.name.charAt(0)}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                        <Typography
                                                            variant="h6"
                                                            sx={{ fontWeight: 'bold', color: '#FFFFFF' }}
                                                        >
                                                            {server.name}
                                                        </Typography>
                                                    </Box>

                                                    {server.bot_in_server && (
                                                        <SvgIcon
                                                            component={Checkmark_SVG}
                                                            inheritViewBox
                                                            sx={{ color: '#43B581', width: '24px', height: '24px' }}
                                                        />
                                                    )}
                                                </Box>

                                                <Typography
                                                    variant="body2"
                                                    color="#B9BBBE"
                                                    sx={{ marginTop: theme.spacing(2) }}
                                                >
                                                    Server ID: {server.id}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </>
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

export default ServerList;
