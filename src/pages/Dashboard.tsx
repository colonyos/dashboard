import { ContentHeader } from '@components';
import React, { Component, useContext, useRef, useEffect } from "react"
import { global } from '../global'
import { useState } from 'react';
import ErrorModalContext from './ErrorModalContext';
import ErrorModalComponent from './ErrorModalComponent';
import * as d3 from "d3";

const DashboardView = (props) => {
    let stats = props.stats
    const waitingChildrenArray = Array.from({ length: stats.waitingprocesses }, () => ({
        name: "Process",
        value: 10
    }));
    const waitingData = {
        name: "root",
        children: waitingChildrenArray
    };
    const runningChildrenArray = Array.from({ length: stats.runningprocesses }, () => ({
        name: "Process",
        value: 10
    }));
    const runningData = {
        name: "root",
        children: runningChildrenArray
    };
    const successChildrenArray = Array.from({ length: stats.successfulprocesses }, () => ({
        //const successChildrenArray = Array.from({ length: 300 }, () => ({
        name: "Process",
        value: 10
    }));

    return (
        <div>
            <ContentHeader title="Dashboard" />
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-secondary">
                                <div className="inner" style={{ backgroundColor: '#6c71c4' }}>
                                    <h3>{stats.waitingprocesses}</h3>
                                    <p>Waiting Processes</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-android-time" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner" style={{ backgroundColor: '#268bd2' }}>
                                    <h3>{stats.runningprocesses}</h3>
                                    <p>Running Processes</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-android-sync" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner" style={{ backgroundColor: '#2aa198' }}>
                                    <h3>{stats.successfulprocesses}</h3>
                                    <p>Successful Processes</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-checkmark" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner" style={{ backgroundColor: '#cb4b16' }}>
                                    <h3>{stats.failedprocesses}</h3>
                                    <p>Failed Processes</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-close" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-secondary">
                                <div className="inner" style={{ backgroundColor: '#6c71c4' }}>
                                    <h3>{stats.waitingworkflows}</h3>
                                    <p>Waiting Workflows</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-android-time" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner" style={{ backgroundColor: '#268bd2' }}>
                                    <h3>{stats.runningworkflows}</h3>
                                    <p>Running Workflows</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-android-sync" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner" style={{ backgroundColor: '#2aa198' }}>
                                    <h3>{stats.successfulworkflows}</h3>
                                    <p>Successful Workflows</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-checkmark" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner" style={{ backgroundColor: '#cb4b16' }}>
                                    <h3>{stats.failedworkflows}</h3>
                                    <p>Failed Workflows</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-close" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

class Page extends Component {
    constructor() {
        super();
        this.state = {
            stats: {},
            show: false
        };
    }

    setShow = (show) => {
        this.setState({ show });
    };

    setMessage = (message) => {
        this.setState({ message });
    };

    setHeading = (heading) => {
        this.setState({ heading });
    };

    componentDidMount() {
        let api = global.colonies

        console.log(global.error)
        if (global.error != "") {
            this.setHeading("Failed to connect to Colonies server")
            this.setMessage(global.error)
            this.setShow(true);
        }

        api.load().then(() => {
            api.getColonyStats(global.colonyName, global.executorPrvKey).then((stats) => {
                this.setState({ stats: stats })
            })
            this.interval = setInterval(() => {
                api.getColonyStats(global.colonyName, global.executorPrvKey).then((stats) => {
                    this.setState({ stats: stats })
                })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { stats } = this.state
        return (
            <div>
                <ErrorModalContext.Provider value={{
                    show: this.state.show,
                    setShow: this.setShow,
                    heading: this.state.heading,
                    message: this.state.message,
                    setMessage: this.setMessage
                }}>
                    <DashboardView stats={stats} />
                    <ErrorModalComponent />
                </ErrorModalContext.Provider>

            </div>
        );
    }
}

export default Page;
