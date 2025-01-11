import React from "react";
import sidebarImg from "./../assets/sidebarImg.png";
import { RxCross2 } from "react-icons/rx";
import { sidebarOpenStatusState } from "../state/state";
import { useRecoilState } from "recoil";

const Sidebar = () => {
  const [siderbarOpenStatus, setSidebarOpenStatus] = useRecoilState(
    sidebarOpenStatusState
  );
  const handleSidebarStatus = () => {
    setSidebarOpenStatus((prev) => false);
  };

  return (
    <div className="z-50 h-screen w-[50%] fixed bg-blue-600 p-2">
      <RxCross2 className="ml-[80%]" onClick={handleSidebarStatus} />
      <div className="p-2 text-center">
        <img src={sidebarImg} alt="sidebar Image" />
        <p>Coming soon</p>
      </div>
    </div>
  );
};

export default Sidebar;
