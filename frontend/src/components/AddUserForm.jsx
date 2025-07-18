import { useState } from "react";
import axios from "../services/Axios";
import { toast } from "react-toastify";

export default function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      await axios.post("/api/users", { name });
      toast.success("User added successfully!");
      onUserAdded(); // reload leaderboard
      setName("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-4">
      <input
        type="text"
        placeholder="Add new user"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add User
      </button>
    </form>
  );
}
