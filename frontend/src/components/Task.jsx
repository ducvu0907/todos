import { useState } from "react"

export default function Task() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState();
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const handleAddTask = () => {

  };

  return (
    <div className="w-[350px] h-[100px] flex flex-col bg-blue-500">
      <h2 className="text-3xl font-semibold">${title}</h2>
    </div>
  )
}