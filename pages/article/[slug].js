import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";

import { getStrapiMedia } from "../../lib/media";
import myNavItems from "../../src/data/myNavItems";
import Seo from "../../src/components/Blog/BlogSEO";
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Text,
  Link,
} from "@chakra-ui/layout";
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
import isExternalLink from "../../src/hooks/isExternalLink";

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
    a: (props) => {
      const { children, node } = props;
      const { properties } = node;
      const { href } = properties;

      return (
        <Link color={theme.colors.teal[500]} href={href} isExternal={true}>
          {children}
        </Link>
      );
    },
  };

  const articleAttributes = article.attributes;
  const imageData = articleAttributes.image.data;

  const seo = {
    metaTitle: articleAttributes.title,
    metaDescription: articleAttributes.description,
    shareImage: imageData.attributes,
    article: true,
  };

  return (
    <LightMode>
      <Seo
        seo={seo}
        url={`https://www.mzeeshan.me/article/${articleAttributes.slug}`}
      />
      <AppNavBar navItems={myNavItems()} />
      <BlogCategories categories={categories} />
      <Center p={4} textColor={theme.colors.black} bg={theme.colors.gray[50]}>
        <Box w="full" maxW="800px" overflow="scroll">
          <Heading as="h1" textColor={theme.colors.black}>
            {article.attributes.title}
          </Heading>
          <Box p={4} />
          {imageData && imageData.attributes && (
            <Box w="full" overflow={"hidden"}>
              <StrapiImage
                image={imageData.attributes}
                width={imageData.attributes.width}
                height={imageData.attributes.height}
              />
            </Box>
          )}
          <ReactMarkdown
            components={ChakraUIRenderer(components)}
            remarkPlugins={[gfm]}
            rehypePlugins={[rehypeRaw]}
            children={article.attributes.content}
          />
        </Box>
      </Center>
      <AppFooter />
    </LightMode>
  );
};

export async function getStaticPaths() {
  const { data: articles } = await fetchAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data: article } = await fetchAPI(`/articles/${params.slug}`);
  const { data: categories } = await fetchAPI("/categories");

  return {
    props: { article: article, categories },
    revalidate: 1,
  };
}

export default Article;
