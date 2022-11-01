/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import { useNavigate } from "react-router-dom";
import ProcessGraphView from './ProcessGraphView';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const WorkflowTab = () => {
    const navigate = useNavigate();
    return (
        <Tabs defaultActiveKey="waiting-procs" className="mb-3">
            <Tab eventKey="waiting-procs" title="Processgraph">
                <ContentHeader title="Processgraph" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <ProcessGraphView />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
        </Tabs >
    );
};

export default WorkflowTab;
