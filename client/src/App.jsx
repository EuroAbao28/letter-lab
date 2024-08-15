import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InGame from "./pages/InGame";
import { UserProvider } from "./contexts/UserContextProvider";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/easy" element={<InGame />} />
            <Route path="/medium" element={<InGame />} />
            <Route path="/hard" element={<InGame />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
