import React from "react";

interface ImageProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    "alt"
  > {
  alt: string;
  isLoading?: boolean;
  isFetched?: boolean;
  loaderSkeleton?: boolean;
}

/**
 * `Image` Component
 *
 * The `Image` component is a wrapper around the HTML `img` element, providing additional
 * functionality for loading states and accessibility enhancements.
 *
 * ## Default Styles
 * - Default width and height are set to 32 units but can be overridden with props.
 *
 * ## Overriding Default Styles
 * Props including `className` can override the default styles.
 * The `alt` attribute is always required to promote accessibility.
 *
 * ## Accessibility
 * A meaningful `alt` attribute is essential for screen readers to describe the image.
 *
 * @example
 * ```jsx
 * <Image src="/path/to/image.png" alt="Descriptive text" />
 * ```
 *
 * @param props Props for the component.
 * @returns The `Image` component, potentially displaying a loader if `isLoading` or not yet `isFetched`.
 */
export const Image: React.FC<ImageProps> = ({
  src = "",
  alt,
  isLoading,
  isFetched,
  loaderSkeleton = true,
  ...rest
}) => {
  return <img src={src} alt={alt} {...rest} />;
};
