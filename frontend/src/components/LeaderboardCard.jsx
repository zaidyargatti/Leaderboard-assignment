const LeaderboardCard = ({ user, rank }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg flex justify-between items-center">
      <span className="text-lg font-semibold text-gray-700">#{rank}</span>
      <span className="text-lg text-gray-800">{user.name || "Unknown"}</span>
      <span className="text-xl font-bold text-blue-600">{user.totalPoints ?? 0}</span>
    </div>
  );
};

export default LeaderboardCard;
