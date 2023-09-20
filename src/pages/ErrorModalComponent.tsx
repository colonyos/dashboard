import React from 'react';
import ErrorModalContext from './ErrorModalContext';
import { Modal, Button } from 'react-bootstrap';

class ErrorModalComponent extends React.Component {
    render() {
        return (
            <ErrorModalContext.Consumer>
                {({ show, setShow, heading, message }) => (
                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header>
                            <Modal.Title>{heading}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{message}</Modal.Body>
                        <Modal.Footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="danger" onClick={() => setShow(false)}>
                                Ok
                            </Button>

                        </Modal.Footer>
                    </Modal>
                )}
            </ErrorModalContext.Consumer>
        );
    }
}

export default ErrorModalComponent;
