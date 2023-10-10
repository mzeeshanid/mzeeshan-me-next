import Image from "next/image";
import { getStrapiMedia } from "../../../lib/media";

const StrapiImage = ({ image, ...rest }) => {
  const imageUrl = getStrapiMedia(image);
  const blurDataURL = getStrapiMedia(image.formats.thumbnail);
  return (
    <Image
      src={imageUrl}
      placeholder={"blur"}
      blurDataURL={blurDataURL}
      alt={image.alternativeText || image.name}
      {...rest}
    />
  );
};

export default StrapiImage;
