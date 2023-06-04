import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isshowPassword: false,
            errMessage: ''
        }
    }

    handleOnchangeUserName = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnchangePassWord = (event) => {
        this.setState({
            password: event.target.value
        })

    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLogin(this.state.username, this.state.password);
            if (data && data.errCode != 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode == 0) {
                this.props.userLoginScuccess(data.user)
                console.log('login success');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }

    }
    handelShowHidePassword = () => {
        this.setState({
            isshowPassword: !this.state.isshowPassword
        })
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">
                            Login
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input type="text" value={this.state.username} onChange={(event) => this.handleOnchangeUserName(event)} className="form-control" placeholder="Enter your username" />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password" >
                                <input className="form-control" type={this.state.isshowPassword ? 'text' : 'password'} value={this.state.password} onChange={(event) => this.handleOnchangePassWord(event)} placeholder="Enter your password" />
                                <span onClick={() => this.handelShowHidePassword()}>
                                    <i className={this.state.isshowPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i>
                                </span>
                            </div>

                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginScuccess: (userInfo) => dispatch(actions.userLoginScuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
