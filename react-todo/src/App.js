import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header'
import Join from './routes/Join';
import TodoList from './routes/TodoList';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      token: null,
      userName: null,
      has_token: false,
    }
  }

  callbackFromApp=(token, userName, has_token )=>{
    this.setState({
      token:token,
      userName:userName,
      has_token:has_token
    })
  }

  render() {
    console.log('App render',this.state.token)
    const {token, userName, has_token} = this.state
    const {callbackFromApp} = this
    
    return (
      <Router>
          <Header userName={userName} 
                  has_token={has_token} 
                  token={token} 
                  callbackFromApp={callbackFromApp} />
          <Switch>
            <Route 
              exact path="/todos" 
              render={props=>
                <TodoList 
                  userName={userName} 
                  has_token={has_token} 
                  token={token}
                />}
            />
            <Route path="/join" component={Join}/>
          </Switch>
      </Router>
    )
  }
}

export default App;
