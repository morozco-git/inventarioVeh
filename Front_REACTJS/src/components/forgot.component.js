import React, {Component} from 'react';
import axios from 'axios';

export default class Forgot extends Component {
    state ={}

    handleSubmit = e => {
        e.preventDefault();

        const data ={
            email: this.email
        };

        axios.post('forgot', data).then(
            res => {
                this.setState({
                    message: res.data.message,
                    cls: 'success'
                })
            }
        ).catch(
            err => {
                this.setState({
                    message: err.response.data.message,
                    cls: 'danger'
                })
            }
        )
    };


    render(){

        let message = '';

        if(this.state.message){
            
            const cls = 'alert alert-' + this.state.cls;

            message = (
                <div className={cls} role ="alert">
                    {this.state.message}
                </div>
            )
        }
        return (
            <div className="loginSection">
                <form onSubmit={this.handleSubmit}>
                    <h3>Recupere su cuenta:</h3>
                    <div className="form-group">
                        <h1 className="customLabel py-2">Ingrese su correo o usuario:</h1>
                        <input type="email" className="form-control" placeholder="Correo" onChange={e => this.email = e.target.value}/>
                    </div>
                    <button className="btn-primary btn-block">Continuar</button>
                    <br></br>
                    {message}
                </form>
            </div>
        )
    }
}