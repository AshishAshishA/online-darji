import Home from "./Home";
import App from "../App";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Cartview from "./Cartview";
import OtpVerify from "./OtpVerify";
import { createBrowserRouter } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import ReadyMade from "./ReadyMade";
import CleaningOrder from "./CleaningOrder";
import IroningOrder from "./IroningOrder";
import DryCleaningOrder from "./DryCleaningOrder";
import DarjiOrder from "./DarjiOrder";

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
    element: <DarjiOrder />,
  },
  {
    path: "/otp/verify",
    element: <OtpVerify />,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/readymade/page",
    element: <ReadyMade />,
  },
  {
    path: "/cleaning/order",
    element: <CleaningOrder />,
  },
  {
    path: "/press/order",
    element: <IroningOrder />,
  },
  {
    path: "/dryclean/order",
    element: <DryCleaningOrder />,
  },
]);
