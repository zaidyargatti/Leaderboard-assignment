// components/ClaimPointsForm.jsx
import { useState, useEffect } from "react";
import axios from "../services/Axios";
import { toast } from "react-toastify";

export default function ClaimPointsForm({ onClaim }) {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to load users");
    }
  };

  const handleClaim = async () => {
    if (!selectedId) {
      toast.error("Please select a user");
      return;
    }

    try {
      const res = await axios.post("/api/claim", { userId: selectedId });
      toast.success(`Awarded ${res.data.pointsClaimed || res.data.points} points!`);
      onClaim(); // reload leaderboard
    } catch (err) {
      console.error("Claim failed:", err);
      toast.error("Failed to claim points");
    }
  };

  return (
    <div className="flex gap-4 items-center mb-4">
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="border px-4 py-2 rounded"
      >
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleClaim}
        disabled={!selectedId}
        className={`px-4 py-2 rounded text-white ${
          selectedId ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Claim Points
      </button>
    </div>
  );
}
