import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, FlexRow } from "@shared";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export const MoreManuButton: React.FC<{
  name: string;
  moreMenuItems: {
    name: string;
    href: string;
    icon?: React.ReactNode
  }[]
}> = ({ name, moreMenuItems }) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !(moreMenuRef.current as any).contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={moreMenuRef}>
      <button
        onMouseEnter={() => setIsMoreMenuOpen(true)}
        className="flex items-center px-3 py-0.5 ml-1 rounded min-w-8 hover:bg-background-hover"
      >
        <span className="text-base text-center" color="primary">
          <Typography type="description">{name}</Typography>
        </span>
        <EllipsisHorizontalIcon className="h-5 w-5 text-white ml-2" />
      </button>
      {isMoreMenuOpen && (
        <div className="pt-3 absolute" onMouseLeave={() => setIsMoreMenuOpen(false)}>
          <div className="text-black absolute py-1 text-bold3 left-0 z-10 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            style={{ top: '100%' }} // This ensures no gap between the button and the dropdown
          >
            {moreMenuItems.map((item, index) => (
              <Link key={index} to={item.href} target="_blank" className="block px-4 py-3 hover:bg-action-hover">
                <FlexRow className="items-center gap-2">
                  {item.icon && item.icon}

                  <Typography type="subheader1">{item.name}</Typography>
                </FlexRow>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
