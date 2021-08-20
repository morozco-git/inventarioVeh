import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
    
    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);
    }
    
    render(){   

        //let Materias;
        let buttons;
        if(this.props.user){
            buttons = ( 
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={'/'} onClick={this.handleLogout}className="nav-link">Cerrar sesión</Link>
                    </li>
                </ul>
                </div>
            )
        }else
        {
           buttons = ( 
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={'/login'} className="nav-link">Iniciar sesión</Link>
                    </li>      
                </ul>
            </div>
           )
        }

        return(
            <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link to={'/'} className="nav-link">Inicio</Link>   
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    {buttons}
                    </div>
            </div>      
        </nav>
        )
    }
}