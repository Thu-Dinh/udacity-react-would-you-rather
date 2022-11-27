import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {handleAnswerQuestion} from "../actions/questions";

class DetailQuestion extends Component {
    state = {
        selectOption: '',
        toHome: false
    }

    handleChange = (e) => {
        const selectOption = e.target.value
        this.setState(() => ({
            selectOption
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch, question} = this.props
        const {selectOption} = this.state
        dispatch(handleAnswerQuestion(question.id, selectOption))

        this.setState(() => ({
            selectOption: '',
            toHome: true,
        }))
    }

    render() {
        const {question, authedUser, id} = this.props
        if (!this.props.authedUser || Object.keys(this.props.authedUser).length === 0) {
            return <Redirect to={{
                pathname: "/login",
                state: {from: `questions/${id}`}
            }}/>
        }

        if(!question){
            return <Redirect to='/notfound'/>
        }

        const {selectOption, toHome} = this.state
        if (toHome === true) {
            return <Redirect to='/'/>
        }

        let answered = false;
        if (Object.keys(authedUser.answers).includes(question.id)) {
            answered = true;
        }
        const totalVotes = question['optionOne']['votes'].length + question['optionTwo']['votes'].length
        const vote1 = ((question['optionOne']['votes'].length) / totalVotes) * 100;
        const vote2 = ((question['optionTwo']['votes'].length) / totalVotes) * 100;
        const authedVote1 = question['optionOne']['votes'].includes(authedUser.id);
        const authedVote2 = question['optionTwo']['votes'].includes(authedUser.id)
        return (
            <div className="detail-question">
                {answered === true
                    ? <div className="question-item">
                        <h3>{`Asked by ${question.authorName}`}</h3>

                        <table>
                            <tbody>
                            <tr>
                                <td className="avatar">
                                    <img
                                        src={question.authorAvatar}
                                        className='avatar'
                                        alt="avatar">
                                    </img>
                                </td>
                                <td className="q-content">
                                    <h2>Results:</h2>
                                    <div className="circle" style={{
                                        display: authedVote1 ? 'inline-flex' : 'none'
                                    }}>
                                        <b>Your vote</b>
                                    </div>
                                    <div className="detail-vote">
                                        <h3><b>Would you
                                            rather {question['optionOne'].text}? </b>
                                        </h3>
                                        <br/>
                                        <div id="myProgress">
                                            <span className="progress-value">{vote1}%</span>
                                            <div id="myBar" style={{
                                                width: `${vote1}`
                                            }}></div>
                                        </div>
                                        <div style={{textAlign: "center"}}>
                                            <b> {question['optionOne']['votes'].length} out of {totalVotes} votes</b>
                                        </div>

                                    </div>

                                    <div className="circle" style={{
                                        display: authedVote2 ? 'inline-flex' : 'none'
                                    }}>
                                        <b>Your vote</b>
                                    </div>
                                    <div className="detail-vote">
                                        <h3><b>Would you
                                            rather {question['optionTwo'].text}? </b>
                                        </h3>
                                        <br/>
                                        <div id="myProgress">
                                            <span className="progress-value">{vote2}%</span>
                                            <div id="myBar" style={{
                                                width: `${vote2}`
                                            }}></div>
                                        </div>
                                        <div style={{textAlign: "center"}}>
                                            <b>{question['optionTwo']['votes'].length} out of {totalVotes} votes</b>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    : <div className="question-item">
                        <h3>{`${question.authorName} asks:`}</h3>
                        <table>
                            <tbody>
                            <tr>
                                <td className="avatar">
                                    <img
                                        src={question.authorAvatar}
                                        className='avatar'
                                        alt="avatar">
                                    </img>
                                </td>
                                <td className="q-content">
                                    <h2>Would you rather...</h2>
                                    <div>
                                        <form onSubmit={this.handleSubmit}>
                                            <input type="radio" id="optionOne" name="contact" value="optionOne"
                                                   onChange={this.handleChange}/>
                                            <label htmlFor="contactChoice1">{question['optionOne'].text}</label>
                                            <p></p>
                                            <input type="radio" id="optionTwo" name="contact" value="optionTwo"
                                                   onChange={this.handleChange}/>
                                            <label htmlFor="contactChoice2"> {question['optionTwo'].text}</label>

                                            <button
                                                className='btn'
                                                type='submit'
                                                disabled={selectOption === ''}>
                                                Submit
                                            </button>
                                        </form>

                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props) {
    const {id} = props.match.params
    const question = questions[id]
    const createUser = question ? users[question.author] : null
    return {
        id,
        authedUser: users[authedUser.id],
        question: question
            ? {...question, authorName: createUser.name, authorAvatar: createUser.avatarURL}
            : null
    }
}


export default connect(mapStateToProps)(DetailQuestion)