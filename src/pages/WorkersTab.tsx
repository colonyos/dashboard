/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import { useNavigate } from "react-router-dom";
import WorkersView from './WorkersView';
import WorkersMapView from './WorkersMapView';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const WorkersTab = () => {
    const navigate = useNavigate();
    return (
        <Tabs defaultActiveKey="waiting-procs" className="mb-3">
            <Tab eventKey="waiting-procs" title="Registered Workers">
                <ContentHeader title="Registered Workers" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <WorkersView navigate={navigate} state={0} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
            <Tab eventKey="running-procs" title="Map">
                <WorkersMapView />
            </Tab>
        </Tabs >
    );
};

export default WorkersTab;
