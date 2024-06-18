import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function SearchInput() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search some thing");
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input type="text" placeholder="Search a task..." className="w-full input input-bordered rounded-full text-lg" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <FaSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  )
}