import React from "react";
import { useTab } from "../../contexts/tab-context/useTabContext";

interface TabContentProps<T> {
  tab: T;
  children: React.ReactNode;
}

/**
 * `TabContent` Component
 *
 * The `TabContent` component is designed to work within a tabbed interface, displaying content corresponding to an active tab. It utilizes the context from a `TabContext` provider to determine if its associated tab is the current active one. If so, it renders the children content; otherwise, it renders nothing.
 *
 * ## Key Features:
 * - **Conditional Rendering Based on Active Tab**: Only displays its children when its associated tab is active, enhancing the tabbed interface's functionality.
 * - **Generic Type Support**: Can handle tabs identified by any string type, making it versatile for various tab naming conventions.
 * - **Seamless Integration with Tab Context**: Leverages a custom hook from the `TabContext` to check the active tab status, ensuring consistency across the tabbed interface.
 *
 * ## Props:
 * - `tab`: A string (or string-based type) identifier for the tab. This prop specifies which tab this component's content belongs to.
 * - `children`: The content to be displayed when this component's tab is active. Can be any React node.
 *
 * ## Usage:
 *
 * Assuming you have a `TabContextProvider` and a `useTab` hook set up:
 *
 * ```jsx
 * <TabContextProvider>
 *   <Tabs>
 *     <Tab id="tab1">Tab 1</Tab>
 *     <Tab id="tab2">Tab 2</Tab>
 *   </Tabs>
 *   <TabContent tab="tab1">
 *     <p>This is the content for Tab 1</p>
 *   </TabContent>
 *   <TabContent tab="tab2">
 *     <p>This is the content for Tab 2</p>
 *   </TabContent>
 * </TabContextProvider>
 * ```
 *
 * In this example, `TabContent` components are used to define the content for each tab. Content for "tab1" is displayed when it is the active tab, and similarly for "tab2".
 *
 * @param props The props for the `TabContent` component, including the tab identifier and the children to display.
 * @returns A component that renders the children content if its associated tab is the current active tab, otherwise renders nothing.
 */
export const TabContent = <T extends string>({
  tab,
  children,
}: TabContentProps<T>) => {
  const { activeTab } = useTab<T>();

  return activeTab === tab ? <>{children}</> : null;
};
