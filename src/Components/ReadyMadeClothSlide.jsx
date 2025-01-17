import React from "react";
import {
  BASE_URL,
  readyMadeClothesListState,
  readyMadeSliderState,
  currReadyMadeSectionState,
} from "../state/state";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReadyMadeClothSlide = () => {
  const [readyMadeSlider, setReadyMadeSlider] =
    useRecoilState(readyMadeSliderState);
  const [readyMadeClothesList, setReadyMadeClothesList] = useRecoilState(
    readyMadeClothesListState
  );

  const [currReadyMadeSection, setCurrReadyMadeSection] = useRecoilState(
    currReadyMadeSectionState
  );

  const navigate = useNavigate();

  const handleLoadClickedItem = async (name) => {
    const response = await axios.get(`${BASE_URL}/readymade/clothes/`,
      {
        params:{
          name: name,
        }
      }
     );

    console.log(response);
    console.log(name);

    if (response.data.status == 200) {
      setReadyMadeClothesList(response.data.readymadeClothList);
      setCurrReadyMadeSection(name);

      navigate("/readymade/page");
    } else {
      console.log("something happend");
    }
  };
  return (
    <div className="w-full h-[50px] mt-2 overflow-x-auto flex gap-5">
      {readyMadeSlider.map((sliderItem, index) => (
        <div key={index} className="flex-shrink-0">
          <img
            src={sliderItem.photo}
            alt={sliderItem.name}
            onClick={() => handleLoadClickedItem(sliderItem.name)}
            className="w-[30px] h-[40px] cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default ReadyMadeClothSlide;
