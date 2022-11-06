import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./Dashboard";
import { ResourcePage } from "./Resource";
import { SolutionPage } from "./Solution";


const CustomerRootPage = ({ customer }: { customer: string }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/solution" element={<SolutionPage />} />
        <Route path="/resource" element={<ResourcePage />} />

        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export { CustomerRootPage };
