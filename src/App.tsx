import { Outlet } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";

export default function App() {
  return (
    <MobileLayout>
      <Outlet />
    </MobileLayout>
  );
}
