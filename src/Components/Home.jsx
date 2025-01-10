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
    if (loginStatus === true) {
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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/clothes/`);
        setClothesList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-2">
        <button className="bg-pink-600 border-2 rounded-md p-2 text-white">
          {loginStatus === true ? (
            <Link to="/book">Book Now</Link>
          ) : (
            <Link to="/login">Book Now</Link>
          )}
        </button>
      </div>

      {/* Clothes List Section - Two Columns */}
      <div className="grid grid-cols-2 gap-4 mt-4 px-4">
        {clothesList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center p-2 border-2 border-black rounded-md w-[100px] h-auto"
          >
            <img
              src={item.photo}
              className="w-full h-[70px] object-cover rounded-md mb-2"
              alt="clothes"
            />
            <p className="text-center text-sm font-semibold">{item.type}</p>
            <p className="text-center text-sm text-gray-700">{item.price}</p>
            <FaHeart
              onClick={() => handleAddClothes(item)}
              className={
                selectedClothes.indexOf(item) === -1
                  ? "text-gray-300"
                  : "text-pink-500"
              }
            />
          </div>
        ))}
      </div>
        <br />
      <Footer />
    </div>
  );
}

export default Home;
