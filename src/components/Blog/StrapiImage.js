import { getStrapiMedia } from "../../../lib/media";
import Image from "next/dist/client/image";

const StrapiImage = ({ image, ...rest }) => {
  const imageUrl = getStrapiMedia(image);
  const blurDataURL = getStrapiMedia(image.formats.small);
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
