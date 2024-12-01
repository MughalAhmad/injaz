// import Form from "./Form";
import TestForm from "./PDF/TestForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Digit6Verify from "./pages/auth/Digit6Verify";
import NewPassword from "./pages/auth/NewPassword";
import SucessfulPassword from "./pages/auth/SucessfulPassword";
import Layout from "./pages/Layout/Layout";
import UserProtectedRoutes from "./components/UserProtectedRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import Quotation from "./pages/quotation/Quotation";
import Team from "./pages/team/Team";
import Refrence from "./pages/refrence/Refrence";
import Setting from "./pages/setting/Setting";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<UserProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/form" element={<TestForm />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/digit6" element={<Digit6Verify />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/sucessfulpassword" element={<SucessfulPassword />} />


            <Route path="/quotation" element={<Quotation />} />
            <Route path="/team" element={<Team />} />
            <Route path="/refrence" element={<Refrence />} />
            <Route path="/setting" element={<Setting />} />

          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
