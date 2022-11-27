import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class QuestionItem extends Component {

    showDetailQuestion = (e, id) => {
        e.preventDefault();
        this.props.history.push(`/questions/${id}`)
    }

    render() {
        const question = this.props.question
        return (
            <div key={question.id} className="question-item">
                <h3>{`${question.authorName} asks: `}</h3>
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
                            <p><b>Would you rather</b></p>
                            <div className="ellipsis-content">...{question.optionOne.text}</div>
                            <br/>
                            <button onClick={(e) => this.showDetailQuestion(e, question.id)}>View Poll</button>
                            <p></p>
                        </td>
                    </tr>
                    </tbody>
                </table>


            </div>)
    }
}

export default withRouter(QuestionItem)