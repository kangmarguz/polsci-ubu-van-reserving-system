import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from '../pages/LoginPage';
import Layout from '../layout/Layout';
import LayoutAdmin from '../layout/LayoutAdmin';
import RegisterPage from '../pages/RegisterPage';
import ProtectRoutes from './ProtectRoutes';
import PageNotFound404 from '../components/utils/PageNotFound404';
import MainHomePage from '../pages/user/MainHomePage';
import ReservVanHistory from '../pages/user/ReservVanHistory';
import AdminHomePage from '../pages/admin/AdminHomePage';
import AdminManagBooking from '../pages/admin/AdminManagBooking';
import ReservVanBookingPage from '../pages/user/ReservVanBookingPage';
import AdminManageUsers from '../pages/admin/AdminManageUsers';
import EditProfilePage from '../pages/EditProfilePage';

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
                    <Route path="/home/booking" element={<ReservVanBookingPage />} />
                    <Route path="/home/history" element={<ReservVanHistory />} />
                    <Route path="/profile" element={<EditProfilePage />} />
                </Route>

                {/* PRIVATE ADMIN ROUTES */}
                <Route
                    element={<ProtectRoutes protect={<LayoutAdmin />} allowedRole="ADMIN" />}
                >
                    <Route path="/admin" element={<AdminHomePage />} />
                    <Route path="/admin/manage" element={<AdminManagBooking />} />
                    <Route path="/admin/users" element={<AdminManageUsers />} />
                </Route>

                {/* NOT FOUND PAGE */}
                <Route path="*" element={<PageNotFound404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
