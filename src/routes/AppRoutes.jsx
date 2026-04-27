import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from '../pages/LoginPage';
import Layout from '../layout/Layout';
import RegisterPage from '../pages/RegisterPage';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC ROUTE */}
                <Route>
                    <Route path='/' element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* PRIVATE USER */}
                <Route path="/home" element={<Layout />}></Route>
                {/* PRIVATE ADMIN */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
