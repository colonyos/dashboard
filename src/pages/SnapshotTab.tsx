/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import { useNavigate } from "react-router-dom";
import Filesystem from './Filesystem';
import Snapshot from './Snapshot';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const SnapshotTab = () => {
    const navigate = useNavigate();
    return (
        <Tabs defaultActiveKey="snapshots" className="mb-3">
            <Tab eventKey="filesystem" title="Labels">
                <ContentHeader title="Files" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <Filesystem navigate={navigate} state={0} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
            <Tab eventKey="snapshots" title="Snapshots">
                <ContentHeader title="Snapshots" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <Snapshot navigate={navigate} state={0} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
        </Tabs >
    );
};

export default SnapshotTab;
