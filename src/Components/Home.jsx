import React, { useState, useEffect } from "react";
import axios from "axios";
import { clothesListState, loginStatusState } from "../state/state";
import { useRecoilState } from "recoil";
import { CiHeart } from "react-icons/ci";
import Navbar from "./Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { selectedClothesState, BASE_URL } from "../state/state";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

function Home() {
  const [clothesList, setClothesList] = useRecoilState(clothesListState);
  const [loginStatus, setLoginStatus] = useRecoilState(loginStatusState);
  const [selectedClothes, setSelectedClothesState] =
    useRecoilState(selectedClothesState);

  const navigate = useNavigate();

  const handleAddClothes = (clothItem) => {
    if (loginStatus == true) {
      setSelectedClothesState((prevState) => {
        if (prevState.indexOf(clothItem) === -1) {
          return [...prevState, clothItem];
        } else {
          return prevState.filter((item) => item !== clothItem);
        }
      });
    } else {
      navigate("/login");
    }
    // console.log(selectedClothes);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/clothes/`);
        setClothesList(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="flex items-center justify-center">
        <button className="bg-pink-600 border-2 rounded-md p-1 mt-2 text-white">
          {loginStatus == true ? (
            <Link to="/book">Book Now</Link>
          ) : (
            <Link to="/login">Book Now</Link>
          )}
        </button>
      </div>
      <div className="columns-2 mt-3 ml-2 mr-2">
        <div>
          {clothesList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center p-1 border-2 border-black mb-2 h-[25vh]"
            >
              <img src={item.photo} className="w-[40vw] h-[10vh]" alt="image" />
              <p>{item.type}</p>
              <p>{item.price}</p>
              <FaHeart
                onClick={() => handleAddClothes(item)}
                className={
                  selectedClothes.indexOf(item) == -1
                    ? "text-gray-300"
                    : "text-pink-500"
                }
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
