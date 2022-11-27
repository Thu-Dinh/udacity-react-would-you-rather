import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import UserItem from "./UserItem";

class LeaderBoard extends Component {

    render() {
        const {authedUser, users} = this.props
        if (!authedUser || Object.keys(authedUser).length === 0) {
            return <Redirect to={{
                pathname: "/login",
                state: {from: '/leaderboard'}
            }}/>
        }
        const sortedUsers = Object.keys(users).map((id) => users[id])
            .sort((u1, u2) => Object.keys(u2.answers).length + u2.questions.length - Object.keys(u1.answers).length - u1.questions.length)

        return (
            <div>
                <ol>
                    {sortedUsers.map((u) => (
                        <li key={u.id} className='user'>
                            <UserItem user={u}/>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }

}

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard)