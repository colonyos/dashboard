import { SmallBox } from '@app/components';
import React from 'react';
import { ContentHeader } from '@components';

const Dashboard = () => {
    return (
        <div>
            <ContentHeader title="Dashboard" />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-secondary">
                                <div className="inner">
                                    <h3>150</h3>
                                    <p>Pending Processes</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-android-time" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>15</h3>
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
                                    <h3>1500</h3>
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
                                    <h3>10</h3>
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
                                    <h3>10</h3>
                                    <p>Pending Workflows</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-android-time" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>5</h3>
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
                                    <h3>150</h3>
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
                                    <h3>1</h3>
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
                                    <h3>100</h3>
                                    <p>Workers</p>
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

export default Dashboard;
