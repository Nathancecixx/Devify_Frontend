import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NoPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Container
            maxWidth="false"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                bgcolor: 'background.default'
            }}
        >
            <Typography variant="h1" gutterBottom sx={{color: 'text.error'}}>
                ERROR 404
            </Typography>
            <Typography variant="h5" gutterBottom sx={{color: 'text.primary'}}>
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Box mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGoHome}
                >
                    Get Back Home
                </Button>
            </Box>
        </Container>
    );
}

export default NoPage;
