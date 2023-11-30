/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import React, { Component } from "react"
import { global } from '../global'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import styled from 'styled-components';
import { parseTime } from '@app/utils/helpers';

const BoldText = styled.div`
  font-weight: bold;
`;

class Page extends Component {
    constructor() {
        super();
        this.state = {
            file: {}, label: ""
        };
    }

    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let label = params.get('label');
        let name = params.get('name');

        let api = global.colonies
        api.load().then(() => {
            api.getFile(global.colonyName, label, name, global.executorPrvKey).then((file) => {
                console.log(file)
                this.setState({ file: file, label: label })
            })
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let props = this.props
        const Trigger = (name) => {
            props.navigate("/files?label=" + name)
        }
        const { file, label } = this.state;
        const items = []
        let revision = { label: "" }
        if (file == null && file.length == 0) {
            return (<h5>No information found</h5>)
        } else {
            revision = file[0]
        }

        for (let i = 0; i < file.length; i++) { // XXX: Ugly hack to make sure file is not undefinied
            let revision = file[i]

            items.push(
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <Table striped bordered hover >
                                    <tbody>
                                        <tr>
                                            <td> Name</td>
                                            <td> {revision.name}</td>
                                        </tr>
                                        <tr>
                                            <td> Label</td>
                                            <td> {revision.label}</td>
                                        </tr>
                                    </tbody>
                                </Table >
                            </div>
                        </div>
                    </div >
                </section >
            )
            break;
        }

        for (let i = 0; i < file.length; i++) {
            let revision = file[i]

            items.push(
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <Table striped bordered hover >
                                    <tbody>
                                        <tr>
                                            <th style={{ fontWeight: 'bold' }}>Revision Id</th>
                                            <td> {revision.fileid}</td>
                                        </tr>
                                        <tr>
                                            <td> Added</td>
                                            <td> {parseTime(revision.added)}</td>
                                        </tr>
                                        <tr>
                                            <td> Checksum Alg</td>
                                            <td> {revision.checksumalg}</td>
                                        </tr>
                                        <tr>
                                            <td> Checksum</td>
                                            <td> {revision.checksum}</td>
                                        </tr>
                                        <tr>
                                            <td> Label</td>
                                            <td> {revision.label}</td>
                                        </tr>
                                        <tr>
                                            <td> Sequence Number</td>
                                            <td> {revision.sequencenr}</td>
                                        </tr>
                                        <tr>
                                            <td> Size (bytes)</td>
                                            <td> {revision.size}</td>
                                        </tr>
                                        <tr>
                                            <td> Protocol </td>
                                            <td> {revision.ref.protocol}</td>
                                        </tr>
                                        <tr>
                                            <td> S3 Object </td>
                                            <td> {revision.ref.s3object.object}</td>
                                        </tr>
                                        <tr>
                                            <td> S3 Bucket </td>
                                            <td> {revision.ref.s3object.bucket}</td>
                                        </tr>
                                        <tr>
                                            <td> S3 Access Key </td>
                                            <td> ******************** </td>
                                        </tr>
                                        <tr>
                                            <td> S3 Secret Key </td>
                                            <td> ******************** </td>
                                        </tr>
                                        <tr>
                                            <td> S3 Server </td>
                                            <td> {revision.ref.s3object.server}</td>
                                        </tr>
                                        <tr>
                                            <td> S3 Region </td>
                                            <td> {revision.ref.s3object.region}</td>
                                        </tr>
                                    </tbody>
                                </Table >
                            </div>
                        </div>
                    </div>
                </section >
            )
        }

        return (
            <div>
                <div style={{ textAlign: 'right' }}>
                    <Button variant="secondary" onClick={(e) => Trigger(label)}>
                        Back
                    </Button>
                </div>
                <div className="card-body">
                    {items}
                </div>
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
