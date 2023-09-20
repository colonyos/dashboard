import { ContentHeader } from '@components';
import React, { Component, useContext } from "react"
import { global } from '../global'
import { useState } from 'react';
import ErrorModalContext from './ErrorModalContext';
import ErrorModalComponent from './ErrorModalComponent';

const DashboardView = (props) => {
    let stats = props.stats

    return (
        <div>
            <ContentHeader title="Dashboard" />
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-secondary">
                                <div className="inner">
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
                                <div className="inner">
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
                                <div className="inner">
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
                                <div className="inner">
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
                                <div className="inner">
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
                                <div className="inner">
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
                                <div className="inner">
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
                                <div className="inner">
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-primary">
                                <div className="inner">
                                    <h3>{stats.executors}</h3>
                                    <p>Registered Executors</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-android-time" />
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
            api.getColonyStats(global.colonyId, global.executorPrvKey).then((stats) => {
                this.setState({ stats: stats })
            })
            this.interval = setInterval(() => {
                api.getColonyStats(global.colonyId, global.executorPrvKey).then((stats) => {
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
