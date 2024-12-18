import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { About } from "./pages/About";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Header } from "./Component/Header";
import Footer from "./Component/Footer";
import PrivateRoute from "./Component/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>

        <Route path="/projects" element={<Projects />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
