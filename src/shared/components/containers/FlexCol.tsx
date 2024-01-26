import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

/**
 * `FlexCol` Component
 *
 * The `FlexCol` component provides a convenient way to create a flexbox container with a column direction.
 *
 * ## Default Styles
 * Tailwind code: `flex flex-col`
 *
 * By default, the component has the following styles:
 * - Display set to `flex` (making it a flexbox container).
 * - Flex direction set to `col`.
 *
 * ## Overriding Default Styles
 * Any props passed to the component (including `className`) will override the default styles.
 * This means that you can easily customize the component to fit your needs, while still benefiting from the provided defaults.
 *
 * @example
 * ```jsx
 * <FlexCol className="justify-between">
 *   <div>Top</div>
 *   <div>Down</div>
 * </FlexCol>
 * ```
 *
 * In the above example, child items will be justified to the start and end of the container respectively.
 *
 * @param props Props for the component.
 * @returns The `FlexCol` component.
 */

export const FlexCol: React.FC<Props> = ({ children, ...rest }) => {
  const classes = `flex flex-col ${rest.className}`;

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};
