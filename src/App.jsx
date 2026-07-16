import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ApplicationDetails from "./pages/ApplicationDetails";
import Pipeline from "./pages/Pipeline";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/applications/:id" element={<ApplicationDetails />} />
      <Route path="/pipeline" element={<Pipeline />} />
    </Routes>
  );
}

export default App;
