import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
import { useWindowSize } from '@app/hooks/useWindowSize';
import { calculateWindowSize } from '@app/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowSize } from '@app/store/reducers/ui';

import Dashboard from '@pages/Dashboard';
import Blank from '@pages/Blank';
import Workers from '@pages/Workers';
import PendingProcesses from '@pages/PendingProcesses';
import RunningProcesses from '@pages/RunningProcesses';
import SuccessfulProcesses from '@pages/SuccessfulProcesses';
import FailedProcesses from '@pages/FailedProcesses';
import PendingWorkflows from '@pages/PendingWorkflows';
import RunningWorkflows from '@pages/RunningWorkflows';
import SuccessfulWorkflows from '@pages/SuccessfulWorkflows';
import FailedWorkflows from '@pages/FailedWorkflows';
import Cron from '@pages/Cron';
import Generators from '@pages/Generators';
import Server from '@pages/Server';
import SubMenu from '@pages/SubMenu';
import Profile from '@pages/Profile';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import Crypto from './colonies/crypto/wasm_exec.js';

let c = new Crypto();
c.load().then(() => {
    console.log(c.prvkey())
})


const App = () => {
    const windowSize = useWindowSize();
    const screenSize = useSelector((state: any) => state.ui.screenSize);
    const dispatch = useDispatch();

    useEffect(() => {
        const size = calculateWindowSize(windowSize.width);
        if (screenSize !== size) {
            dispatch(setWindowSize(size));
        }
    }, [windowSize]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Main />}>
                        <Route path="/sub-menu-2" element={<Blank />} />
                        <Route path="/sub-menu-1" element={<SubMenu />} />
                        <Route path="/blank" element={<Blank />} />
                        <Route path="/workers" element={<Workers />} />
                        <Route path="/pendingprocesses" element={<PendingProcesses />} />
                        <Route path="/runningprocesses" element={<RunningProcesses />} />
                        <Route path="/successfulprocesses" element={<SuccessfulProcesses />} />
                        <Route path="/failedprocesses" element={<FailedProcesses />} />
                        <Route path="/pendingworkflows" element={<PendingWorkflows />} />
                        <Route path="/runningworkflows" element={<RunningWorkflows />} />
                        <Route path="/successfulworkflows" element={<SuccessfulWorkflows />} />
                        <Route path="/failedworkflows" element={<FailedWorkflows />} />
                        <Route path="/cron" element={<Cron />} />
                        <Route path="/generators" element={<Generators />} />
                        <Route path="/server" element={<Server />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Dashboard />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer
                autoClose={3000}
                draggable={false}
                position="top-right"
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnHover
            />
        </BrowserRouter>
    );
};

export default App;
