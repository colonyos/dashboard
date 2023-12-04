/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';
import { bool2str } from '@app/utils/helpers';
import { ContentHeader } from '@components';
import JSONPretty from 'react-json-pretty';

class GeneratorsView extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let generators = this.props.generators

        const items = []
        if (generators != null && generators.length > 0) {
            for (let i in generators) {
                let generator = generators[i]
                items.push(
                    <Table striped bordered hover >
                        <tbody>
                            <tr>
                                <th>Generator Id</th>
                                <td>{generator.generatorid}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{generator.name}</td>
                            </tr>
                            <tr>
                                <th>Trigger</th>
                                <td>{generator.trigger}</td>
                            </tr>
                            <tr>
                                <th>Workflow Spec</th>
                                <td><JSONPretty data={generator.workflowspec}></JSONPretty></td>
                            </tr>
                            <tr>
                                <th>Last Run</th>
                                <td>{parseTime(generator.lastrun)}</td>
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
                <h5>No generators found</h5>
            )
        }
    }
}

class Page extends Component {
    constructor() {
        super();
        this.state = {
            generators: {},
        };
    }

    componentDidMount() {
        let api = global.colonies
        api.load().then(() => {
            api.getGenerators(global.colonyName, global.executorPrvKey).then((generators) => {
                this.setState({ generators: generators })
            }).catch((err) => {
                console.log(err)
            })
            this.interval = setInterval(() => {
                api.getGenerators(global.colonyName, global.executorPrvKey).then((generators) => {
                    this.setState({ generators: generators })
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
        const { generators } = this.state
        return (
            <div>
                <ContentHeader title="Generators" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-body">
                                    <GeneratorsView generators={generators} />
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
