/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';
import { rtstate2str } from '@app/utils/helpers';
import { ContentHeader } from '@components';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

class UsersView extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tr>
                    <th>{global.username}</th>
                    <th>{global.firstname}</th>
                    <th>{global.lastname}</th>
                    <th>{global.email}</th>
                </tr>
                <tbody>
                </tbody>
            </Table >
        );
    }
}

const PageWithNavigate = () => {
    const navigate = useNavigate();
    return (
        <UsersView navigate={navigate} />
    )
}


export default PageWithNavigate;

