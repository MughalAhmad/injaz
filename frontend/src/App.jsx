import React, {Suspense, lazy} from "react";
import { Loader, BackDropLoader, FallbackLoader } from './components/common/Loader';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { useSelector } from 'react-redux';

import TestForm from "./PDF/TestForm";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Digit6Verify from "./pages/auth/Digit6Verify";
import NewPassword from "./pages/auth/NewPassword";
import SucessfulPassword from "./pages/auth/SucessfulPassword";
import Layout from "./pages/Layout/Layout";

import Profile from "./pages/profile/Profile";
import TeamForm from "./components/team/TeamForm";
import RefForm from "./components/reference/RefForm";
import ViewQuotation from "./components/quotation/ViewQuotation";
import MailResponse from "./components/common/MailResponse";

const Dashboard = lazy(()=>import('./pages/dashboard/Dashboard'));
const Quotation =lazy(()=>import('./pages/quotation/Quotation'));
const Team = lazy(()=>import('./pages/team/Team'));
const Reference =lazy(()=>import('./pages/reference/Reference'));
const Page404 =lazy(()=>import('./pages/404/Page404'));

function App() {
  const {user, isAuthenticated, showLoader, showBackDropLoader} = useSelector(state => state.adminStore);

  return (
    <>
    {showLoader && <Loader show={showLoader} />}
      {showBackDropLoader && <BackDropLoader show={showBackDropLoader} />}
    <Router>
      <Suspense fallback={<FallbackLoader />}>
    <Routes>
      {/* Protected Routes */}
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
        </Route>
           {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/digit6" element={<Digit6Verify />} />
      <Route path="/newpassword" element={<NewPassword />} />
      <Route path="/sucessfulpassword" element={<SucessfulPassword />} />
      <Route path="/sendMailResponse" element={<MailResponse />} />
        <Route path="*" element={<Page404/>}/>
    </Routes>
  </Suspense>
  </Router>
  </>
  );
}

export default App;
