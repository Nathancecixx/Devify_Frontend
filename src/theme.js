import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7289da', // Discord Blurple
        },
        secondary: {
            main: '#424549', // Darker grey
        },
        background: {
            default: '#36393e', // Background grey
            paper: '#424549',   // Paper background
        },
        text: {
            primary: '#ffffff', // White text
            secondary: '#b9bbbe', // Lighter grey text
        },
        error: {
            main: '#e53e3e', // Error red
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#ffffff',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#ffffff',
        },
        body1: {
            fontSize: '1rem',
            color: '#b9bbbe',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
});

export default theme;
