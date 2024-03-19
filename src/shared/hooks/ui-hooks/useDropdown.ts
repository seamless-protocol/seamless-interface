import { useState, useEffect, useRef } from "react";

/**
 * `useDropdown` Hook
 *
 * A custom React hook for managing dropdown visibility and handling clicks outside of the dropdown element to automatically close it. This hook abstracts common dropdown functionalities into a reusable hook.
 *
 * ## Key Features:
 * - **Visibility Toggle**: Provides a state and a function to toggle dropdown visibility.
 * - **Outside Click Handling**: Automatically closes the dropdown when a click outside of the dropdown element is detected.
 * - **Ref Management**: Returns a ref that should be attached to the dropdown element to monitor outside clicks effectively.
 *
 * ## Returns:
 * - `isVisible`: A boolean state indicating whether the dropdown is visible.
 * - `setIsVisible`: A function to set the visibility state of the dropdown.
 * - `dropdownRef`: A ref object that needs to be attached to the dropdown container element.
 * - `toggleDropdown`: A function that toggles the visibility state. It should be attached to the dropdown toggle button or element.
 *
 * ## Usage:
 *
 * ```jsx
 * const { isVisible, setIsVisible, dropdownRef, toggleDropdown } = useDropdown();
 *
 * return (
 *   <div ref={dropdownRef}>
 *     <button onClick={toggleDropdown}>Toggle Dropdown</button>
 *     {isVisible && <div>Dropdown Content</div>}
 *   </div>
 * );
 * ```
 *
 * In this example, `useDropdown` is used to manage a simple dropdown. The `dropdownRef` is attached to the dropdown container, and `toggleDropdown` is used as the onClick handler for the toggle button. The `isVisible` state determines if the dropdown content is rendered.
 *
 * @returns An object containing `isVisible`, `setIsVisible`, `dropdownRef`, and `toggleDropdown`.
 */
export const useDropdown = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (
     
    e: React.MouseEvent<any>
  ) => {
    e.stopPropagation();
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
         
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef, isDropdownVisible]);

  return {
    isDropdownVisible,
    setIsDropdownVisible,
    dropdownRef,
    toggleDropdown,
  };
};
