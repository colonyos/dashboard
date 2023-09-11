/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import { useNavigate } from "react-router-dom";
import Files from './Files';
import Snapshots from './Snapshots';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const FilesTab = () => {
    const navigate = useNavigate();
    return (
        <Tabs defaultActiveKey="waiting-procs" className="mb-3">
            <Tab eventKey="waiting-procs" title="Labels">
                <ContentHeader title="Files" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <Files navigate={navigate} state={0} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
            <Tab eventKey="running-procs" title="Snapshots">
                <ContentHeader title="Snapshots" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <Snapshots navigate={navigate} state={0} />
                            </div>
                        </div>
                    </div>
                </section>
            </Tab>
        </Tabs >
    );
};

export default FilesTab;
