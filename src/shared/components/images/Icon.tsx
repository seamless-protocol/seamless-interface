interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    "alt"
  > {
  alt: string;
}

/**
 * `Icon` Component
 *
 * The `Icon` component is a wrapper around Next.js's `Image` component that provides a simplified interface for displaying icons.
 *
 * ## Default Styles
 * By default, the component has the following styles:
 * - Width set to `16` units.
 * - Height set to `16` units.
 *
 * ## Overriding Default Styles
 * Any props passed to the component (including `className`) will override the default styles.
 * However, the `alt` attribute is optional in this component, different from the Next.js `Image` component where it's mandatory.
 *
 * ## Accessibility
 * For accessibility reasons, it's recommended to always provide a meaningful `alt` attribute that describes the icon, even if it's left as an empty string.
 *
 * @example
 * ```jsx
 * <Icon src="/path/to/icon.png" alt="Descriptive text" />
 * ```
 *
 * @param props Props for the component.
 * @returns The `Icon` component.
 */
export const Icon: React.FC<Props> = ({ src = "", ...rest }) => {
  return <img src={src} width={32} height={32} {...rest} />;
};
