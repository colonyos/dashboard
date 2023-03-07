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
import ExecutorsTab from '@pages/ExecutorsTab';
import Process from '@pages/Process';
import ProcessesTab from '@pages/ProcessesTab';
import WorkflowsTab from '@pages/WorkflowsTab';
import WorkflowTab from '@pages/WorkflowTab';
import Crons from '@pages/Crons';
import Functions from '@pages/Functions';
import Generators from '@pages/Generators';
import Server from '@pages/Server';
import Profile from '@pages/Profile';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

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
                        <Route path="/executors" element={<ExecutorsTab />} />
                        <Route path="/functions" element={<Functions />} />
                        <Route path="/process" element={<Process />} />
                        <Route path="/workflow" element={<WorkflowTab />} />
                        <Route path="/processes" element={<ProcessesTab />} />
                        <Route path="/workflows" element={<WorkflowsTab />} />
                        <Route path="/crons" element={<Crons />} />
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
