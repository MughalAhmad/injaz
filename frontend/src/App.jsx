// import Form from "./Form";
import React, {Suspense} from "react";
import { Loader, BackDropLoader, FallbackLoader } from './components/common/Loader';

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
import ViewQuotation from "./components/quotation/ViewQuotation";

function App() {
  const {user, isAuthenticated, showLoader, showBackDropLoader} = useSelector(state => state.adminStore);

  return (
    <>
    {showLoader && <Loader show={showLoader} />}
      {showBackDropLoader && <BackDropLoader show={showBackDropLoader} />}
    <Router>
      <Suspense fallback={<FallbackLoader />}>
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/digit6" element={<Digit6Verify />} />
      <Route path="/newpassword" element={<NewPassword />} />
      <Route path="/sucessfulpassword" element={<SucessfulPassword />} />
      {/* Protected Routes */}
      {/* <Route element={<UserProtectedRoutes />}> */}
         <Route path="/" element={<Layout/>}>
         <Route index element={<Dashboard />} />
          {user?.role === "admin" && isAuthenticated && <Route path="form" element={<TestForm />} />}
          {isAuthenticated && user?.role === "admin" && <Route path="team" element={<Team />}/> }
          {isAuthenticated && user?.role === "admin" && <Route path="team/:tid" element={<TeamForm />} />} 
          {isAuthenticated && user?.role === "admin" && <Route path="team/create" element={<TeamForm />} />} 
          {isAuthenticated && user?.role === "admin" && <Route path="reference" element={<Reference />} />}
          {isAuthenticated && user?.role === "admin" && <Route path="reference/:rid" element={<RefForm />} />} 
          {isAuthenticated && user?.role === "admin" && <Route path="reference/create" element={<RefForm />} />}           
          {isAuthenticated && <Route path="view/:id" element={<ViewQuotation />} />}
          {isAuthenticated && <Route path="quotation" element={<Quotation />} />}
          {isAuthenticated && <Route path="profile" element={<Profile />} />}
        {/* <Route path="*" element={<Page404/>}/> */}
        </Route>
      {/* </Route> */}
    </Routes>
  </Suspense>
  </Router>
  </>
  );
}

export default App;
