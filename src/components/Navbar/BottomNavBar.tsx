import { NavLink } from 'react-router-dom';

import homeDefault from '@/assets/home-default.svg';
import homePressed from '@/assets/home-pressed.svg';
import feedDefault from '@/assets/feed-default.svg';
import feedPressed from '@/assets/feed-pressed.svg';
import collectionDefault from '@/assets/collection-default.svg';
import collectionPressed from '@/assets/collection-pressed.svg';
import myDefault from '@/assets/my-default.svg';
import myPressed from '@/assets/my-pressed.svg';
import plusIcon from '@/assets/plus.svg';

const items = [
  {
    to: '/home',
    defaultIcon: homeDefault,
    pressedIcon: homePressed,
    end: true,
  },
  { to: '/feed', defaultIcon: feedDefault, pressedIcon: feedPressed },
  {
    to: '/collection',
    defaultIcon: collectionDefault,
    pressedIcon: collectionPressed,
  },
  { to: '/my-page', defaultIcon: myDefault, pressedIcon: myPressed },
];

function BottomNavBar() {
  return (
    <nav
      className="
        fixed left-1/2 -translate-x-1/2
        bottom-[calc(env(safe-area-inset-bottom)+24px)]
        w-[clamp(320px,calc(100vw-32px),420px)] h-[77px] px-6 py-3
        rounded-[80px] bg-[#F4F7FB]/70 backdrop-blur-[10px]
        shadow-[0_4px_10px_rgba(0,0,0,0.16)] stroke-gray-100 stroke-[1]
        z-50
      "
    >
      <ul className="flex items-center justify-between gap-[6px]">
        {items.slice(0, 2).map(({ to, defaultIcon, pressedIcon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className="relative flex items-center justify-center p-4 rounded-[30px]"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-[30px] pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(150deg, #f4f7fb 40%, #cbe2ff 150%)',
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

        {/* 챌린지 추가 버튼 */}
        <NavLink
          to="/challenge/new" //경로 수정하기
          className={({ isActive }) =>
            [
              'flex items-center justify-center',
              'w-[48px] h-[48px] rounded-[22.5px]',
              'border border-[#e7eaed] transition-colors',

              isActive
                ? // 활성
                  [
                    'bg-gradient-to-b',
                    'from-[#2657F3] from-25%',
                    'to-[#BEFCFF] to-150%',
                  ].join(' ')
                : // 비활성
                  [
                    'bg-gradient-to-b',
                    'from-[#4672FF] from-25%',
                    'to-[#BEFCFF] to-150%',
                  ].join(' '),
            ].join(' ')
          }
          aria-label="챌린지 추가"
        >
          <img
            src={plusIcon}
            alt=""
            className="w-[27px] h-[27px]"
            draggable={false}
          />
        </NavLink>
        {items.slice(2).map(({ to, defaultIcon, pressedIcon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className="relative flex items-center justify-center p-4 rounded-[30px]"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-[30px] pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(150deg, #f4f7fb 40%, #cbe2ff 150%)',
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
