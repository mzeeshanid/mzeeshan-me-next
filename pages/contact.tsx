import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import ContactForm from "@/components/Contact/ContactForm";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { Container, Spacer } from "@chakra-ui/react";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {};

const ContactHome: React.FC<Props> = (props: Props) => {
  const title = "Contact Muhammad Zeeshan";
  const details =
    "Get in touch with Muhammad Zeeshan for iOS development, consulting, or collaboration inquiries.";
  const heroImage = "/assets/mzeeshan_me_hero.jpeg";
  const canonicalUrl = absoluteUrl("/contact");

  return (
    <>
      <Head>
        {generateNextSeo({
          title: title,
          description: details,
          canonical: canonicalUrl,
          openGraph: {
            title: title,
            description: details,
            url: canonicalUrl,
            type: "website",
            images: [
              {
                url: absoluteUrl(heroImage),
                type: "image/jpg",
              },
            ],
          },
        })}
      </Head>
      <Container p={0} maxW="full">
        {/* --- NavBar --- */}
        <NavBar />
        <main>
        <Spacer p={{ base: 4, lg: 8 }} />

        <Container maxW="6xl">
          <ContactForm />
        </Container>

        <Spacer p={4} />
        {/* --- Footer --- */}
        </main>
        <Footer />
      </Container>
    </>
  );
};

export default ContactHome;
