import React, { useState } from "react";
import { darjiOrderListState, orderStatus } from "../state/state";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaRegCircle } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

const DarjiOrderView = () => {
  const darjiOrderList = useRecoilValue(darjiOrderListState);
  const [currOrder, setCurrOrder] = useState(-1);

  const handleCurrOrderView = (index) => {
    if (currOrder == index) setCurrOrder(-1);
    else setCurrOrder(index);
  };
  return (
    <div>
      {console.log(darjiOrderList)}
      {darjiOrderList.map((item, index) => (
        <div className="p-2">
          <button
            onClick={() => handleCurrOrderView(index)}
            className="w-full bg-blue-600 p-2 rounded-md"
          >
            order <span>{index + 1}</span>
          </button>
          <div
            className={
              index == currOrder
                ? "border-2 rounded-sm border-gray-400 mt-1 p-1"
                : "hidden"
            }
          >
            <p>
              order type: <span>{item.item}</span>
            </p>

            <p>
              preferred slot : <span>{item.timeSlot}</span>
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
                    <p>
                      <span className="flex items-center">
                        <MdCurrencyRupee />
                        {clothItem.price}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="m-1" />
            <div className="flex flex-row items-center justify-around">
              {Object.entries(orderStatus).map((entry) => {
                let key = entry[0];
                let value = entry[1];
                return (
                  <div>
                    {value.toLocaleLowerCase() == item.status.toLowerCase() ? (
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

export default DarjiOrderView;
