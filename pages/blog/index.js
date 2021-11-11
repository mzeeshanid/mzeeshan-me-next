import { LightMode, Box } from "@chakra-ui/react";
import React from "react";
import { fetchAPI } from "../../lib/api";
import AppFooter from "../../src/components/AppFooter";
import AppNavBar from "../../src/components/AppNavBar";
import Articles from "../../src/components/Blog/Articles";
import BlogCategories from "../../src/components/Blog/BlogCategories";
import myNavItems from "../../src/data/myNavItems";

export default function Index({ articles, categories }) {
  return (
    <LightMode>
      <AppNavBar navItems={myNavItems()} />
      <BlogCategories categories={categories} />
      <Articles articles={articles} />
      <AppFooter />
    </LightMode>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories] = await Promise.all([
    fetchAPI("/articles"),
    fetchAPI("/categories"),
  ]);

  return {
    props: { articles, categories },
    revalidate: 1,
  };
}
