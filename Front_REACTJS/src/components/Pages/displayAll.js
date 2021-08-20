import React, {useEffect, useState} from 'react';
import NotFound from '../Pages/notFound'
import BtnPrimary from '../Helpers/btnPrimary';
import axios from 'axios'
import GetInventarioTbl from '../Reports/getInventarioTbl';
import '../Reports/GetInventarioTbl.scss';
/**
 * 
 * @param {user} props 
 * USING FUNCTIONS/HOOKS/STATES/PROPS/ASYNC / AWAIT
 */

const DisplayallVeh = (props) => {
  
    let dataTable = []
    let count = 1;

    const [collection, setCollection] = useState(null)
    const [loadingData, setLoadingData] = useState(<p>Cargando datos...</p>)


    useEffect(()=>{
        //Using ASYNC / AWAIT
        if(collection===null){
        const reqAllInv = async () => {
            try {
                const res = await axios.post ('getAllInv');
                //console.log(res.data.allInventario);
                if(res.status===200){
                    //alert("Inventario Obtained")
                    setCollection(res.data.allInventario)
                }
            } catch (err) {
                console.log(err.response.data)
                alert(err.response.data.message)
            }
        };
        reqAllInv();
        }
    },[collection])


    if(collection !== null && loadingData !== null){
        dataTable = collection.map(t=> [count++, t.tipo, t.pMotor, t.nLlantas, t.Total]);

        let output =(
            <GetInventarioTbl
            tableData={dataTable}
            headingColumns={['Nº', 'Tipo','P/Motor','Llantas','Total/Stock']}
            />
        )
        //State to show the data Inventario:
        setCollection(output)
        setLoadingData(null)
    }



     if(props.user){
        return(
            <div className="page-wrapper">
                <h3>Total del Inventario</h3>

                <br></br>                
                {loadingData}
                {collection}

                <div className="customLabel py-3">
                    <BtnPrimary
                        url={'/'}
                        content={'Regresar'}
                    />    
                </div>
            </div>
        )
    }
    //Default
    return (
        <NotFound/>
    )
}
export default DisplayallVeh