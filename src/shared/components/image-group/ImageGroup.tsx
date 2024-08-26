import React from "react";

interface ImageGroupProps {
  images: (string | undefined)[];
  imageStyle: string;
  spacing?: string;
}

/**
 * `ImageGroup` Component
 *
 * This component creates a group of avatar-styled images using the daisyUI library. It dynamically adjusts the spacing between
 * avatar images based on the provided `spacing` prop, and can handle multiple images dynamically.
 *
 * ## Usage
 * This component accepts the following props:
 * - `images`: An array of image URLs to be displayed.
 * - `imageStyle`: A Tailwind CSS utility class to apply specific styles to the images, like width.
 * - `spacing`: Optional. Tailwind CSS spacing utilities to adjust the space between images.
 *
 * ## Example
 * ```jsx
 * <ImageGroup
 *   images={[
 *     "https://example.com/image1.jpg",
 *     "https://example.com/image2.jpg"
 *   ]}
 *   imageStyle="w-12"
 *   spacing="-space-x-4"
 * />
 * ```
 *
 * @param props The props for the `ImageGroup` component.
 * @returns A JSX element representing a group of images.
 */
export const ImageGroup: React.FC<ImageGroupProps> = ({
  images,
  imageStyle,
  spacing = "-space-x-6 rtl:space-x-reverse",
}) => {
  return (
    <div className={`flex flex-row gap-[5px] ${spacing}`}>
      {images.map((image, index) => (
        <div key={index} className="avatar">
          <div className={imageStyle}>
            <img src={image} alt={`Avatar ${index + 1}`} />
          </div>
        </div>
      ))}
    </div>
  );
};
