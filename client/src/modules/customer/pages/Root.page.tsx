import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./Dashboard";
import { MapPage } from "./Map";
import { DiseasePage } from "./Disease";
import { SolutionPage } from "./Solution";


const CustomerRootPage = ({ customer }: { customer: string }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/solution" element={<SolutionPage />} />
        <Route path="/disease" element={<DiseasePage />} />

        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export { CustomerRootPage };
