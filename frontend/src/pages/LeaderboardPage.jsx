import { useEffect, useState } from "react";
import axios from "../services/Axios";
import LeaderboardCard from "../components/LeaderboardCard";
import AddUserForm from "../components/AddUserForm";
import ClaimPointsForm from "../components/ClaimPointsForm";
import HistoryTable from "../components/HistoryTable";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("/api/users");
      const sorted = res.data.sort((a, b) => b.points - a.points);
      setUsers(sorted);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🏆 Leaderboard</h1>

      <AddUserForm onUserAdded={fetchLeaderboard} />
      <ClaimPointsForm onClaim={fetchLeaderboard} />

      <div className="grid gap-4">
        {users.map((user, idx) => (
          <LeaderboardCard key={user._id} user={user} rank={idx + 1} />
        ))}
      </div>

      <HistoryTable />

      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
