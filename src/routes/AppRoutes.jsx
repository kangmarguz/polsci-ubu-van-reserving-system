import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from '../pages/LoginPage';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
