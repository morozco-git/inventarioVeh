import React, {Component} from 'react';
import axios from 'axios';
import NotFound from '../Pages/notFound';

export default class Register extends Component {
    
    state ={};

    handleCleanInputs = () => {
        this.firstName=""
        this.secName=""
        this.lastName=""
        this.secLastName=""
        this.form.reset(); //reset frm
      };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            first_name: this.firstName,
            last_name: this.lastName,
            email:this.email,
            password:this.password,
            password_confirm:this.confirmPassword
        }

        // console.log(data);
        axios.post('register', data)
        .then(res => {
                console.log(res)
                if(res.status===200){
                    this.handleCleanInputs();
                    this.setState({
                        message: 'Usuario Agregado',
                        cls: 'success'
                    })
                }

            }
        ).catch(
            err => {
                console.log(err.response.data.errors)
                let errMessage = "";
                try{
                     const jasonStr = {
                        infoEmail: JSON.stringify(err.response.data.errors.email),
                        infoPass: JSON.stringify(err.response.data.errors.password_confirm)
                    }

                    if(typeof jasonStr.infoEmail !== 'undefined'){
                        errMessage = "Este correo ya esta en uso!";
                    }
                    else if(typeof jasonStr.infoPass !== 'undefined'){
                        errMessage = "Las contraseñas no son válidas!";
                    }
                } catch(e){
                    console.log(e);
                }                 
                 if(errMessage===""){
                    //errMessage=err.response.data.message
                    errMessage="Agregue Nombre y Apellido"
                } 
                this.setState({
                    message: errMessage,
                    cls: 'danger'
                })
                errMessage = "";
            }
        )
    }
    render(){

        let error = '';
        if(this.state.message){
            error = (
                <div className={"alert alert-" + this.state.cls}>
                    {this.state.message}
                </div>
            )
        }
        if(this.props.user){
            return (
            <div className="page-wrapper">
                <form onSubmit={this.handleSubmit} ref={(form) => (this.form = form)}>
                    <h3>Agregar usuario:</h3>
                    <div className="customLabel py-3">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="text" className="form-control" placeholder="Nombre" onChange={e => this.firstName = e.target.value}/>
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input type="text" className="form-control" placeholder="Apellido" onChange={e => this.lastName = e.target.value}/>
                        </div>
                        <div className="form-group">
                            <label>Correo</label>
                            <input type="email" className="form-control" placeholder="Correo" onChange={e => this.email = e.target.value}/>
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input 
                                type="password" 
                                autoComplete="new-password"
                                className="form-control" 
                                placeholder="Contraseña" 
                                onChange={e => this.password = e.target.value}/>
                        </div>
                        <div className="form-group">
                            <label>Confirmar Contraseña</label>
                            <input 
                                type="password" 
                                autoComplete="new-password"
                                className="form-control" 
                                placeholder="Confirmar contraseña" 
                                onChange={e => this.confirmPassword = e.target.value}/>
                        </div>
                        <button className="btn-primary btn-block">Agregar</button>
                    </div>
                    {error}
                </form>
            </div>
            )
        }
        return(
            <NotFound />
        )
    }
}