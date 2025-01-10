import React from "react";
import { useState } from "react";
import { mobileNumberState, BASE_URL } from "../state/state";
import { useRecoilState } from "recoil";
import axios from "axios";
import { FaCreativeCommonsNcJp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const ForgetPassword = () => {
  const [mobileNum, setMobileNum] = useRecoilState(mobileNumberState);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (password.length < 8) {
      setPasswordError("password should have more than 8 letter");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value != password) {
      setConfirmPasswordError("should be same as password");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async () => {
    const response = await axios.post(`${BASE_URL}/change/password/`, {
      mobile_num: mobileNum,
      password: password,
      confirmPassword: confirmPassword,
    });
    console.log(response);

    if (response.status == 200 && response.data.status == 201) {
      navigate("/login");
    } else if (response.status == 200 && response.data.status == 404) {
      setConfirmPasswordError(response.data.message);
    } else {
      setConfirmPasswordError("Something went wrong: password has not changed");
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex bg-blue-500">
        <div className="w-[80%] h-[60vh] m-auto flex flex-col items-center justify-center bg-gray-300">
          <div className="flex flex-col items-center justify-center mt-5 gap-1">
            <FaRegUserCircle />

            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePassword}
              className="border-b-2 rounded-md w-[90%] boder-b-2 border-blue-500 p-0.5"
            />
            <span className="text-[10px] text-red-500">{passwordError}</span>
            <input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              className="border-b-2 border-blue-500 rounded-md w-[90%] p-0.5"
            />
            <span className="text-[10px] text-red-500">
              {confirmPasswordError}
            </span>
          </div>

          <button
            className="bg-blue-500 w-[80%] p-1 rounded-md mt-8"
            onClick={() => handleSubmit()}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
