import React, {Component, Fragment} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {connect} from 'react-redux'
import {handleInitialData} from "./actions/shared";
import LoadingBar from "react-redux-loading";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Home from "./components/Home";
import NewQuestion from "./components/NewQuestion";
import DetailQuestion from "./components/DetailQuestion";
import LeaderBoard from "./components/LeaderBoard";
import NotFoundPage from "./components/NotFoundPage";


class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData({}))
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div className='container'>
                        <Nav/>
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Route path='/login' component={Login}/>
                                <Route path='/' exact component={Home}/>
                                <Route path='/questions/:id' component={DetailQuestion}/>
                                <Route path='/add' component={NewQuestion}/>
                                <Route path='/leaderboard' component={LeaderBoard}/>
                                <Route path='/notfound' component={NotFoundPage}/>
                            </div>
                        }
                    </div>
                </Fragment>
            </Router>
        )
    }
}


export default connect()(App);
