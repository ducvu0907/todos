import { useState } from "react"
import { BsTrash } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function TaskForm({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [status, setStatus] = useState(task.status);
  const { authUser } = useContext(AuthContext);

  // format task due date
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = {
        taskId: task._id,
        title,
        description,
        dueDate,
        status
      };
      const res = await fetch(`http://localhost:5000/api/tasks/update/${authUser.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask)
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

    } catch (error) {
      console.log(error.message);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/delete/${authUser.id}/${task._id}`);
      const data = await res.json();
      if (date.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(task.title || "");
    setDescription(task.description || "");
    setDueDate(task.dueDate || "");
    setStatus(task.status || "");
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="w-[250px]  bg-white shadow-xl rounded-lg p-4 mb-4 border-t-4 border-t-orange-300 flex flex-col">
          <BsTrash className="w-full btn bg-red-500 mb-3" onClick={() => handleDeleteTask(task)} />
          <input type="text" className="w-full text-lg font-semibold mb-2 input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="w-full min-h-[100px] border-2 rounded-md mb-2 p-2" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
            <input type="date" className="w-full border-2" value={dueDate ? formattedDate(dueDate) : ""} onChange={(e) => setDueDate(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={`w-3/4 px-2 py-1 rounded ${task.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
              <option>todo</option>
              <option>completed</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="w-[100px] bg-blue-400 text-white text-md rounded-md" onClick={handleSubmit}>Save</button>
            <button className="w-[100px] bg-red-400 text-white text-md rounded-md" onClick={handleCancel}>Cancel</button>
          </div>
        </form>) :
        (
          <div className="w-[250px] h-[100px] bg-white shadow-xl rounded-lg p-4 mb-4 border-t-4 border-t-orange-300 cursor-pointer" onClick={() => setIsEditing(true)}>
            <h2 className="h-1/3 text-lg font-semibold mb-2 overflow-hidden">{task.title}</h2>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <p>Due: {task.dueDate ? formattedDate(task.dueDate) : "None"}</p>
              <span className={`px-2 py-1 rounded ${task.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                {task.status}
              </span>
            </div>
          </div>
        )}
    </>
  )
}