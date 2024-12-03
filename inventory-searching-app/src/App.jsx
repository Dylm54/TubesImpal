import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Landing from "./pages/Landing";
import LoginManager from "./pages/LoginManager";
import RegisterManager from "./pages/RegisterManager";
import LoginAdmin from "./pages/LoginAdmin";
import EditData from "./pages/EditData";
import AddData from "./pages/AddData";
import Manager from "./pages/Manager";
import Admin from "./pages/Admin";
import PrivateRouteManager from "./utils/PrivateRouteManager";
import PrivateRouteAdmin from "./utils/PrivateRouteAdmin";
import PrivateRouteLanding from "./utils/PrivateRouteLanding";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRouteLanding />}>
          <Route path="/" element={<Landing />} />
          <Route path="/LoginManager" element={<LoginManager />} />
          <Route path="/RegisterManager" element={<RegisterManager />} />
          <Route path="/LoginAdmin" element={<LoginAdmin />} />
        </Route>
        <Route element={<PrivateRouteManager />}>
          <Route path="/managerHome" element={<Manager />} />
        </Route>
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/:idData" element={<EditData />} />
          <Route path="/AddData" element={<AddData />} />
          <Route path="/adminHome" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
