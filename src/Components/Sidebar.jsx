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

        <p className="text-white text-[10px] mt-10">
          Demo : for how to use app
        </p>
        <a
          href="https://www.linkedin.com/posts/ashish-kumar-7b211523b_darji-wala-app-demo-this-video-will-show-activity-7283775806969950208-1Sha?utm_source=share&utm_medium=member_desktop"
          target="_blank"
        >
          <p className="text-pink-400">Demo Video</p>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
