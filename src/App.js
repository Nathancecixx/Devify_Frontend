import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, Container } from '@mui/material';
import LandingPage from "./Pages/LandingPage";
import NoPage from "./Pages/NoPage";
import Dashboard from "./Pages/ServerDashboard";
import ServerList from "./Pages/ServerList";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="server-list" element={<ServerList/>}/>
                    <Route path="/server/:guildId" element={<Dashboard />}/>
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
