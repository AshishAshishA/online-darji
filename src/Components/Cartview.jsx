import React, { useState } from "react";
import {
  orderItem,
  orderStatus,
  orderCartState,
  userProfileState,
  BASE_URL
} from "../state/state";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaRegCircle } from "react-icons/fa6";
import profile_img from "./../assets/profile_img1.svg";
import { BsCartCheckFill } from "react-icons/bs";

const Cartview = () => {
  const [orderCartProducts, setOrderCartProducts] =
    useRecoilState(orderCartState);
  const [currentOrder, setCurrOrder] = useState(-1);
  const [userDetails, setUserDetails] = useRecoilState(userProfileState);

  const handleCurrOrderView = (index) => {
    if (currentOrder == index) setCurrOrder(-1);
    else setCurrOrder(index);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center m-1">
      
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
      {orderCartProducts.map((item, index) => (
        <div className="p-2">
          <button
            onClick={() => handleCurrOrderView(index)}
            className="w-full bg-blue-600 p-2 rounded-md"
          >
            order <span>{index + 1}</span>
          </button>
          <div className={index == currentOrder ? "border-2 rounded-sm border-gray-400 mt-1 p-1" : "hidden"}>
            <p>
              order type: <span>{item.item}</span>
            </p>
            <div className="">
              <p>Clothes : selected to choose from</p>
              <div className="flex m-2 gap-2 items-center justify-start text-[10px]">
                {item.clothes.map((clothItem) => (
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={clothItem.photo}
                      alt="image"
                      className="w-20 h-20 flex flex-col gap-2"
                    />
                    <p>{clothItem.type}</p>
                    <p>{clothItem.price}</p>
                  </div>
                ))}
              </div>
            </div>
            <hr className="m-1"/>
            <div className="flex flex-row items-center justify-around">
              {Object.entries(orderStatus).map((entry) => {
                let key = entry[0];
                let value = entry[1];
                return (
                  <div>
                    {value == item.status ? (
                      <div className="flex flex-col items-center justify-center">
                        <FaRegCircle className="bg-green-500 text-green-700 rounded-lg" />
                        <p className="text-[7px]">{value}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <FaRegCircle className="bg-gray-300 text-gray-400 rounded-lg" />
                        <p className="text-[7px]">{value}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cartview;
