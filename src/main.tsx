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
          { index: true, element: <Navigate to="profile-select" replace /> },
          { path: "profile-select", element: <ProfileSelect /> },
          { path: "collection", element: <Collection /> },
        ],
      },
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
