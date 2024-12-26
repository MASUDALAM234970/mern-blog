import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSidebar from "../Component/DashSidebar";
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
    <div>
      <div className="">
        {/* sidebar*/}
        <DashSidebar />
      </div>
      <div className="">
        {/* profile..... */}
        {tab == "profile" && <div>Profile</div>}
      </div>
    </div>
  );
};

export default Dashboard;
