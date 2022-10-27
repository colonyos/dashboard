/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import { useNavigate } from "react-router-dom";
import ProcessesView from './ProcessesView';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ProcessesTab = () => {
    const navigate = useNavigate();
    return (
        <Tabs defaultActiveKey="waiting-procs" className="mb-3">
            <Tab eventKey="waiting-procs" title="Waiting Processes">
                <ContentHeader title="Waiting Processes" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <ProcessesView navigate={navigate} state={0} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
            <Tab eventKey="running-procs" title="Running Processes">
                <ContentHeader title="Running Processes" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <ProcessesView navigate={navigate} state={1} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
            <Tab eventKey="successful-procs" title="Successful Processes">
                <ContentHeader title="Successful Processes" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <ProcessesView navigate={navigate} state={2} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
            <Tab eventKey="failed-procs" title="Failed Processes">
                <ContentHeader title="Failed Processes" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <ProcessesView navigate={navigate} state={3} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
        </Tabs >
    );
};

export default ProcessesTab;
