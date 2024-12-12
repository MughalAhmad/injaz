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
import UserProtectedRoutes from "./components/common/UserProtectedRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import Quotation from "./pages/quotation/Quotation";
import Team from "./pages/team/Team";
import Reference from "./pages/reference/Reference";
import Profile from "./pages/profile/Profile";
import TeamForm from "./components/team/TeamForm";
import RefForm from "./components/reference/RefForm";
import Page404 from "./pages/404/Page404";
import { useSelector } from 'react-redux';
import "sweetalert2/dist/sweetalert2.min.css";

function App() {
  const {user} = useSelector(state => state.adminStore);

  return (

    <Router>
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<UserProtectedRoutes />}>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Dashboard />} />
          <Route path="form" element={<TestForm />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="digit6" element={<Digit6Verify />} />
          <Route path="newpassword" element={<NewPassword />} />
          <Route path="sucessfulpassword" element={<SucessfulPassword />} />
          <Route path="quotation" element={<Quotation />} />
          <Route path="team" element={<Team />}/> 
          <Route path="team/:tid" element={<TeamForm />} /> 
          <Route path="team/create" element={<TeamForm />} /> 
          <Route path="reference" element={<Reference />} /> 
          <Route path="reference/:rid" element={<RefForm />} /> 
          <Route path="reference/create" element={<RefForm />} /> 
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
