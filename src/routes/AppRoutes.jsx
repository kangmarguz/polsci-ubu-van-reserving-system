import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from '../pages/LoginPage';
import Layout from '../layout/Layout';
import RegisterPage from '../pages/RegisterPage';
import ProtectRoutes from './ProtectRoutes';
import PageNotFound404 from '../components/utils/PageNotFound404';
import MainHomePage from '../pages/user/MainHomePage';
import ReservVanPage from '../pages/user/ReservVanPage';
import ReservVanHistory from '../pages/user/ReservVanHistory';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC ROUTE */}
                <Route>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* PRIVATE USER */}
                <Route
                    path="/home"
                    element={<ProtectRoutes protect={<Layout />} />}
                >
                    <Route path="/home" element={<MainHomePage />} />
                    <Route path="reserv" element={<ReservVanPage />} />
                    <Route path="history" element={<ReservVanHistory />} />
                </Route>
                {/* PRIVATE ADMIN */}

                {/* NOT FOUND PAGE */}
                <Route path="*" element={<PageNotFound404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
