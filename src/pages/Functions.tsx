/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';
import { bool2str } from '@app/utils/helpers';
import { ContentHeader } from '@components';
import JSONPretty from 'react-json-pretty';
import { useNavigate } from "react-router-dom";
import { parseArr } from '@app/utils/helpers';

class FunctionsView extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let props = this.props

        const Trigger = (workflowid) => {
            props.navigate("/workflow?workflowid=" + workflowid)
        }

        let funcs = this.props.funcs

        var dict = {}
        for (let i in funcs) {
            let func = funcs[i]
            if (dict[func.funcname] === undefined) {
                dict[func.funcname] = {
                    count: 1,
                    minwaittime: func.minwaittime,
                    maxwaittime: func.maxwaittime,
                    avgwaittime: func.avgwaittime,
                    minexectime: func.minexectime,
                    maxexectime: func.maxexectime,
                    avgexectime: func.avgexectime,
                    args: func.args,
                    funcname: func.funcname,
                    desc: func.desc,
                    functionid: func.functionid,
                    colonyname: func.colonyname,
                }
            } else {
                let value = dict[func.funcname]
                value.count++
                value.minwaittime = Math.min(func.minwaittime, value.minwaittime)
                value.maxwaittime = Math.min(func.maxwaittime, value.maxwaittime)
                value.avgwaittime = (func.avgwaittime + value.avgwaittime) / 2.0
                value.minexectime = Math.min(func.minexectime, value.minexectime)
                value.maxexectime = Math.min(func.maxexectime, value.maxexectime)
                value.avgexectime = (func.avgexectime + value.avgexectime) / 2.0
                dict[func.funcname] = value
            }
        }

        const items = []
        if (funcs != null && funcs.length > 0) {
            for (let i in dict) {
                let func = dict[i]
                items.push(
                    <Table striped bordered hover id="table">
                        <tbody>
                            <tr>
                                <th>Function Name</th>
                                <td>{func.funcname}(...)</td>
                            </tr>
                            <tr>
                                <th>Args</th>
                                <td>{parseArr(func.args)}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{func.desc}</td>
                            </tr>
                            <tr>
                                <th>Serving Executors</th>
                                <td>{func.count}</td>
                            </tr>
                            <tr>
                                <th>Function Id</th>
                                <td>{func.functionid}</td>
                            </tr>
                            <tr>
                                <th>Colony Id</th>
                                <td>{func.colonyname}</td>
                            </tr>
                            <tr>
                                <th>Min Wait Time</th>
                                <td>{func.minwaittime} s</td>
                            </tr>
                            <tr>
                                <th>Max Wait Time</th>
                                <td>{func.maxwaittime} s</td>
                            </tr>
                            <tr>
                                <th>Average Wait Time</th>
                                <td>{func.avgwaittime} s</td>
                            </tr>
                            <tr>
                                <th>Min Exec Time</th>
                                <td>{func.minexectime} s</td>
                            </tr>
                            <tr>
                                <th>Max Exec Time</th>
                                <td>{func.maxexectime} s</td>
                            </tr>
                            <tr>
                                <th>Average Exec Time</th>
                                <td>{func.avgexectime} s</td>
                            </tr>
                        </tbody >
                    </Table >
                )
            }
            return (
                <div> {items} </div>
            );
        } else {
            return (
                <h5>No functions found</h5>
            )
        }
    }
}

class Page extends Component {
    constructor() {
        super();
        this.state = {
            funcs: {},
        };
    }

    componentDidMount() {
        let api = global.colonies
        api.load().then(() => {
            api.getFunctions(global.colonyName, global.executorPrvKey).then((funcs) => {
                this.setState({ funcs: funcs })
            }).catch((err) => {
                console.log(err)
            })
            this.interval = setInterval(() => {
                api.getFunctions(global.colonyName, global.executorPrvKey).then((funcs) => {
                    this.setState({ funcs: funcs })
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
        let props = this.props
        const { funcs } = this.state
        return (
            <div>
                <ContentHeader title="Functions" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-body">
                                    <FunctionsView funcs={funcs} navigate={props.navigate} />
                                </div>
                            </div>
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
