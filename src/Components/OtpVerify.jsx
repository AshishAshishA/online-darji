import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  userProfileState,
  orderCartState,
  loginStatusState,
  mobileNumberState,
  isForgetPasswordState,
  BASE_URL,
} from "../state/state";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const [mobileNum, setMobileNum] = useRecoilState(mobileNumberState);
  const [userOtpInput, setUserOtpInput] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [mobError, setMobError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpStatus, setOtpStatus] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useRecoilState(
    isForgetPasswordState
  );
  const navigate = useNavigate();

  const handleMobileChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and check if the length is 10
    if (/^\d*$/.test(value)) {
      setMobileNum(value);
      if (value.length === 10) {
        setMobError("");
      } else {
        setMobError("Mobile number must be 10 digits");
      }
    }
  };

  const handleSendOtp = async () => {
    const response = await axios.post(`${BASE_URL}/send_otp/`, {
      mobile_num: mobileNum,
    });

    console.log(response);

    if (response.status != 200) {
      setOtpError("Mobile Number is not registered");
    } else {
      const otp = response.data.otp;
      setServerOtp(otp);
      setOtpStatus((prev) => true);
    }
  };

  const handleOtpInput = (e) => {
    setUserOtpInput(e.target.value);
  };

  const handleVerifyOtp = () => {
    if (serverOtp == userOtpInput) {
      setOtpStatus(false);
      if (isForgetPassword == false) {
        navigate("/signup");
      } else {
        setIsForgetPassword(false);
        navigate("/forgetPassword");
      }
    } else {
      setOtpError("otp doesn't match!!!");
    }
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
              maxLength={10}
              className="border-b-2 border-blue-500 rounded-md w-[90%] p-1"
            />
            <span className="text-[10px] text-red-500">{mobError}</span>{" "}
            {otpStatus == true ? (
              <>
                <input
                  type="password"
                  placeholder="otp"
                  value={userOtpInput}
                  onChange={handleOtpInput}
                  className="border-b-2 rounded-md w-[90%] boder-b-2 border-blue-500 p-1"
                />
                <span className="text-[10px] text-red-500">{otpError}</span>
              </>
            ) : (
              <></>
            )}
          </div>
          {otpStatus == true ? (
            <button
              className="bg-blue-500 w-[90%] p-1 rounded-md"
              onClick={() => handleVerifyOtp()}
            >
              Verify
            </button>
          ) : (
            <button
              className="bg-blue-500 w-[90%] p-1 rounded-md"
              onClick={handleSendOtp}
            >
              Send Otp
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
