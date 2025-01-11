import React from "react";
import {
  selectedClothesState,
  orderItem,
  userProfileState,
  orderCartState,
  orderStatus,
  BASE_URL,
} from "../state/state";
import { useRecoilState } from "recoil";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Book = () => {
  const [clotheList, setClothesList] = useRecoilState(selectedClothesState);
  const [item, setItem] = useState("");
  const [user, setUser] = useRecoilState(userProfileState);
  const [orderCart, setOrderCart] = useRecoilState(orderCartState);
  const [orderError, setOrderError] = useState("");

  const navigate = useNavigate();

  const handleItemSelect = (event) => {
    setItem(event.target.value); // Use the value of the selected option
  };

  const handleRemoveCloth = (cloth) => {
    setClothesList((prev) => prev.filter((item) => item != cloth));
  };

  const handleOrderNow = async () => {
    const response = await axios.post(`${BASE_URL}/order/`, {
      customer_id: user.id,
      item: item,
      clothes: clotheList,
    });

    console.log(response);

    if (response.status === 201) {
      const curr_order = {
        item: item,
        status: orderStatus.new,
        clothes: clotheList,
      };

      setOrderCart((prev) => [...prev, curr_order]);
      setClothesList((prev) => []);
      console.log(orderCart);
      navigate("/cart");
    } else {
      setOrderError(
        "Order not placed : something went wrong, please try again"
      );
    }
  };

  return (
    <div className="m-5">
      <p className="text-[10] text-red-500">{orderError}</p>
      <p>Choose an item</p>
      <select
        name="cars"
        id="cars"
        className="border-2 border-blue-600 ml-2"
        onChange={handleItemSelect}
      >
        <option value="Item">Item</option>
        {Object.entries(orderItem).map((entry) => {
          return (
            <option key={entry[0]} value={entry[1]}>
              {entry[1]}
            </option>
          );
        })}
      </select>
      <p>Selected clothes</p>
      <div className="flex flex-col gap-5">
        {clotheList.map((item) => {
          return (
            <div key={item.id} className="border-2 p-2 w-[40vw]">
              <RxCross2
                className="z-50"
                onClick={() => handleRemoveCloth(item)}
              />
              <img src={item.photo} alt="" className="w-20 h-20 z-0" />
              <p>{item.type}</p>
              <p>{item.price}</p>
            </div>
          );
        })}
      </div>

      <button
        className="bg-pink-600 p-2 rounded-md mt-2"
        onClick={handleOrderNow}
      >
        Order Now
      </button>
    </div>
  );
};

export default Book;
