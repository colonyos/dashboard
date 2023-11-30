/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import React, { Component } from "react"
import { global } from '../global'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';
import { parseArr } from '@app/utils/helpers';

class Page extends Component {
    constructor() {
        super();
        this.state = {
            snapshot: {}
        };
    }

    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let snapshotid = params.get('snapshotid');

        let api = global.colonies
        api.load().then(() => {
            api.getSnapshot(global.colonyName, snapshotid, global.executorPrvKey).then((snapshot) => {
                console.log(snapshot)
                this.setState({ snapshot: snapshot })
            })
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let props = this.props
        const Trigger = () => {
            props.navigate("/filesystem")
        }
        const { snapshot } = this.state;
        const items = []

        items.push(
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Table striped bordered hover >
                                <tbody>
                                    <tr>
                                        <td> Snapshot Id</td>
                                        <td> {snapshot.snapshotid} </td>
                                    </tr>
                                    <tr>
                                        <td> Snapshot Name</td>
                                        <td> {snapshot.name} </td>
                                    </tr>
                                    <tr>
                                        <td> Label</td>
                                        <td> {snapshot.label} </td>
                                    </tr>
                                    <tr>
                                        <td> Colony Id</td>
                                        <td> {snapshot.colonyname} </td>
                                    </tr>
                                    <tr>
                                        <td> Added</td>
                                        <td> {parseTime(snapshot.added)} </td>
                                    </tr>
                                    <tr>
                                        <td> File Ids</td>
                                        <td> {parseArr(snapshot.fileids)} </td>
                                    </tr>
                                </tbody>
                            </Table >
                        </div>
                    </div>
                </div>
            </section >
        )

        return (
            <div>
                <div style={{ textAlign: 'right' }}>
                    <Button variant="secondary" onClick={(e) => Trigger()}>
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
