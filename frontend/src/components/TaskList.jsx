import { useState, useEffect } from 'react';

export default function TaskList() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/tasks");
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

  return (
    <div>TaskList</div>
  );
};