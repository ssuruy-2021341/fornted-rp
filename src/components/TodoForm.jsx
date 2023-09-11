import React, { useState, useEffect } from "react";

const initialFormValues = {
  title: "",
  description: "",
  dateStart: "",
  dateEnd: "",
  name: ""
};

export const TodoForm = ({ todoAdd, todoEdit, todoUpdate, setTodoEdit }) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { title, description, dateStart, dateEnd, name } = formValues;
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  useEffect(() => {
    if (todoEdit) {
      setFormValues(todoEdit);
    } else {
      setFormValues(initialFormValues);
    }
  }, [todoEdit]);

  const handleInputChange = (e) => {
    const changedFormValues = {
      ...formValues,
      [e.target.name]: e.target.value,
    };
    setFormValues(changedFormValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Debes indicar un título");
      return;
    }
    if (description.trim() === "") {
      setError("Debes indicar una descripción");
      return;
    }
    if (todoEdit) {
      todoUpdate(formValues);
      setSuccessMessage("Actualizado con éxito");
    } else {
      todoAdd(formValues);
      setSuccessMessage("Agregado con éxito");
    }
    setFormValues(initialFormValues);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
    setError(null);
  };

  return (
    <div>
      <h3 className="text-center display-7">
        {todoEdit ? "Editar videojuego" : "Agregar Juego"}

      </h3>
      {todoEdit && (
        <button
          onClick={() => setTodoEdit(null)}
          className="btn btn-sm btn-warning mb-2"
        >
          Cancelar 
        </button>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div className="col-auto">
          <label htmlFor="exampleFormControlInput1" className="form-label">Nombre del videojuego</label>
          <input
            type="text"
            placeholder="Nombre Del Juego"
            className="form-control"
            value={title}
            name="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-auto">
          <label htmlFor="exampleFormControlInput1" className="form-label">Descripción</label>
          <textarea
            placeholder="Contenido"
            className="form-control"
            value={description}
            name="description"
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button id="buttonAgregar" className="btn btn-primary btn-block mt-2">
          {todoEdit ? "Actualizar videojuego" : "Agregar"}
        </button>
      </form>

      {/* MUESTRA MENSAJE TITULO VACIO */}
      {error && <div className="alert alert-danger mt-2">{error}</div>}

      {/* MUESTRA MENSAJE DE ÉXITO */}
      {successMessage && (
        <div className="alert alert-success mt-2">{successMessage}</div>
      )}
    </div>
  );
};

export default TodoForm;
