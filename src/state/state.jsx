import { atom } from "recoil";

export const loginStatusState = atom({
  key: "loginStatus",
  default: false,
});

export const clothesListState = atom({
  key: "clothesList",
  default: [],
});

export const userProfileState = atom({
  key: "userProfile",
  default: {},
});

export const loginState = atom({
  key: "login",
  default: {},
});

export const orderStatus = {
  new: "NEW",
  inprogress: "IN PROGRESS",
  completed: "COMPLETED",
  delivered: "DELIVERED",
};

export const BASE_URL = "https://online-darji-wala.onrender.com";

export const orderItem = {
  shirt: "SHIRT",
  pant: "PANT",
};

export const clothType = {
  silk: "SILK",
  cotton: "COTTON",
  mix: "MIX",
};

export const selectedClothesState = atom({
  key: "selectedClothes",
  default: [],
});

export const orderCartState = atom({
  key: "orderCart",
  default: [],
});

export const updateStatusState = atom({
  key: "updateStatus",
  default: false,
});

export const mobileNumberState = atom({
  key: "mobileNumber",
  default: "",
});

export const isForgetPasswordState = atom({
  key: "isForgetPassword",
  default: false,
});

export const searchedClothListState = atom({
  key: "searchClothList",
  default: [],
});

export const sidebarOpenStatusState = atom({
  key: "sidebarOpenStatus",
  default: false,
});
