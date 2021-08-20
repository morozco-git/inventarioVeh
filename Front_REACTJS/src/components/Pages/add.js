import React, {useState} from 'react';
import NotFound from '../Pages/notFound'
import axios from 'axios'

//USING FUNCTIONS AND HOOKS STATES
function AddVeh(props) {

const[vehiculo, setVehiculo] = useState({
    tipo:'',
    nLlantas:'',
    pMotor: ''
})

const handleSubmit = e => {
    e.preventDefault();
    const data ={
        tipo: vehiculo.tipo,
        nLlantas:vehiculo.nLlantas,
        pMotor:vehiculo.pMotor
    }
    
    if(data.tipo === '' || data.pMotor === ''){
        alert('Favor de llenar todos los campos')
    }else{
        //Using ASYNC / AWAIT
        const addVehReq = async () => {
            try {
                const res = await axios.post ('add', data);
                //console.log(res.status);
                if(res.status===200){
                    alert("Vehículo Agregado!")
                }
            } catch (err) {
                console.log(err.response.data)
                //alert(err.response.data.message)
            }
        };
        addVehReq();
    }
}


function handleChange(e) {
    e.preventDefault();

    if(e.target.value==='Sedan'){
        setVehiculo({...vehiculo, tipo: e.target.value, nLlantas:4})
    }else if(e.target.value==='Motocicleta'){
        setVehiculo({...vehiculo, tipo: e.target.value, nLlantas:2})
    }else{
        setVehiculo({...vehiculo, tipo: e.target.value, nLlantas:""})
    }
}

     if(props.user){
        return(
            <div className="page-wrapper">
                <form onSubmit={handleSubmit}>
                    <h3>Agregar Vehículo:</h3>
                    <div className="customLabel py-3">
                        <div className="form-group">
                            <label>Tipo de Vehículo</label>
                            <select 
                            id = '1'
                            className="form-control" 
                            onChange={handleChange}>
                                <option value="">Seleccionar Vehículo</option>
                                <option value="Sedan">Sedan</option>
                                <option value="Motocicleta">Motocicleta</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Número de llantas</label>
                            <input readOnly id = '2' type="number" className="form-control" 
                            value={vehiculo.nLlantas}
                            />
                        </div>
                        <div className="form-group">
                            <label>Potencia del Motor</label>
                            <input id = '3' type="text"
                            autoComplete="off"
                            className="form-control"
                            onChange={e=> e.target.value !== vehiculo.pMotor ?
                                setVehiculo({...vehiculo, pMotor: e.target.value}): setVehiculo({...vehiculo})}
                            />
                        </div>
                        <button className="btn-primary btn-block">Agregar</button>
                    </div>

                </form>
            </div>
        )
    }
    //Default
    return (
        <NotFound/>
    )

}
export default AddVeh