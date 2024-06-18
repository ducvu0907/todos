import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Account() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const handleSignOut = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("user");
      setAuthUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full mb-4 flex justify-between items-center">
      <span>
        <FaUserCircle className="text-3xl inline mr-4" />
        {authUser.username}
      </span>
      <button onClick={handleSignOut} ><FaSignOutAlt /></button>
    </div>
  )
}