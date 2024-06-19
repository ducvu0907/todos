import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default function TaskList() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/tasks/${authUser.id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setTasks(data);

      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskList();
  }, []);

  const handleAddTask = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/create/${authUser.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "title": "untitled" }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setTasks([...tasks, data]);

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full rounded-xl mt-3 p-3">
      {loading ? <span className="loading loading-spinner block mx-auto"></span> :
        (
          <>
            <div className="flex flex-col">
              {tasks.map((task, index) =>
                <span key={index} className={`text-[20px] flex items-center justify-between border-b-2 border-gray-300 hover:bg-gray-200 p-1 overflow-hidden`}>
                  {task.title}
                  <input type="checkbox" className="checkbox checkbox-md border-0" checked={task.status === "completed"} readOnly />
                </span>
              )}
            </div>
          </>)}
      <button className="w-full btn block mx-auto border-1 border-gray-500"><AiOutlinePlusCircle className="w-full h-6" onClick={handleAddTask} /></button>
    </div>
  );
};