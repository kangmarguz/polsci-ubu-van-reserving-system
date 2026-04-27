import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from '../pages/LoginPage';
import Layout from '../layout/Layout';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC ROUTE */}
                <Route path="/" element={<LoginPage />}></Route>

                {/* PRIVATE USER */}
                <Route path="/home" element={<Layout />}></Route>
                {/* PRIVATE ADMIN */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
