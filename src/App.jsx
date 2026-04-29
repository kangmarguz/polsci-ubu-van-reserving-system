import React from 'react';
import LoginPage from './pages/LoginPage';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
const App = () => {
    return (
        <div className="font-display">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <AppRoutes />
        </div>
    );
};

export default App;
