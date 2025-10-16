import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // 🟩 Buscar tarefas do Django API
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
    }
  };

  // 🟦 Adicionar nova tarefa
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}`, { title: newTask });
      setNewTask("");
      fetchTasks();
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
    }
  };

  // 🟥 Deletar tarefa
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}${id}/`);
      fetchTasks();
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>📝 Minhas Tarefas</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova tarefa..."
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
