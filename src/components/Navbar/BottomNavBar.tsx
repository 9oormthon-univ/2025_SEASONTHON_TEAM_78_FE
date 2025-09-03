import { NavLink } from "react-router-dom";

import homeDefault from "@/assets/home-default.svg";
import homePressed from "@/assets/home-pressed.svg";
import feedDefault from "@/assets/feed-default.svg";
import feedPressed from "@/assets/feed-pressed.svg";
import collectionDefault from "@/assets/collection-default.svg";
import collectionPressed from "@/assets/collection-pressed.svg";
import myDefault from "@/assets/my-default.svg";
import myPressed from "@/assets/my-pressed.svg";

const items = [
  {
    to: "/home",
    defaultIcon: homeDefault,
    pressedIcon: homePressed,
    end: true,
  },
  { to: "/feed", defaultIcon: feedDefault, pressedIcon: feedPressed },
  {
    to: "/collection",
    defaultIcon: collectionDefault,
    pressedIcon: collectionPressed,
  },
  { to: "/my-page", defaultIcon: myDefault, pressedIcon: myPressed },
];

function BottomNavBar() {
  return (
    <nav
      className="
        fixed left-1/2 -translate-x-1/2
        bottom-[calc(env(safe-area-inset-bottom)+24px)]
        w-[clamp(320px,calc(100vw-32px),420px)] h-[77px] px-6 py-3
        rounded-[80px] bg-[#2a2c2e]/80 backdrop-blur-[10px]
        shadow-[0_4px_10px_rgba(0,0,0,0.16)]
        z-50
      "
    >
      <ul className="flex justify-between items-center">
        {items.map(({ to, defaultIcon, pressedIcon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className="relative flex items-center justify-center p-4"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-[30px] -z-10 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(150deg, #f4f7fb 40%, #cbe2ff 150%)",
                      }}
                    />
                  )}
                  <img
                    src={isActive ? pressedIcon : defaultIcon}
                    alt=""
                    className="w-6 h-6"
                    draggable={false}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNavBar;
