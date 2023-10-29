import { fetchAPI } from "../../lib/api";

import myNavItems from "../../src/data/myNavItems";
import Seo from "../../src/components/Blog/BlogSEO";
import AppNavBar from "../../src/components/AppNavBar";
import BlogCategories from "../../src/components/Blog/BlogCategories";
import AppFooter from "../../src/components/AppFooter";

import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import Image from "next/image";
import StrapiImage from "../../src/components/Blog/StrapiImage";
import Articles from "../../src/components/Blog/Articles";
import { Box, Center, Heading, LightMode, Link, theme } from "@chakra-ui/react";

const Article = ({ article, categories, global }) => {
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
        global={global}
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
          {article.attributes.related &&
            article.attributes.related.data &&
            article.attributes.related.data.length > 0 && (
              <>
                <Box p={2} />
                <Heading color={theme.colors.black} textAlign={"center"}>
                  More To Read
                </Heading>
                <Articles articles={article.attributes.related.data} />
              </>
            )}
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
  // const { data: article } = await fetchAPI(`/articles/${params.slug}`);
  const { data: articles } = await fetchAPI(
    `/articles?filters[slug][$eq]=${params.slug}&populate[0]=category&populate[1]=writer&populate[2]=writer.picture&populate[3]=image&populate[4]=related&populate[5]=related.image&populate[6]=related.writer&populate[7]=related.writer.picture&populate[8]=related.category`
  );
  const { data: categories } = await fetchAPI("/categories");

  const { data: global } = await fetchAPI(
    "/global?populate[0]=defaultSeo.shareImage&populate[1]=favicon"
  );

  const article = articles[0];

  return {
    props: { article: article, categories, global },
    revalidate: 1,
  };
}

export default Article;
