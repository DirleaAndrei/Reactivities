import { Navigate, createBrowserRouter } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import ProfilePage from "../../features/profiles/ProfilePage";
import ConfirmEmail from "../../features/users/ConfirmEmail";
import ForgotPasswordForm from "../../features/users/ForgotPasswordForm";
import LoginForm from "../../features/users/LoginForm";
import RegisterSuccess from "../../features/users/RegisterSuccess";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";
import ResetPassword from "../../features/users/ResetPassword";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "activities",
            element: <ActivityDashboard />,
          },
          {
            path: "activities/:id",
            element: <ActivityDetails />,
          },
          {
            path: "createActivity",
            element: <ActivityForm key="create" />,
          },
          {
            path: "manage/:id",
            element: <ActivityForm key="manage" />,
          },
          {
            path: "profiles/:username",
            element: <ProfilePage />,
          },

          {
            path: "errors",
            element: <TestErrors />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "account/registerSuccess",
        element: <RegisterSuccess />,
      },
      {
        path: "account/verifyEmail",
        element: <ConfirmEmail />,
      },
      {
        path: "account/forgotPassword",
        element: <ForgotPasswordForm />,
      },
      {
        path: "account/resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
