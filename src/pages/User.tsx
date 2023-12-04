/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import React, { Component } from "react"
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import { parseTime } from '@app/utils/helpers';

class UserView extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const items = []
        items.push(
            <Table striped bordered hover >
                <tbody>
                    <tr>
                        <th>Username</th>
                        <td>{global.username}</td>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <td>{global.firstname}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>{global.lastname}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{global.email}</td>
                    </tr>
                    <tr>
                        <th>User Id</th>
                        <td>{global.executorId}</td>
                    </tr>
                    <tr>
                        <th>User PrvKey</th>
                        <td>{global.executorPrvKey}</td>
                    </tr>
                    <tr>
                        <th>Colonies Server Host</th>
                        <td>{global.host}</td>
                    </tr>
                    <tr>
                        <th>Colonies Server Port</th>
                        <td>{global.port}</td>
                    </tr>
                    <tr>
                        <th>Colonies Server TLS</th>
                        <td>{global.tls}</td>
                    </tr>
                    <tr>
                        <th>Colony Id</th>
                        <td>{global.colonyName}</td>
                    </tr>
                    <tr>
                        <th>Colony PrvKey</th>
                        <td>{global.colonyPrvKey}</td>
                    </tr>
                    <tr>
                        <th>Server Id</th>
                        <td>{global.serverId}</td>
                    </tr>
                    <tr>
                        <th>Server PrvKey</th>
                        <td>{global.serverPrvKey}</td>
                    </tr>
                    <tr>
                        <th>AWS S3 Endpoint</th>
                        <td>{global.awsS3Endpoint}</td>
                    </tr>
                    <tr>
                        <th>AWS S3 Accesskey</th>
                        <td>{global.awsS3Accesskey}</td>
                    </tr>
                    <tr>
                        <th>AWS S3 Secretkey</th>
                        <td>{global.awsS3Secretkey}</td>
                    </tr>
                    <tr>
                        <th>AWS S3 Region</th>
                        <td>{global.awsS3Region}</td>
                    </tr>
                    <tr>
                        <th>AWS S3 Bucket</th>
                        <td>{global.awsS3Bucket}</td>
                    </tr>
                    <tr>
                        <th>AWS S3 TLS</th>
                        <td>{global.awsS3TLS}</td>
                    </tr>
                    <tr>
                        <th>AWS S3 Skipverify</th>
                        <td>{global.awsS3SkipVerify}</td>
                    </tr>
                </tbody >
            </Table>
        )
        return (
            <div> {items} </div>
        );
    }
}

class Page extends Component {
    constructor() {
        super();
        this.state = {
            executor: {},
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let props = this.props
        const { executor } = this.state
        return (
            <div>
                <section className="content">
                    <div className="card-body">
                        <UserView navigate={props.navigate} />
                        <div style={{ padding: "0px" }}>
                            <section className="content">
                                <div className="container-fluid">
                                    <div className="card">
                                        <div className="card-body">
                                            <div><code>export COLONIES_TLS="{global.tls}"</code></div>
                                            <div><code>export COLONIES_SERVER_HOST="{global.host}"</code></div>
                                            <div><code>export COLONIES_SERVER_PORT="{global.port}"</code></div>
                                            <div><code>export COLONIES_COLONY_NAME="{global.colonyName}"</code></div>
                                            <div><code>export COLONIES_PRVKEY="{global.executorPrvKey}"</code></div>
                                            <div><code>export AWS_S3_ENDPOINT="{global.awsS3Endpoint}"</code></div>
                                            <div><code>export AWS_S3_ACCESSKEY="{global.awsS3Accesskey}"</code></div>
                                            <div><code>export AWS_S3_SECRETKEY="{global.awsS3Secretkey}"</code></div>
                                            <div><code>export AWS_S3_REGION_KEY="{global.awsS3Region}"</code></div>
                                            <div><code>export AWS_S3_BUCKET="{global.awsS3Bucket}"</code></div>
                                            <div><code>export AWS_S3_TLS="{global.awsS3TLS}"</code></div>
                                            <div><code>export AWS_S3_SKIPVERIFY="{global.awsS3SkipVerify}"</code></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const PageWithNavigate = () => {
    const navigate = useNavigate();
    return (
        <Page navigate={navigate} />
    )
}


export default PageWithNavigate;
