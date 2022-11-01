/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import WorkersView from './WorkersView';
import WorkersMapView from './WorkersMapView';
import RegisterWorkerView from './RegisterWorkerView';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { Component } from "react";

let interval = null

class WorkersTabs extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);
        this.nextTab = this.nextTab.bind(this);

        this.state = {
            key: "workers-tab"
        };
    }

    nextTab(key) {
        this.setState({ key: key })
    }

    handleSelect(key) {
        this.setState({ key });
    }

    render() {
        let tab1 = <Tab eventKey={"workers-tab"} title="Workers">
            <ContentHeader title="Workers" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <WorkersView />
                        </div>
                    </div>
                </div>
            </section>
        </Tab>;

        let tab2 = <Tab eventKey={"map-tab"} title="Map">
            <WorkersMapView />
        </Tab>;

        let tab3 = <Tab eventKey={"register-worker-tab"} title="Register Worker">
            <ContentHeader title="Register Worker" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <RegisterWorkerView tabs={this} />
                        </div>
                    </div>
                </div>
            </section>
        </Tab>;

        return (
            <Tabs
                defaultActiveKey="workers"
                activeKey={this.state.key}
                onSelect={this.handleSelect}>
                {tab1}
                {tab2}
                {tab3}
            </Tabs>
        );
    }
}

export default WorkersTabs;
