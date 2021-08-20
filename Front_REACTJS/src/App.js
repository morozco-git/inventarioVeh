import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import Home from './components/home.component';
import Nav from './components/nav.component';
import Login from './components/login.component';
import Forgot from './components/forgot.component';
import Reset from './components/reset.component';

/** MAIN PAGES: */
import Add from './components/Pages/add';
import DisplayAll from './components/Pages/displayAll';
import Register from './components/Pages/register';

export default class App extends Component {

  state = {};
  
  componentDidMount = () => {
    if(this.state){
      axios.get('user').then
      (res => {this.setUser(res.data);},
      err=> {
        console.log(err) //error: XMLHttpRequest.handleLoad
      }
      )
    }; 
  }
  
  setUser = user => {
    this.setState({
      user: user
    });
  };
    

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* Navigation component */}
          <Nav user={this.state.user} setUser={this.setUser}/>
            <Switch> 
              <div className="container ">
                <div className="row d-flex h-100">
                  <div className="col-sm-12 text-center justify-content-center align-self-center">
                    <div className="centerBlock">
                      {/* Main Routes*/}
                      <Route exact path="/" component={() => <Home user={this.state.user}/>}/>
                      <Route exact path="/home" component={() => <Home user={this.state.user}/>}/>

                      {/* Login*/}
                      <Route exact path="/login" component={() => <Login setUser={this.setUser}/>}/>
                      
                      {/* Credentials*/}
                      <Route exact path="/register" component={() => <Register user={this.state.user}/>}/>
                      <Route exact path="/forgot" component={Forgot}/>
                      <Route exact path="/reset/:id" component={Reset}/>
                      
                      {/* Inventario*/}
                      <Route exact path="/Add" component={() => <Add user={this.state.user}/>}/>

                      <Route exact path="/DisplayAll" component={() => <DisplayAll user={this.state.user}/>}/>
                    </div>
                  </div>
                </div>
              </div>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
