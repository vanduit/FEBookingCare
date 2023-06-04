import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

    }

    componentDidMount() {

        let user = this.props.currentUser;
        console.log('Check ITDEV94', user);
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }

        console.log('Didmount edit modal', this.props.currentUser);
    }

    toggle = () => {
        this.props.toggleFormParent();
    }

    handleOnChangeInput = (event, id) => {

        let copySate = { ...this.state };
        copySate[id] = event.target.value;
        this.setState({
            ...copySate
        });
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing required parameter');
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.createNewUser(this.state, 'abc');
        }
    }

    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {
        console.log('Check props from parent : ', this.props)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input disabled type="text" value={this.state.email} onChange={(event) => { this.handleOnChangeInput(event, "email") }} />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input disabled type="password" value={this.state.password} onChange={(event) => { this.handleOnChangeInput(event, "password") }} />
                        </div>
                        <div className="input-container">
                            <label>First name</label>
                            <input type="text" value={this.state.firstName} onChange={(event) => { this.handleOnChangeInput(event, "firstName") }} />
                        </div>
                        <div className="input-container">
                            <label>Last name</label>
                            <input type="text" value={this.state.lastName} onChange={(event) => { this.handleOnChangeInput(event, "lastName") }} />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text" value={this.state.address} onChange={(event) => { this.handleOnChangeInput(event, "address") }} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => this.handleSaveUser()}>
                        Save change
                    </Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);