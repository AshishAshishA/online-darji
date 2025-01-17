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

export const darjiOrderListState = atom({
  key: "darjiOrderList",
  default: [],
});

export const readyMadeOrderListState = atom({
  key: "readyMadeOrderList",
  default: [],
});

export const ironingOrderListState = atom({
  key: "ironingOrder",
  default: [],
});

export const cleaningOrderListState = atom({
  key: "cleaningOrderList",
  default: [],
});

export const dryCleaningOrderListState = atom({
  key: "dryCleaningOrderList",
  default: [],
});

export const orderStatus = {
  new: "NEW",
  inprogress: "IN PROGRESS",
  completed: "COMPLETED",
  delivered: "DELIVERED",
};

export const orderSection = {
  darji: "DARJI",
  readyMade: "READYMADE",
  ironing: "IRONING",
  dryClean: "DRYCLEAN",
  cleaning: "CLEANING",
};

export const Service = {
  cleanService: {
    "shirt,wash_only": 25,
    "trouser/jeans,wash_only": 35,
    "dress,wash_only": 60,
    "saree(Simple),wash_only": 70,
    "saree(Heavy/Embroidered),wash_only": 120,
    "shirt,wash_&_iron": 25,
    "trouser/jeans,wash_&_iron": 35,
    "dress,wash_&_iron": 60,
    "saree(Simple),wash_&_iron": 70,
    "saree(Heavy/Embroidered),wash_&_iron": 120,
  },
  pressService: {
    "shirt/T-shirt,cotton": 8,
    "trouser/jeans,cotton": 10,
    "dress(simple),cotton": 15,
    "saree,cotton": 20,
    "heavy_items,cotton": 50,
    "small_items,cotton": 3,
  },
  dryCleaningService: {
    "shirt,regular": 80,
    "shirt,delicate": 150,
    "dress,regular": 150,
    "saree(Embroidered/Heavy),regular": 500,
    "lehengas,regular": 600,
    "curtains,regular": 150,
    "Blankets,regular": 300,
    "suits/Blazers,regular": 300,
  },
};

export const BASE_URL = "https://allkapdaservices.onrender.com/";
// https://online-darji-wala.onrender.com

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

export const readyMadeClothesListState = atom({
  key: "readyMadeClothesList",
  default: [],
});

export const readyMadeSliderState = atom({
  key: "readyMadeSlider",
  default: [],
});

export const currReadyMadeSectionState = atom({
  key: "currReadyMadeSection",
  default: "",
});

export const readyMadeClothesInCartState = atom({
  key: "readyMadeClothesInCart",
  default: [],
});

export const timeSlotList = [
  "6am - 7am",
  "7am - 8am",
  "8am - 9am",
  "9am - 10am",
  "10am - 11am",
  "11am - 12pm",
  "12pm - 1pm",
  "1pm - 2pm",
  "2pm - 3pm",
  "3pm - 4pm",
  "4pm - 5pm",
  "5pm - 6pm",
  "6pm - 7pm",
  "7pm - 8pm",
  "8pm - 9pm",
  "9pm - 10pm",
];
