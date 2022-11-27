import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import QuestionItem from "./QuestionItem";

class Home extends Component {
    state = {
        tab: "1",
    }

    changeTab = (tab) => {
        return this.setState({
            tab
        })
    }

    render() {
        if (!this.props.authedUser || Object.keys(this.props.authedUser).length === 0) {
            return <Redirect to='/login'/>
        }

        const {tab} = this.state

        const authedUser = this.props.users[this.props.authedUser.id]
        let questions = []
        if (tab === "1") {
            questions = Object.keys(this.props.questions).filter(qid => !Object.keys(authedUser.answers).includes(qid))
                .map(qid => {
                    const question = this.props.questions[qid]
                    const createUser = this.props.users[question.author]
                    return {...question, authorName: createUser.name, authorAvatar: createUser.avatarURL}
                })
                .sort((q1, q2) => q2.timestamp - q1.timestamp)
        } else if (tab === "2") {
            questions = Object.keys(this.props.questions).filter(qid => Object.keys(authedUser.answers).includes(qid))
                .map(qid => {
                    const question = this.props.questions[qid]
                    const createUser = this.props.users[question.author]
                    return {...question, authorName: createUser.name, authorAvatar: createUser.avatarURL}
                })
                .sort((q1, q2) => q2.timestamp - q1.timestamp)
        }

        return (
            <div>
                <table className="question-tbl">
                    <tbody>
                    <tr className="header-tbl">
                        <th className={`${tab === '1' ? "active" : ""}`}
                            onClick={(e) => this.changeTab("1")}>

                            <h3>Unanswered Questions</h3>

                        </th>
                        <th className={`${tab === '2' ? "active" : ""}`}
                            onClick={(e) => this.changeTab("2")}>
                            <h3>Answered Questions</h3>
                        </th>
                    </tr>
                    {questions.map((q) => (
                        <tr key={q.id}>
                            <td colSpan="2">
                                <QuestionItem question={q}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>

            </div>
        );
    }

}

function mapStateToProps({authedUser, users, questions}) {
    return {
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(Home)