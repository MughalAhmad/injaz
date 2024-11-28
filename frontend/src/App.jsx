import Form from "./Form";
import TestForm from "./TestForm"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Digit6Verify from "./pages/auth/Digit6Verify";
import NewPassword from "./pages/auth/NewPassword";
import SucessfulPassword from "./pages/auth/SucessfulPassword";
import Layout from "./pages/Layout/Layout";
function App() {
  return (
    <Router>
       <Routes>
       <Route path="/" element={<Layout />} />
       <Route path="/form" element={<TestForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/digit6" element={<Digit6Verify />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/sucessfulpassword" element={<SucessfulPassword />} />

        </Routes>
    </Router>
  );
}

export default App;
