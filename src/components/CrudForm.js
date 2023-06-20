import React, { useEffect, useState } from "react";


const initialForm = {
  year: "",
  politico: "",
  id: null,
  county: "",
  votos: "",
};
const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };
  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div >
      <div id="election"className="border border border-3 ">
        <h4 className="text-bg-primary p-3 ">Election</h4>

        <h4 className="text-center">{dataToEdit ? "Edit" : "Add"}</h4>

        <form  className="form-control formulario" onSubmit={handleSubmit}>
          <label>year</label>
          <input className="form-control"
            type="number"
            name="year"
            placeholder="year"
            min="1900"
            max="2100"
            onChange={handleChange}
            value={form.year}
            required
          />
          <label>political party</label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="politico"
            onChange={handleChange}
            value={form.politico}
            placeholder="selecione one"
          >
            <option selected>select one</option> 
            <option value="republic">republic</option>
            <option value="democrat">democrat</option>
          </select>
          <label>county</label>
          <input className="form-control"
          
            type="text"
            name="county"
            placeholder="county"
            onChange={handleChange}
            value={form.county}
            required
          />
          <label>vote count</label>
          <input className="form-control"
           
            type="number"
            placeholder="vote count"
            name="votos"
            min="0"
            onChange={handleChange}
            value={form.votos}
            required
          />

          <input id="submit"className="btn btn-primary" type="submit" value="enviar" />
          <input  className="btn btn-secondary" type="reset" value="limpiar" onClick={handleReset} />
        </form>
      </div>
    </div>
  );
};

export default CrudForm;
