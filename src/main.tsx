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
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Protected from "@/lib/routes/Protected.tsx";

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
          { path: "home", element: <Home /> },
          // { path: "home", element: <Home /> }, -> 로그인 후, 사용할 페이지 추가
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
  </StrictMode>,
);
