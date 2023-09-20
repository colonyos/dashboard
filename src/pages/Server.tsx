/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';
import { bool2str } from '@app/utils/helpers';
import { ContentHeader } from '@components';

class ServerInfoView extends Component {
    constructor() {
        super();
        this.state = {
            cluster: {}
        };
    }

    render() {
        let serverInfo = this.props.serverInfo
        return (
            <Table striped bordered hover >
                <tbody>
                    <tr>
                        <th>Host</th>
                        <td>{global.host}</td>
                    </tr>
                    <tr>
                        <th>Port</th>
                        <td>{global.port}</td>
                    </tr>
                    <tr>
                        <th>Build Version</th>
                        <td>{serverInfo.buildversion}</td>
                    </tr>
                    <tr>
                        <th>Build Time</th>
                        <td>{parseTime(serverInfo.buildtime)}</td>
                    </tr>
                </tbody>
            </Table >
        );
    }
}

class ClusterView extends Component {
    constructor() {
        super();
        this.state = {
            cluster: {}
        };
    }

    render() {
        let cluster = this.props.cluster

        console.log(cluster)

        const items = []
        if (cluster.nodes.length > 0) {
            for (let i in cluster.nodes) {
                let node = cluster.nodes[i]
                let leader = "no"
                if (node.name == cluster.leader.name) {
                    leader = "yes"
                }
                items.push(
                    <Table striped bordered hover >
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Leader</th>
                                <th>Host</th>
                                <th>API Port</th>
                                <th>Etcd Port</th>
                                <th>Etcd Peer Port</th>
                                <th>Relay Port</th>
                            </tr>
                            <tr>
                                <td>{node.name}</td>
                                <td>{leader}</td>
                                <td>{node.host}</td>
                                <td>{node.apiport}</td>
                                <td>{node.port}</td>
                                <td>{node.peerport}</td>
                                <td>{node.relayport}</td>
                            </tr>
                        </tbody>
                    </Table>
                )
            }
            return (
                <div> {items} </div>
            );
        } else {
            return (
                <h5>No nodes found</h5>
            )
        }
    }
}

class Page extends Component {
    constructor() {
        super();
        this.state = {
            cluster: { nodes: [] },
            serverInfo: {}
        };
    }

    componentDidMount() {
        if (global.serverId == "" && global.serverPrvKey == "") {
            return
        }

        let api = global.colonies
        let cluster = {}
        api.load().then(() => {
            api.getClusterInfo(global.serverPrvKey).then((c) => {
                cluster = c
            }).then(() => {
                return api.getServerVersion()
            }).then((serverInfo) => {
                this.setState({ serverInfo: serverInfo, cluster: cluster })
            }).catch((err) => {
                console.log(err)
                console.log(err)
            })
            this.interval = setInterval(() => {
                api.getClusterInfo(global.serverPrvKey).then((c) => {
                    cluster = c
                }).then(() => {
                    return api.getServerVersion()
                }).then((serverInfo) => {
                    this.setState({ serverInfo: serverInfo, cluster: cluster })
                }).catch((err) => {
                    console.log(err)
                })
            }, 5000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { serverInfo, cluster } = this.state
        if (global.serverId == "" && global.serverPrvKey == "") {
            return (
                <div></div>
            );
        }
        return (
            <div>
                <ContentHeader title="Colonies Server Info" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="table-header">Colonies Server Info</h3>
                                <div className="card-body">
                                    <ServerInfoView serverInfo={serverInfo} />
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="table-header">Colonies Cluster Nodes</h3>
                                <div className="card-body">
                                    <ClusterView cluster={cluster} />
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
