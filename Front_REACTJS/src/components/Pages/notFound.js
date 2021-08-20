import React from 'react'

const NotFound= () => {

    if(localStorage.getItem('token')){
        return(
            <div className="page-wrapper">
                <h align='center'> Cargando... </h>
            </div>
        )
    }else{
        return(
            <div className="page-wrapper">
                <h align='center'> Page not found </h>
            </div>
        )
    }
}

export default NotFound