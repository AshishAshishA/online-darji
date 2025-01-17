import React from "react";
import { dryCleaningOrderListState, orderStatus } from "../state/state";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

const DryCleaningOrderView = () => {
  const [dryCleaningOrderList, setDryCleaningOrderList] = useRecoilState(
    dryCleaningOrderListState
  );

  const [currOrder, setCurrOrder] = useState(-1);

  const handleCurrOrderView = (index) => {
    if (currOrder == index) setCurrOrder(-1);
    else setCurrOrder(index);
  };

  return (
    <div>
      {console.log(dryCleaningOrderList)}
      {dryCleaningOrderList.map((item, index) => (
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
            <div className="">
              <div className="flex m-2 gap-2 items-center justify-start text-[10px]">
                {item.dryclean_services.map((orderItem) => (
                  <div className="flex flex-col items-center justify-center">
                    <p>garment: {orderItem.garment_name}</p>
                    <p>
                      Fabric type: <span>{orderItem.fabric_type}</span>
                    </p>
                    <p>No. of orders : {orderItem.item_number}</p>
                    <p>
                      Total Price:{" "}
                      <span className="flex items-center">
                        <MdCurrencyRupee />
                        {orderItem.price}
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

export default DryCleaningOrderView;

// {garment_name: 'dress', service: 'wash_only', item_number: 6, price: 360}
