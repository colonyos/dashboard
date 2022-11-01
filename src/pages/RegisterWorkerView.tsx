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
    tabs.nextTab("workers-tab")
    let runtimeName = e.target.form.runtimename.value
    let runtimeType = e.target.form.runtimetype.value
    let long = e.target.form.long.value
    let lat = e.target.form.lat.value
    let colonyId = e.target.form.colonyid.value
    let runtimeId = e.target.form.runtimeid.value
    let runtimePrvKey = e.target.form.runtimeprvkey.value

    let runtime = {
        runtimeid: runtimeId,
        runtimetype: runtimeType,
        name: runtimeName,
        colonyid: colonyId,
        cpu: "",
        cores: 0,
        mem: 0,
        gpu: "",
        gpus: 0,
        state: 0,
        commissiontime: "0001-01-01T00:00:00Z",
        lastheardfromtime: "0001-01-01T00:00:00Z",
        location: {
            long: parseFloat(long),
            lat: parseFloat(lat)
        }
    }

    let rt = global.runtime
    rt.load().then(() => {
        rt.addRuntime(runtime, global.colonyPrvKey)
    })
}

class WorkersView extends Component {
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
        let runtimeId = ""
        let runtimePrvKey = ""

        let props = this.props
        let tabs = props.tabs

        const { crypto } = this.state
        if (crypto != null) {
            runtimePrvKey = crypto.prvkey()
            runtimeId = crypto.id(runtimePrvKey)
        }
        return (
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Runtime Name</Form.Label>
                    <Form.Control name="runtimename" type="text" placeholder="Runtime Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Runtime Type">
                    <Form.Label>Runtime Type</Form.Label>
                    <Form.Control name="runtimetype" type="text" placeholder="Runtime Type" onChange={event => {
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
                    <Form.Control name="colonyid" plaintext readOnly defaultValue={global.colonyId} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Runtime Id">
                    <Form.Label>Runtime Id</Form.Label>
                    <Form.Control name="runtimeid" plaintext readOnly defaultValue={runtimeId} />
                    <Form.Text className="text-muted">
                        The Runtime Id is derived from the Private Key.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Runtime Private Key">
                    <Form.Label>Runtime Private Key</Form.Label>
                    <Form.Control name="runtimeprvkey" plaintext readOnly defaultValue={runtimePrvKey} />
                    <Form.Text className="text-muted">
                        Generated ECDSA key. The private key is generated in thew browser and not stored or transmitted over Internet. You have to manually provider the worker with the this private key. The worker needs to sign all messages using the private key to prove its Colony membership.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" onClick={(e) => handleRegister(e, tabs)}>
                    Register
                </Button>

                <div style={{ padding: "30px" }}>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">
                                    <div><code>export COLONIES_TLS="{global.tls}"</code></div>
                                    <div><code>export COLONIES_SERVERHOST="{global.host}"</code></div>
                                    <div><code>export COLONIES_SERVERPORT="{global.port}"</code></div>
                                    <div><code>export COLONIES_COLONYID="{global.colonyId}"</code></div>
                                    <div><code>export COLONIES_RUNTIMEID="{runtimeId}"</code></div>
                                    <div><code>export COLONIES_RUNTIMEPRVKEY="{runtimePrvKey}"</code></div>
                                    <div><code>export COLONIES_RUNTIMETYPE="<span id="env-colonies"></span>"</code></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Form >
        );
    }
}

export default WorkersView;
