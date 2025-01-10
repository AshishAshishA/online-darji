import React from "react";
import { HiBars3 } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { routes } from "./Router";
import { Link } from "react-router-dom";
import {
  loginStatusState,
  userProfileState,
  orderCartState,
  mobileNumberState,
  selectedClothesState,
  BASE_URL,
} from "../state/state";
import { useRecoilState, useRecoilValue } from "recoil";

const Navbar = () => {
  const [loginState, setLoginState] = useRecoilState(loginStatusState);
  const [profile, setProfile] = useRecoilState(userProfileState);
  const [orderCart, setOrderCart] = useRecoilState(orderCartState);
  const [mobileNumber, setMobileNumber] = useRecoilState(mobileNumberState);
  const [selectedClothes, setSelectedClothes] =
    useRecoilState(selectedClothesState);

  const handleLogout = () => {
    setLoginState(false);
    const profile = {};
    const orders = [];
    setProfile(profile);
    setOrderCart(orders);
    setMobileNumber("");
    setSelectedClothes([]);
  };

  return (
    <div className="flex flex-row items-center justify-between m-0 p-1 h-9 bg-blue-500">
      <HiBars3 />

      <div className="flex flex-row items-center gap-3 mr-2">
        {loginState == false ? (
          <Link to="/login">login</Link>
        ) : (
          <button onClick={handleLogout}>logout</button>
        )}
        <Link to="/profile">
          <CgProfile />
        </Link>

        <Link to="/cart">
          <IoCartOutline className="font-bold" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
