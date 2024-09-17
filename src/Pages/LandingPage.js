import React from 'react';
import {
    Box,
    Button,
    Typography,
    Container,
    Grid,
    Link,
    Card,
    CardContent,
    useMediaQuery,
    useTheme, AppBar, Toolbar, IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import LogoIcon from '../Resources/Devify_Logo_icon.png';
import DiscordIcon from '../Resources/Icons/DiscordLogo.png';

const LandingPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const serverTemplates = [
        {
            name: 'Gaming Community',
            description:
                'Connect with gamers using custom channels and roles tailored for gaming sessions.',
        },
        {
            name: 'Study Group',
            description:
                'Organize study sessions with channels for subjects, resources, and group discussions.',
        },
        {
            name: 'Developer Hub',
            description:
                'Collaborate with developers using project channels, code sharing, and integration tools.',
        },
        {
            name: 'Social Hangout',
            description:
                'Create a space for friends to chat, share content, and plan events together.',
        },
    ];

    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/login';
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
            <AppBar
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

                    {/* Login Button */}
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#5865F2',
                            color: '#FFFFFF',
                            textTransform: 'none',
                            display: isMobile ? 'none' : 'flex',
                            alignItems: 'center',
                            padding: '6px 12px',
                            fontSize: '14px',
                            '&:hover': {
                                backgroundColor: '#4752C4',
                            },
                        }}
                        startIcon={
                            <img
                                src={DiscordIcon}
                                alt="Discord Icon"
                                style={{ width: '27px', height: '20px' }}
                            />
                        }
                        onClick={handleLogin}
                    >
                        Login with Discord
                    </Button>

                    {/* Mobile Menu Icon */}
                    {isMobile && (
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleLogin}
                        >
                            <img
                                src={DiscordIcon}
                                alt="Discord Icon"
                                style={{ width: '35px', height: '28px' }}
                            />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #7289DA 30%, #99AAB5 100%)',
                    //padding: theme.spacing(8, 2),
                    textAlign: 'center',
                    overflow: 'hidden',
                    flexGrow: 1,
                    display: 'flex',
                    height: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Hero Background */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #7289DA 30%, #99AAB5 100%)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.1,
                    }}
                />

                {/* Hero Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ zIndex: 1 }} // Ensure content is above background
                >
                    <img
                        src={LogoIcon}
                        alt="Devify Logo"
                        style={{
                            width: isMobile ? '120px' : '160px',
                            marginBottom: theme.spacing(3),
                            filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))',
                        }}
                    />

                    <Typography
                        variant={isMobile ? 'h4' : 'h2'}
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: theme.spacing(2),
                            color: '#FFFFFF',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        }}
                    >
                        Meet Devify
                    </Typography>

                    <Typography
                        variant={isMobile ? 'body1' : 'h5'}
                        sx={{
                            marginBottom: theme.spacing(4),
                            color: '#DCDDDE',
                            maxWidth: '600px',
                            marginX: 'auto',
                            paddingX: theme.spacing(2),
                        }}
                    >
                        Your ultimate Discord bot for managing development servers with ease.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#5865F2',
                            color: '#FFFFFF',
                            padding: isMobile ? '8px 24px' : '12px 36px',
                            fontSize: isMobile ? '16px' : '18px',
                            textTransform: 'none',
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: '#4752C4',
                            },
                        }}
                        onClick={handleLogin}
                    >
                        Get Started
                    </Button>
                </motion.div>
            </Box>

            {/* Features Section */}
            <Container sx={{ paddingY: theme.spacing(8) }}>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginBottom: theme.spacing(5),
                        color: '#7289DA',
                    }}
                >
                    Features
                </Typography>
                <Grid container spacing={4}>
                    {[
                        {
                            title: 'Server Management',
                            description:
                                'Automate server setup with templates, manage roles, channels, and more.',
                        },
                        {
                            title: 'Developer Tools',
                            description:
                                'Access tools like project management integrations and code sharing.',
                        },
                        {
                            title: 'Community Building',
                            description:
                                'Enhance engagement with moderation tools and server events.',
                        },
                        {
                            title: '24/7 Support',
                            description:
                                'Our dedicated support team is available around the clock.',
                        },
                    ].map((feature, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card
                                    sx={{
                                        backgroundColor: '#2F3136',
                                        color: '#FFFFFF',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 'bold', marginBottom: '10px' }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="#B9BBBE">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Server Templates Section */}
            <Box sx={{ backgroundColor: '#2F3136', paddingY: theme.spacing(8) }}>
                <Container>
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            marginBottom: theme.spacing(5),
                            color: '#7289DA',
                        }}
                    >
                        Server Templates
                    </Typography>
                    <Grid container spacing={4}>
                        {serverTemplates.map((template, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor: '#202225',
                                            color: '#FFFFFF',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 'bold', marginBottom: '10px' }}
                                            >
                                                {template.name}
                                            </Typography>
                                            <Typography variant="body2" color="#B9BBBE">
                                                {template.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Call to Action Section */}
            <Box
                sx={{
                    backgroundColor: '#7289DA',
                    paddingY: theme.spacing(8),
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant={isMobile ? 'h5' : 'h4'}
                    sx={{ fontWeight: 'bold', marginBottom: theme.spacing(3) }}
                >
                    Ready to Enhance Your Server?
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        backgroundColor: '#5865F2',
                        padding: isMobile ? '8px 24px' : '10px 30px',
                        fontSize: isMobile ? '16px' : '18px',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#4752C4',
                        },
                    }}
                    onClick={handleLogin}
                >
                    Add to Discord
                </Button>
            </Box>

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
};

export default LandingPage;
