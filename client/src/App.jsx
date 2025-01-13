import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

import Footer from "./Component/Footer";
import PrivateRoute from "./Component/PrivateRoute";
import OnlyAdminPrivateRoute from "./Component/OnlyAdminPrivateRoute ";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import NoPage from "./pages/NoPage";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./Component/ScrollToTop";
import Search from "./pages/Search";
import Header from "./Component/Header";
import About from "./pages/About";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        {
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />}></Route>
            <Route path="/update-post/:postId" element={<UpdatePost />}></Route>
          </Route>
        }

        <Route path="/projects" element={<Projects />}></Route>

        <Route path="/post/:postSlug" element={<PostPage />} />

        <Route path="/*" element={<NoPage />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
