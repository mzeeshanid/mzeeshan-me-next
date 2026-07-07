import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import mySEOData from "@/data/home/mySEOData";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  HStack,
  Heading,
  Link,
  SimpleGrid,
  Spacer,
  Stat,
  Tag,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { JsonLdScript, Person } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import Image from "next/image";
import profilePic from "public/assets/profile_pic.jpeg";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import {
  LuBookOpen,
  LuBriefcase,
  LuCode,
  LuGift,
  LuGraduationCap,
  LuInfinity,
  LuLayoutGrid,
  LuLock,
  LuMapPin,
  LuPlane,
  LuRocket,
  LuShieldCheck,
  LuShuffle,
  LuSmartphone,
  LuSparkles,
} from "react-icons/lu";

type Props = {};

const BADGES = [
  { icon: LuMapPin, label: "Lahore, Pakistan" },
  { icon: LuBriefcase, label: "A decade of experience" },
  { icon: LuGraduationCap, label: "MSCS" },
];

const STATS = [
  { icon: LuRocket, value: "10+", label: "Years shipping iOS" },
  { icon: LuInfinity, value: "Free", label: "Tools, no paywalls" },
  { icon: LuLock, value: "100%", label: "Client-side privacy" },
  { icon: LuCode, value: "MSCS", label: "Computer Science" },
];

const TOOLBOX = [
  "Swift",
  "SwiftUI",
  "Objective-C",
  "React",
  "React Native",
  "Next.js",
  "TypeScript",
  "UIKit",
  "Xcode",
  "Combine",
  "Core Data",
  "REST APIs",
];

const BLOG_TOPICS = [
  {
    icon: LuSmartphone,
    title: "iOS Development",
    description:
      "Swift, SwiftUI, Xcode workflows, and lessons from a decade of shipping apps.",
  },
  {
    icon: LuLayoutGrid,
    title: "Apps & Tools",
    description:
      "Behind-the-scenes notes on the apps and free tools I build and publish.",
  },
  {
    icon: LuBookOpen,
    title: "Stories",
    description: "Notes from meetups, community events, and everyday moments.",
  },
  {
    icon: LuPlane,
    title: "Travel",
    description: "Trips and journeys, in Pakistan and beyond.",
  },
  {
    icon: LuShuffle,
    title: "Random",
    description: "Whatever else is on my mind — no fixed topic required.",
  },
];

const VALUES = [
  {
    icon: LuGift,
    title: "Free, always",
    description:
      "No paywalls, no accounts, no subscriptions — just a tool that does the one job it's meant to do.",
  },
  {
    icon: LuShieldCheck,
    title: "Privacy-first",
    description:
      "Wherever possible, processing happens client-side in your browser — your files and data aren't uploaded to a server just to get a job done.",
  },
  {
    icon: LuSparkles,
    title: "Born from real needs",
    description:
      "Every tool started as something I needed for my own development work — not a guess at what might be useful.",
  },
];

const AboutHome: React.FC<Props> = (props: Props) => {
  const mySeo = mySEOData();
  const { palette } = useColorPalette();
  const title = "About Muhammad Zeeshan — Lead iOS Developer & Maker of Free Developer Tools";
  const details =
    "I'm Muhammad Zeeshan, a Lahore-based Lead iOS Developer with a decade of experience and an MSCS. Here's why I build free, privacy-first, client-side developer tools.";
  const heroImage = "/assets/mzeeshan_me_hero.jpeg";
  const pageUrl = absoluteUrl("/about");

  const personJsonLd: Person = {
    "@type": "Person",
    name: "Muhammad Zeeshan",
    givenName: "Muhammad",
    familyName: "Zeeshan",
    alternateName: mySeo.username,
    description: details,
    url: pageUrl,
    image: absoluteUrl(mySeo.logo.src),
    sameAs: [
      "https://github.com/mzeeshanid",
      "https://stackoverflow.com/users/1796092/muhammad-zeeshan",
      "https://www.linkedin.com/in/muhammad-zeeshan-04b8585b/",
      "https://medium.com/@mzeeshanid",
      "https://www.youtube.com/@RandomWithZee",
    ],
  };

  return (
    <>
      <Head>
        {generateNextSeo({
          title: title,
          description: details,
          openGraph: {
            title: title,
            description: details,
            url: pageUrl,
            images: [
              {
                url: absoluteUrl(heroImage),
                type: "image/jpg",
              },
            ],
          },
        })}
        <link rel="canonical" href={pageUrl} />
      </Head>
      <JsonLdScript<Person> data={personJsonLd} scriptKey="about-person" />
      <NavBar />
      <main>
        <Spacer p={4} />

        <Container maxW="6xl">
          <PageHeader
            title="About Me"
            breadcrumbItems={[{ label: "Home", href: "/" }, { label: "About" }]}
            currentHref="/about"
          />
        </Container>

        <Spacer p={4} />

        <Container maxW="6xl">
          <VStack gap={{ base: 10, md: 14 }} align="stretch">
            <VStack gap={{ base: 5, md: 6 }}>
              <Box
                borderRadius="full"
                borderWidth="2px"
                borderColor={`${palette}.emphasized`}
                p={{ base: "8px", md: "10px" }}
              >
                <Box
                  w={{ base: "140px", md: "160px" }}
                  h={{ base: "140px", md: "160px" }}
                  borderRadius="full"
                  overflow="hidden"
                >
                  <Image
                    src={profilePic}
                    alt="Muhammad Zeeshan"
                    width={160}
                    height={160}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    placeholder="blur"
                    priority
                    sizes="(max-width: 48em) 140px, 160px"
                  />
                </Box>
              </Box>

              <VStack gap={{ base: 1, md: 2 }} textAlign="center">
                <Text
                  textStyle="sm"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  textTransform="uppercase"
                  color={`${palette}.solid`}
                >
                  {"About"}
                </Text>
                <Text color="fg.muted" textStyle={{ base: "lg", md: "xl" }}>
                  {"Hi, I'm"}
                </Text>
                <Heading size={{ base: "3xl", md: "5xl" }}>
                  {"Muhammad Zeeshan"}
                </Heading>
                <Text color="fg.muted" textStyle={{ base: "lg", md: "xl" }}>
                  {"Lead iOS Developer"}
                </Text>
              </VStack>

              <Wrap justify="center" gap={3}>
                {BADGES.map((badge, idx) => (
                  <Tag.Root
                    key={idx}
                    size="lg"
                    variant="surface"
                    rounded="full"
                    px={4}
                    py={2}
                  >
                    <Tag.StartElement>
                      <DeferredIcon icon={badge.icon} boxSize={4} />
                    </Tag.StartElement>
                    <Tag.Label>{badge.label}</Tag.Label>
                  </Tag.Root>
                ))}
              </Wrap>
            </VStack>

            <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 3, md: 4 }}>
              {STATS.map((stat, idx) => (
                <Stat.Root
                  key={idx}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={2}
                  bg="bg.subtle"
                  rounded="xl"
                  p={{ base: 4, md: 6 }}
                  textAlign="center"
                >
                  <Center w={10} h={10} bg={`${palette}.subtle`} rounded="lg">
                    <DeferredIcon icon={stat.icon} color={`${palette}.fg`} boxSize={5} />
                  </Center>
                  <Stat.ValueText
                    justifyContent="center"
                    fontSize={{ base: "xl", md: "2xl" }}
                    color={`${palette}.fg`}
                  >
                    {stat.value}
                  </Stat.ValueText>
                  <Stat.Label color="fg.muted" textStyle="sm">
                    {stat.label}
                  </Stat.Label>
                </Stat.Root>
              ))}
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }}>
              <VStack align="flex-start" gap={4}>
                <Heading size={{ base: "lg", md: "xl" }}>{"Who I Am"}</Heading>
                <Text color="fg.muted">
                  {"Over the past decade I've specialized in building high-quality, scalable mobile applications with Swift, SwiftUI, and Objective-C — working across product teams and as a freelancer for clients around the world."}
                </Text>
                <Text color="fg.muted">
                  {"My MSCS grounds the way I approach problems — I like to understand systems deeply, not just ship features. That mix of academic background and a decade in production iOS engineering shapes everything I build, including the tools on this site."}
                </Text>
              </VStack>
              <VStack align="flex-start" gap={4}>
                <Text
                  textStyle="sm"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  textTransform="uppercase"
                  color="fg.subtle"
                >
                  {"Toolbox"}
                </Text>
                <Wrap gap={{ base: 2, md: 3 }}>
                  {TOOLBOX.map((tool, idx) => (
                    <Tag.Root
                      key={idx}
                      size={{ base: "md", md: "lg" }}
                      variant="surface"
                      rounded="md"
                      fontFamily="mono"
                    >
                      <Tag.Label>{tool}</Tag.Label>
                    </Tag.Root>
                  ))}
                </Wrap>
              </VStack>
            </SimpleGrid>

            <VStack align="flex-start" gap={6}>
              <VStack align="flex-start" gap={4}>
                <Heading size={{ base: "lg", md: "xl" }}>
                  {"Why This Site Exists"}
                </Heading>
                <Text color="fg.muted">
                  {"Alongside client work, I keep running into small, annoying problems that don't need a full app or a paid subscription to solve — converting a file, validating some JSON, sharing a sample file, calculating a tax figure. So I build the tool myself and publish it here."}
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} w="full">
                {VALUES.map((value, idx) => (
                  <Card.Root key={idx} bg="bg.subtle" borderWidth={0} h="full">
                    <Card.Body>
                      <VStack align="flex-start" gap={3}>
                        <Center w={10} h={10} bg={`${palette}.subtle`} rounded="lg">
                          <DeferredIcon
                            icon={value.icon}
                            color={`${palette}.fg`}
                            boxSize={5}
                          />
                        </Center>
                        <Text fontWeight="bold">{value.title}</Text>
                        <Text color="fg.muted" textStyle="sm">
                          {value.description}
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                ))}
              </SimpleGrid>
            </VStack>

            <VStack align="flex-start" gap={6}>
              <VStack align="flex-start" gap={4}>
                <Heading size={{ base: "lg", md: "xl" }}>
                  {"What I Write About"}
                </Heading>
                <Text color="fg.muted">
                  {"Beyond the tools, I write on the blog about iOS development, the apps I build, and life outside the editor."}
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap={4} w="full">
                {BLOG_TOPICS.map((topic, idx) => (
                  <Card.Root key={idx} bg="bg.subtle" borderWidth={0} h="full">
                    <Card.Body>
                      <VStack align="flex-start" gap={3}>
                        <Center w={10} h={10} bg={`${palette}.subtle`} rounded="lg">
                          <DeferredIcon
                            icon={topic.icon}
                            color={`${palette}.fg`}
                            boxSize={5}
                          />
                        </Center>
                        <Text fontWeight="bold">{topic.title}</Text>
                        <Text color="fg.muted" textStyle="sm">
                          {topic.description}
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                ))}
              </SimpleGrid>

              <Link href="/blog" colorPalette={palette} fontWeight="medium">
                <HStack gap={1}>
                  <Text>{"Read the blog"}</Text>
                  <DeferredIcon icon={FaArrowRight} boxSize={3} />
                </HStack>
              </Link>
            </VStack>

            <Box
              bg={`${palette}.solid/15`}
              borderWidth="1px"
              borderColor={`${palette}.solid/25`}
              rounded="2xl"
              p={{ base: 8, md: 10 }}
            >
              <VStack gap={4} textAlign="center">
                <Heading size={{ base: "lg", md: "xl" }}>
                  {"Explore the tools"}
                </Heading>
                <Text color="fg.muted">
                  {"Free, private, and built to solve one real problem at a time."}
                </Text>
                <Link href="/tools">
                  <Button colorPalette={palette} size="lg">
                    {"Browse all tools"}
                    <DeferredIcon icon={FaArrowRight} boxSize={3} />
                  </Button>
                </Link>
              </VStack>
            </Box>
          </VStack>
        </Container>
        <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export default AboutHome;
