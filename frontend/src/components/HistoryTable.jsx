// components/HistoryTable.jsx
import { useEffect, useState } from "react";
import axios from "../services/Axios";

export default function HistoryTable() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("/api/history"); // Make sure this route populates userId
      setHistory(res.data.reverse()); // Latest first
    } catch (err) {
      console.error("Failed to fetch claim history:", err);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Claim History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Points</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">
                  {h?.userId?.name || "Unknown"}
                </td>
                <td className="border px-4 py-2">
                  {typeof h.pointsClaimed === "number"
                    ? h.pointsClaimed
                    : "0"}
                </td>
                <td className="border px-4 py-2">
                  {h.claimedAt
                    ? new Date(h.claimedAt).toLocaleString()
                    : "Invalid Date"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
