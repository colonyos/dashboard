/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import React, { Component } from "react";
import { global } from '../global'

class PendingProcessesView extends Component {
    constructor() {
        super();
        this.state = {
            name: "React"
        };
    }

    componentDidMount() {
        var rt = global.runtime
        rt.load().then(() => {
            console.log("loaded colonies")
            rt.getProcesses(global.colonyId, 100, 0, global.runtimePrvKey).then((msg) => {
                console.log(msg)
            })
        })

        // this.setState({ name: "Johan" })
    }

    render() {
        const { name } = this.state;
        return (
            <div>
                <h3>Using Axios in React for API call {name} </h3>
                <hr />
            </div>
        );
    }
}

const Blank = () => {
    return (
        <div>
            <ContentHeader title="Pending processes" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Title</h3>
                        </div>
                        <div className="card-body">
                            <PendingProcessesView />
                            Start creating your amazing application!
                        </div>
                        <div className="card-footer">Footer</div>
                    </div>
                </div>
            </section>
        </div>
    );
};


export default Blank;
