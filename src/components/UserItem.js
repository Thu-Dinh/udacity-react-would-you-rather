import React, {Component} from "react";


class UserItem extends Component {
    render() {
        const {user} = this.props
        let score = Object.keys(user.answers).length + user.questions.length
        return (
            <div key={user.id} className="user-item">
                <table>
                    <tbody>
                    <tr>
                        <td className="avatar">
                            <img
                                src={user.avatarURL}
                                className='avatar'
                                alt="avatar">
                            </img>
                        </td>
                        <td className="user-info">
                            <h2>{user.name}</h2>
                            <table style={{"width": "100%"}}>
                                <tbody>
                                <tr>
                                    <td>Answered Questions</td>
                                    <td>{Object.keys(user.answers).length}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <hr/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Created Questions</td>
                                    <td>{user.questions.length}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        <td className="user-score">
                            <div><h3>Score</h3></div>
                            <div className="circle">{score}</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserItem