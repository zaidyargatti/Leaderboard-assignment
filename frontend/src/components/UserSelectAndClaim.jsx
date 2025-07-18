import { useState, useEffect } from "react";
import axios from "../services/Axios";

const UserSelectAndClaim = ({ onClaimSuccess }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [claimPoints, setClaimPoints] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data.users || []);
      if (res.data.users?.length) setSelectedUserId(res.data.users[0]._id);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add new user
  const addUser = async () => {
    if (!newUserName.trim()) return alert("Enter a username");
    try {
      const res = await axios.post("/api/users", { username: newUserName.trim() });
      if (res.data.success) {
        setNewUserName("");
        fetchUsers();
      } else {
        alert(res.data.message || "Failed to add user");
      }
    } catch (error) {
      alert("Error adding user");
      console.error(error);
    }
  };

  // Claim random points (1-10) for selected user
  const claimPointsHandler = async () => {
    if (!selectedUserId) return alert("Select a user first");
    try {
      const res = await axios.post(`/api/users/${selectedUserId}/claim`);
      if (res.data.success) {
        setClaimPoints(res.data.points);
        onClaimSuccess(); // refresh leaderboard
      } else {
        alert(res.data.message || "Failed to claim points");
      }
    } catch (error) {
      alert("Error claiming points");
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Select User & Claim Points</h2>
      <div className="flex gap-4">
        <select
          className="flex-grow border rounded p-2"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username} (Points: {user.score})
            </option>
          ))}
        </select>
        <button
          onClick={claimPointsHandler}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Claim
        </button>
      </div>

      {claimPoints !== null && (
        <div className="text-green-700 font-semibold">
          🎉 You claimed {claimPoints} points!
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Add New User</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="New username"
            className="flex-grow border rounded p-2"
          />
          <button
            onClick={addUser}
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelectAndClaim;
