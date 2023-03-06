/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react"
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

class ProcessGraphView extends Component {
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

        let api = global.colonies
        api.load().then(() => {
            api.getWorkflow(workflowid, global.executorPrvKey).then((workflow) => {
                updateEdges(workflow.edges)
                this.setState({ nodes: workflow.nodes, edges: workflow.edges })
            })
            this.interval = setInterval(() => {
                api.getWorkflow(workflowid, global.executorPrvKey).then((workflow) => {
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
            <Flow nodes={nodes} edges={edges} />
        );
    }
}

export default ProcessGraphView;
