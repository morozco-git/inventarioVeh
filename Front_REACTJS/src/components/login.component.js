import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';

//USING CLASSES
export default class Login extends Component {
    state = {}    
    handleSubmit = e => {
        e.preventDefault();
        
        const data ={
            email: this.email,
            password: this.password
        }
        
        axios.post ('login', data)
        .then (res => {
            //console.log(res)
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            this.setState({
                loggedIn: true
            });
            this.props.setUser(res.data.user);
        }).catch(err => {
            console.log(err.response.data)
            this.setState({
                message: err.response.data.message
            })
        })
    }

    render() {

        if(this.state.loggedIn){
            return <Redirect to= {'/'}/>
        }

        let error = '';

        if(this.state.message){
            error = (
                <div className="alert alert-danger">
                    {this.state.message}
                </div>
            )
        }

        return (
            <section className="container">
                <div className="row">
                    <div class="col-sm-12">
                        <div className="loginSection">
                            <form onSubmit={this.handleSubmit}>
                                <h3 className="pb-3">Iniciar sesión:</h3>
                                <div className="form-group">
                                    <h1 className="customLabel">Usuario:</h1>
                                    <input type="text" className="form-control" placeholder="Usuario" onChange={e => this.email = e.target.value}/>
                                </div>
                                <div className="form-group">
                                    <h1 className="customLabel">Contraseña:</h1>
                                    <input type="password" className="form-control" placeholder="Contraseña" onChange={e => this.password = e.target.value}/>
                                </div>
                                <button className="btn-primary btn-block">Continuar</button>
                                <p className="forgot-password text-right">
                                    <Link to={'forgot'}>¿Olvidaste tu contraseña?</Link>
                                </p>
                                {error}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}