/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import ExecutorsView from './ExecutorsView';
import User from './User';
import UsersView from './UsersView';
import ExecutorsMapView from './ExecutorsMapView';
import RegisterExecutorView from './RegisterExecutorView';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { Component } from "react";
import { global } from '../global'

let interval = null

class UsersTabs extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);
        this.nextTab = this.nextTab.bind(this);

        this.state = {
            key: "user-tab"
        };
    }

    nextTab(key) {
        this.setState({ key: key })
    }

    handleSelect(key) {
        this.setState({ key });
    }

    render() {
        let tab1 = <Tab eventKey={"user-tab"} title={"User Info"}>
            <ContentHeader title="User Info" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <User />
                        </div>
                    </div>
                </div>
            </section>
        </Tab>;

        let tab2 = <Tab eventKey={"users-tab"} title="Users">
            <ContentHeader title="User Info" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <UsersView />
                        </div>
                    </div>
                </div>
            </section>
        </Tab>;

        return (
            <Tabs
                defaultActiveKey="user"
                activeKey={this.state.key}
                onSelect={this.handleSelect}>
                {tab1}
                {tab2}
            </Tabs>
        );
    }
}

export default UsersTabs;
