import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import App from "./App";
import Login from "./pages/Login.tsx";
import Protected from "@/lib/routes/Protected.tsx";
import ProfileSelect from "./pages/ProfileSelect.tsx";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import MyPage from "@/pages/MyPage";
import CreateChallenge from "./pages/CreateChallenge";
import ChallengeDetail from "./pages/ChallengeDetail.tsx";
import TodayChallenge from "./pages/TodayChallenge.tsx";
import Feed from "./pages/Feed.tsx";
import EditProfile from "./pages/EditProfile.tsx";

// 라우터 구성
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      {
        element: <Protected />,
        children: [
          { index: true, element: <Navigate to="home" replace /> },
          { path: "profile-select", element: <ProfileSelect /> },
          { path: "home", element: <Home /> },
          { path: "collection", element: <Collection /> },
          { path: "my-page", element: <MyPage /> },
          { path: "/my/profile", element: <EditProfile /> },
          { path: "create-challenge", element: <CreateChallenge /> },
          { path: "challenge/:id", element: <ChallengeDetail /> },
          { path: "challenge/:id/today", element: <TodayChallenge /> },
          {
            path: "challenge/:id/today/:certificationId",
            element: <TodayChallenge />,
          },
          { path: "feed", element: <Feed /> },
          { path: "edit-profile", element: <EditProfile /> },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

// React Query 클라이언트
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
