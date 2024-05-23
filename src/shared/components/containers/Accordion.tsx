import React, { useState, FC } from "react";
import { CombinedTypographyType, Typography } from "../text/Typography/Typography";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  typography?: CombinedTypographyType;
};

/**
 * `AccordionItem` Component
 *
 * The `AccordionItem` component is a versatile element designed for creating collapsible content sections. It is ideal for FAQs, nested lists, or any content that benefits from a clean, organized presentation. This component allows users to expand or collapse content with a simple click, making information more manageable and less overwhelming.
 *
 * ## Key Features:
 * - **Collapsible Content**: Easily toggle between showing or hiding content.
 * - **Custom Typography**: Supports different typography styles for the title.
 * - **Animated Expand/Collapse Icon**: Provides a visual cue for interaction with a smoothly animated icon.
 *
 * ## Props:
 * - `title`: The text to display as the accordion item's title.
 * - `children`: The content to display when the accordion is expanded.
 * - `typography`: Optional. Specifies the typography style for the title. Defaults to a predefined bold style if not specified.
 *
 * ## Usage:
 *
 * ```jsx
 * <AccordionItem
 *   title="Accordion Title"
 *   typography="subtitle1"
 * >
 *   <p>This is the content of the accordion.</p>
 * </AccordionItem>
 * ```
 *
 * In the example above, `AccordionItem` will display a titled section that users can click to expand or collapse, revealing or hiding the content within.
 *
 * @param props Props for the `AccordionItem` component, including `title`, `children`, and optional `typography`.
 * @returns The `AccordionItem` component with collapsible content functionality.
 */

export const AccordionItem: FC<AccordionItemProps> = ({ title, children, typography }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <button className="w-full flex justify-between items-center gap-6" onClick={() => setIsOpen(!isOpen)}>
        <Typography type={typography || "bold3"} className="text-start">
          {title}
        </Typography>
        <div
          className={`rounded-full border border-navy-600 p-1 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
        >
          <ChevronDownIcon width={15} height={15} />
        </div>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

type AccordionProps = {
  children: React.ReactNode;
};
/**
 * `Accordion` Component
 *
 * The `Accordion` component acts as a container for multiple `AccordionItem` components. It provides a structured way to display collapsible content sections within a webpage or application, enhancing user experience by allowing users to hide or reveal information as needed.
 *
 * ## Key Features:
 * - **Container for Accordion Items**: Organizes multiple `AccordionItem` components into a cohesive accordion structure.
 * - **Flexibility**: Supports an arbitrary number of `AccordionItem` components, each with its own expandable content.
 *
 * ## Props:
 * - `children`: The `AccordionItem` components that make up the accordion. Can include one or more items.
 *
 * ## Usage:
 *
 * ```jsx
 * <Accordion>
 *   <AccordionItem title="FAQ 1">
 *     <p>Answer to FAQ 1</p>
 *   </AccordionItem>
 *   <AccordionItem title="FAQ 2">
 *     <p>Answer to FAQ 2</p>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * This example creates an accordion with two sections, each represented by an `AccordionItem`. Users can click on a section title to expand or collapse its content.
 *
 * @param props The props for the `Accordion` component, primarily consisting of child `AccordionItem` components.
 * @returns The `Accordion` component that organizes `AccordionItem` components into a collapsible structure.
 */

export const Accordion: FC<AccordionProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};
