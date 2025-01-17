import React, { useState } from "react";
import axios from "axios";
import {
  readyMadeClothesListState,
  readyMadeClothesInCartState,
  loginStatusState,
  currReadyMadeSectionState,
  userProfileState,
  orderStatus,
  orderCartState,
  readyMadeOrderListState,
  BASE_URL,
} from "../state/state";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";

const ReadyMade = () => {
  const [readyMadeClothesList, setReadyMadeClothesList] = useRecoilState(
    readyMadeClothesListState
  );
  const [readyMadeOrderList, setReadyMadeOrderList] = useRecoilState(
    readyMadeOrderListState
  );

  const [readyMadeClothesInCart, setReadyMadeClothesInCart] = useRecoilState(
    readyMadeClothesInCartState
  );
  const [loginStatus, setLoginStatus] = useRecoilState(loginStatusState);
  const [currItem, setCurrItem] = useState(-1);
  const [stockErr, setStockErr] = useState("");
  const [selectedStock, setSelectedStock] = useState(0);

  const [orderCart, setOrderCart] = useRecoilState(orderCartState);

  const item = useRecoilValue(currReadyMadeSectionState);
  const user = useRecoilValue(userProfileState);

  const navigate = useNavigate();

  const handleNumOfOrders = (e, stock) => {
    const input = parseInt(e.target.value);
    console.log(input, stock);
    if (input > stock) {
      setStockErr((prev) => "can't select more than stock available");
    } else if (input <= 0) {
      setStockErr((prev) => "select at least 1 ");
    } else if (input <= stock) {
      setSelectedStock((prev) => input);
      setStockErr((prev) => "");
    }
  };

  const handleBookNow = async (cloth) => {
    const newStock = cloth.stock - selectedStock;

    const response = await axios.post(`${BASE_URL}/readymade/clothes/order`, {
      customer_id: user.id,
      item: item,
      cloth: cloth,
      item_number: selectedStock,
      new_stock: newStock,
    });
    console.log(response);

    if (response.status === 201) {
      const curr_order = {
        item: item,
        status: orderStatus.new,
        readymade_clothes: [cloth],
        item_number: selectedStock,
        orderType: "readyMadeOrder",
      };

      setReadyMadeClothesList((prev) =>
        prev.map((item) => {
          if (item.id === cloth.id) {
            return {
              ...cloth,
              stock: newStock,
            };
          }
          return item;
        })
      );

      setReadyMadeOrderList((prev) => [...prev, curr_order]);
      console.log(orderCart);
      navigate("/cart");
    } else {
      setOrderError(
        "Order not placed : something went wrong, please try again"
      );
    }
  };

  const handleShowDetail = (id) => {
    if (loginStatus === false) navigate("/login");
    setCurrItem((prev) => {
      return id;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4 justify-center">
        <p className="text-center text-lg font-bold">Shirt Section</p>
        {readyMadeClothesList.map((clothes) => {
          return (
            <div className="flex flex-col bg-gray-300 mb-4 rounded-lg overflow-hidden shadow-md">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleShowDetail(clothes.id)}
              >
                <img
                  src={clothes.photo}
                  alt="img"
                  className="w-1/3 h-full object-cover"
                />
                <div className="flex flex-col p-4 w-2/3">
                  <p className="text-lg font-medium">{clothes.name}</p>
                  <p>
                    Price:{" "}
                    <span className="font-semibold">
                      <MdCurrencyRupee />
                      {clothes.price}
                    </span>
                  </p>
                  <p>{clothes.cloth_type}</p>
                  <p>
                    Stock:{" "}
                    <span className="font-semibold">{clothes.stock}</span>
                  </p>
                  <p>
                    Sizes available: <span>{clothes.size}</span>
                  </p>
                </div>
              </div>
              {clothes.id === currItem && clothes.stock > 0 ? (
                <div className="flex flex-col items-end p-4">
                  <input
                    type="number"
                    onChange={(e) => handleNumOfOrders(e, clothes.stock)}
                    onClick={() => handleShowDetail(clothes.id)}
                    placeholder="No. of items"
                    className="w-full rounded-md border p-2 mb-2"
                  />
                  <span className="text-red-400 text-sm">{stockErr}</span>
                  <button
                    onClick={() => handleBookNow(clothes)}
                    className="bg-blue-500 text-white rounded p-2"
                  >
                    Order
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadyMade;
