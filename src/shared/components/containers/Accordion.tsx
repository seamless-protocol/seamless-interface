import React, { FC } from "react";

type AccordionItemProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  name?: string;
};

/**
 * AccordionItem Component
 *
 * This component creates an individual collapsible element, which can be used within an Accordion wrapper.
 * It utilizes daisyUI's collapse component styles to provide a smooth, aesthetically pleasing UI interaction.
 *
 * ## Features:
 * - **Collapsible**: Click to expand or collapse the content.
 * - **Customizable**: Supports custom titles and can include any ReactNode as children.
 * - **Stylable**: Uses daisyUI classes for consistent styling and animation.
 *
 * ## Props:
 * - `title`: The content to display as the accordion's title. This can be any ReactNode.
 * - `children`: The content to display inside the accordion when it is expanded.
 * - `name`: Optional. The name attribute for the accordion item's checkbox input. If using multiple accordion items within a single `Accordion`, ensure each item has a unique `name` to allow independent operation.
 *
 * ## Usage:
 * ```jsx
 * <Accordion>
 *   <AccordionItem title="Click me" name="unique-accordion-name">
 *     <p>This is some collapsible content.</p>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * In this example, the `AccordionItem` will show "Click me" as the title, which users can click to expand or collapse the content paragraph below it.
 *
 * @param {AccordionItemProps} props The props for configuring the AccordionItem component.
 */
export const AccordionItem: FC<AccordionItemProps> = ({ title, children, name = "my-accordion" }) => {
  return (
    <div className="collapse collapse-arrow border border-base-300">
      <input type="checkbox" className="peer" name={name} />
      <div className="collapse-title flex justify-between items-center">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

type AccordionProps = {
  children: React.ReactNode;
};

/**
 * Accordion Component
 *
 * This component acts as a container for multiple `AccordionItem` components. It organizes and formats them in a vertical stack,
 * allowing each item to expand and collapse independently, provided they have unique `name` props.
 *
 * ## Features:
 * - **Container for Accordion Items**: Holds one or more `AccordionItem` components, managing their layout and spacing.
 * - **Vertical Stacking**: Arranges the accordion items vertically.
 * - **Flexibility**: Accepts any number of accordion items, making it highly flexible and reusable across your application.
 *
 * ## Props:
 * - `children`: The `AccordionItem` components that make up the accordion. Can include one or more items.
 *
 * ## Usage:
 * ```jsx
 * <Accordion>
 *   <AccordionItem title="Section 1" name="accordion-1">
 *     <p>Details about Section 1...</p>
 *   </AccordionItem>
 *   <AccordionItem title="Section 2" name="accordion-2">
 *     <p>Details about Section 2...</p>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * This example creates an accordion with two sections. Each section can be independently expanded and collapsed,
 * and users can interact with each section separately.
 *
 * @param {AccordionProps} props The props for the `Accordion` component, primarily consisting of child `AccordionItem` components.
 */
export const Accordion: FC<AccordionProps> = ({ children }) => {
  return <div className="join join-vertical w-full">{children}</div>;
};
