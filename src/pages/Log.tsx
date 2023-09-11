/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import React, { Component } from "react"
import { global } from '../global'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

class Page extends Component {
    constructor() {
        super();
        this.state = {
            log: {}, processid: ""
        };
    }

    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let processid = params.get('processid');

        let allLogs = ""
        let api = global.colonies
        let since = 0
        api.load().then(() => {
            api.getLog(processid, since, global.executorPrvKey).then((logs) => {
                if (logs != null) {
                    for (let log of logs) {
                        if (log.timestamp > since) {
                            allLogs += log.message;
                            since = log.timestamp
                            this.setState({ logs: allLogs, processid: processid })
                        }
                    }
                }
            })
            this.interval = setInterval(() => {
                api.getLog(processid, since, global.executorPrvKey).then((logs) => {
                    if (logs != null) {
                        for (let log of logs) {
                            if (log.timestamp > since) {
                                allLogs += log.message;
                                since = log.timestamp
                                this.setState({ logs: allLogs, processid: processid })
                            }
                        }
                    }
                })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let props = this.props
        const Trigger = (workflowid) => {
            props.navigate("/process?processid=" + workflowid)
        }

        const { logs, processid } = this.state
        return (
            <div>
                <ContentHeader title="Logs" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <div style={{ textAlign: 'right' }}>
                                    <Button variant="secondary" onClick={(e) => Trigger(processid)}>
                                        Back
                                    </Button>
                                </div>
                                <div className="card-body">
                                    <h3 className="table-header">Process Id - {processid}</h3>
                                    <pre>
                                        {logs}
                                    </pre>
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
