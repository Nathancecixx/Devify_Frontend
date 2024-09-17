import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from "./Pages/LandingPage";
import NoPage from "./Pages/NoPage";
import Dashboard from "./Pages/ServerDashboard";
import ServerList from "./Pages/ServerList";
import './App.css';

function App() {
    return (
        <div className='app'>
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
