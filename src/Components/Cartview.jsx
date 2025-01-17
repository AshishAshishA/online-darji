import React, { useState } from "react";
import { userProfileState, orderSection } from "../state/state";
import { useRecoilState } from "recoil";
import profile_img from "./../assets/profile_img1.svg";
import { BsCartCheckFill } from "react-icons/bs";

import CleaningOrderView from "./CleaningOrderView";
import DarjiOrderView from "./DarjiOrderView";
import DryCleaningOrderView from "./DryCleaningOrderView";
import IroningOrderView from "./IroningOrderView";
import ReadyMadeOrderView from "./ReadyMadeOrderView";

const Cartview = () => {
  const [userDetails, setUserDetails] = useRecoilState(userProfileState);
  const [currOrderSection, setCurrOrderSection] = useState("");

  const handleSetCurrOrderSec = (inputSection) => {
    console.log(inputSection);
    if (currOrderSection != inputSection) {
      setCurrOrderSection((prev) => inputSection);
    } else {
      setCurrOrderSection((prev) => "");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center m-1">
      <div></div>
      <div
        id="user detail"
        className="flex flex-col items-center justify-start m-5"
      >
        <img src={profile_img} alt="" />
        <p>{userDetails.name}</p>
        <p>{userDetails.address}</p>
      </div>
      <p className="font-semibold">Orders</p>
      <BsCartCheckFill />

      <div className="flex flex-col gap-2">
        <div>
          <button
            className="w-full bg-blue-500 p-2"
            onClick={() => handleSetCurrOrderSec(orderSection.darji)}
          >
            Darji Order
          </button>

          {currOrderSection == orderSection.darji ? (
            <>
              <DarjiOrderView />
              {console.log("DarjiWala")}
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <button
            className="w-full bg-blue-500 p-2"
            onClick={() => handleSetCurrOrderSec(orderSection.readyMade)}
          >
            ReadyMade Order
          </button>

          {currOrderSection == orderSection.readyMade ? (
            <>
              <ReadyMadeOrderView />
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <button
            className="w-full bg-blue-500 p-2"
            onClick={() => handleSetCurrOrderSec(orderSection.ironing)}
          >
            Press Order
          </button>
          {currOrderSection == orderSection.ironing ? (
            <>
              <IroningOrderView />
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <button
            className="w-full bg-blue-500 p-2"
            onClick={() => handleSetCurrOrderSec(orderSection.cleaning)}
          >
            Cleaning Order
          </button>
          {currOrderSection == orderSection.cleaning ? (
            <>
              <CleaningOrderView />
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <button
            className="w-full bg-blue-500 p-2"
            onClick={() => handleSetCurrOrderSec(orderSection.dryClean)}
          >
            DryClean Order
          </button>
          {currOrderSection == orderSection.dryClean ? (
            <>
              <DryCleaningOrderView />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cartview;
