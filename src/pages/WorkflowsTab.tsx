/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import { useNavigate } from "react-router-dom";
import WorkflowsView from './WorkflowsView';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const WorkflowsTab = () => {
    const navigate = useNavigate();
    return (
        <Tabs defaultActiveKey="waiting-procs" className="mb-3">
            <Tab eventKey="waiting-procs" title="Waiting Workflows">
                <ContentHeader title="Waiting Workflows" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <WorkflowsView navigate={navigate} state={0} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
            <Tab eventKey="running-procs" title="Running Workflows">
                <ContentHeader title="Running Workflows" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <WorkflowsView navigate={navigate} state={1} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
            <Tab eventKey="successful-procs" title="Successful Workflows">
                <ContentHeader title="Successful Workflows" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <WorkflowsView navigate={navigate} state={2} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
            <Tab eventKey="failed-procs" title="Failed Workflows">
                <ContentHeader title="Failed Workflows" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <WorkflowsView navigate={navigate} state={3} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
        </Tabs >
    );
};

export default WorkflowsTab;
