import { lazy } from "react";
import { useSelector } from 'react-redux';
import { createBrowserRouter,  Navigate  } from "react-router-dom"

//import AuthGuard from "./auth/AuthGuard";
//import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import sessionRoutes from "../app/views/sessions/session-routes";
import materialRoutes from "../app/views/material-kit/materialRoutes";

// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("../app/views/charts/echarts/AppEchart"))); 
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("../app/views/dashboard/Analytics")));
/*
const routes = [
  { path: "/", element: <Navigate to="dashboard/default" /> },
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor }
    ]
  },

  // session pages route
  ...sessionRoutes
];

*/
//export default routes;

const Login = lazy(() => import("../app/pages/auth/auth"));
const Logout = lazy(() => import("../app/pages/auth/logout"));
const Dashboard = lazy(() => import("../app/pages/home/dashboard"));
const ProtectedRoute = ({ children }) => {
  //const token = localStorage.getItem("token"); // or Redux
  const token = useSelector((state) => state.auth?.token) || localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const routesConfig = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/dashboard", 
    element: (
    <ProtectedRoute><MatxLayout /></ProtectedRoute>
    ),
     children: [
      ...materialRoutes,
      // dashboard route
      { path: "/dashboard", element: <ProtectedRoute><Analytics /></ProtectedRoute> },
      // e-chart route
      { path: "/dashboard/charts/echarts", element: <ProtectedRoute><AppEchart /> </ProtectedRoute>}
    ]
  },
  ...sessionRoutes

]);
