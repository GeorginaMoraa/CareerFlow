import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Applications = lazy(() => import("./pages/Applications"));
const ApplicationDetails = lazy(() => import("./pages/ApplicationDetails"));
const Pipeline = lazy(() => import("./pages/Pipeline"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="applications" element={<Applications />} />
        <Route path="applications/:id" element={<ApplicationDetails />} />
        <Route path="pipeline" element={<Pipeline />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
