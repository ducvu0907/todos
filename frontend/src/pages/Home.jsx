import Sidebar from "../components/Sidebar";
import TaskContainer from "../components/TaskContainer";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <TaskContainer />
    </div>
  )
}