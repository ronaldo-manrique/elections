import CrudTableRow from "./CrudTableRow";

const CrudTable = ({ data, setDataToEdit, deleteData }) => {
  
  
  const tableContainerStyle = {
    maxHeight: "400px", // Establece la altura máxima del contenedor de la tabla
    overflowY: "auto" // Agrega una barra de desplazamiento vertical cuando sea necesario
  };
  return (
    <div >
      <h3 className="text-center ">ELECTION INFORMATION</h3>
      <div style={tableContainerStyle} className="table-container" >
      <table className="table P-4">
        <thead>
          <tr>
            {/* <th>id</th> */}
            <th>year</th>
            <th>political party</th>
            <th>county</th>
            <th>vote count</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data.length > 0 ? (
            data.map((el) => (
              <CrudTableRow
                key={el.id}
                elemento={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
           
          ) : (
            <tr>
              <td colSpan="3">no hay  datos todavia </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>  
  );
};

export default CrudTable;
