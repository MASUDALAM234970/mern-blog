import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSidebar from "../Component/DashSidebar";
import DashProfile from "../Component/DashProfile";
import DashPosts from "../Component/DashPosts";
import DashUsers from "../Component/DashUsers";
import DashComments from "../Component/DashComments";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTabs] = useState("");
  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabFromUrl = urlparams.get("tab");
    if (tabFromUrl) {
      setTabs(tabFromUrl);
      console.log(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {/* posts... */}
      {tab === "posts" && <DashPosts />}
      {/* users... */}
      {tab === "users" && <DashUsers />}
      {/* comment... */}
      {tab === "comments" && <DashComments />}
    </div>
  );
};

export default Dashboard;
