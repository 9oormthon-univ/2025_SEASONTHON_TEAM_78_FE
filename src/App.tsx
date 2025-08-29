import { Outlet, Link } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";

export default function App() {
  return (
    <MobileLayout>
      <header className="border-b">
        <nav className="flex items-center gap-4 p-4">
          <Link to="/" className="font-semibold hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </nav>
      </header>

      <main className="flex-1 overflow-y-auto p-6 bg-red">
        <Outlet />
      </main>
    </MobileLayout>
  );
}
