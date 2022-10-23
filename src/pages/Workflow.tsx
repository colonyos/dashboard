/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react"
import { ContentHeader } from '@components';
import ReactFlow, { Controls, Background, MarkerType, updateEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { global } from '../global'
import { useNavigate } from "react-router-dom";

function Flow(props) {
    let nodes = props.nodes
    let edges = props.edges
    const navigate = useNavigate();

    return (
        <div style={{ height: '800px' }}>
            <ReactFlow nodes={nodes} edges={edges} onClick={(e) => {
                let processid = e.target.dataset.id
                if (processid !== undefined) {
                    navigate("/process?processid=" + processid)
                }
            }}>
                <Background />
            </ReactFlow>
        </div>
    );
}

function updateEdges(edges) {
    if (edges == null) {
        edges = []
    }
    for (let i in edges) {
        edges[i].style = {
            //strokeWidth: 1,
            //stroke: '#000000',
        }

        edges[i].markerEnd = {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#000000',
        }
    }
}

class Page extends Component {
    constructor() {
        super();
        this.state = {
            nodes: [],
            edges: [],
        };
    }

    componentDidMount() {
        let search = window.location.search
        let params = new URLSearchParams(search)
        let workflowid = params.get('workflowid')

        let rt = global.runtime
        rt.load().then(() => {
            rt.getWorkflow(workflowid, global.runtimePrvKey).then((workflow) => {
                console.log(workflow)
                updateEdges(workflow.edges)
                this.setState({ nodes: workflow.nodes, edges: workflow.edges })
            })
            this.interval = setInterval(() => {
                rt.getWorkflow(workflowid, global.runtimePrvKey).then((workflow) => {
                    updateEdges(workflow.edges)
                    this.setState({ nodes: workflow.nodes, edges: workflow.edges })
                })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { nodes, edges } = this.state
        return (
            <div>
                <ContentHeader title="Workflow" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="table-header">Process graph</h3>
                                <div className="card-body">
                                    <Flow nodes={nodes} edges={edges} />
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
