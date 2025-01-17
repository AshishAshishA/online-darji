import React, { useState } from "react";
import {
  Service,
  dryCleaningOrderListState,
  userProfileState,
  loginStatusState,
  BASE_URL,
} from "../state/state";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import drycleaningimg from "./../assets/dry_cleaning.png";
import { FaPlus } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";

const DryCleaningOrder = () => {
  const [dryCleaningOrderList, setDryCleaningOrderList] = useRecoilState(
    dryCleaningOrderListState
  );
  const [orderInputs, setOrderInputs] = useState([
    {
      garment_name: "",
      fabric_type: "",
      item_number: 1,
      price_per_item: 0,
      price: 0,
    },
  ]);
  const [dryCleaningOrderError, setDryCleaningOrderError] = useState("");
  const userProfile = useRecoilValue(userProfileState);
  const loginStatus = useRecoilValue(loginStatusState);
  const navigate = useNavigate();

  const handleServiceSelect = (e, index) => {
    const key = e.target.value;
    const item_price = Service.dryCleaningService[key];
    const [garment_name, fabric_type] = key.split(",");

    const updatedOrderInputs = orderInputs.map((input, idx) =>
      idx === index
        ? {
            ...input,
            garment_name: garment_name,
            fabric_type: fabric_type,
            price_per_item: item_price,
            price: input.item_number * item_price,
          }
        : input
    );

    setOrderInputs(updatedOrderInputs);
  };

  const handleNoOfOrder = (e, index) => {
    const noOfOrder = parseInt(e.target.value);
    if (noOfOrder < 1) {
      setDryCleaningOrderError("Item number should be at least 1");
      return;
    }

    const updatedOrderInputs = orderInputs.map((input, idx) =>
      idx === index
        ? {
            ...input,
            item_number: noOfOrder,
            price: noOfOrder * input.price_per_item,
          }
        : input
    );

    setOrderInputs(updatedOrderInputs);
    setDryCleaningOrderError("");
  };

  const handleAddOrders = () => {
    if (
      orderInputs.some((input) => !input.garment_name || !input.fabric_type)
    ) {
      setDryCleaningOrderError("Please fill the current order first");
      return;
    }

    setOrderInputs((prev) => [
      ...prev,
      {
        garment_name: "",
        fabric_type: "",
        item_number: 1,
        price_per_item: 0,
        price: 0,
      },
    ]);
    setDryCleaningOrderError("");
  };

  const handleDryCleaningOrder = async () => {
    if (!loginStatus) {
      navigate("/login");
      return;
    }

    if (orderInputs.length < 1) {
      setDryCleaningOrderError("Please fill at least one order");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/dryclean/service`, {
        customer_id: userProfile.id,
        dryClean_orders: orderInputs,
      });

      console.log(response);

      if (response.data.status === 201) {
        setDryCleaningOrderList((prev) => [
          ...prev,
          {
            customer_id: userProfile.id,
            status: "new",
            dryclean_services: orderInputs,
          },
        ]);
        navigate("/cart");
      } else {
        setDryCleaningOrderError(
          "Something went wrong. Order is not placed! Please try again."
        );
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setDryCleaningOrderError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 p-2 m-2">
      <img src={drycleaningimg} alt="dryclean-img" className="w-20 h-20 mb-5" />
      <p className="text-[10px] text-red-500">{dryCleaningOrderError}</p>
      <div className="w-[80%] flex flex-col gap-5 p-2">
        {orderInputs.map((input, index) => (
          <div key={index} className="bg-gray-200 flex flex-col gap-5 p-2">
            <select
              onChange={(e) => handleServiceSelect(e, index)}
              value={`${input.garment_name},${input.fabric_type}`}
              className="bg-gray-300 rounded-lg p-1 text-blue-500"
            >
              <option value="garment">choose garment</option>
              {Object.entries(Service.dryCleaningService).map((entry) => {
                let key = entry[0];
                return (
                  <option key={key} value={key}>
                    {key}
                  </option>
                );
              })}
            </select>
            <div>
              <p className="text-[10px] text-red-500">No. of Items</p>
              <input
                type="number"
                placeholder="No. of Orders"
                value={input.item_number}
                className="bg-gray-300 rounded-lg p-1 text-blue-500"
                onChange={(e) => handleNoOfOrder(e, index)}
              />
            </div>
            <p>
              Price per item:{" "}
              <span className="flex items-center">
                <MdCurrencyRupee />
                {input.price_per_item}
              </span>
            </p>
            <p>
              Total price:{" "}
              <span className="flex items-center">
                <MdCurrencyRupee />
                {input.price_per_item}
              </span>
            </p>
          </div>
        ))}
        <button onClick={handleAddOrders} className="text-pink-500">
          <FaPlus />
        </button>
      </div>
      <button
        onClick={handleDryCleaningOrder}
        className="bg-blue-500 p-2 rounded-sm"
      >
        Place Order
      </button>
    </div>
  );
};

export default DryCleaningOrder;
