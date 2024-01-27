import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

/**
 * `FlexRow` Component
 *
 * The `FlexRow` component provides a convenient way to create a flexbox container with a row direction.
 *
 * ## Default Styles
 * Tailwind code: `flex flex-row`
 *
 * By default, the component has the following styles:
 * - Display set to `flex` (making it a flexbox container).
 * - Flex direction set to `row`.
 *
 * ## Overriding Default Styles
 * Any props passed to the component (including `className`) will override the default styles.
 * This means that you can easily customize the component to fit your needs, while still benefiting from the provided defaults.
 *
 * @example
 * ```jsx
 * <FlexRow className="justify-between">
 *   <div>Left</div>
 *   <div>Right</div>
 * </FlexRow>
 * ```
 *
 * In the above example, child items will be justified to the start and end of the container respectively.
 *
 * @param props Props for the component.
 * @returns The `FlexRow` component.
 */

export const FlexRow: React.FC<Props> = ({ children, ...rest }) => {
  const classes = `flex flex-row ${rest.className}`;

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};
