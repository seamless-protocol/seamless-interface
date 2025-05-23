interface IconProps
  extends Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "alt"> {
  alt: string;
  isLoading?: boolean;
  isFetched?: boolean;
  loaderSkeleton?: boolean;
  disableMinHeight?: boolean;
}

/**
 * `Icon` Component
 *
 * The `Icon` component is a wrapper around html's `img` component.
 *
 * ## Default Styles
 * By default, the component has the following styles:
 * - Width set to `32` units.
 * - Height set to `32` units.
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

export const Icon: React.FC<IconProps> = ({
  src = "",
  alt,
  isLoading,
  isFetched,
  disableMinHeight,
  loaderSkeleton = true,
  ...rest
}) => {
  if ((!isFetched && isFetched != null) || (isLoading && isLoading != null)) {
    return (
      <span
        style={{
          width: rest.width || 32,
          height: rest.height || 32,
        }}
        className={
          loaderSkeleton
            ? `skeleton ${disableMinHeight ? "" : "min-h-10 min-w-10"} rounded-full`
            : `loading loading-spinner flex self-center ${disableMinHeight ? "" : "w-32 h-32"}`
        }
      />
    );
  }
  return <img src={src} alt={alt} width={32} height={32} {...rest} className={`rounded-full ${rest.className}`} />;
};
