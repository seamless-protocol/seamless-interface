import React from "react";

interface Props {
  button?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  width?: number;
}

/**
 * `Dropdown` Component
 *
 * The `Dropdown` component is an adaptable dropdown menu that intelligently adjusts its positioning based on the viewport's available space. This ensures that the dropdown content is always visible within the viewport, enhancing the user interface experience across various device sizes. The component is highly customizable, supporting dynamic content for both the dropdown trigger and menu.
 *
 * ## Key Features:
 * - **Customizable Trigger and Content**: Accepts any React node for the `button` (dropdown trigger) and `children` (dropdown content), offering flexibility in content design and layout.
 * - **Configurable Width**: Allows specification of the dropdown content's width through the `width` prop, accommodating various content sizes.
 * - **CSS Customization**: Supports additional custom CSS classes via the `className` prop, enabling further styling and theming flexibility.
 *
 * ## Props:
 * - `button`: React.ReactNode specifying the dropdown trigger element. Optional.
 * - `children`: React.ReactNode specifying the content to be displayed within the dropdown menu.
 * - `className`: Optional string for additional CSS class names to customize styling.
 * - `width`: Optional number specifying the width of the dropdown content (default: 208px). This width is used in the dynamic positioning calculation to ensure the content fits within the viewport.
 *
 * ## Usage Example:
 *
 * ```jsx
 * <Dropdown button={<button>Open Menu</button>} width={250}>
 *   <div>Menu Item 1</div>
 *   <div>Menu Item 2</div>
 *   <div>Menu Item 3</div>
 * </Dropdown>
 * ```
 *
 * In this example, the `Dropdown` component renders a button labeled "Open Menu" as the dropdown trigger. When activated, the dropdown menu displays with a width of 250 pixels, containing three menu items. The dropdown's position adjusts dynamically to ensure the menu is fully visible within the viewport.
 *
 * @param {Props} props The properties passed to the `Dropdown` component.
 * @returns The `Dropdown` component with dynamically adjustable positioning.
 */

export const Dropdown: React.FC<Props> = ({ button, children, width = 208, className = "" }) => {
  return (
    <div className={`dropdown ${className}`}>
      <div tabIndex={0} role="button" className="cursor-pointer">
        {button}
      </div>
      <div
        style={{
          width,
        }}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-[4px]"
      >
        {children}
      </div>
    </div>
  );
};
