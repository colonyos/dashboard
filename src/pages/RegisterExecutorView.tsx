/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';
import { rtstate2str } from '@app/utils/helpers';
import { ContentHeader } from '@components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Crypto from '../colonies/crypto/crypto.js';

const handleRegister = (e, tabs) => {
    e.preventDefault();
    tabs.nextTab("executors-tab")
    let executorName = e.target.form.executorname.value
    let executorType = e.target.form.executortype.value
    let long = e.target.form.long.value
    let lat = e.target.form.lat.value
    let colonyName = e.target.form.colonyname.value
    let executorId = e.target.form.executorid.value
    let executorPrvKey = e.target.form.executorprvkey.value

    let executor = {
        executorid: executorId,
        executortype: executorType,
        executorname: executorName,
        colonyname: colonyName,
        state: 0,
        commissiontime: "0001-01-01T00:00:00Z",
        lastheardfromtime: "0001-01-01T00:00:00Z",
        location: {
            long: parseFloat(long),
            lat: parseFloat(lat)
        }
    }

    let api = global.colonies
    api.load().then(() => {
        api.addExecutor(executor, global.colonyPrvKey)
    })
}

class ExecutorsView extends Component {
    constructor() {
        super();
        this.state = {
            crypto: null
        };


    }

    componentDidMount() {
        let crypto = new Crypto()
        crypto.load().then(() => {
            this.setState({ crypto: crypto })
        })
    }

    componentWillUnmount() {
    }

    render() {
        let executorId = ""
        let executorPrvKey = ""

        let props = this.props
        let tabs = props.tabs

        const { crypto } = this.state
        if (crypto != null) {
            executorPrvKey = crypto.prvkey()
            executorId = crypto.id(executorPrvKey)
        }
        return (
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Executor Name</Form.Label>
                    <Form.Control name="executorname" type="text" placeholder="Executor Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Executor Type">
                    <Form.Label>Executor Type</Form.Label>
                    <Form.Control name="executortype" type="text" placeholder="Executor Type" onChange={event => {
                        var span = document.getElementById("env-colonies")
                        span.textContent = event.target.value
                    }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="LocationLong">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control name="long" type="text" defaultValue="65.6120464058654" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="LocationLat">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control name="lat" type="text" defaultValue="22.132275667285477" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Colony Id">
                    <Form.Label>Colony Id</Form.Label>
                    <Form.Control name="colonyname" plaintext readOnly defaultValue={global.colonyName} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Executor Id">
                    <Form.Label>Executor Id</Form.Label>
                    <Form.Control name="executorid" plaintext readOnly defaultValue={executorId} />
                    <Form.Text className="text-muted">
                        The Executor Id is derived from the Private Key.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Executor Private Key">
                    <Form.Label>Executor Private Key</Form.Label>
                    <Form.Control name="executorprvkey" plaintext readOnly defaultValue={executorPrvKey} />
                    <Form.Text className="text-muted">
                        Generated ECDSA key. The private key is generated in thew browser and not stored or transmitted over Internet. You have to manually provider the worker with the this private key. The worker needs to sign all messages using the private key to prove its Colony membership.
                    </Form.Text>
                </Form.Group>

                <Button variant="secondary" onClick={(e) => handleRegister(e, tabs)}>
                    Register
                </Button>

                <div style={{ padding: "30px" }}>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">
                                    <div><code>export COLONIES_TLS="{global.tls}"</code></div>
                                    <div><code>export COLONIES_SERVER_HOST="{global.host}"</code></div>
                                    <div><code>export COLONIES_SERVER_PORT="{global.port}"</code></div>
                                    <div><code>export COLONIES_COLONY_ID="{global.colonyName}"</code></div>
                                    <div><code>export COLONIES_EXECUTOR_ID="{executorId}"</code></div>
                                    <div><code>export COLONIES_EXECUTOR_PRVKEY="{executorPrvKey}"</code></div>
                                    <div><code>export COLONIES_EXECUTOR_TYPE="<span id="env-colonies"></span>"</code></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Form >
        );
    }
}

export default ExecutorsView;
