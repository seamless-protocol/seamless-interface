import { useState, useEffect } from "react";

export const SmallScreenSize = 768;

export const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const checkScreenWidth = () => {
    const screenWidth = window.innerWidth;
    setIsSmallScreen(screenWidth <= SmallScreenSize);
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  return isSmallScreen;
};
