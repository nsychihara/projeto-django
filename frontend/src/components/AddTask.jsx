import React, { useState } from "react";
import axios from "axios";

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/api/tasks/", { title });
    onAdd(res.data);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Digite uma tarefa..."
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
