import React, {Component} from "react";
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";
import {onLogout} from "../actions/authedUser";
import {setRedirectUrl} from "../actions/shared";

class Nav extends Component {

    handleLogout = (e) => {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(onLogout())
    }

    handleChange = (tab) => {
        const {dispatch} = this.props
        let redirectUrl = '/';
        switch (tab) {
            case 3:
                redirectUrl = '/leaderboard';
                break;
            case 2:
                redirectUrl = '/add';
                break;
            default:
                redirectUrl = '/';
                break;
        }
        dispatch(setRedirectUrl(redirectUrl))
    }

    getTab = () => {
        const {redirectUrl} = this.props
        let tab = 1
        switch (redirectUrl) {
            case '/add':
                tab = 2;
                break;
            case '/leaderboard':
                tab = 3;
                break;
            default:
                tab = 1;
                break;
        }
        return tab;
    }

    render() {
        let tab = 1
        const authed = Object.keys(this.props.authedUser).length !== 0
        if (authed) {
            tab = this.getTab();
        }

        return (
            <div>{authed && (<nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'
                                 style={{
                                     background: tab === 1 ? '#04AA6D' : '#333'
                                 }}
                                 onClick={() => this.handleChange(1)}>
                            Home
                        </NavLink>

                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'
                                 style={{
                                     background: tab === 2 ? '#04AA6D' : '#333'
                                 }}
                                 onClick={() => this.handleChange(2)}>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'
                                 style={{
                                     background: tab === 3 ? '#04AA6D' : '#333'
                                 }}
                                 onClick={(e) => this.handleChange(3)}>
                            Leader Board
                        </NavLink>
                    </li>
                    <li style={{"float": "right"}}>
                        <NavLink to="/login" activeClassName='active' onClick={this.handleLogout}>
                            Logout
                        </NavLink>
                    </li>
                    <li style={{"float": "right"}}>
                        <div className="user-info">
                            <div>
                                <p style={{"color": "white"}}>
                                    {`Hello, ${this.props.authedUser.name}`}
                                </p>
                            </div>
                            <div>
                                <img
                                    src={this.props.authedUser.avatarURL}
                                    className='avatar'
                                    alt="avatar">
                                </img>
                            </div>


                        </div>
                    </li>

                </ul>
            </nav>)}</div>


        )
    }
}

function mapStateToProps({authedUser, redirectUrl}) {
    return {
        authedUser,
        redirectUrl
    }
}

export default connect(mapStateToProps)(Nav)