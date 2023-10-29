import Head from "next/head";
import { getStrapiMedia } from "../../../lib/media.js";

const Seo = ({ seo, url, global }) => {
  const { defaultSeo, siteName } = global.attributes;
  const shareImageAttributes = defaultSeo.shareImage.data.attributes;

  const defaultSeoAttributes = { ...defaultSeo };
  defaultSeoAttributes.shareImage = shareImageAttributes;

  const seoWithDefaults = {
    ...defaultSeoAttributes,
    ...seo,
  };

  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: `${seoWithDefaults.metaTitle} | ${siteName}`,
    // Get full image URL
    shareImage: seoWithDefaults.shareImage
      ? getStrapiMedia(seoWithDefaults.shareImage)
      : "",
  };

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
      {url && <meta property="og:url" content={url} />}
    </Head>
  );
};

export default Seo;
