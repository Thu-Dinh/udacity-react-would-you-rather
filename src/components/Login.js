import React, {Component} from "react";
import logo from './../logo.svg';
import {connect} from 'react-redux'
import {setAuthedUser} from "../actions/authedUser";
import {setRedirectUrl} from "../actions/shared";
import {Redirect, withRouter} from "react-router-dom";

class Login extends Component {
    state = {
        isRedirect: false,
        selectedUser: '',
        authed: false
    }

    handleChange = (e) => {
        this.setState({selectedUser: e.target.value});
    }

    handleLogin = (e) => {
        e.preventDefault()
        const {selectedUser} = this.state
        const {dispatch, users, redirectUrl} = this.props
        const authedUser = users[selectedUser]
        const isRedirect = redirectUrl? false : true
        // set authed user
        dispatch(setAuthedUser({
            id: authedUser.id,
            name: authedUser.name,
            avatarURL: authedUser.avatarURL
        }))
        const from = this.props.location?.state?.from
        if(from && isRedirect){
            dispatch(setRedirectUrl(from))
        } else {
            dispatch(setRedirectUrl('/'))
        }

        this.setState(() => ({
            selectedUser: '',
            authed: true,
            isRedirect: isRedirect
        }))

    }

    render() {
        const {users} = this.props
        const from = this.props.location?.state?.from
        const {authed, selectedUser, isRedirect} = this.state

        if (authed === true) {
            if(from && isRedirect){
                return <Redirect to={from}/>
            }
            return <Redirect to='/'/>
        }

        return (
            <div className="wrapper">
                <div className="login-header">
                    <h2 style={{marginBottom: 0}}>Welcome to the Would You Rather App!</h2>
                    <p style={{marginTop: 0, fontSize: 14}}>Please sign in to continue</p>
                </div>
                <div>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2 style={{"color": "#07ad90"}}>Sign in</h2>
                    <form className="form" onSubmit={this.handleLogin}>
                        <div>
                            <select value={selectedUser} onChange={(e) => this.handleChange(e)}>
                                <option value="" disabled>Select User</option>
                                {Object.keys(users).map((id) => (
                                    <option key={id} value={id}>
                                        {users[id].name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <button type="submit" id="login-button" disabled={selectedUser === ''}>Login</button>
                    </form>
                </div>


            </div>
        );
    }
}

function mapStateToProps({redirectUrl, users}) {
    return {
        redirectUrl,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Login))
