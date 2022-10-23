/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';
import { bool2str } from '@app/utils/helpers';
import { ContentHeader } from '@components';

class CronsView extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let crons = this.props.crons

        const items = []
        if (crons.length > 0) {
            for (let i in crons) {
                let cron = crons[i]
                items.push(
                    <Table striped bordered hover >
                        <tbody>
                            <tr>
                                <th>Cron Id</th>
                                <td>{cron.cronid}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{cron.name}</td>
                            </tr>
                            <tr>
                                <th>Cron Expression</th>
                                <td>{cron.cronexpression}</td>
                            </tr>
                            <tr>
                                <th>Interval</th>
                                <td>{cron.interval}</td>
                            </tr>
                            <tr>
                                <th>Random</th>
                                <td>{bool2str(cron.random)}</td>
                            </tr>
                            <tr>
                                <th>Next Run</th>
                                <td>{parseTime(cron.nextrun)}</td>
                            </tr>
                            <tr>
                                <th>Last Run</th>
                                <td>{parseTime(cron.lastrun)}</td>
                            </tr>
                            <tr>
                                <th>Workflow Spec</th>
                                <td>{cron.workflowspec}</td>
                            </tr>
                            <tr>
                                <th>Previous Processgraph id</th>
                                <td>{cron.prevprocessgraphid}</td>
                            </tr>
                            <tr>
                                <th>Wait for Previous Processgraph</th>
                                <td>{bool2str(cron.waitforprevprocessgraph)}</td>
                            </tr>
                        </tbody >
                    </Table>
                )
            }
            return (
                <div> {items} </div>
            );
        } else {
            return (
                <h5>No crons found</h5>
            )
        }
    }
}

class Page extends Component {
    constructor() {
        super();
        this.state = {
            crons: {},
        };
    }

    componentDidMount() {
        let rt = global.runtime
        rt.load().then(() => {
            rt.getCrons(global.colonyId, global.runtimePrvKey).then((crons) => {
                this.setState({ crons: crons })
            }).catch((err) => {
                console.log(err)
            })
            this.interval = setInterval(() => {
                rt.getCrons(global.colonyId, global.runtimePrvKey).then((crons) => {
                    this.setState({ crons: crons })
                }).catch((err) => {
                    console.log(err)
                })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { crons } = this.state
        return (
            <div>
                <ContentHeader title="Crons" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-body">
                                    <CronsView crons={crons} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Page;
