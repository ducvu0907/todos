import Account from "./Account"
import SearchInput from "./SearchInput"
import TaskList from "./TaskList"

export default function Sidebar() {
  return (
    <div className="w-1/4 min-h-screen text-2xl bg-neutral-100 flex flex-col p-4">
      <Account />
      <SearchInput />
      <TaskList />
    </div>
  )
}