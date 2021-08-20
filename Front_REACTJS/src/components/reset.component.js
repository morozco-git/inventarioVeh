import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Reset extends Component {

    state = {}

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            token: this.props.match.params.id,
            password: this.password,
            password_confirm: this.password_confirm
        }

        axios.post('reset', data).then(
            res => {
                console.log(res);
                this.setState({
                    reset: true
                })
            }
        ).catch(
            err => {
                this.setState({
                    message: err.response.data.message
                })
            }
        )
    
    };

    render() {
        let error = '';

        if(this.state.message){
            error = (
                <div className="alert alert-danger">
                    {this.state.message}
                </div>
            )
        }

        if(this.state.reset){
            return <Redirect to= {'/login'}/>
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="page-wrapper">
                    <h3>Restablecer contraseña:</h3>
                    <div className="form-group py-3">
                        <h1 className="customLabel">Contraseña:</h1>
                        <input type="password" className="form-control" placeholder="Ingrese su nueva contraseña" onChange={e => this.password = e.target.value}/>
                    </div>
                    <div className="form-group">
                        <h1 className="customLabel">Confirmar contraseña:</h1>
                        <input type="password" className="form-control" placeholder="Confirmar su nueva contraseña" onChange={e => this.password_confirm = e.target.value}/>
                    </div>
                    <button className="btn btn-primary btn-block">Continuar</button>
                    <br></br>
                    {error}
                </div>
            </form>         
        )
    }
}