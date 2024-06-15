import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"

export default function Account() {
  return (
    <div className="w-full mb-4 flex justify-between items-center">
      <span>
        <FaUserCircle className="text-3xl inline mr-2" />
        username
      </span>
      <FaSignOutAlt />
    </div>
  )
}