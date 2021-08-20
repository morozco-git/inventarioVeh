import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import intro from '../img/intro01.png'
import BtnPrimary from './Helpers/btnPrimary';

export default class Home extends Component {
   
    render(){
        
        if(this.props.user){
               return (
                   <div className="page-wrapper">
                    <div>
                    <h2 align='center'>
                        Bienvenido al Inventario
                    </h2>
                    <br></br>
                    <h2 align='center'>{this.props.user.first_name} {this.props.user.last_name}</h2>  
                    </div>
                    <br></br>
                    <br></br>
                    <div>                 
                        <BtnPrimary
                            url={'/Add'}
                            content={'Agregar vehículos'}
                        />     
                    </div>
                    <div>                 
                        <BtnPrimary
                            url={'/DisplayAll'}
                            content={'Mostrar Inventario'}
                        />     
                    </div>
                    <div>                 
                        <BtnPrimary
                            url={'/register'}
                            content={'Agregar Usuarios'}
                        />     
                    </div>
                    </div>
                )
        }       
        return (          
            <div style={{marginTop: "180px"}}>
                    <Link to="login">
                    <img src={intro} alt="intro" className="img-fluid zoomImg"/>
                    </Link>
            </div>
        )
    }
}