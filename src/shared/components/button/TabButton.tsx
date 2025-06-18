import React from "react";
import { useTab } from "../../contexts/tab-context/useTabContext";

interface TabButtonProps<T> extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tab: T;
  children: React.ReactNode;
}
/**
 * `TabButton` Component
 *
 * The `TabButton` component functions as a navigational element within a tabbed interface, allowing users to switch between different tabs. It works in tandem with a tab context, provided by a `TabContextProvider`, to manage the active state of tabs within the interface. When clicked, it sets its associated tab as the active one, changing the displayed content accordingly.
 *
 * ## Key Features:
 * - **Tab Selection**: Allows users to switch the active tab, dynamically updating the displayed content.
 * - **Active Tab Highlighting**: Visually indicates the active tab, enhancing the user interface by applying different styles to the active and inactive tabs.
 * - **Generic Type Support**: Accepts tabs identified by any string type, offering flexibility in tab management and naming.
 * - **Integration with Tab Context**: Uses the `useTab` hook to access and manipulate the active tab state, ensuring seamless functionality within the tabbed interface.
 *
 * ## Props:
 * - `tab`: A string (or string-based type) identifier for this button's tab. It uniquely identifies the tab this button will activate.
 * - `children`: The content or label of the button, which can be any React node.
 *
 * ## Usage:
 *
 * Assuming you have a `TabContextProvider` and a `useTab` hook set up:
 *
 * ```jsx
 * <TabContextProvider>
 *   <TabButton tab="tab1">Tab 1</TabButton>
 *   <TabButton tab="tab2">Tab 2</TabButton>
 *   <TabContent tab="tab1">
 *     <p>This is the content for Tab 1</p>
 *   </TabContent>
 *   <TabContent tab="tab2">
 *     <p>This is the content for Tab 2</p>
 *   </TabContent>
 * </TabContextProvider>
 * ```
 *
 * In this example, `TabButton` components are used to switch between tabs. Clicking on a button sets its associated tab as the active one, displaying the corresponding content.
 *
 * @param props The props for the `TabButton` component, including the tab identifier and the button content.
 * @returns A button that, when clicked, sets its associated tab as the active one within a tabbed interface.
 */

export const TabButton = <T extends string>({ tab, children, ...rest }: TabButtonProps<T>) => {
  const { activeTab, setActiveTab } = useTab<T>();

  return (
    <button
      {...rest}
      onClick={() => setActiveTab(tab)}
      className={`relative py-4 text-bold3 ${
        activeTab === tab ? "border-b-navy-1000 z-20 mb-[-0.5px] border-b-thin" : "text-navy-400"
      } ${rest.className || ""}`}
    >
      {children}
    </button>
  );
};
