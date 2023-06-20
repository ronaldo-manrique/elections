
const CrudTable=({elemento,setDataToEdit,deleteData})=>{
  let {year,politico,county,votos,id}= elemento
  return(      
          <tr >
            {/* <td>{id}</td> */}
            <td>{year}</td>
            <td>{politico}</td>
            <td>{county}</td>
            <td>{votos}</td>
            
            <td> 
                <button className="button btn btn-info" onClick={()=>setDataToEdit(elemento)}>edit</button>
                <button className="button btn btn-danger" onClick={()=>deleteData(id)}>delete</button>
            </td>
          </tr>
      )
}

export default CrudTable;