import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaSpinner } from "react-icons/fa";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAuthUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, confirmPassword }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-2">
            <label htmlFor="username" className="block mb-2 text-sm font-semibold text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border-2 rounded-md focus:outline-none focus:border-blue-500"
              minLength={3}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border-2 rounded-md focus:outline-none focus:border-blue-500"
              minLength={6}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border-2 rounded-md focus:outline-none focus:border-blue-500"
              minLength={6}
              required
            />
          </div>
          <Link to={"/signin"} className="text-blue-500 hover:underline block mb-2">Already have an account ?</Link>

          <button
            type="submit"
            className={`w-full h-[35px] px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${loading && "disabled"}`}
          >
            {loading ? <FaSpinner className="text-xl mx-auto" /> : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}