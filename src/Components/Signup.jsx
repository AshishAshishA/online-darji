import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  userProfileState,
  loginStatusState,
  updateStatusState,
  mobileNumberState,
  BASE_URL,
} from "../state/state";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [mobileNum, setMobileNum] = useRecoilState(mobileNumberState);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandMark] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [signUpError, setSignUpError] = useState("");
  const [loginState, setLoginState] = useRecoilState(loginStatusState);
  const [updateStatus, setUpdateStatus] = useRecoilState(updateStatusState);

  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 8) {
      setPasswordError("Password Should be at least 8 chars");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password != value) {
      setConfirmPasswordError("confirm password should be same as password");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePincode = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setPincode(value);
      if (value.length === 6) {
        setPincodeError("");
      } else {
        setPincodeError("Pincode should be only 6 digit number");
      }
    }
  };

  const handleLandmark = (e) => {
    setLandMark(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSignUp = async () => {
    let response = undefined;
    if (updateStatus == true) {
      response = await axios.put(
        `${BASE_URL}/register/${userProfile.id}/`,

        {
          name: name,
          mobile_num: mobileNum,
          address: address,
          pincode: pincode,
          landmark: landmark,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      response = await axios.post(
        `${BASE_URL}/register/`,

        {
          name: name,
          mobile_num: mobileNum,
          is_mob_num_verified: true,
          address: address,
          pincode: pincode,
          landmark: landmark,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      const user = response.data.customer;
      // delete user.customer_order;
      setUserProfile(user);
      setLoginState(true);
      if (updateStatus == true) {
        setUpdateStatus(false);
        navigate("/profile");
      } else {
        navigate("/");
      }
    } else {
      setSignUpError("Mobile number has already registered");
    }
  };

  return (
    <div className="w-full h-screen flex bg-blue-500">
      <div className="w-[80%] h-[80vh] m-auto flex flex-col bg-gray-300 rounded-md">
        <div className="flex flex-col items-center justify-center mt-3 gap-5">
          <FaRegUserCircle />
          <div className="w-full m-auto flex flex-col items-center justify-center gap-1">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={handleName}
              className="border-b-2 rounded-md w-[90%] boder-b-2 border-blue-500 p-0.5"
            />
            <span></span>
            <input
              type="text"
              placeholder="mobile num"
              value={mobileNum}
              onChange={handleMobileChange}
              maxLength={10} // Optionally, limit to 10 characters
              className="border-b-2 border-blue-500 rounded-md w-[90%] p-0.5"
            />
            <span className="text-[10px] text-red-500">{error}</span>{" "}
            {/* Display error message */}
            {updateStatus == false ? (
              <>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="border-b-2 rounded-md w-[90%] boder-b-2 border-blue-500 p-0.5"
                />
                <span className="text-[10px] text-red-500">
                  {passwordError}
                </span>
                <input
                  type="password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  className="border-b-2 rounded-md w-[90%] boder-b-2 border-blue-500 p-0.5"
                />
                <span className="text-[10px] text-red-500">
                  {confirmPasswordError}
                </span>
              </>
            ) : (
              <></>
            )}
            <input
              type="number"
              placeholder="pincode"
              value={pincode}
              onChange={handlePincode}
              maxLength={6}
              className="border-b-2 border-blue-500 rounded-md w-[90%] p-0.5"
            />
            <span className="text-[10px] text-red-500">{pincodeError}</span>
            <input
              type="text"
              placeholder="landmark"
              value={landmark}
              onChange={handleLandmark}
              className="border-b-2 border-blue-500 rounded-md w-[90%] p-0.5"
            />
            <span></span>
            <textarea
              rows="3"
              placeholder="address"
              value={address}
              onChange={handleAddress}
              className="border-b-2 rounded-md w-[90%] boder-b-2 border-blue-500 p-0.5"
            />
          </div>
          <span className="text-[10px] text-red-500">{signUpError}</span>
          <button
            className="bg-blue-500 w-[90%] p-1 rounded-md"
            onClick={handleSignUp}
          >
            {updateStatus == true ? <p>Update</p> : <p>Sign Up</p>}
          </button>
        </div>
        <div className="mt-auto flex items-center justify-center p-2 text-blue-500">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
