import Account from "./Account"
import SearchInput from "./SearchInput"
import TasksList from "./TasksList"

export default function Sidebar() {
  return (
    <div className="w-1/4 h-screen text-2xl bg-neutral-100 flex flex-col p-4">
      <Account />
      <SearchInput />
      <TasksList />
    </div>
  )
}