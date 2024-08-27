import React, { useEffect } from 'react';
import { Box, Button, AppBar, Toolbar, Typography, Container, Grid, Paper, Link, Card, CardContent } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Logo_Icon from '../Resources/Devify_Logo_icon.png';

const LandingPage = () => {

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/login';
    };

    const serverTemplates = [
        { name: 'Gaming Community', description: 'Perfect for gamers to connect, share, and play together with custom channels and roles.' },
        { name: 'Study Group', description: 'Organize your study sessions with channels for subjects, resources, and group discussions.' },
        { name: 'Developer Hub', description: 'Bring developers together with project channels, code sharing, and collaboration tools.' },
        { name: 'Social Hangout', description: 'Create a relaxed space for friends to chat, share memes, and plan events.' }
    ];

    return (
        <Box sx={{ backgroundColor: '#36393f', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" sx={{ backgroundColor: '#7289da' }}>
                <Toolbar>
                    <img src={Logo_Icon} alt="Devify Logo" style={{ height: '40px', paddingRight: '20px' }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Devify
                    </Typography>
                    <Button color="inherit" onClick={handleLogin}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ marginTop: { xs: '20px', md: '40px' }, flexGrow: 1, padding: { xs: '0 10px', md: '0' } }}>
                {/* Artistic "Meet Devify" Section */}
                <Box data-aos="fade-up" sx={{ textAlign: 'center', padding: { xs: '20px 10px', md: '40px 20px' }, backgroundColor: '#2c2f33', borderRadius: '10px', marginBottom: { xs: '30px', md: '60px' } }}>
                    <Typography variant="h4" gutterBottom sx={{ fontFamily: 'sans-serif', fontWeight: 'bold', color: '#7289da', textShadow: '2px 2px #23272a', fontSize: { xs: '24px', md: '40px' } }}>
                        Meet Devify
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ fontFamily: 'sans-serif', color: '#ffffff', margin: { xs: '10px 0', md: '20px 0' }, fontSize: { xs: '16px', md: '20px' } }}>
                        Your ultimate Discord bot for managing servers with ease.
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#99aab5', fontSize: { xs: '14px', md: '16px' } }}>
                        Automate your server, enhance community engagement, and streamline development workflows with Devify.
                    </Typography>
                </Box>

                {/* Features Grid */}
                <Grid container spacing={2} sx={{ marginTop: { xs: '30px', md: '60px' }, marginBottom: { xs: '30px', md: '60px' } }}>
                    <Grid item xs={12} sm={6} data-aos="fade-right">
                        <Paper sx={{ padding: 2, textAlign: 'center', backgroundColor: '#2f3136', color: '#ffffff' }}>
                            <Typography variant="h6" sx={{ fontSize: { xs: '16px', md: '18px' } }}>Server Management</Typography>
                            <Typography variant="body2" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                                Automate your server setup with predefined templates and manage roles, channels, and more with ease.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} data-aos="fade-left">
                        <Paper sx={{ padding: 2, textAlign: 'center', backgroundColor: '#2f3136', color: '#ffffff' }}>
                            <Typography variant="h6" sx={{ fontSize: { xs: '16px', md: '18px' } }}>Developer Tools</Typography>
                            <Typography variant="body2" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                                Access a suite of tools designed for developers, including project management integrations, code sharing, and more.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} data-aos="fade-right">
                        <Paper sx={{ padding: 2, textAlign: 'center', backgroundColor: '#2f3136', color: '#ffffff' }}>
                            <Typography variant="h6" sx={{ fontSize: { xs: '16px', md: '18px' } }}>Community Building</Typography>
                            <Typography variant="body2" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                                Create a vibrant community with automated moderation, engagement tools, and fun server events.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} data-aos="fade-left">
                        <Paper sx={{ padding: 2, textAlign: 'center', backgroundColor: '#2f3136', color: '#ffffff' }}>
                            <Typography variant="h6" sx={{ fontSize: { xs: '16px', md: '18px' } }}>24/7 Support</Typography>
                            <Typography variant="body2" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                                Get help whenever you need it with our dedicated support team available around the clock.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Server Templates Section */}
                <Box sx={{ marginTop: { xs: '30px', md: '60px' }, marginBottom: { xs: '30px', md: '60px' } }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#7289da', textShadow: '1px 1px #23272a', fontSize: { xs: '24px', md: '32px' } }}>
                        Server Templates
                    </Typography>
                    <Grid container spacing={2}>
                        {serverTemplates.map((template, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up">
                                <Card sx={{ backgroundColor: '#2f3136', color: '#ffffff', borderRadius: '10px' }}>
                                    <CardContent sx={{ textAlign: 'center', padding: { xs: 1, md: 2 } }}>
                                        <Typography variant="h6" gutterBottom sx={{ color: '#7289da', fontSize: { xs: '16px', md: '18px' } }}>
                                            {template.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#99aab5', fontSize: { xs: '12px', md: '14px' } }}>
                                            {template.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
            <Box component="footer" sx={{ backgroundColor: '#2c2f33', color: '#ffffff', padding: 2, textAlign: 'center', marginTop: 'auto' }}>
                <Typography variant="body2" color="inherit">
                    © 2024 Devify. All rights reserved. | <Link href="#" color="inherit">Privacy Policy</Link> | <Link href="#" color="inherit">Terms of Service</Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;
