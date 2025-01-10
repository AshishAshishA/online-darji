import React from "react";
import { useRecoilState } from "recoil";
import { userProfileState, updateStatusState, BASE_URL } from "../state/state";
import profile_img from "../assets/profile_img1.svg";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useRecoilState(userProfileState);
  const { name, mobile_num, address, pincode, landmark } = profile;
  const [updateStatus, setUpdateStatus] = useRecoilState(updateStatusState);
  const navigate = useNavigate();

  const handleProfileUpdate = () => {
    setUpdateStatus(true);
    navigate("/signup");
  };

  return (
    <div className="min-h-screen w-full">
      <div className="h-screen flex flex-col items-center justify-start bg-gray-50">
        <div>
          <img src={profile_img} alt="" width="100" />
          <p className="w-full flex items-center justify-center font-bold text-lg">
            {name}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center p-2 gap-3 mt-20 ml-3 mr-3">
          <p className="font-bold">
            Contact :
            <span className="font-bold text-sm ml-2">{mobile_num}</span>
          </p>
          <p className="font-bold">
            Address :<span className="font-bold text-sm ml-2">{address}</span>
          </p>
          <p className="font-bold">
            Pincode :<span className="font-bold text-sm ml-2">{pincode}</span>
          </p>
          <p className="font-bold">
            Landmark :<span className="font-bold text-sm ml-2">{landmark}</span>
          </p>
          <button
            className="font-bold bg-blue-500 p-1 rounded-lg text-gray-800"
            onClick={handleProfileUpdate}
          >
            Update
          </button>
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
