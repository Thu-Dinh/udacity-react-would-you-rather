import React, {Component} from "react";
import {connect} from "react-redux";
import {handleAddQuestion} from "../actions/questions";
import {Redirect} from "react-router-dom";
import {setRedirectUrl} from "../actions/shared";

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    }

    handleChange = (e) => {
        const optionValue = e.target.value
        const optionId = e.target.id
        this.setState(() => ({
            [optionId]: optionValue
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch} = this.props
        const {optionOne, optionTwo} = this.state
        dispatch(handleAddQuestion(optionOne, optionTwo))
        dispatch(setRedirectUrl("/"))

        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toHome: true,
        }))
    }

    render() {
        if (!this.props.authedUser || Object.keys(this.props.authedUser).length === 0) {
            return <Redirect  to={{
                pathname: "/login",
                state: {from: '/add'}
            }}/>
        }

        const {optionOne, optionTwo, toHome} = this.state
        if (toHome === true) {
            return <Redirect to='/'/>
        }

        return (<div className="new-question">
            <h2>Create New Question</h2>
            <div className="body">
                <p style={{"fontSize": "14px"}}>Complete the question:</p>
                <h3>Would you rather...</h3>
                <form onSubmit={this.handleSubmit}>
                    <input className="field-input" type="text" id="optionOne" placeholder="Enter Option One Text Here"
                           onChange={this.handleChange}/>

                    <div className="separator">OR</div>

                    <input className="field-input" type="text" id="optionTwo" placeholder="Enter Option Two Text Here"
                           onChange={this.handleChange}/>
                    <br/>
                    <button
                        className='btn'
                        type='submit'
                        disabled={optionOne === '' || optionTwo === ''}>
                        Submit
                    </button>
                </form>
            </div>

        </div>)
    }
}

function mapStateToProps({redirectUrl,authedUser}) {
    return {
        redirectUrl,
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)