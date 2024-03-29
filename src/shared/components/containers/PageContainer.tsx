/**
 * `PageContainer` Component
 *
 * The `PageContainer` component serves as a generic wrapper for page content. It provides a simple, consistent way to encapsulate children components or elements, offering a fundamental building block for page layouts.
 *
 * ## Usage
 * This component is primarily used as a top-level wrapper in page components to contain various elements and components that make up the entire page. It doesn't impose any specific styling or structural constraints, offering maximum flexibility.
 *
 * ## Props
 * - `children`: The content to be rendered inside the container. This can include any combination of React components and HTML elements.
 *
 * ## Example
 *
 * ```jsx
 * <PageContainer>
 *   <PageContent />
 * </PageContainer>
 * ```
 *
 * In the above example, `PageContainer` is used to wrap the header, main content, and footer of a page, forming a complete page structure.
 *
 * @param props Props for the `PageContainer` component, expecting children elements.
 * @returns The `PageContainer` component containing the provided children.
 */

export const PageContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={`flex-grow ${className || ""}`}>{children}</div>;
};
