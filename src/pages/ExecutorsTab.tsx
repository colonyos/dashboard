/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import ExecutorsView from './ExecutorsView';
import ExecutorsMapView from './ExecutorsMapView';
import RegisterExecutorView from './RegisterExecutorView';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { Component } from "react";
import { global } from '../global'

let interval = null

class ExecutorsTabs extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);
        this.nextTab = this.nextTab.bind(this);

        this.state = {
            key: "executors-tab"
        };
    }

    nextTab(key) {
        this.setState({ key: key })
    }

    handleSelect(key) {
        this.setState({ key });
    }

    render() {
        let tab1 = <Tab eventKey={"executors-tab"} title="Executors">
            <ContentHeader title="Executors" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <ExecutorsView />
                        </div>
                    </div>
                </div>
            </section>
        </Tab>;

        let tab2 = <Tab eventKey={"map-tab"} title="Map">
            <ExecutorsMapView />
        </Tab>;

        let tab3 = <Tab eventKey={"register-worker-tab"} title="Register Executor">
            <ContentHeader title="Register Executor" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <RegisterExecutorView tabs={this} />
                        </div>
                    </div>
                </div>
            </section>
        </Tab>;

        if (global.colonyPrvKey == "") {
            return (
                <Tabs
                    defaultActiveKey="executors"
                    activeKey={this.state.key}
                    onSelect={this.handleSelect}>
                    {tab1}
                    {tab2}
                </Tabs>
            );
        } else {
            return (
                <Tabs
                    defaultActiveKey="executors"
                    activeKey={this.state.key}
                    onSelect={this.handleSelect}>
                    {tab1}
                    {tab2}
                    {tab3}
                </Tabs>
            );
        }
    }
}

export default ExecutorsTabs;
