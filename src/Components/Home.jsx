import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  clothesListState,
  loginStatusState,
  sidebarOpenStatusState,
} from "../state/state";
import { useRecoilState, useRecoilValue } from "recoil";
import { CiHeart } from "react-icons/ci";
import Navbar from "./Navbar";
import Footer from "../Footer";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import {
  selectedClothesState,
  searchedClothListState,
  BASE_URL,
} from "../state/state";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Home() {
  const [clothesList, setClothesList] = useRecoilState(clothesListState);
  const [loginStatus, setLoginStatus] = useRecoilState(loginStatusState);
  const [selectedClothes, setSelectedClothesState] =
    useRecoilState(selectedClothesState);
  const [searchClothList, setSearchClothList] = useRecoilState(
    searchedClothListState
  );

  const sidebarOpenStatus = useRecoilValue(sidebarOpenStatusState);

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

  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    const filteredClothesList = clothesList.filter((prev) => {
      return prev.type.toLowerCase().indexOf(input) !== -1;
    });
    setSearchClothList(filteredClothesList);

    if (input == "") {
      setSearchClothList((prev) => clothesList);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/clothes/`);
        setClothesList(response.data);
        setSearchClothList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {sidebarOpenStatus == true ? (
        <>
          <Sidebar />
        </>
      ) : (
        <></>
      )}
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

      <div className="w-full flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="search cloth type"
          onChange={handleSearch}
          className="p-1 text-center border-2 border-blue-400 rounded-md"
        />
      </div>

      {/* Clothes List Section - Two Columns */}
      <div className="grid grid-cols-2 gap-4 mt-4 px-4">
        {searchClothList.map((item) => (
          <div
            onClick={() => handleAddClothes(item)}
            key={item.id}
            className="flex flex-col items-center justify-center p-2 border-2 border-black rounded-md w-auto h-auto"
          >
            <img
              src={item.photo}
              className="w-full h-[10vh] object-cover rounded-md mb-2"
              alt="clothes"
            />
            <p className="text-center text-sm font-semibold">{item.type}</p>
            <p className="text-center text-sm text-gray-700">{item.price}</p>
            <FaHeart
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
