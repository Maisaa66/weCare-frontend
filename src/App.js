import "./App.css";
import Home from "./components/Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import CheckUser from "./Pages/CheckUser/CheckUser";
import StepOne from "./Pages/Signup/Step1";
import StepTwo from "./Pages/Signup/Step2";
import StepThree from "./Pages/Signup/Step3";
import StepFour from "./Pages/Signup/Step4";
import StepFive from "./Pages/Signup/Step5";
import Filter from "./Pages/Filter/Filter";
import UserDashBoard from "./Pages/userDashBoard/userDashBoard";
import UserProfile from "./Pages/userDashBoard/userProfile";
import ProviderProfile from "./Pages/providerDashBoard/providerProfile";
import * as React from "react";
import AdmindashBoard from "./components/AdminDashBoard/AdmindashBoard";
import Users from "./components/AdminDashBoard/Main/Users/Users";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Provider from "./Pages/Provider/Provider";
import AllDetails from "./components/AdminDashBoard/Main/AllDetails/AllDetails";
import Update from "./components/AdminDashBoard/Main/Update/Update";
import ReqDetails from "./components/AdminDashBoard/Main/AllRequests/ReqDetails";
import Requests from "./components/AdminDashBoard/Main/AllRequests/Requests";
import ProviderDashBoard from "./Pages/providerDashBoard/providerDashBoard";
import Charts from "./components/UI/Chart/Chart";

// import Charts from "./components/AdminDashBoard/Main/Charts/Charts";
import CheckoutSuccess from "./components/UI/Checkout/CheckoutSuccess/CheckoutSuccess";
import AboutPage from "./components/Pages/About/About";
import PrivacyPolicyPage from "./components/Pages/Privacy/Privacy";
import TermsConditionsPage from "./components/Pages/Terms & Conditions/Terms";
import ContactPage from "./components/Pages/Contact/Contact";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
// const authenticated = useSelector((state) => state.user.isAdmin);

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdmindashBoard />,
    children: [
      { path: "users", element: <Users></Users> },
      { path: "charts", element: <Charts /> },
      { path: "providers", element: <Users></Users> },
      { path: "users/:id", element: <AllDetails /> },
      { path: "providers/:id", element: <AllDetails /> },
      { path: "users/update/:id", element: <Update></Update> },
      { path: "providers/update/:id", element: <Update></Update> },
      { path: "requests", element: <Requests /> },
      { path: "requests/:id", element: <ReqDetails /> },
      // { path: "requests/docs/:id", element: < /> },
      // {path:'providers',element:<SP/>}
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
    children: [{ path: "home", element: <Home></Home> }],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signup/stepone",
    element: <StepOne />,
  },
  {
    path: "/signup/steptwo",
    element: <StepTwo />,
  },
  {
    path: "/signup/stepthree",
    element: <StepThree />,
  },
  {
    path: "/signup/stepfour",
    element: <StepFour />,
  },
  {
    path: "/signup/stepfive",
    element: <StepFive />,
  },
  {
    path: "/checkuser",
    element: <CheckUser />,
  },
  {
    path: "/filter",
    element: <Filter />,
  },
  {
    path: "/provider",
    element: <Provider />,
  },
  {
    path: "/userDashBoard",
    element: <UserDashBoard />,
  },
  {
    path: "/providerDashBoard",
    element: <ProviderDashBoard />,
  },
  {
    path: "/userProfile",
    element: <UserProfile />,
  },
  {
    path: "/providerProfile",
    element: <ProviderProfile />,
  },
  {
    path: "/checkout-success",
    element: <CheckoutSuccess />,
  },
  {
    path: "/about",
    element: <AboutPage></AboutPage>,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicyPage></PrivacyPolicyPage>,
  },
  {
    path: "/terms",
    element: <TermsConditionsPage></TermsConditionsPage>,
  },
  {
    path: "/contact",
    element: <ContactPage></ContactPage>,
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  }
]);

function App() {
  return (
    <div className="App">
      {/* <Charts></Charts> */}
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </div>
  );
}

export default App;
