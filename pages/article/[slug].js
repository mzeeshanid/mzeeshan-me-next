import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";

import { getStrapiMedia } from "../../lib/media";
import myNavItems from "../../src/data/myNavItems";
import Seo from "../../src/components/Blog/BlogSEO";
import { AspectRatio, Box, Center, Heading, Text } from "@chakra-ui/layout";
import { LightMode } from "@chakra-ui/color-mode";
import AppNavBar from "../../src/components/AppNavBar";
import BlogCategories from "../../src/components/Blog/BlogCategories";
import AppFooter from "../../src/components/AppFooter";

import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import theme from "@chakra-ui/theme";
import rehypeRaw from "rehype-raw";

import Image from "next/image";
import StrapiImage from "../../src/components/Blog/StrapiImage";

const Article = ({ article, categories }) => {
  const components = {
    p: (paragraph) => {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        const meta = { width: 768, height: 432, alt: "image in an article" };

        try {
          const metaObject = JSON.parse(image.properties.alt);

          if (metaObject.width !== undefined) {
            meta.width = metaObject.width;
          }

          if (metaObject.height !== undefined) {
            meta.height = metaObject.height;
          }

          if (metaObject.alt !== undefined) {
            metaObject.alt = metaObject.alt;
          }

          if (metaObject.thumb !== undefined) {
            meta.placeholder = "blur";
            meta.blurDataURL = metaObject.thumb;
          }
        } catch (error) {}

        return (
          <Image src={image.properties.src} className="postImg" {...meta} />
        );
      }
      return <p>{paragraph.children}</p>;
    },
  };

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  return (
    <LightMode>
      <Seo seo={seo} />
      <AppNavBar navItems={myNavItems()} />
      <BlogCategories categories={categories} />
      <Center p={4} textColor={theme.colors.black} bg={theme.colors.gray[50]}>
        <Box w="full" maxW="800px" overflow="scroll">
          <Heading as="h1" textColor={theme.colors.black}>
            {article.title}
          </Heading>
          <Box p={4} />
          {article.image && (
            <Box w="full" overflow={"hidden"}>
              <StrapiImage
                image={article.image}
                width={article.image.width}
                height={article.image.height}
              />
            </Box>
          )}
          <ReactMarkdown
            components={ChakraUIRenderer(components)}
            remarkPlugins={[gfm]}
            rehypePlugins={[rehypeRaw]}
            children={article.content}
          />
        </Box>
      </Center>
      <AppFooter />
    </LightMode>

    // <Layout categories={categories}>

    //   <div
    //     id="banner"
    //     className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
    //     data-src={imageUrl}
    //     data-srcset={imageUrl}
    //     data-uk-img
    //   >
    //     <h1>{article.title}</h1>
    //   </div>
    //   <div className="uk-section">
    //     <div className="uk-container uk-container-small">
    //       <ReactMarkdown source={article.content} escapeHtml={false} />
    //       <hr className="uk-divider-small" />
    //       <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
    //         <div>
    //           {article.author.picture && (
    //             <Image
    //               image={article.author.picture}
    //               style={{
    //                 position: "static",
    //                 borderRadius: "50%",
    //                 height: 30,
    //               }}
    //             />
    //           )}
    //         </div>
    //         <div className="uk-width-expand">
    //           <p className="uk-margin-remove-bottom">
    //             By {article.author.name}
    //           </p>
    //           <p className="uk-text-meta uk-margin-remove-top">
    //             <Moment format="MMM Do YYYY">{article.published_at}</Moment>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Layout>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles?slug=${params.slug}`);
  const categories = await fetchAPI("/categories");

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  };
}

export default Article;
