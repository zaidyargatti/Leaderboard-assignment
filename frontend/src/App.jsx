// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LeaderboardPage from "./pages/LeaderboardPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
}
