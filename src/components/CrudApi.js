import React, { useEffect, useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";
import Cookies from "universal-cookie";


const cookies = new Cookies();
console.log('email',cookies.get('email'))

const CrudApi = () => {

  
  const [datos, setDatos] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cooki,setCooki] = useState(cookies);

  let api = helpHttp();
  let url = "http://localhost:5000/eleciones";

  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      // console.log(res);
      if (!res.err) {
        setDatos(res);
        setError(null);
      } else {
        setDatos(null);
        setError(res);
      }
      setLoading(false);
    });
  }, [url]);  

  useEffect(() => {
    if (!cooki.get('email')) {
      window.location.href = "./";
      setCooki(cooki)
    }
  }, [cookies.email]);


  const cerrarsesion=()=>{
    cookies.remove('email',{path:"/"});
    window.location.href = "./";
  }


  const createData = (data) => {
    data.id = Math.floor(Math.random() * 1000);
    let options= { body:data, headers:{"content-type":"application/json"} };
    
    api.post(url,options).then((res)=>{
      console.log(res);
      if (!res.err){
        setDatos([...datos,res])
      }else{
          setError(res)
      }
    })
   
     //console.log(data);
    setDatos([...datos, data]);
  };

  const updateData = (data) => {

    let endpoint=`${url}/${data.id}`    
    let options= { body:data, headers:{"content-type":"application/json"} };
    
    api.put(endpoint,options).then((res)=>{
      //console.log(res);
      if (!res.err){
        let newData =datos.map((el)=>(el.id === data.id ? data : el))
        setDatos(newData)
      }else{
        setError(res)
      }
    })   
    
  };

  const deleteData = (id) => {
    let endpoint=`${url}/${id}`
    let isDelete = window.confirm(
      `estas seguro de eliminar el registro con id '${id}'`
    );

    if (isDelete) {
      api.del(endpoint).then((res)=>{
        if (!res.err){
          let newData = datos.filter((item) => item.id !== id);
          setDatos(newData);
        }else{
          setError(res)
        }
      })      
    } else {
      return;
    }
  };
  

  return (
    <div> 
    <div><button id="cerrar" className="btn btn-warning" onClick={cerrarsesion}>cerrar sesion</button></div>     
      <article className="grid-1-2">
      
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          
        />

        {loading && <Loader />}

        {error && 
          <Message
            msg={`ERROR ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        }

        {datos && (
          <CrudTable
            data={datos}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
           
          />
        )}
      </article>
    </div>
  );
};

export default CrudApi;
