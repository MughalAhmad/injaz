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
  const {user, isAuthenticated} = useSelector(state => state.adminStore);

  return (

    <Router>
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      {/* <Route element={<UserProtectedRoutes />}> */}
         <Route path="/" element={<Layout/>}>
         <Route index element={<Dashboard />} />
          {user?.role === "admin" && isAuthenticated && <Route path="form" element={<TestForm />} />}
          {isAuthenticated && user?.role === "admin" && <Route path="forgot" element={<ForgotPassword />} />}
          {isAuthenticated && user?.role === "admin" && <Route path="digit6" element={<Digit6Verify />} />}
          {isAuthenticated && user?.role === "admin" && <Route path="newpassword" element={<NewPassword />} />}
          {isAuthenticated && user?.role === "admin" && <Route path="sucessfulpassword" element={<SucessfulPassword />} />}
          {isAuthenticated && user?.role === "admin" && <Route path="team" element={<Team />}/> }
          {isAuthenticated && user?.role === "admin" && <Route path="team/:tid" element={<TeamForm />} />} 
          {isAuthenticated && user?.role === "admin" && <Route path="team/create" element={<TeamForm />} />} 
          {isAuthenticated && user?.role === "admin" && <Route path="reference" element={<Reference />} />}
          {isAuthenticated && user?.role === "admin" && <Route path="reference/:rid" element={<RefForm />} />} 
          {isAuthenticated && user?.role === "admin" && <Route path="reference/create" element={<RefForm />} />}           
          {isAuthenticated && <Route path="quotation" element={<Quotation />} />}
          {isAuthenticated && <Route path="profile" element={<Profile />} />}
        {/* <Route path="*" element={<Page404/>}/> */}
        </Route>
      {/* </Route> */}
    </Routes>
  </Router>
  );
}

export default App;
