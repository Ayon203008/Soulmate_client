import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayOut from "../Pages/MainLayOut/MainLayOut";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../ContactUs/ContactUs";
import PrivateRoute from "./PrivateRoute";
import DashBoardLayout from "../LayOuts/DashBordLayOut";
import AllBioDatas from "../Pages/AllBioDatas/AllBioDatas";
import BiodataDetails from "../Pages/BioDataDetails/BioDataDetails";
import EditBiodata from "../Pages/DashBoard/EditBioData";
import VeiwBioData from "../Pages/DashBoard/VeiwBioData";
import FavouriteBioData from "../Pages/DashBoard/FavouriteBioData";
import ApprovedContactReq from "../Pages/AdminDashBoard/Approved Contact Request/ApprovedContactReq";
import ApprovedPremium from "../Pages/AdminDashBoard/Approved Premium/ApprovedPremium";
import ContactRequest from "../Pages/DashBoard/ContactRequest";
import AdminDashBoard from "../Pages/DashBoard/AdminDashBoard";
import ManageUsers from "../Pages/AdminDashBoard/ManageUsers/ManageUsers";
import GotMarried from "../Pages/DashBoard/GotMarried";
import SuccessStoryAdmin from "../Pages/DashBoard/SuccessStoryAdmin";
// import AdminRoute from "./AdminRoute";
import ForbiddenPage from "../Forbidden/ForbiddenPage";
import Checkout from "../Pages/CheckOutPage/CheckOut";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../ErrorPage/ErrorPage";
import TermsAndConditions from "../Pages/TermsAndConditions/TermsAndConditions";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:'/terms',
        Component:TermsAndConditions,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/dashboard/forbidden",
        Component: ForbiddenPage,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/aboutus",
        Component: AboutUs,
      },
      {
        path: "/contactus",
        Component: ContactUs,
      },
      {
        path: "/biodatas",
        Component: AllBioDatas,
      },
      {
        path: "checkout/:biodataId",
        Component: Checkout,
      },
      {
        path: "/biodata/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails></BiodataDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
      {
        path: "/dashboard/editdata",

        Component: EditBiodata,
      },
      {
        path: "/dashboard/view-biodata",
        Component: VeiwBioData,
      },

      {
        path: "/dashboard/contact-requests",
        Component: ContactRequest,
      },
      {
        path: "/dashboard/favourites",
        Component: FavouriteBioData,
      },
      {
        path: "/dashboard/admin-dashboard",
        element: (
          <AdminRoute>
            <AdminDashBoard></AdminDashBoard>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/approved-contact",
        element:<AdminRoute><ApprovedContactReq></ApprovedContactReq></AdminRoute>
      },
      {
        path: "/dashboard/approved-premium",
        element: (
          <AdminRoute>
            <ApprovedPremium></ApprovedPremium>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageusers",
        element: (
          <AdminRoute>
            
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/got-married",
        Component: GotMarried,
      },
      {
        path: "/dashboard/sucessStory-admin",
        element: (
          <AdminRoute>
            <SuccessStoryAdmin></SuccessStoryAdmin>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
