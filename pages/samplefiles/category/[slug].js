import { LightMode } from "@chakra-ui/color-mode";
import { Center, VStack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchAPI } from "../../../lib/api";
import AppFooter from "../../../src/components/AppFooter";
import AppNavBar from "../../../src/components/AppNavBar";
import AppStats from "../../../src/components/AppStats";
import SampleFileExtensions from "../../../src/components/SampleFiles/SampleFileExtensions";
import SampleFileFeatured from "../../../src/components/SampleFiles/SampleFileFeatured";
import SampleFileRequest from "../../../src/components/SampleFiles/SampleFileRequest";
import SampleFileTagline from "../../../src/components/SampleFiles/SampleFileTagline";
import sampleFileStats from "../../../src/data/sampleFileStats";

export default function SampleFileCategory({
  categories,
  category,
  extensions,
}) {
  const navItems = [
    {
      title: "Home",
      path: "/samplefiles",
    },
    ...categories.map((category) => {
      return { title: category.name, path: category.slug };
    }),
  ];

  return (
    <LightMode>
      <AppNavBar navItems={navItems} />
      <Center bg={theme.colors.white} p={4}>
        <Heading as="h1" color={theme.colors.black}>
          {category.name}
        </Heading>
      </Center>
      <SampleFileExtensions extensions={extensions} />
      <SampleFileTagline />
      <AppStats stats={sampleFileStats()} />
      <SampleFileFeatured
        items={categories.map((category) => {
          return {
            title: category.name,
            detail: category.info,
            icon: (
              <FontAwesomeIcon
                size="4x"
                color={theme.colors.gray[700]}
                icon={category.icon}
              />
            ),
            path: category.slug,
          };
        })}
      />
      <VStack p={2} bg={"gray.700"} />
      <SampleFileRequest />
      <AppFooter />
    </LightMode>
  );
}

export async function getStaticPaths() {
  const categories = await fetchAPI("/sample-file-types");

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Run API calls in parallel
  const categories = await fetchAPI("/sample-file-types");
  const category = categories.filter((cat) => {
    return cat.slug.toLowerCase() === params.slug.toLowerCase();
  })[0];

  const extensions = await fetchAPI(
    `/sample-file-extensions?_where[type.slug]=${category.slug}`
  );

  return {
    props: { categories, category, extensions },
    revalidate: 1,
  };
}
