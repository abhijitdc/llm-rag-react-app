import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Box } from "@mui/material";
import Layout from "./Components/Layout";
import ErrorPage from "./Pages/ErrorPage";
import LandingPage from "./Pages/LandingPage";
import { AuthUserProvider } from "./firebase/auth";
import VxAgent from "./Pages/VxAgent";
import SearchPage from "./Pages/SearchPage";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={<LandingPage title="Welcome to LLM playground" />}
      />
      <Route path="search" element={<SearchPage />} />
      <Route path="agent" element={<VxAgent />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export default function App() {
  return (
    <AuthUserProvider>
      <Box>
        <RouterProvider router={route} />
      </Box>
    </AuthUserProvider>
  );
}
