import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext";
import TaskForm from "./TaskForm";

export default function TaskContainer() {
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
  }, [tasks]);

  return (
    <div className="w-full min-h-screen mx-auto px-4 py-8">
      <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {tasks.map((task, index) => (
          <TaskForm
            key={index}
            task={task}
          />
        ))}
      </div>
    </div>
  )
}