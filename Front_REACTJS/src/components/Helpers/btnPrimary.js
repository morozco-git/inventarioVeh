import React from 'react'
import {Link} from 'react-router-dom';

const BtnPrimary = props => (
        <Link to={props.url} style={{ textDecoration: 'none'}}>
            <button className="btn-primary btn-block text-center">{props.content}</button>
        </Link>            
)

export default BtnPrimary