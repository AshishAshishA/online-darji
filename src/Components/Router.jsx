import Home from "./Home";
import App from "../App";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Cartview from "./Cartview";
import OtpVerify from "./OtpVerify";
import { createBrowserRouter } from "react-router-dom";
import Book from "./Book";
import ForgetPassword from "./ForgetPassword";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/cart",
    element: <Cartview />,
  },
  {
    path: "/book",
    element: <Book />,
  },
  {
    path: "/otp/verify",
    element: <OtpVerify />,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
]);
