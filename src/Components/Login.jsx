import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  userProfileState,
  orderCartState,
  loginStatusState,
  isForgetPasswordState,
  BASE_URL,
} from "../state/state";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobileNum, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [orders, setOrders] = useRecoilState(orderCartState);
  const [error, setError] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [loginStatus, setLoginStatus] = useRecoilState(loginStatusState);
  const [forgetPasswordStatus, setForgetPasswordStatus] = useRecoilState(
    isForgetPasswordState
  );
  const navigate = useNavigate();

  useEffect(() => {
    setForgetPasswordStatus(false);
  }, []);

  const handleForgetPassword = () => {
    setForgetPasswordStatus(true);
    navigate("/otp/verify");
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and check if the length is 10
    if (/^\d*$/.test(value)) {
      setMobileNum(value);
      if (value.length === 10) {
        setError("");
      } else {
        setError("Mobile number must be 10 digits");
      }
    }
  };

  const handleLogin = async () => {
    const response = await axios.post(
      `${BASE_URL}/login/`,

      {
        mobile_num: mobileNum,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    if (response.data?.message == "Invalid credentials") {
      setCredentialError("Either mobile num or password is wrong");
    } else {
      const user = response.data.curr_user;
      const customer_order = user.customer_order;
      delete user.customer_order;

      setUserProfile(user);
      setOrders(customer_order);
      setLoginStatus(true);
      navigate("/");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="w-full h-screen flex bg-blue-500">
      <div className="w-[80%] h-[60vh] m-auto flex flex-col bg-gray-300">
        <div className="flex flex-col items-center justify-center mt-5 gap-5">
          <FaRegUserCircle />
          <div className="w-full m-auto flex flex-col items-center justify-center gap-1">
            <input
              type="text"
              placeholder="mobile num"
              value={mobileNum}
              onChange={handleMobileChange}
              maxLength={10} // Optionally, limit to 10 characters
              className="border-b-2 border-blue-500 rounded-md w-[90%] p-1"
            />
            <span className="text-[10px] text-red-500">{error}</span>{" "}
            {/* Display error message */}
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
              className="border-b-2 rounded-md w-[90%] boder-b-2 border-blue-500 p-1"
            />
            <span className="text-[10px] text-red-500">{credentialError}</span>
            <span
              className="text-[10px] text-red-500"
              onClick={handleForgetPassword}
            >
              forget password
            </span>
          </div>
          <button
            className="bg-blue-500 w-[90%] p-1 rounded-md"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        </div>
        <div className="mt-auto flex items-center justify-center p-2 text-blue-500">
          <Link to="/otp/verify">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
