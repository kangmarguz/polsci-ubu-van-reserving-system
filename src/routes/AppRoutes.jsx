import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from '../pages/LoginPage';
import Layout from '../layout/Layout';
import LayoutAdmin from '../layout/LayoutAdmin';
import RegisterPage from '../pages/RegisterPage';
import ProtectRoutes from './ProtectRoutes';
import PageNotFound404 from '../components/utils/PageNotFound404';
import MainHomePage from '../pages/user/MainHomePage';
import ReservVanPage from '../pages/user/ReservVanPage';
import ReservVanHistory from '../pages/user/ReservVanHistory';
import ManageVanReservPage from '../pages/admin/AdminHomePage';
import useClientStore from '../store/client.store';
import AdminHomePage from '../pages/admin/AdminHomePage';

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC ROUTE */}
                <Route>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* PRIVATE USER ROUTES */}
                <Route
                    element={<ProtectRoutes protect={<Layout />} />}
                >
                    <Route path="/home" element={<MainHomePage />} />
                    <Route path="/home/booking" element={<ReservVanPage />} />
                    <Route path="/home/history" element={<ReservVanHistory />} />
                </Route>

                {/* PRIVATE ADMIN ROUTES */}
                <Route
                    element={<ProtectRoutes protect={<LayoutAdmin />} allowedRole="ADMIN" />}
                >
                    <Route path="/admin" element={<AdminHomePage />} />
                </Route>

                {/* NOT FOUND PAGE */}
                <Route path="*" element={<PageNotFound404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
